import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${API}allorders`);
      setOrders(res.data);
      console.log('from orders ', res.data);
    };
    fetchOrders();
  }, []);
  
  return (
    <>
      <p>Editer les commandes</p>
    </>
  );
};

export default Orders;
