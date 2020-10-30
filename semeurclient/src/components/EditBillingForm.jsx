import React, { useContext } from 'react';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validateBillingAddress';
import { AuthContext } from '../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const EditBillingForm = () => {
  const { state: authState } = useContext(AuthContext);

  const initialState = {
    firstname: '' ? '' : authState.user.firstname,
    lastname: '' ? '' : authState.user.lastname,
    phone: '' ? '' : authState.user.phone,
    email: '' ? '' : authState.user.email,
    address: '' ? '' : authState.user.address,
    zipcode: '' ? '' : authState.user.zipcode,
    city: '' ? '' : authState.user.city,
    country: '' ? '' : authState.user.country,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  // console.log('from edit billing form', values);

  async function submit() {
    try {
      const res = await axios.patch(
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
        },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      // console.log('res ', values);
      if (res) {
        console.log('Submitted Succesfully');
        console.log(res);
      }
      throw res;
    } catch (err) {
      console.log('error from edit billing form', err);
      setValues({
        ...values,
        isSubmitting: false,
        errorMessage: err.message,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="checkout__container-form-billing"
    >
      <h2>Détails de facturation</h2>
      <section className="checkout__container-form-names">
        <span className="checkout__container-form-names-firstname">
          <label htmlFor="firstname">Prénom</label>
          <span className="required">*</span>
          <input
            type="text"
            name="firstname"
            value={values.firstname || ''}
            onChange={handleChange}
            id="firstname"
          />
          {errors.firstname && <p className="error">{errors.firstname}</p>}
        </span>
        <span className="checkout__container-form-names-lastname">
          <label htmlFor="lastname">Nom</label>
          <span className="required">*</span>
          <input
            type="text"
            name="lastname"
            value={values.lastname || ''}
            id="lastname"
            // placeholder="Nom"
            onChange={handleChange}
          />
          {errors.lastname && <p className="error">{errors.lastname}</p>}
        </span>
      </section>
      <section className="checkout__container-form-otherinfo">
        <label htmlFor="phone">
          Téléphone
          <span className="required">*</span>
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={values.phone || ''}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <label htmlFor="email">
          Email
          <span className="required">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email || ''}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <label htmlFor="address">
          Adresse
          <span className="required">*</span>
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={values.address || ''}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}
        <label htmlFor="zipcode">
          Code postal
          <span className="required">*</span>
        </label>
        <input
          type="text"
          name="zipcode"
          id="zipcode"
          value={values.zipcode || ''}
          onChange={handleChange}
        />
        {errors.zipcode && <p className="error">{errors.zipcode}</p>}
        <label htmlFor="city">
          Ville
          <span className="required">*</span>
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={values.city || ''}
          onChange={handleChange}
        />
        {errors.city && <p className="error">{errors.city}</p>}
        <label htmlFor="country">
          Pays
          <span className="required">*</span>
        </label>
        <input
          type="text"
          name="country"
          id="country"
          value={values.country || ''}
          onChange={handleChange}
        />
        {errors.country && <p className="error">{errors.country}</p>}
      </section>
      <button type="submit" className="submit-button">
        Enregister les modifications
      </button>
    </form>
  );
};

export default EditBillingForm;
