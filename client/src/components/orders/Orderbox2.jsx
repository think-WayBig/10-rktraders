import React, { useState, useEffect } from 'react';
import "./Orderbox.css";
import OrderDrop from "./OrderDrop.jsx";
import Items from "./Items";
import axios from "axios";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Orderbox(props) {
  let [popState, setPopState] = useState(false);
  let handleDeleteBills = () => {
    setPopState(true);
  };

  function AlertDialog() {
    const [open, setOpen] = useState(popState);

    const handleClose = () => {
      setPopState(false);
    };

    const handleOk = async () => {
      await axios.delete("https://data-api-rktraders.vercel.app/deleteVoucher", {
        data: {
          id: props.id
        }
      });
      window.location.reload();
    }

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Would you like to delete Voucher ${props.id} in the App?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <li><span><b>Party Name: </b></span> {props.name}</li>
            <li><span><b>Mobile No: </b></span> {props.mobile}</li>
            <li><span><b>Address: </b></span> {props.address}</li>
            {/* <li><span><b>Item Details: </b></span><pre>{props.item}</pre></li> */}
            <li><span><b>Price: </b></span> {"₹" + props.price}</li>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
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
          {/* <li><span>Item Details:</span><pre>{props.item}</pre></li> */}
          <li><span>Price:</span> {"₹" + props.price}</li>
          {/* <li><span>Delivery:</span> <OrderDrop defDriver={props.delivery} billId={props.id} /></li> */}
        </ol>
        <button onClick={handleDeleteBills} className='delBtn'>Delete</button>
      </div>
      <AlertDialog />
    </div>
  )
}

export default Orderbox;