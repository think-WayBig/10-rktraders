import React from 'react';
import "./Orderbox.css";
import OrderDrop from "./OrderDrop.jsx";
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
          <li><span>Item Details:</span><details><summary>Items</summary><Items Details={props.item} /></details></li>
          {/* <li><span>Item Details:</span><pre>{props.item}</pre></li> */}
          <li><span>Price:</span> {"₹" + props.price}</li>
          {/* <li><span>Delivery:</span> <OrderDrop defDriver={props.delivery} billId={props.id} /></li> */}
        </ol>
      </div>
    </div>
  )
}

export default Orderbox;