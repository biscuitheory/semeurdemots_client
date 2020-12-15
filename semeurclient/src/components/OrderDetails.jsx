import React from 'react';
import axios from 'axios';

const OrderDetails = ({ order, setModalIsOpen }) => {
  return (
    <div className="orderdetails__container">
      <form
        // onSubmit={handleSubmit}
        noValidate
        className="orderdetails__container-form"
      >
        <div className="orderdetails__container-form-header">
          <p>
            Commande N°
            {order.id}
          </p>
          <p>{order.Status.name}</p>
        </div>
        <div className="orderdetails__container-form-details">
          <div className="orderdetails__container-form-details-billing">
            <h2>Détails de facturation</h2>
            <span>
              &nbsp;
              {order.User.lastname}
              &nbsp;
              {order.User.firstname}
              &nbsp;
              {order.User.address}
              &nbsp;
              {order.User.zipcode}
              &nbsp;
              {order.User.city}
              &nbsp;
              {order.User.country}
            </span>
            <p>
              Email &nbsp;
              {order.User.email}
            </p>
            <p>
              Téléphone &nbsp;
              {order.User.phone}
            </p>
            <p>
              Paiement via &nbsp;
              {order.payment}
            </p>
          </div>
          <div className="orderdetails__container-form-details-shipping">
            <h2>Détails de livraison</h2>
            <span>
              &nbsp;
              {order.shipping_lastname}
              &nbsp;
              {order.shipping_firstname}
              &nbsp;
              {order.shipping_address}
              &nbsp;
              {order.shipping_zipcode}
              &nbsp;
              {order.shipping_city}
              &nbsp;
              {order.shipping_country}
            </span>
            <p>Méthode de livraison &nbsp; Forfait</p>
          </div>
        </div>
        <div>
          <table className="adminportal__container-customers-container-main-table">
            <thead>
              <tr className="adminportal__container-customers-container-main-table-regular">
                <th className="adminportal__container-customers-container-main-table-regular">
                  Produit
                </th>
                <th className="adminportal__container-customers-container-main-table-regular">
                  Quantité
                </th>
                <th className="adminportal__container-customers-container-main-table-regular">
                  TVA
                </th>
                <th className="adminportal__container-customers-container-main-table-regular">
                  Total
                </th>
              </tr>
            </thead>
            {order.Products.map((order, i) => (
              <OrderDetailTableRow key={i} {...order} />
            ))}
          </table>
        </div>
      </form>
    </div>
  );
};

const OrderDetailTableRow = (Products) => {
  return (
    <>
      <tbody>
        <tr className="adminportal__container-customers-container-main-table-regular">
          <td className="adminportal__container-customers-container-main-table-regular">
            {Products.name}
          </td>
          <td className="adminportal__container-customers-container-main-table-small">
            {Products.OrderProduct.quantity}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            &nbsp;
            {Products.price * 0.2}
            &nbsp;€
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {Products.price * Products.OrderProduct.quantity}
            &nbsp;€
          </td>
        </tr>
      </tbody>
    </>
  );
};
export default OrderDetails;
