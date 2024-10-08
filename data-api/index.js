let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

const NewData = require('./models/newData');
const NewSms = require('./models/newSms');

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

try {
    mongoose.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
} catch (err) {
    console.log(err)
}

app.get('/', (req, res) => {
    res.send({
        message: "Welcome"
    });
});

app.post('/newData', async (req, res) => {
    try {
        let newData = new NewData({
            VchNo: req.body.VchNo,
            Date: req.body.Date,
            PartyName: req.body.PartyName,
            MobileNo: req.body.MobileNo,
            Address: req.body.Address,
            State: req.body.State,
            Items: req.body.Items,
            TotalAmount: req.body.TotalAmount,
            Otp: req.body.Otp,
            Remarks: req.body.Remarks
        });

        await newData.save();

        console.log("Data sent successfully")

        res.status(202).send({
            message: "Data sent successfully",
            data: newData
        })
    } catch (error) {
        res.status(202).send({
            message: "Failed",
            data: {
                VchNo: req.body.VchNo,
                Date: req.body.Date,
                PartyName: req.body.PartyName,
                MobileNo: req.body.MobileNo,
                Address: req.body.Address,
                State: req.body.State,
                Items: req.body.Items,
                TotalAmount: req.body.TotalAmount,
                Otp: req.body.Otp,
                Remarks: req.body.Remarks
            }
        })
    }
});

app.put('/orders/:orderId/:newDriver', (req, res) => {
    let order = req.params.orderId;
    try {
        // let response = NewData.findOne({ VchNo: orderId.replace('M', '/') }, (err, data) => {
        //     res.send({
        //         Response: data,
        //         OrderId: orderId,
        //         NewDriver: req.body.newDriver
        //     })
        // });
        NewData.findOneAndUpdate({ "VchNo": order.replace('M', '/') }, { "Driver": req.params.newDriver }, null, (err, data) => {
            res.send({
                Response: data,
                OrderId: order.replace('M', '/'),
                "NewDriver": req.params.newDriver
            })
        })
    } catch (err) {
        res.send(err);
    }
})

app.put('/verifyOrder/:orderId/', (req, res) => {
    let order = req.params.orderId;
    try {
        NewData.findOneAndUpdate({ "VchNo": order.replace('M', '/') }, { "DeliveryStatus": "success" }, null, (err, data) => {
            res.send({
                Response: data,
                OrderId: order.replace('M', '/'),
            })
        })
    } catch (err) {
        res.send(err);
    }
})

app.put('/remarks/:orderId', (req, res) => {
    let order = req.params.orderId;
    try {
        NewData.findOneAndUpdate({ "VchNo": order.replace('M', '/') }, { "Remarks": req.body.Remarks }, null, (err, data) => {
            res.send({
                Response: data,
                OrderId: order.replace('M', '/')
            })
        });
    } catch (err) {
        res.send(err);
    }
})

app.put('/deliveredOn/:orderId', (req, res) => {
    let order = req.params.orderId;
    try {
        NewData.findOneAndUpdate({ "VchNo": order.replace('M', '/') }, { "DeliveredOn": req.body.DeliveredOn }, null, (err, data) => {
            res.send({
                Response: data,
                OrderId: order.replace('M', '/')
            })
        });
    } catch (err) {
        res.send(err);
    }
})

app.post('/sms', async (req, res) => {
    try {
        let newSms = new NewSms({
            VchNo: req.body.VchNo,
            Driver: req.body.Driver,
            Date: new Date(),
            Message: req.body.Message,
            Contact: req.body.Contact
        });

        await newSms.save();

        console.log("Data sent successfully")

        res.status(202).send({
            message: "Data sent successfully",
            data: newSms
        })
    } catch (err) {
        res.send(err);
    }
})

app.get('/allVouchers', (req, res) => {
    NewData.find({}, (err, data) => {
        if (err) { res.send(err); return; }
        res.send(data);
    })
})

app.delete('/deleteAllVouchers', async (req, res) => {
    try {
        const result = await NewData.deleteMany({ DeliveryStatus: 'pending' });
        res.status(200).json({ message: `Deleted ${result.deletedCount} documents` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/deleteVoucher', async (req, res) => {
    try {
        const result = await NewData.findOneAndDelete({ VchNo: req.body.id });
        res.status(200).json({ message: `Deleted Successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/pendingVouchers', async (req, res) => {
    try {
        let mongoRes = await NewData.find({ DeliveryStatus: "pending" });
        res.json({ Response: mongoRes })
    } catch (error) {
        res.json({ message: error.message })
    }
})

app.put('/orderSuccess', async (req, res) => {
    let { order, Remarks, newDriver } = req.body;
    try {
        let mongoRes = await NewData.findOneAndUpdate({ "VchNo": order.replace('M', '/') }, {
            "Remarks": Remarks,
            "Driver": newDriver,
            "DeliveryStatus": "success"
        });
        res.json({
            Response: mongoRes,
            OrderId: order.replace('M', '/')
        })
    } catch (err) {
        res.send(err);
    }
})

let PORT = 5000;

app.listen(PORT, () => { console.log('API Running Successfully', `http://localhost:${PORT}`) });