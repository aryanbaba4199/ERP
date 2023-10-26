// pages/partyLedger.js
import axios from "axios";
import React, { useState, useEffect } from "react";

const PartyLedgerPage = () => {
  const [partyLedgers, setPartyLedgers] = useState([]);
  const [partyName, setPartyName] = useState("");
  const [partyMobile, setPartyMobile] = useState("");
  const [partyBalance, setPartyBalance] = useState("");

  useEffect(() => {
    // Fetch party ledgers data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/accounts/ledgerhandler");
        if (response.status === 200) {
          setPartyLedgers(response.data);
        }
      } catch (error) {
        console.error("Error fetching party ledgers:", error);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []);

  const handleAddPartyLedger = async () => {
    try {
      const newPartyLedger = {
        name: partyName,
        mobile: partyMobile,
        balance: Number(partyBalance),
      };

      const response = await axios.post("/api/accounts/ledgerhandler", newPartyLedger, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Ledger has been created");
        // Clear the form fields
        setPartyName("");
        setPartyMobile("");
        setPartyBalance("");
        
        fetchData();
      } else {
        
        console.error("Failed to add party ledger:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error adding party ledger:", error);
    }
  };

  return (
    <div>
      <h1>Ledgers</h1>
      <ul>
        {partyLedgers.map((partyLedger, index) => (
          <li key={index}>
            <strong>Name:</strong> {partyLedger.name}
            <br />
            <strong>Mobile:</strong> {partyLedger.mobile}
            <br />
            <strong>Balance:</strong> {partyLedger.balance}
          </li>
        ))}
      </ul>
      <form>
        <label>
          Party Name:
          <input
            type="text"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
          />
        </label>
        <label>
          Party Mobile:
          <input
            type="text"
            value={partyMobile}
            onChange={(e) => setPartyMobile(e.target.value)}
          />
        </label>
        <label>
          Party Balance:
          <input
            type="number"
            value={partyBalance}
            onChange={(e) => setPartyBalance(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleAddPartyLedger}>
          Add Party Ledger
        </button>
      </form>
    </div>
  );
};

export default PartyLedgerPage;
