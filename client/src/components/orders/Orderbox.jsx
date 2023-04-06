import React from 'react';
import "./Orderbox.css";
import Items from "./Items";

function Orderbox(props) {
  const delivery = {

  }

  return (
    <div className='order-con'>
      <div>
        <h4 style={{ marginBottom: "0px" }}><span style={{ fontWeight: "400" }}>Date:</span> {props.date}</h4>
        <h4 style={{ marginTop: "0px" }}><span style={{ fontWeight: "400" }}>Vch Code:</span> {props.id}</h4>
        <h2>Details:</h2>
        <ol>
          <li><span>Party Name:</span> {props.name}</li>
          <li><span>Contact:</span> {props.mobile}</li>
          <li><span>Address:</span> {props.address}</li>
          <li><span>Item Details:</span><details><summary>Items</summary><Items Details={props.item} /></details></li>
          {/* <li><span>Item Details:</span><pre>{props.item}</pre></li> */}
          <li><span>Price:</span> {"₹" + props.price}</li>
          <li style={{textTransform: "capitalize"}}><span>Delivered By:</span> {props.delivery}</li>
          <li><span>Remarks:</span> {props.remarks}</li>
        </ol>
        <span style={delivery}>Delivered On:</span> {props.deliveredOn}
      </div>
    </div>
  )
}

export default Orderbox;