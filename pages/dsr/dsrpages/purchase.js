import React, { useState, useEffect } from "react";
import DSR from "../DSR";

export default function DataCollectionPage() {
  const [formData, setFormData] = useState({
    date : "",
    memo: "",
    partyName: "",
    description: "",
    vehNumber: "",
    product: "",
    qty: "",
    rate: "",
    amount: "",
  });
  const [entries, setEntries] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date
    setFormData((prevData) => ({
      ...prevData,
      date: currentDate,
    }));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddEntry = () => {
    // Add the current data to the entries list
    setEntries((prevEntries) => [...prevEntries, formData]);
    
    // Clear the form
    setFormData({
      memo: "",
      date : "",
      partyName: "",
      description: "",
      vehNumber: "",
      product: "",
      qty: "",
      rate: "",
      amount: "",
    });
    
    // Show the entry form
    setShowEntryForm(true);
  };

  const handleSubmit = () => {
    // You can send the entries data to your backend here
    console.log("Sending data to the backend:", entries);
  };

  return (
    <>
    <DSR/>
    <div>
      <h2>Enter Purchase Details</h2>
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
          type="text"
          placeholder="Qty"
          value={formData.qty}
          onChange={(e) => handleInputChange("qty", e.target.value)}
        />
        <input
          type="text"
          placeholder="Rate"
          value={formData.rate}
          onChange={(e) => handleInputChange("rate", e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => handleInputChange("amount", e.target.value)}
        />
        {showEntryForm ? (
          <div>
            <button onClick={handleSubmit}>Submit</button>
            <button
              onClick={() => {
                // Clear the form and hide the entry form
                setFormData({
                  memo: "",
                  partyName: "",
                  description: "",
                  vehNumber: "",
                  product: "",
                  qty: "",
                  rate: "",
                  amount: "",
                });
                setShowEntryForm(false);
              }}
            >
              Add More
            </button>
          </div>
        ) : (
          <button onClick={handleAddEntry}>Submit</button>
        )}
      </div>
      <h2>Entries</h2>
      {entries.map((entry, index) => (
        <div key={index}>
          <p>Entry {index + 1}:</p>
          <ul>
            {Object.entries(entry).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </>
  );
}
