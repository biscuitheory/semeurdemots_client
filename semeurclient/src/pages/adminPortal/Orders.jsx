import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const API = process.env.REACT_APP_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${API}allorders`);
      setOrders(res.data);
      console.log('from orders ', res.data);
      console.log('from orders biiiz', res.data[0].Status);
    };
    fetchOrders();
  }, []);

  return (
    <div className="adminportal__container-customers-container">
      <section className="adminportal__container-customers-container-header">
        <h2>Commandes</h2>
      </section>
      <main className="adminportal__container-customers-container-main">
        <table className="adminportal__container-customers-container-main-table">
          <thead>
            <tr className="adminportal__container-customers-container-main-table-regular">
              <th className="adminportal__container-customers-container-main-table-regular">
                Commande
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Date
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                État
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Total
              </th>
            </tr>
          </thead>
          {/* {orders.map((order, i) => (
            <OrderTableRow key={i} {...order} />
          ))} */}
          {orders.map((order, i) => (
            <OrderTableRow key={i} order={order} />
          ))}
          {/* {orders.map((order, i) =>
            order.Status.map((Status) => (
              <OrderTableRow key={i} {...order} {...Status} />
            ))
          )} */}
        </table>
      </main>
    </div>
  );
};

const OrderTableRow = ({ order }) => {
  console.log('wewe ', order.User);
  return (
    <>
      <tbody>
        <tr className="adminportal__container-customers-container-main-table-regular">
          <td className="adminportal__container-customers-container-main-table-regular">
            {order.id}
            {/* {order.User.firstname} */}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {moment(order.updatedAt).format('DD/MM/YYYY')}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {/* {order.status_id} */}
            {order.Status.name}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {order.total_price}
          </td>
        </tr>
      </tbody>
    </>
  );
};

const OrderStatus = (Status) => {
  return <div>{Status.name}</div>;
};

export default Orders;
