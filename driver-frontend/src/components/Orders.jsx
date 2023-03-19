import React, { useEffect, useState } from 'react';
import Orderbox from "./orders/Orderbox2"
import "./Orders.css";
import axios from 'axios';

function Orders() {

  let [vouchers, setVouchers] = useState([]);

  async function getAllVouchers() {
    let response = await axios.get('https://data-api-rktraders.vercel.app/allVouchers')
    let allVouchers = response.data;
    setVouchers(allVouchers.filter(voucher => {
      if (voucher.DeliveryStatus == "pending") {
        return voucher;
      }
    }));
  }

  useEffect(() => {
    getAllVouchers();
  }, [])

  return (
    <>
      <div className='orders-con'>
        {vouchers.map(voucher => {
          return (<Orderbox
            key={voucher.VchNo}
            date={voucher.Date}
            id={voucher.VchNo}
            name={voucher.PartyName}
            item={voucher.Items}
            mobile={voucher.MobileNo}
            address={voucher.Address}
            state={voucher.State}
            price={voucher.TotalAmount}
            delivery={voucher.Driver}
            otpCode={voucher.Otp}
          />)
        })}
      </div>
    </>
  )
}

export default Orders