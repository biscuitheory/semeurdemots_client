import React, { useState, useContext } from 'react';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validateEditCustomer';
import { AuthContext } from '../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const EditShippingForm = () => {
  const { state: authState } = useContext(AuthContext);
  const initialState = {
    firstname: '' ? '' : authState.user.firstname,
    lastname: '' ? '' : authState.user.lastname,
    address: '' ? '' : authState.user.address,
    zipcode: '' ? '' : authState.user.zipcode,
    city: '' ? '' : authState.user.city,
    country: '' ? '' : authState.user.country,
  };
  const [isVisible, setIsVisible] = useState(false);

  // const [errors, setErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  async function submit() {
    console.log('detected !');
    try {
      const res = await axios.post(
        `${API}users/`,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
          email: values.email,
          address: values.address,
          zipcode: values.zipcode,
          city: values.city,
          country: values.country,
          admin: values.admin,
        },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      console.log('res ', values);
      if (res) {
        console.log('Submitted Succesfully');
        console.log(res);
      }
      throw res;
    } catch (err) {
      console.log('error from details compte', err);
      setValues({
        ...values,
        isSubmitting: false,
        // errorMessage: error.message,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="checkout__container-form-shipping"
    >
      {isVisible ? (
        <>
          <span className="checkout__container-form-shipping-title">
            <input
              type="checkbox"
              id="shipping-address-form"
              name="shipping-form"
              onClick={() => setIsVisible(false)}
            />
            <label htmlFor="shipping-address-form">
              <h2>Expédier à une adresse différente ?</h2>
            </label>
          </span>
          <section className="checkout__container-form-names">
            <span className="checkout__container-form-names-firstname">
              <label htmlFor="shipping-firstname">Prénom</label>
              <span className="required">*</span>
              <input
                type="text"
                name="shipping-firstname"
                value={values.firstname}
                onChange={handleChange}
                id="shipping-firstname"
              />
              {errors.firstname && <p className="error">{errors.firstname}</p>}
            </span>
            <span className="checkout__container-form-names-lastname">
              <label htmlFor="shipping-lastname">Nom</label>
              <span className="required">*</span>
              <input
                type="text"
                name="shipping-lastname"
                value={values.lastname}
                onChange={handleChange}
                id="shipping-lastname"
              />
              {errors.lastname && <p className="error">{errors.lastname}</p>}
            </span>
          </section>
          <section className="checkout__container-form-otherinfo">
            <label htmlFor="shipping-address">
              Adresse
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="shipping-address"
              value={values.adresse}
              onChange={handleChange}
              id="shipping-address"
            />
            {errors.address && <p className="error">{errors.address}</p>}
            <label htmlFor="zipcode">
              Code postal
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="shipping-zipcode"
              value={values.zipcode}
              onChange={handleChange}
              id="shipping-zipcode"
            />
            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
            <label htmlFor="shipping-city">
              Ville
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="shipping-city"
              value={values.city}
              onChange={handleChange}
              id="shipping-city"
            />
            {errors.city && <p className="error">{errors.city}</p>}
            <label htmlFor="shipping-country">
              Pays
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="shipping-country"
              value={values.country}
              onChange={handleChange}
              id="shipping-country"
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </section>
          <button type="submit" className="submit-button">
            Enregister les modifications
          </button>
        </>
      ) : (
        <>
          <span className="checkout__container-form-shipping-title">
            <input
              type="checkbox"
              id="shipping-address-form"
              name="shipping-address"
              onClick={() => setIsVisible(true)}
            />
            <label htmlFor="shipping-address-form">
              <h2>Expédier à une adresse différente ?</h2>
            </label>
          </span>
        </>
      )}
    </form>
  );
};

export default EditShippingForm;
