import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Newbill.css"

function Newbill() {
    const [sms, setSms] = useState("");
    const [number, setNumber] = useState("");

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5500/',
        headers: {
            // 'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'Content-Type: application/json',
            // accept: 'application/json',
        }
    });

    const sendSMS = async () => {
        let request = await axiosInstance.post("sendMessage", { "message": sms, "number": number });
        console.log(request);
        console.log(request.data);
    }

    return (
        <>
            <div className="form-group">
                <label for="number">Enter Number</label>&nbsp;&nbsp;
                <input type="text" value={number ?? ""} onChange={e => setNumber(e.target.value)} id="number" />
            </div>
            <div className="form-group">
                <label for="message">Enter Message</label>&nbsp;&nbsp;
                <input type="text" value={sms ?? ""} onChange={e => setSms(e.target.value)} id="message" />
            </div>
            <button onClick={sendSMS}>Submit</button>
        </>
    )
}

export default Newbill;