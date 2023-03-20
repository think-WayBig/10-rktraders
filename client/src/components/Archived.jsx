import React, { useEffect, useState, useRef } from 'react';
import Orderbox from "./orders/Orderbox"
import "./Orders.css";
import axios from 'axios';

function Archived() {

  let [vouchers, setVouchers] = useState([]);
  let [vouchersFilter, setVouchersFilter] = useState([]);

  async function getAllVouchers() {
    let response = await axios.get('https://data-api-rktraders.vercel.app/allVouchers')
    let allVouchers = response.data;
    setVouchers(allVouchers.filter(voucher => {
      if (voucher.DeliveryStatus == "success") {
        return voucher;
      }
    }));
    setVouchersFilter(allVouchers.filter(voucher => {
      if (voucher.DeliveryStatus == "success") {
        return voucher;
      }
    }));
  }

  function removeActive() {
    document.querySelector('.active').classList.remove("active");
  }

  let dateRef = useRef();

  let handleAll = (e) => {
    removeActive();
    e.target.classList.add("active");
    setVouchers(vouchersFilter);
    dateRef.current.value = null
  };

  let handleToday = (e) => {
    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();
    let date = month + "-" + day + "-" + year;

    removeActive();
    e.target.classList.add("active");

    let setDate = year + "-" + month + "-" + day;
    dateRef.current.value = setDate;

    setVouchers(vouchersFilter.filter(voucher => {
      if (voucher.Date == date) {
        return voucher;
      }
    }));
  };

  let handleYesterday = (e) => {
    let objectDate = new Date();
    let day = objectDate.getDate() - 1;
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();
    let date = month + "-" + day + "-" + year;
    removeActive();
    e.target.classList.add("active");
    setVouchers(vouchersFilter.filter(voucher => {
      if (voucher.Date == date) {
        return voucher;
      }
    }));
  };

  let handleOlder = (e) => {
    removeActive();
    e.target.classList.add("active");
    let dateStr = dateRef.current.value;
    const dateArr = dateStr.split('-');
    const formattedDate = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    setVouchers(vouchersFilter.filter(voucher => {
      if (voucher.Date == formattedDate) {
        return voucher;
      }
    }));
  };

  let handleSorting = (e) => {
    removeActive();
    if (e.target.classList[0] == "active") {
      e.target.classList.remove("active");
    } else {
      e.target.classList.add("active");
    }

    setVouchers(vouchersFilter.sort((a, b) => {
      return new Date(a.Date) - new Date(b.Date);
    }));
  };

  useEffect(() => {
    getAllVouchers();
  }, [])

  return (
    <>
      <nav className='filters'>
        <div>
          <button className='active' onClick={handleAll}>All</button>
          <button onClick={handleToday}>Today</button>
          <button onClick={handleYesterday}>Yesterday</button>
          {/* <button onClick={handleOlder}>Older</button> */}
          <input onChange={handleOlder} ref={dateRef} type="date" />
          <button onClick={handleSorting}>Sort by Date &nbsp;<i style={{ opacity: "0.8" }} className="fa fa-arrow-up"></i></button>
        </div>
      </nav>
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
            remarks={voucher.Remarks}
          />)
        })}
      </div>
    </>
  )
}

export default Archived