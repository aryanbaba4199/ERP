import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function DSR() {
  const [sales, setsales] = useState([]);
  const [date, setdate] = useState(new Date().toISOString().split("T")[0]);

  

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const res = await axios.get(`/api/dsr/creditData?date=${date}`);
        if ((res.status = 200)) {
          setsales(res.data);
        } else console.log(res.status);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSalesData();
    const intervalId = setInterval(fetchSalesData, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [date]);

  //_____________Delete Sales Entry________
  const deleteSale = async(diD) => {
    console.log(diD);
    try{
      const res = await axios.delete(`/api/dsr/creditData?id=${diD}`);
      if (res.status===200){
        console.log("Sales deleted successfully");
      }
      else{
        console.log(res.status);
      }
    }catch (e) {
      console.log("Error",e);
    }
  };
  
  const changeDate = () => {
    const userDate = document.getElementById("datePicker").value;
    setdate(userDate);
  };


  return (
    <>
      <Link href="/dsr/dsrpages/sales">
        <button className="btn">Sales</button>
      </Link>
      <div>
        <h2>Sales Data</h2>
        <h5> Date : {date}</h5>
        <input
          type="date"
          id="datePicker"
        />
        <button onClick={changeDate}>Update</button>
        <table>
          <thead>
            <tr>
              <th>Memo</th>
              <th>Party Name</th>
              <th>Detail</th>
              <th>Vehicle No.</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.memo}</td>
                <td>{sale.partyName}</td>
                <td>{sale.description}</td>
                <td>{sale.vehNumber}</td>
                <td>{sale.product}</td>
                <td>{sale.qty}</td>
                <td>{sale.rate}</td>
                <td>{sale.amount}</td>
                <img
                src="https://cdn-icons-png.flaticon.com/256/1828/1828939.png"
                width='30'
                height='30'
                onClick={() =>deleteSale(sale._id)}
                diD = {sale._id}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
