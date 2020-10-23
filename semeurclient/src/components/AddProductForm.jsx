import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validatePostProduct';
import { AuthContext } from '../contexts/auth';
import { useEffect } from 'react';

const API = process.env.REACT_APP_API_URL;

const AddProductForm = ({modalIsOpen, setModalIsOpen}) => {
  const { state: authState } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  
  const initialState = {
    // id: '',
    name: '',
    type: '',
    price: '',
    stock: '',
    description: '',
    image: '',
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  // console.log('res ', values);

  async function submit() {
    try {
      const res = await axios.post(
        `${API}products/`,
        {
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
        setModalIsOpen(false)
        // setRedirect(true);
      }
      // throw res;
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
      <div className="addproduct__container">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="addproduct__container-form"
        >
          {/* <div className="addproduct_container-form-id">
          <label htmlFor="product_id">ID du produit</label>
          <input
            type="number"
            name="product_id"
            id="product_id"
            onChange={handleChange}
            placeholder="ID du produit"
          ></input>
        </div> */}
          <div className="addproduct__container-form-name">
            {/* <label>ID du produit</label> */}
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={values.name}
              placeholder="Nom du produit"
            ></input>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="addproduct__container-form-type">
            <span className="addproduct__container-form-type-title">
              <p>Type de produit</p>
            </span>
            <div className="addproduct__container-form-type-options">
            <div className="addproduct__container-form-type-option">
              {/* <label htmlFor="product_type">Type de produit</label> */}
              <input
                type="radio"
                name="type"
                id="product_book"
                onChange={handleChange}
                value="Livre"
              ></input>
              <label htmlFor="type">Livre</label>
            </div>
            <div className="addproduct__container-form-type-option">
              <input
                type="radio"
                name="type"
                id="product_goodie"
                onChange={handleChange}
                value="Produit dérivé"
              ></input>
              <label htmlFor="type">Produit dérivé</label>
            </div>
            </div>
            {/* {errors.type && <p className="error">{errors.type}</p>} */}
          </div>
          <div className="addproduct__container-form-price">
            <label htmlFor="product_price">Prix</label>
            <input
              type="text"
              name="price"
              id="product_price"
              onChange={handleChange}
              placeholder="Prix"
              value={values.price}
            ></input>
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div className="addproduct__container-form-stock">
            <label htmlFor="product_stock">Stock</label>
            <input
              type="text"
              name="stock"
              id="product_stock"
              onChange={handleChange}
              placeholder="Stock"
              value={values.stock}
            ></input>
            {errors.stock && <p className="error">{errors.stock}</p>}
          </div>
          <div className="addproduct__container-form-description">
            <label htmlFor="product_description">Description</label>
            <textarea
              type="text"
              rows="10"
              cols="30"
              name="description"
              id="product_description"
              onChange={handleChange}
              placeholder="Description"
              value={values.description}
            ></textarea>
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className="addproduct__container-form-image">
            <label htmlFor="product_image">Image URL</label>
            <input
              type="text"
              name="image"
              id="product_image"
              onChange={handleChange}
              placeholder="Image"
              value={values.image}
            ></input>
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <button type="submit"
          // onClick={() => setModalIsOpen(false)}
          className="submit-button">
            Enregistrer
          </button>
        </form>
      </div>
    );
  }
};

export default AddProductForm;
