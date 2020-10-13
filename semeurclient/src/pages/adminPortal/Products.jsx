import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import AddProductForm from '../../components/AddProductForm';
import { useEffect } from 'react';

const API = process.env.REACT_APP_API_URL;

Modal.setAppElement('#root');

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${API}products`);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="adminportal__container-products-container">
      <section className="adminportal__container-products-container-header">
        <h5>Products</h5>
      </section>
      <div className="adminportal__container-products-container-addproduct-container">
        <button type="button" onClick={() => setModalIsOpen(true)}>
          Ajouter un produit
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <button
            type="button"
            className="crossbtn"
            title="close modal"
            onClick={() => setModalIsOpen(false)}
          >
            ✕
          </button>
          <AddProductForm />
        </Modal>
      </div>
      <main className="adminportal__container-products-container-main">
        <table className="adminportal__container-products-container-main-table">
          <thead>
            <tr className="adminportal__container-products-container-main-table-regular">
              <th className="adminportal__container-products-container-main-table-regular">
                Id
              </th>
              <th className="adminportal__container-products-container-main-table-regular">
                Nom
              </th>
              <th className="adminportal__container-products-container-main-table-regular">
                Type
              </th>
              <th className="adminportal__container-products-container-main-table-regular">
                Price
              </th>
              <th className="adminportal__container-products-container-main-table-regular">
                Stock
              </th>
              <th className="adminportal__container-products-container-main-table-email">
                Description
              </th>
              <th className="adminportal__container-products-container-main-table-regular">
                Image
              </th>
            </tr>
          </thead>
          {products.map((product, i) => (
            <ProductTableRow key={i} {...product} />
          ))}
        </table>
      </main>
    </div>
  );
};

const ProductTableRow = ({
  id,
  name,
  type,
  price,
  stock,
  description,
  image,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <tbody>
        <tr className="adminportal__container-customers-container-main-table-regular">
          <td className="adminportal__container-customers-container-main-table-regular">
            {id}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            <button type="button" onClick={() => setModalIsOpen(true)}>
              {name}
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
            >
              <button
                type="button"
                className="crossbtn"
                title="close modal"
                onClick={() => setModalIsOpen(false)}
              >
                ✕
              </button>
              <AddProductForm />
            </Modal>
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {type}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {price}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {stock}
          </td>
          <td className="adminportal__container-customers-container-main-table-email">
            {description}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {image}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Products;
