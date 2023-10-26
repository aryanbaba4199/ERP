"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const PetrolPumpApp = () => {
  const [products, setProducts] = useState([]); // Initialize as an array
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() =>{
    const fetchproducts = async () =>{
      try{
        const response = await axios.get("/api/accounts/productdata");
        if (response.status===200){
          setProducts(response.data);
          toast.success("Product updated successfully")
        }
        else{
          toast.error("Response is not OK");
          console.log("Response is not OK");
        }
      }catch(err){
        console.log("Error occured");
        toast.error("Error occured");
      }
    };
    fetchproducts();
  },[]);

  const handleAddProduct = async() => {
    try{
      const newProduct = {
        Product: productName,
        Des: productDescription, 
        stock: Number(productStock),
        Rate: rate, 
      };
      const response = await axios.post("/api/accounts/productdata", newProduct,{
        headers : {
          "Content-Type": "application/json",
        },
      });
      if(response.status===201){
        toast.success("Product added successfully");
        console.log("Product added successfully");
        setProductName("");
        setProductDescription("");
        setProductStock("");
        setRate("");
        fetchproducts();
      }
      else{
        console.log("Product creation failed");
        toast.error("Product creation failed");
      }

    }
    catch(err){
      console.log("Product creation failed");
      toast.error("Product creation failed");
    }
  };

  return (
    <div className="product-container">
      <h1>Petrol Pump Operator App</h1>
      <form>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Product Description:
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <label>
          Product Stock:
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />
        </label>
        <label>
          Product Rate:
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)} // Use the correct setter
          />
        </label>
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>Name:</strong> {product.name}
            <br />
            <strong>Description:</strong> {product.description}
            <br />
            <strong>Stock:</strong> {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetrolPumpApp;
