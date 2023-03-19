import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import axios from 'axios';
// var parser = require('xml2json-light');
// var parser = require('xml2json');

function Home() {

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

  let getFile = () => {
    document.querySelector('#bill').click();
  };

  let handleBill = () => {
    const [file] = document.querySelector('#bill').files;
    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      var data = reader.result;
      // var json = parser.xml2json(data); // XML2JS-LIGHT
      // var json = parser.toJson(data); // XML2JS
      // console.log(json);

      var parseString = require('xml2js').parseString;
      parseString(data, async (err, result) => {
        let sales = result.BusyData.Sales[0].Sale;
        // console.log(sales);
        sales.forEach(async sale => {
          let randomNum = Math.floor(100000 + Math.random() * 900000);
          let otpNumber = randomNum.toString();

          let vchNo;
          if (sale.VchNo == null || sale.VchNo == undefined) {
            vchNo = "Not Available";
          } else {
            vchNo = sale.VchNo[0];
          }

          let date;
          if (sale.Date == null || sale.Date == undefined) {
            date = "Not Available";
          } else {
            date = sale.Date[0];
          }

          let partyName;
          if (sale.BillingDetails[0].PartyName == null || sale.BillingDetails[0].PartyName == undefined) {
            partyName = "Not Available";
          } else {
            partyName = sale.BillingDetails[0].PartyName[0];
          }

          let mobileNo;
          if (sale.BillingDetails[0].MobileNo == null || sale.BillingDetails[0].MobileNo == undefined) {
            mobileNo = "Not Available";
          } else {
            mobileNo = sale.BillingDetails[0].MobileNo[0];
          }

          let address;
          if (sale.BillingDetails[0].Address1 == null || sale.BillingDetails[0].Address1 == undefined) {
            address = "Not Available";
          } else {
            address = sale.BillingDetails[0].Address1[0];
          }

          let state;
          if (sale.BillingDetails[0].tmpStateName == null || sale.BillingDetails[0].tmpStateName == undefined) {
            state = "Not Available";
          } else {
            state = sale.BillingDetails[0].tmpStateName[0];
          }

          let items;
          if (sale.ItemEntries[0].ItemDetail == null || sale.ItemEntries[0].ItemDetail == undefined) {
            items = "Not Available";
          } else {
            let itemDetail = sale.ItemEntries[0].ItemDetail;
            items = [];

            itemDetail.forEach((item) => {
              let itemObj = {
                Name: item.ItemName,
                Qty: item.Qty,
                Unit: item.UnitName,
                Price: item.tmpNettPrice,
                Amount: item.NettAmount
              }

              items.push(itemObj);
            })
          }

          let totalAmount;
          if (sale.tmpCostOfGoods == null || sale.tmpCostOfGoods == undefined) {
            totalAmount = "Not Available";
          } else {
            totalAmount = sale.tmpCostOfGoods[0];
          }

          let saleItem = {
            VchNo: vchNo,
            Date: date,
            PartyName: partyName,
            MobileNo: mobileNo,
            Address: address,
            State: state,
            Items: items,
            TotalAmount: totalAmount,
            Otp: otpNumber
          }

          console.log(saleItem);
          let response = await axios.post('https://data-api-rktraders.vercel.app/newData', saleItem);
        });
      });

      document.querySelector('#bill').value = "";
    }, false);

    if (file) {
      reader.readAsText(file);
    }
  }

  return (
    <div className='home-con'>
      <Link to="/orders">
        <div>
          Check Orders
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
      <div id='addBill' onClick={getFile}>
        Add Bill
        <input type="file" onChange={handleBill} hidden id="bill" accept='.xml' />
      </div>
    </div>
  )
}

export default Home