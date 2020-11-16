import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { AuthContext } from '../../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const Commandes = () => {
  const [orders, setOrders] = useState([]);
  const { state: authState } = useContext(AuthContext);

  console.log('gigi ', authState.user.id);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(`${API}customerorders`, {
          // user_id: authState.user.id,
          userId: authState.user.id,
        });
        if (res) {
          // console.log('gogo ', res.data);
          setOrders(res.data);
        }
      } catch (err) {
        console.log('error from Commandes Page', err);
      }
    };
    fetchOrders();
  }, []);

  if (orders <= 0) {
    return (
      <div className="commandes__container">
        <h2 className="commandes__container-title">Mes commandes</h2>
        <section>
          <div>
            <h3>Vous n&apos;avez pas encore passé de commandes 😢</h3>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="commandes__container">
      {console.log('nb of orders ', orders)}
      {console.log('nb of products in order ', orders[0].Products)}
      <h2 className="commandes__container-title">Mes commandes</h2>
      <section>
        <div className="commandes__container-ordernumber">
          <h3>
            Numéro de commande&nbsp;:&nbsp;
            {orders[0].id}
          </h3>
          <p>Voir la commande</p>
        </div>
      </section>
      <section>
        <div className="commandes__container-date">
          <h4>Date de commande</h4>
          <p>{moment(orders[0].createdAt).format('DD/MM/YYYY')}</p>
        </div>
        <div className="commandes__container-total">
          <h4>Total</h4>
          <p>
            {orders[0].Products[0].price *
              orders[0].Products[0].OrderProduct.quantity}
            &nbsp;€
          </p>
        </div>
      </section>
      <section>
        {orders[0].Products.map((order, i) => (
          <ProductPreview key={i} {...order} />
        ))}
      </section>
    </div>
  );
};

const ProductPreview = ( Products ) => {
  return (
    <div className="commandes__container-product">
      <img
        src={Products.image}
        alt="produit commandé"
        className="commandes__container-product-image"
      />
      <p>{Products.name}</p>
    </div>
  );
};

export default Commandes;
