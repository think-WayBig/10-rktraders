import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "./index.css"

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Newbill from "./components/Newbill";
import Archived from "./components/Archived";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/new" element={<Newbill />} />
        <Route path="/archived" element={<Archived />} />
      </Routes>
    </>
  );
}

export default App;
