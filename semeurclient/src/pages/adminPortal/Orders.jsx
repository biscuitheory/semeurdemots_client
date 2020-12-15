import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';

import OrderDetails from '../../components/OrderDetails';

const API = process.env.REACT_APP_API_URL;

Modal.setAppElement('#root');

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log('wewe ', order.User);
  return (
    <>
      <tbody>
        <tr className="adminportal__container-customers-container-main-table-regular">
          <td className="adminportal__container-customers-container-main-table-regular">
            <button
              className="edit-item"
              type="button"
              onClick={() => setModalIsOpen(true)}
            >
              &nbsp;#
              {order.id}
              &nbsp;
              {order.User.lastname}
              &nbsp;
              {order.User.firstname}
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              className="Modal"
              overlayClassName="Overlay"
            >
              <button
                type="button"
                className="cross-button"
                title="close modal"
                onClick={() => setModalIsOpen(false)}
              >
                ✕
              </button>
              <OrderDetails
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
              />
            </Modal>
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {moment(order.updatedAt).format('DD/MM/YYYY')}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {order.Status.name}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {order.total_price}
            &nbsp;€
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
