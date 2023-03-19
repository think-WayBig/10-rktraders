import React from 'react';
import "./Orderbox.css";
import Items from "./Items";

function Orderbox(props) {
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
          {/* <li><span>Item Details:</span><details><summary>Items</summary><Items Details={props.item} /></details></li> */}
          <li className='lastli'><span>Price:</span> {"₹" + props.price}</li>
          <a className='verifyBtn' target='_blank' href={"https://wa.me/91" + props.mobile + "?text=" + "Thank%20you%20for%20your%20order%20with%20*RK%20Traders*%0A%0AHere%20are%20your%20Order%20Details:%0A_Order%20ID%3A_%20" + props.id + "%0A_Name%3A_%20" + props.name + "%0A_Date%20of%20delivery%3A_%20" + new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + "%0A_Amount%20to%20be%20Paid%3A_%20" + props.price + "%0A%0AIn%20case%20of%20inconvenience%2C%20please%20contact%20%2B91%C2%A06284%C2%A0205%C2%A0074"}>Confirm on WhatsApp<i className='fa fa-chevron-right' /></a>
          {/* <li><span>Delivery:</span> {props.delivery}</li> */}
        </ol>
      </div>
    </div>
  )
}

export default Orderbox;