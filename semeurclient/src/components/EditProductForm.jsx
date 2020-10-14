import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validatePostProduct';
import { AuthContext } from '../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const EditProductForm = ({
  id,
  name,
  type,
  price,
  stock,
  description,
  image,
  isOpen,
  onRequestClose,
}) => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const initialState = {
    id: '' ? '' : id,
    name: '' ? '' : name,
    type: '' ? '' : type,
    price: '' ? '' : price,
    stock: '' ? '' : stock,
    description: '' ? '' : description,
    image: '' ? '' : image,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  async function submit() {
    try {
      const res = await axios.patch(
        `${API}products/`,
        {
          id: values.id,
          name: values.name,
          type: values.type,
          price: values.price,
          stock: values.stock,
          description: values.description,
          image: values.image,
        },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      // console.log('res ', res);
      if (res) {
        console.log('Submitted Succesfully');
        console.log(res);
        setRedirect(true);
      }
      throw res;
    } catch (err) {
      console.log('error from details compte', err);
      setValues({
        ...values,
        isSubmitting: false,
        errorMessage: err.message,
      });
    }
  }
  if (redirect) {
    return <Redirect to="/compte-admin/produits" />;
  } else {
    return (
      <div className="addproduct_container">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="addproduct_container-form"
        >
          <div className="addproduct_container-form-id">
            <label htmlFor="product_id">ID du produit</label>
            <input
              type="number"
              name="product_id"
              id="product_id"
              onChange={handleChange}
              value={values.id || ''}
            ></input>
          </div>
          <div className="addproduct_container-form-type">
            {/* <label>ID du produit</label> */}
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={values.name || ''}
              placeholder="Nom du produit"
            ></input>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <div className="addproduct_container-form-type-option">
              {/* <label htmlFor="product_type">Type de produit</label> */}
              <p>Type de produit</p>
              <input
                type="radio"
                name="type"
                id="product_book"
                onChange={handleChange}
                className="addproduct_container-form-type-"
                value="Livre"
              ></input>
              <label htmlFor="type">Livre</label>
            </div>
            <div className="addproduct_container-form-type-option">
              <input
                type="radio"
                name="type"
                id="product_goodie"
                onChange={handleChange}
                value="Produit dérivé"
              ></input>
              <label htmlFor="type">Produit dérivé</label>
            </div>
            {/* {errors.type && <p className="error">{errors.type}</p>} */}
          </div>
          <div>
            <label htmlFor="product_price">Prix</label>
            <input
              type="text"
              name="price"
              id="product_price"
              onChange={handleChange}
              placeholder="Prix"
              value={values.price || ''}
            ></input>
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="product_stock">Stock</label>
            <input
              type="text"
              name="stock"
              id="product_stock"
              onChange={handleChange}
              placeholder="Stock"
              value={values.stock || ''}
            ></input>
            {errors.stock && <p className="error">{errors.stock}</p>}
          </div>
          <div>
            <label htmlFor="product_description">Description</label>
            <input
              type="text"
              name="description"
              id="product_description"
              onChange={handleChange}
              placeholder="Description"
              value={values.description || ''}
            ></input>
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div>
            <label htmlFor="product_image">Image</label>
            <input
              type="text"
              name="image"
              id="product_image"
              onChange={handleChange}
              placeholder="Image"
              value={values.image || ''}
            ></input>
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <button
            type="submit"
            title="close modal"
            onClick={() => setModalIsOpen(false)}
            className="submit-button"
          >
            Enregistrer
          </button>
        </form>
      </div>
    );
  }
};

export default EditProductForm;
