import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Newbill.css"

function Newbill() {
    let sms = "456697"
    const [name, setName] = useState("");
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
            <div className='newbill-con'>
                <div className="form-group">
                    <label htmlfor="name">Name</label>
                    <input type="text" placeholder='Your Input' value={name ?? ""} onChange={e => setName(e.target.value)} id="name" />
                </div>
                <div className="form-group">
                    <label htmlfor="number">Number</label>
                    <input type="text" placeholder='Your Input' value={number ?? ""} onChange={e => setNumber(e.target.value)} id="number" />
                </div>
                <div className='form-group'>
                    <label htmlFor="item">Product</label>
                    <select id="item">
                        <option value="none">Select an Option</option>
                        <option value="usha-highspeed-fan">Usha High Speed Fan</option>
                        <option value="voltas-all-weather">Voltas All Weather AC</option>
                        <option value="table-fan-voltas">Voltas Table Fan</option>
                    </select>
                </div>
                <button onClick={sendSMS}>Submit</button>
            </div>
        </>
    )
}

export default Newbill;