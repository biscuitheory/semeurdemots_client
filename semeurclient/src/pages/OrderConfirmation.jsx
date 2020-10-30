import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const OrderConfirmation = () => {

    // FAIRE UN PATCH ORDER STATUS 2
//   const [order, setOrder] = useState([]);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const res = await axios.post(`${API}orders`, { localStorage });
//       setOrder(res.data);
//     };
//     fetchOrder();
//   }, []);

  return (
    <div className="orderconfirmation__container">
      <h2>Merci pour votre achat !</h2>
  {/* <p>Order Référence : {id}</p> */}
    </div>
  );
};

export default OrderConfirmation;
