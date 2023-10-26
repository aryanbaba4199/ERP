import React, { useEffect, useState } from "react";
import axios from "axios";
import DSR from "../DSR";

export default function DSRSalesForm() {
  const [formData, setFormData] = useState({
    date: "",
    memo: "",
    partyName: "",
    description: "",
    vehNumber: "",
    product: "",
    qty: "",
    rate: "",
    amount: 0, 
  });
  const [entries, setEntries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [ledgersname, setLedgersName] = useState([]);
  const [userSelectPN, setUserSelectPN] = useState("");  // Storing user selected party name


  //_________Getting Ledgers from DBMS ________
  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const res = await axios.get("/api/accounts/ledgerhandler");
        if (res.status === 200) {
          const names = res.data.map((ledger) => ledger.name);
          setLedgersName(names);
        } else {
          console.log(res.status);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLedgers();
  }, []);



  // ____________Handling Input Changes ____________
  const handleInputChange = (field, value) => {
    const updatedFormData = { ...formData };

    if (field === "partyName") {
      const input = value.toLowerCase();
      const filteredSuggestions = ledgersname.filter((name) =>
        name.toLowerCase().startsWith(input)
      );
      setSuggestions(filteredSuggestions);
    }

    updatedFormData[field] = value;
    setFormData(updatedFormData);
  };

  // ____________Updating Amount ____________
  useEffect(() => {
    const rate = Number(formData.rate);
    const qty = Number(formData.qty);
  
    if (!isNaN(rate) && !isNaN(qty)) {
      setFormData((prevData) => ({
        ...prevData,
        amount: rate * qty,
      }));
    }
  }, [formData.rate, formData.qty]);

  // ___________Suggestions for Ledgers________
  const handleSuggestionClick = (suggestion) => {
    setUserSelectPN(suggestion);                  // setting user selected party name
    setFormData((prevData) => ({
      ...prevData,
      partyName: suggestion,
    }));
    setSuggestions([]);
  };

  // _____________Clearing form data___________
  const clearFormData = () => {
    setFormData({
      date: "",
      memo: "",
      partyName: "",
      description: "",
      vehNumber: "",
      product: "",
      qty: "",
      rate: "",
      amount: 0,
    });
  };



  // _____________Handling Submit_______________
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/dsr/creditData", formData, {   // Updating Sales Entry
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        console.log("Entry saved successfully");
        clearFormData();
      } else {
        console.log("Error in response");
      }
      const partLedgerresponse = await axios.post(`/api/accounts/ledgerhandler?partyname=${userSelectPN}`,
        
      );
    } 
    catch (e) {
      console.error("Error in trying to save the entry", e);
    }
  };
  

  return (
    <>
      <DSR />
      <div>
        <h2>Enter Sales Details</h2>
        <div>
          <input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
          <input
            type="text"
            placeholder="Memo"
            value={formData.memo}
            onChange={(e) => handleInputChange("memo", e.target.value)}
          />
          <input
            type="text"
            placeholder="Party Name"
            value={formData.partyName}
            onChange={(e) => handleInputChange("partyName", e.target.value)}
          />
          <ul className="suggestions">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <input
            type="text"
            placeholder="Vehicle Number"
            value={formData.vehNumber}
            onChange={(e) => handleInputChange("vehNumber", e.target.value)}
          />
          <input
            type="text"
            placeholder="Product"
            value={formData.product}
            onChange={(e) => handleInputChange("product", e.target.value)}
          />
          <input
            type="number"
            placeholder="Qty"
            value={formData.qty}
            onChange={(e) => handleInputChange("qty", e.target.value)}
          />
          <input
            type="number"
            placeholder="Rate"
            value={formData.rate}
            onChange={(e) => handleInputChange("rate", e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={formData.amount}
            readOnly // Make the amount field read-only
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <h2>Entries</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {Object.entries(entry).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
