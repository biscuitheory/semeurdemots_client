import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddProductForm from '../../components/AddProductForm';
import EditProductForm from '../../components/EditProductForm';
import { AuthContext } from '../../contexts/auth';

const API =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

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
        <h2>Répertoire produits</h2>
      </section>
      <div className="adminportal__container-products-container-addproduct-container">
        <button
          type="button"
          className="submit-button"
          onClick={() => setModalIsOpen(true)}
        >
          Ajouter un produit
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="Modal"
          overlayClassName="Overlay"
        >
          <span className="Modal__header">
            <button
              type="button"
              className="cross-button"
              title="close modal"
              onClick={() => setModalIsOpen(false)}
            >
              ✕
            </button>
          </span>
          <AddProductForm
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        </Modal>
      </div>
      <main className="adminportal__container-products-container-main">
        <table className="adminportal__container-products-container-main-table">
          <thead>
            <tr className="adminportal__container-products-container-main-table-regular">
              <th className="adminportal__container-products-container-main-table-small">
                <FontAwesomeIcon icon={faTrashAlt} />
              </th>
              <th className="adminportal__container-products-container-main-table-small">
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
              <th className="adminportal__container-products-container-main-table-large">
                Description
              </th>
              <th className="adminportal__container-products-container-main-table-regular">
                Image
              </th>
            </tr>
          </thead>
          {products
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((product, i) => (
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
  const { state: authState } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const DeleteProduct = async () => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `${API}products/`,
        headers: { Authorization: `Bearer ${authState.token}` },
        data: { id },
      });
      if (res) {
        console.log('Removed Succesfully');
        console.log(res);
      }
    } catch (err) {
      console.log('error from DeleteProduct ', err);
    }
  };
  return (
    <>
      <tbody>
        <tr className="adminportal__container-customers-container-main-table-regular">
          <td className="adminportal__container-customers-container-main-table-small">
            {/* {console.log('erer ', id)} */}
            <button
              onClick={() => DeleteProduct(id)}
              type="submit"
              className="cart__container-products-box-delete"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </td>
          <td className="adminportal__container-customers-container-main-table-small">
            {id}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            <button
              className="edit-item"
              type="button"
              onClick={() => setModalIsOpen(true)}
            >
              {name}
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
              <EditProductForm
                id={id}
                name={name}
                type={type}
                price={price}
                stock={stock}
                description={description}
                image={image}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
              />
            </Modal>
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {type}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {price}
            &nbsp;€
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {stock}
          </td>
          <td className="adminportal__container-customers-container-main-table-large">
            {description}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            <img src={image} alt="produit poisson rouge" />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Products;
