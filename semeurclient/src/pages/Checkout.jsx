import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateCustomerAddress';
import { AuthContext } from '../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const initialState = {
    firstname: '' ? '' : authState.user.firstname,
    lastname: '' ? '' : authState.user.lastname,
    phone: '' ? '' : authState.user.phone,
    email: '' ? '' : authState.user.email,
    address: '' ? '' : authState.user.address,
    zipcode: '' ? '' : authState.user.zipcode,
    city: '' ? '' : authState.user.city,
    country: '' ? '' : authState.user.country,
    // password: '',
    // newpassword: '',
    // newpasswordbis: '',
    admin: false,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

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
          // password: values.password,
          admin: values.admin,
        },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      console.log('res ', values);
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
    <div className="checkout__container">
      <SubHeader title="Livraison et Facturation" />
      <section className="checkout__container-forms">
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
                value={authState.user.firstname || ''}
                onChange={handleChange}
                id="firstname"
              ></input>
              {errors.firstname && <p className="error">{errors.firstname}</p>}
            </span>
            <span className="checkout__container-form-names-lastname">
              <label htmlFor="lastname">Nom</label>
              <span className="required">*</span>
              <input
                type="text"
                name="lastname"
                value={authState.user.lastname || ''}
                id="lastname"
                // placeholder="Nom"
                onChange={handleChange}
              ></input>
              {errors.lastname && <p className="error">{errors.lastname}</p>}
            </span>
          </section>
          <section className="checkout__container-form-otherinfo">
            <label htmlFor="phone">
              Téléphone<span className="required">*</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={authState.user.phone || ''}
              onChange={handleChange}
            ></input>
            {errors.phone && <p className="error">{errors.phone}</p>}
            <label htmlFor="email">
              Email<span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={authState.user.email || ''}
              onChange={handleChange}
            ></input>
            {errors.email && <p className="error">{errors.email}</p>}
            <label htmlFor="address">
              Adresse<span className="required">*</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={authState.user.address || ''}
              onChange={handleChange}
            ></input>
            {errors.address && <p className="error">{errors.address}</p>}
            <label htmlFor="zipcode">
              Code postal<span className="required">*</span>
            </label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              value={authState.user.zipcode || ''}
              onChange={handleChange}
            ></input>
            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
            <label htmlFor="city">
              Ville<span className="required">*</span>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={authState.user.city || ''}
              onChange={handleChange}
            ></input>
            {errors.city && <p className="error">{errors.city}</p>}
            <label htmlFor="country">
              Pays<span className="required">*</span>
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={authState.user.country || ''}
              onChange={handleChange}
            ></input>
            {errors.country && <p className="error">{errors.country}</p>}
          </section>
          {/* <button type="submit" className="submit-button">
            Enregister les modifications
          </button> */}
        </form>
        <form className="checkout__container-form-shipping">
          {isVisible ? (
            <>
              <span className="checkout__container-form-shipping-title">
                <input
                  type="checkbox"
                  id="shipping-address-form"
                  name="shipping-address"
                  onClick={() => setIsVisible(false)}
                ></input>
                <label htmlFor="shipping-address-form">
                  <h2>Expédier à une adresse différente ?</h2>
                </label>
              </span>
              <section className="checkout__container-form-names">
                <span className="checkout__container-form-names-firstname">
                  <label htmlFor="firstname">Prénom</label>
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="firstname"
                    // value={authState.user.firstname || ''}
                    onChange={handleChange}
                    id="firstname"
                  ></input>
                  {errors.firstname && (
                    <p className="error">{errors.firstname}</p>
                  )}
                </span>
                <span className="checkout__container-form-names-lastname">
                  <label htmlFor="lastname">Nom</label>
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="lastname"
                    // value={authState.user.lastname || ''}
                    id="lastname"
                    // placeholder="Nom"
                    onChange={handleChange}
                  ></input>
                  {errors.lastname && (
                    <p className="error">{errors.lastname}</p>
                  )}
                </span>
              </section>
              <section className="checkout__container-form-otherinfo">
                <label htmlFor="phone">
                  Téléphone<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  //   value={authState.user.phone || ''}
                  onChange={handleChange}
                ></input>
                {errors.phone && <p className="error">{errors.phone}</p>}
                <label htmlFor="email">
                  Email<span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  //   value={authState.user.email || ''}
                  onChange={handleChange}
                ></input>
                {errors.email && <p className="error">{errors.email}</p>}
                <label htmlFor="address">
                  Adresse<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  //   value={authState.user.address || ''}
                  onChange={handleChange}
                ></input>
                {errors.address && <p className="error">{errors.address}</p>}
                <label htmlFor="zipcode">
                  Code postal<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  //   value={authState.user.zipcode || ''}
                  onChange={handleChange}
                ></input>
                {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                <label htmlFor="city">
                  Ville<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  //   value={authState.user.city || ''}
                  onChange={handleChange}
                ></input>
                {errors.city && <p className="error">{errors.city}</p>}
                <label htmlFor="country">
                  Pays<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  //   value={authState.user.country || ''}
                  onChange={handleChange}
                ></input>
                {errors.country && <p className="error">{errors.country}</p>}
              </section>
            </>
          ) : (
            <>
              <span className="checkout__container-form-shipping-title">
                <input
                  type="checkbox"
                  id="shipping-address-form"
                  name="shipping-address"
                  onClick={() => setIsVisible(true)}
                ></input>
                <label for="shipping-address-form">
                  <h2>Expédier à une adresse différente ?</h2>
                </label>
              </span>
            </>
          )}
          {/* <Link href="/checkout"> */}
          {/* <button className="submit-button">
              Enregister les modifications
            </button> */}
          {/* </Link> */}
        </form>
      </section>
      <section className="checkout__container-recap">
        <div className="checkout__container-recap-header">
          <h2>Votre commande</h2>
        </div>
        <table className="checkout__container-recap-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Sous-total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Poisson rouge</td>
              <td>8.00 €</td>
            </tr>
            <tr>
              <td>Sous-total</td>
              <td>8.00 €</td>
            </tr>
            <tr>
              <td>Expédition</td>
              <td>Forfait</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>8.00 €</td>
            </tr>
          </tbody>
        </table>
        <div className="checkout__container-recap-payment">
          <div className="checkout__container-recap-payment-paypal">
            <input type="radio" id="pay-paypal"></input>
            <label htmlFor="pay-paypal">Paypal</label>
          </div>
          <div className="checkout__container-recap-payment-cards">
            <input type="radio" id="pay-cards"></input>
            <label htmlFor="pay-cards">Cartes de paiement</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
