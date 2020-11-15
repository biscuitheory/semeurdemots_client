import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const Commandes = () => {
  const [orders, setOrders] = useState([]);
  const { state: authState } = useContext(AuthContext);
  console.log('keke ', authState);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${API}customerorder`, {
        user_id: authState.user.id,
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="commandes__container">
      {console.log('ehwe ', orders)}
      <h2 className="commandes__container-title">Commandes</h2>
      <p>hello people it's the commandes page</p>
    </div>
  );
};

export default Commandes;
