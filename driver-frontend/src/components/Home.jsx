import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import axios from 'axios';

function Home() {

  let handleLogout = () => {
    let option = prompt("Enter 'Y' for yes and 'N' for no")

    if (option == 'y' || option == 'Y') {
      localStorage.removeItem('rkid');
      localStorage.removeItem('rkpass');
      window.location.reload();
    } else {
      window.location.reload();
    }
  }

  let [vouchersPending, setVouchersPending] = useState([]);
  let [vouchersArchived, setVouchersArchived] = useState([]);

  async function getAllVouchers() {
    let response = await axios.get('https://data-api-rktraders.vercel.app/allVouchers')
    let allVouchers = response.data;
    setVouchersPending(allVouchers.filter(voucher => {
      if (voucher.DeliveryStatus == "pending") {
        return voucher;
      }
    }));

    setVouchersArchived(allVouchers.filter(voucher => {
      if (voucher.DeliveryStatus == "success") {
        return voucher;
      }
    }));
  }

  useEffect(() => {
    getAllVouchers();
  }, [])

  return (
    <div className='home-con'>
      <Link to="/orders">
        <div>
          Pending Orders
          <span>Current: {vouchersPending.length}</span>
        </div>
      </Link>
      {/* <Link to="/new">
        <div>
          Generate Bill
        </div>
      </Link> */}
      <Link to="/archived">
        <div>
          Archived Orders
          <span>Fulfilled: {vouchersArchived.length}</span>
        </div>
      </Link>
      <Link onClick={handleLogout} to="/">
        <div>
          Log Out
        </div>
      </Link>
    </div>
  )
}

export default Home