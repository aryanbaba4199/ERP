"use client";
import Link from "next/link";


import React, { useState } from "react";

const Firmdetails = () => {
  // Initialize selectedbrand with an empty string and a function to update it.
  const [selectedbrand, setSelectedbrand] = useState("");
  const [firmname, setfirmname] = useState("");
  

  // ______________Handling Updates______________________
  const handleBrandChange = (event) => {
    setSelectedbrand(event.target.value);
  };
  const handleEmailChange = (event) => {
    setUserName(event.target.value);
  };
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setUserName(event.target.value);
  };

  const brands = ["IOCL", "BPCL", "HPCL", "NAYARA", "JIO"];

  return (
    <div className="firm-details-container">

      <div className="firm-brand">
        <h3>Select Brand:</h3>
        {brands.map((brand) => (
          <div key={brand}>
            <input
              type="radio"
              id={brand}
              name="brand"
              value={brand}
              checked={selectedbrand === brand}
              onChange={handleBrandChange}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}
        
      </div>

      <div className="firm-name">
        <h3>Enter Your Email ID :</h3>
        <input
          type="text"
          value={firmname}
          onChange={handleEmailChange}
          placeholder="Enter Firm Name"
        />
      </div>
      <div className="firm-name">
        <h3>Enter Password:</h3>
        <input
          type="text"
          value={firmname}
          onChange={handleNameChange}
          placeholder="Enter Firm Name"
        />
      </div>
      <div className="firm-name">
        <h3>Enter Firm Name:</h3>
        <input
          type="text"
          value={firmname}
          onChange={handlePasswordChange}
          placeholder="Enter Firm Name"
        />
      </div>
      
      <Link href="/firm-details/accounts/products">
      <button>Add Products</button>

      </Link>
      <Link href = "/firm-details/accounts/ledgers" >
      <button>Add Ledgers</button>
      </Link>
      <Link href = "/firm-details/accounts/totalizer" >
      <button>Create Totalizers</button>
      </Link>
      

    </div>
  );
};

export default Firmdetails;
