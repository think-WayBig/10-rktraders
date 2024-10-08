import React, { useRef, useState } from 'react';
import "./Orderbox.css";
// var unirest = require("unirest");
import OrderDrop from "./OrderDrop.jsx";
import Items from "./Items";
import axios from 'axios';

function Orderbox(props) {
  let [waState, setWaState] = useState("none");
  let [verifyState, setVerifyState] = useState("unset");
  let productsBought = "";

  function productsArr(products) {
    let i = 1;
    products.forEach(product => {
      productsBought += ("*" + i + ".* " + product.Name + " - " + product.Qty + " " + product.Unit + "  |  ");
      i++;
    })
  }

  productsArr(props.item);
  // console.log(productsBought)

  async function sendWaMsg(number, orderId, partyName, deliveryDate, products, cost) {
    const response = await fetch("https://graph.facebook.com/v15.0/111839908529555/messages", {
      method: "POST",
      headers: {
        "Authorization": "Bearer EAAIZAnmCbUhoBAN8rPw2LLJltjlrQVk6WrnU74rl1oRzmDyp51YkcwwelWmFopN1ibngB0AIZCbAz6lsv6M3GomlAArjr6pKYgz0A0PmMs5y9kmhuH0ix1z4b1JEw2rIEFRiuqBtRg5qYtB3u8WtmH7isyZC5IgyWa1tEhGGMRjJF3xybUY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "template",
        "template": {
          "name": "rk_traders_2",
          "language": {
            "code": "en"
          },
          "components": [{
            "type": "body",
            "parameters": [{
              "type": "text",
              "text": orderId
            },
            {
              "type": "text",
              "text": partyName
            },
            {
              "type": "text",
              "text": deliveryDate
            },
            {
              "type": "text",
              "text": products,
            },
            {
              "type": "text",
              "text": cost
            }]
          }]
        }
      })
    })

    console.log(response)
  }

  let handleOtp = async (number, otp) => {
    if (number.length < 10) {
      alert('Number Invalid!!');
      numRef.current.focus();
      return;
    }

    let response = await axios.get("https://rktraders-sms-api.vercel.app/sendSms", {
      params: {
        "number": number,
        "message": otp,
      }
    });

    alert("Otp sent successfully!!");
  }

  let handleVerification = async (otp, code, billId, driver) => {
    if (otp.length < 6 || otp.length > 6) {
      alert("Enter a valid OTP!!")
      codeRef.current.focus();
      return;
    }
    if (otp == code) {
      let date = new Date();
      let options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
      };

      await axios.put("https://data-api-rktraders.vercel.app/orderSuccess/", {
        Remarks: remarks,
        Driver: localStorage.getItem("rkid"),
        order: billId.replace('/', 'M')
      });
      await axios.post("https://data-api-rktraders.vercel.app/sms", {
        VchNo: billId,
        Driver: driver,
        Message: otp + "\nOrder ID: " + props.id + "\nName: " + props.name + "\n" + "Amount: " + props.price,
        Contact: otpNum
      })

      await sendWaMsg(otpNum, props.id, props.name, date.toLocaleTimeString("en-us", options), productsBought, props.price);
      alert("Successfully Verified!!")
      // setWaState(prev => prev = "unset")
      // setVerifyState(prev => prev = "none")
      window.location.reload();
    } else {
      alert("Wrong Otp code! Try again");
      return;
    }
  }

  let numRef = useRef("");
  let codeRef = useRef("");
  let [codeNum, setCodeNum] = useState("");
  let [remarks, setRemarks] = useState("");
  let [otpNum, setOtpNum] = useState(() => {
    return (props.mobile == 'Not Available') ? numRef.current : props.mobile;
  })

  var inputState;
  if (props.mobile == 'Not Available') {
    inputState = false;
  } else if (props.mobile.search('-') != -1) {
    inputState = false;
  } else {
    inputState = true;
  }

  return (
    <div className='order-con'>
      <div>
        <h4 style={{ marginBottom: "0px" }}><span style={{ fontWeight: "400" }}>Date:</span> {props.date}</h4>
        <h4 style={{ marginTop: "0px" }}><span style={{ fontWeight: "400" }}>Vch Code:</span> {props.id}</h4>
        <h2>Details:</h2>
        <ol>
          <li><span>Party Name:</span> {props.name}</li>
          <li><span>Mobile No:</span> {props.mobile}</li>
          <li><span>Address:</span> {props.address}</li>
          <li><span>Item Details:</span><details><summary>Items</summary><Items Details={props.item} /></details></li>
          <li className='lastli'><span>Price:</span> {"₹" + props.price}</li>
          {/* <li><span>Delivery:</span> <OrderDrop defDriver={props.delivery} billId={props.id} /></li> */}
          <a style={{ display: waState }} className='verifyBtn' target='_blank' href={"https://wa.me/91" + otpNum + "?text=" + "Thank%20you%20for%20your%20order%20with%20*RK%20Traders*%0A%0AHere%20are%20your%20order%20Details%0A_Order%20ID%3A_%20" + props.id + "%0A_Name%3A_%20" + props.name + "%0A_Date%20of%20delivery%3A_%20" + Date() + "%0A_Amount%20to%20be%20Paid%3A_%20" + props.price + "%0A%0AIn%20case%20of%20inconvenience%2C%20please%20contact%20%2B91%C2%A06284%C2%A0205%C2%A0074"}>Confirm on WhatsApp<i className='fa fa-chevron-right' /></a>
        </ol>
        <details style={{ display: verifyState }} className='verification'>
          <summary>Verify Delivery</summary>
          <div>
            <input type="number" placeholder='Enter Number' ref={numRef} onChange={(e) => setOtpNum(prev => prev = e.target.value)} value={otpNum} />
            <button style={{ borderLeft: "none" }} onClick={() => { handleOtp(otpNum, props.otpCode) }}>Generate</button>
          </div>
          <div>
            <input type="number" placeholder='Enter the OTP' ref={codeRef} onChange={(e) => setCodeNum(prev => prev = e.target.value)} value={codeNum} />
            <button style={{ borderLeft: "none" }} onClick={() => { handleVerification(codeNum, props.otpCode, props.id, props.delivery) }}>Confirm</button>
          </div>
          <div className='radios'>
            <button onClick={() => setRemarks("No Shortage")}>No Shortage</button>
            <button onClick={() => setRemarks("Missing Item Number : ")} style={{ borderLeft: "none" }}>Missing Item</button>
            {/* <button onClick={() => setRemarks("Option 3")} style={{ borderLeft: "none" }}>Option 3</button> */}
          </div>
          <div>
            <textarea cols="30" rows="3" value={remarks} onChange={(e) => setRemarks(prev => prev = e.target.value)} placeholder='Any remarks' />
          </div>
        </details>
      </div>
    </div>
  )
}

export default Orderbox;