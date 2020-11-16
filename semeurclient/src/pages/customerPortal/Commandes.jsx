import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const Commandes = () => {
  const [orders, setOrders] = useState([]);
  const { state: authState } = useContext(AuthContext);

  // console.log('gigi ', authState.user.id);

  // const fetchOrders = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${API}customerorders`,
  //       {
  //         user_id: authState.user.id,
  //       },
  //       { headers: { Authorization: `Bearer ${authState.token}` } }
  //     );
  //     if (res) {
  //       setOrders(res.data);
  //     }
  //   } catch (err) {
  //     console.log('error from Commandes page', err);
  //   }
  // };

  console.log('gigi ', authState.user.id);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(`${API}customerorders`, {
          // user_id: authState.user.id,
          userId: authState.user.id,
        });
        if (res) {
          console.log('gogo ', res.data);
          setOrders(res.data);
        }
      } catch (err) {
        console.log('error from Commandes Page', err);
      }
    };
    fetchOrders();
  }, []);
  // }, [orders]);

  if (orders <= 0) {
    return (
      <div className="commandes__container">
        {console.log('ehwe ', orders)}
        <h2 className="commandes__container-title">Mes commandes</h2>
        <section>
          <div>
            <h3>Vous n'avez pas encore passé de commandes 😢</h3>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="commandes__container">
      {console.log('ehwe ', orders)}
      <h2 className="commandes__container-title">Mes commandes</h2>
      <section>
        <div>
          <h3>
            Numéro de commande:
            {}
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Commandes;
