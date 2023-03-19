import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "./index.css"

import drivers from "./pass";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Newbill from "./components/Newbill";
import Archived from "./components/Archived";

function App() {

  if (localStorage.getItem("rkid") != undefined && localStorage.getItem("rkpass") != undefined) {
    for (let i = 0; i < drivers.length; i++) {
      if (localStorage.getItem("rkid") == drivers[i].username) {
        if (localStorage.getItem("rkpass") == drivers[i].password) {
          return (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/archived" element={<Archived />} />
              </Routes>
            </>
          );
        }
      }
    }
  }

  let user = prompt("Enter your username");

  for (let i = 0; i < drivers.length; i++) {
    if (user == drivers[i].username) {
      let password = prompt("Enter your password");
      if (password == drivers[i].password) {
        localStorage.setItem("rkid", drivers[i].username);
        localStorage.setItem("rkpass", drivers[i].password);
        return (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/archived" element={<Archived />} />
            </Routes>
          </>
        );
      } else {
        alert("Invalid Password!!");
        return (
          <div className='invalid'>
            <h1>Refresh this page and try again!!</h1>
            <button onClick={() => { window.location.reload() }}>Refresh</button>
          </div>
        )
      }
    }
  }

  alert("Invalid Username!!");
  return (
    <div className='invalid'>
      <h1>Refresh this page and try again!!</h1>
      <button onClick={() => { window.location.reload() }}>Refresh</button>
    </div>
  )
}

export default App;
