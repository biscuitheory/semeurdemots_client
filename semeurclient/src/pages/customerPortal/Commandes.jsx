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
      <h2 className="commandes__container-title">Mes commandes</h2>
      {orders.map((order, i) => (
        <OrderPreview key={i} {...order} />
      ))}
    </div>
  );
};

const OrderPreview = (order) => {
  const { state: authState } = useContext(AuthContext);
  return (
    <section className="commandes__container-order">
      {console.log('nb of products in order ', order)}
      <section className="commandes__container-order-id">
        <div className="commandes__container-ordernumber">
          <h3>
            Numéro de commande&nbsp;:&nbsp;
            {order.id}
          </h3>
        </div>
      </section>
      <section className="commandes__container-order-datetotal">
        <div className="commandes__container-order-datetotal-date">
          <h4>Date de commande</h4>
          <p>{moment(order.createdAt).format('DD/MM/YYYY')}</p>
        </div>
        <div className="commandes__container-order-datetotal-total">
          <h4>TOTAL</h4>
          <p>
            {order.Products[0] &&
              parseFloat(order.Products.price) *
                order.Products[0].OrderProduct.quantity}
            &nbsp;€
          </p>
        </div>
      </section>
      <section className="commandes__container-order-productbox">
        {order.Products.map((order, i) => (
          <ProductPreview key={i} {...order} />
        ))}
      </section>
      <section className="commandes__container-order-address">
        <h3>Facturation et Livraison</h3>
        <div className="commandes__container-order-address-box">
          <span>
            <h4>Adresse de facturation</h4>
            <p>{authState.user.address}</p>
            <p>{authState.user.zipcode}</p>
            <p>{authState.user.city}</p>
            <p>{authState.user.country}</p>
          </span>
          <span>
            <h4>Adresse de livraison</h4>
            <p>{order.shipping_address}</p>
            <p>{order.shipping_zipcode}</p>
            <p>{order.shipping_city}</p>
            <p>{order.shipping_country}</p>
          </span>
        </div>
      </section>
    </section>
  );
};

const ProductPreview = (Products) => {
  return (
    <div className="commandes__container-order-productbox-product">
      <img
        src={Products.image}
        alt="produit commandé"
        className="commandes__container-order-productbox-product-image"
      />
      <span>
        <h4>{Products.name}</h4>
        <p>
          Quantité:&nbsp;
          {Products.OrderProduct.quantity}
        </p>
        <p>
          {Products.price}
          &nbsp;€
        </p>
      </span>
    </div>
  );
};

export default Commandes;
