import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./OrderDrop.css";

function OrderDrop({ defDriver, billId }) {
    // let otherDrivers = drivers.filter(driver => {
    //     if (driver != defDriver) {
    //         return driver;
    //     }
    //     return;
    // })

    // let [newDriver, setNewDriver] = useState({ defDriver: defDriver, billId: billId.replace('/', 'M') });

    // async function sendNewDriverReq() {
        // await axios.put('http://localhost:5000/orders/' + newDriver.billId, {
        //     newDriver: newDriver.defDriver
        // });
        // let res = await axios.get('http://localhost:5000/');
        // console.log(res.data);
    // }

    // sendNewDriverReq()

    async function newDriver(newDriver, billId) {
        await axios.put('https://data-api-rktraders.vercel.app/orders/' + billId.replace('/', 'M'), {
            newDriver: newDriver.defDriver
        });

        // let res = await axios.get('http://localhost:5000/');
        // console.log(res.data);
    }

    return (
        <details>
            <summary>{defDriver}</summary>
            <ol>
                <li>Karan G. - <a onClick={() => { newDriver("Karan G.", billId); console.log("Karan G.", billId) }}>assign</a></li>
                <li>Raman Kumar - <a onClick={() => { newDriver("Raman Kumar", billId) }}>assign</a></li>
                <li>Virath k. - <a onClick={() => { newDriver("Virath k.", billId) }}>assign</a></li>
            </ol>
        </details>
        // <nav role="navigation">
        //     <ul>
        //         <li><a href="#" aria-haspopup="true">Two</a>
        //             <ul class="dropdown" aria-label="submenu">
        //                 <li><a href="#">Karan G.</a></li>
        //                 <li><a href="#">Raman Kumar</a></li>
        //                 <li><a href="#">Virath k.</a></li>
        //             </ul>
        //         </li>
        //     </ul>
        // </nav>
        // <select>
        //     <option onSelect={() => { console.log(defDriver); setNewDriver(defDriver) }}><button>{defDriver}</button></option>
        //     {otherDrivers.map(driver => {
        //         return <option onSelect={() => { console.log(defDriver); setNewDriver(driver) }}>{driver}</option>
        //     })};

        //     {/* <option><h3 onClick={() => { console.log(defDriver); setNewDriver(defDriver) }}>{defDriver}</h3></option>
        //     {otherDrivers.map(driver => {
        //         return <option><h3 onClick={() => { console.log(driver); setNewDriver(driver) }}>{driver}</h3></option>
        //     })} */}
        // </select>
    )
}

export default OrderDrop