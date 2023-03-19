import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div className='navbar'>
        <h2>RK Traders</h2>
        <div>
          <Link to="/"><i className='fa fa-home' />Homepage</Link>
          <Link to="/orders"><i className='fa fa-clock-o' />Order Status</Link>
          {/* <Link to="/new"><i className='fa fa-file-text-o' />Add Bill</Link> */}
          <Link to="/archived"><i className='fa fa-archive' />Archived</Link>
        </div>
        <div></div>
      </div>
      <div className='nav-mobile'>
        <div><Link to="/"><i className='fa fa-home' />Home</Link></div>
        <div><Link to="/orders"><i className='fa fa-clock-o' />Status</Link></div>
        {/* <div><Link to="/new"><i className='fa fa-file-text-o' />Add Bill</Link></div> */}
        <div><Link to="/archived"><i className='fa fa-archive' />Archive</Link></div>
      </div>
    </>
  )
}

export default Navbar