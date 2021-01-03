import React, { useContext } from 'react';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validateEditCustomer';
import { AuthContext } from '../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const EditCustomerForm = () => {
  const { state: authState } = useContext(AuthContext);

  const initialState = {
    username: '' ? '' : authState.user.username,
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

  // console.log('from details compte', values);

  async function submit() {
    try {
      const res = await axios.patch(
        `${API}users/`,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
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
        // setRedirect(true);
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
    <div className="detailscompte__container">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="detailscompte__container-form"
      >
        <section className="detailscompte__container-form-names">
          <span className="detailscompte__container-form-firstname">
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
          <span className="detailscompte__container-form-lastname">
            <label htmlFor="lastname">Nom</label>
            <span className="required">*</span>
            <input
              type="text"
              name="lastname"
              value={values.lastname || ''}
              id="lastname"
              onChange={handleChange}
            />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
          </span>
        </section>
        <section className="detailscompte__container-form-otherinfo">
          <label htmlFor="username">
            Nom d&apos;utilisateur
            <span className="required">*</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.username || ''}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
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
        </section>
        <section className="detailscompte__container-form-addresses">
          <div className="detailscompte__container-form-addresses-facturation">
            <p>Mes adresses</p>
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
          </div>
          <div className="detailscompte__container-form-addresses-livraison" />
        </section>
        <button type="submit" className="submit-button">
          Enregister les modifications
        </button>
      </form>
    </div>
  );
};

export default EditCustomerForm;
