var unirest = require("unirest");
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
// const fast2sms = require('fast-two-sms');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({ message: "Hello world" });
})

app.get('/sendSms', async (req, res) => {
    var sms = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    sms.query({
        "authorization": "bMvQ4fxGCVqBTJ0KFP16glLA3ikN8mRytZwYS9XzuW5pdDo7n2GHYc8tkzLbhCP2MaIoqA5XOKFx07Re",
        "variables_values": req.query.message,
        "route": "otp",
        "numbers": req.query.number
    });

    sms.headers({
        "cache-control": "no-cache"
    });


    sms.end(function (response) {
        res.send({ message: "success", responseType: res.body });
        console.log(response.body);
    });
    
});

let port = process.env.PORT || 3001;

app.listen(port, () => { console.log(`Listening on port ${port}`) });