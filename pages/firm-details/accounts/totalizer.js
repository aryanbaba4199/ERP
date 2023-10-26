"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const TotalizerReadingPage = () => {
  const [totalizerReadings, setTotalizerReadings] = useState([]);
  const [totalizerName, setTotalizerName] = useState("");
  const [totalizerReading, setTotalizerReading] = useState("");

  useEffect(() =>{
    const fetchTotalizer = async() =>{
      try{
        const response = await axios.get("/api/accounts/totalizerdata");
        if(response.status===200){
          setTotalizerReadings(response.data);
          toast.success("Totalizer Updated");
        }else{
          toast.error("Totalizer Reading failed");
          console.log("Totalizer Reading failed");
        }
      }catch(error){
        console.log("Totalizer Reading failed in catch");
      }
    };
    fetchTotalizer();
  },[]);

  const handleAddTotalizerReading = async () => {
    try {
      const newTotalizerReading = {
        Meter_Name: totalizerName,
        Reading: Number(totalizerReading),
      };
      const response = await axios.post("/api/accounts/totalizerdata", newTotalizerReading, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.status === 201) {
        fetchTotalizer();
        toast.success("Totalizer Created Successfully");
        console.log("Totalizer created Successfully");
        setTotalizerName("");
        setTotalizerReading("");
      } else {
        console.log("Totalizer creation Failed");
        toast.error("Totalizer creation Failed");
      }
    } catch (err) {
      console.log("Catch: Totalizer creation Failed");
      toast.error("Catch: Totalizer creation Failed");
    }
  };

  return (
    <div>
      <h1>Totalizer Reading Page</h1>
      <form>
        <label>
          Totalizer Name:
          <input
            type="text"
            value={totalizerName}
            onChange={(e) => setTotalizerName(e.target.value)}
          />
        </label>
        <label>
          Totalizer Reading:
          <input
            type="number"
            value={totalizerReading}
            onChange={(e) => setTotalizerReading(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleAddTotalizerReading}>
          Add Totalizer Reading
        </button>
      </form>
      <ul>
        {totalizerReadings.map((totalizerReading, index) => (
          <li key={index}>
            <strong>Name:</strong> {totalizerReading.Meter_Name}
            <br />
            <strong>Reading:</strong> {totalizerReading.Reading}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalizerReadingPage;
