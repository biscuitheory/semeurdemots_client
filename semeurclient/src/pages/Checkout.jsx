import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateCustomerAddress';
import { AuthContext } from '../contexts/auth';
import CartContext from '../contexts/cart';
import totalCart from '../services/totalCart';

const API = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  let products = useContext(CartContext).cartState;
  // const [redirect, setRedirect] = useState(false);
  // console.log('lerara ', products)
  const [isVisible, setIsVisible] = useState(false);
  const [isCards, setIsCards] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);

  const initialState = {
    firstname: '' ? '' : authState.user.firstname,
    lastname: '' ? '' : authState.user.lastname,
    phone: '' ? '' : authState.user.phone,
    email: '' ? '' : authState.user.email,
    address: '' ? '' : authState.user.address,
    zipcode: '' ? '' : authState.user.zipcode,
    city: '' ? '' : authState.user.city,
    country: '' ? '' : authState.user.country,
    admin: false,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  // console.log('from useForm', values)

  // pour MAJ données facturation utilisateur 
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

  // dois envoyer données livraison vers table orders => context shippingInfo, à récupérer dans page de confirmation

  
// if (redirect) {
//     return <Redirect to="/payment" />
//   } else {
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
                value={values.firstname || ''}
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
                value={values.lastname || ''}
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
              value={values.phone || ''}
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
              value={values.email || ''}
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
              value={values.address || ''}
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
              value={values.zipcode || ''}
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
              value={values.city || ''}
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
              value={values.country || ''}
              onChange={handleChange}
            ></input>
            {errors.country && <p className="error">{errors.country}</p>}
          </section>
          <Link to="/payment">
          <button type="submit" className="submit-button">
            Enregister les modifications
          </button>
          </Link>
        </form>
        <form className="checkout__container-form-shipping">
          {isVisible ? (
            <>
              <span className="checkout__container-form-shipping-title">
                <input
                  type="checkbox"
                  id="shipping-address-form"
                  name="shipping-form"
                  onClick={() => setIsVisible(false)}
                ></input>
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
                    // value={authState.user.firstname || ''}
                    // onChange={handleChange}
                    id="shipping-firstname"
                  ></input>
                  {errors.firstname && (
                    <p className="error">{errors.firstname}</p>
                  )}
                </span>
                <span className="checkout__container-form-names-lastname">
                  <label htmlFor="shipping-lastname">Nom</label>
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="shipping-lastname"
                    // value={authState.user.lastname || ''}
                    id="shipping-lastname"
                    // placeholder="Nom"
                    // onChange={handleChange}
                  ></input>
                  {errors.lastname && (
                    <p className="error">{errors.lastname}</p>
                  )}
                </span>
              </section>
              <section className="checkout__container-form-otherinfo">
                <label htmlFor="shipping-phone">
                  Téléphone<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shipping-phone"
                  id="shipping-phone"
                  //   value={authState.user.phone || ''}
                  // onChange={handleChange}
                ></input>
                {errors.phone && <p className="error">{errors.phone}</p>}
                <label htmlFor="shipping-email">
                  Email<span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="shipping-email"
                  id="shipping-email"
                  //   value={authState.user.email || ''}
                  // onChange={handleChange}
                ></input>
                {errors.email && <p className="error">{errors.email}</p>}
                <label htmlFor="shipping-address">
                  Adresse<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shipping-address"
                  id="shipping-address"
                  //   value={authState.user.address || ''}
                  // onChange={handleChange}
                ></input>
                {errors.address && <p className="error">{errors.address}</p>}
                <label htmlFor="zipcode">
                  Code postal<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shipping-zipcode"
                  id="shipping-zipcode"
                  //   value={authState.user.zipcode || ''}
                  // onChange={handleChange}
                ></input>
                {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                <label htmlFor="shipping-city">
                  Ville<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shipping-city"
                  id="shipping-city"
                  //   value={authState.user.city || ''}
                  // onChange={handleChange}
                ></input>
                {errors.city && <p className="error">{errors.city}</p>}
                <label htmlFor="shipping-country">
                  Pays<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shipping-country"
                  id="shipping-country"
                  //   value={authState.user.country || ''}
                  // onChange={handleChange}
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
          {/* <Link to="/checkout"> */}
          <button className="submit-button">
              Enregister les modifications
            </button>
          {/* </Link> */}
        </form>
      </section>
      <section className="checkout__container-recap">
        <div className="checkout__container-recap-header">
          <h2>Votre commande</h2>
        </div>
        <table className="checkout__container-recap-table">
          <thead>
            <tr className="checkout__container-recap-table-important">
              <th className="checkout__container-recap-table-lg">Produit</th>
              <th className="checkout__container-recap-table-sm">Sous-total</th>
            </tr>
          </thead>
          <tbody>
          {products.map((product, i) => (
          <tr>
            <td>{product.name} x {product.quantity}</td>
            <td>{product.quantity * product.price} €</td>
          </tr>
        ))}
            {/* <tr>
              <td>Poisson rouge</td>
              <td>8.00 €</td>
            </tr> */}
            <tr className="checkout__container-recap-table-important">
              <td className="checkout__container-recap-table-lg">Sous-total</td>
          <td>{totalCart(products)}€</td>
            </tr>
            <tr className="checkout__container-recap-table-important">
              <td className="checkout__container-recap-table-lg">Expédition</td>
              <td>Forfait</td>
            </tr>
            <tr className="checkout__container-recap-table-important">
              <td className="checkout__container-recap-table-lg">Total</td>
              <td>{totalCart(products)}€</td>
            </tr>
          </tbody>
        </table>
        <div className="checkout__container-recap-payment">
          <div className="checkout__container-recap-payment-paypal">
            <input type="radio" name="payment" id="pay-paypal" value="Paypal" onClick={() => setIsCards(false)}></input>
            <label htmlFor="pay-paypal">Paypal</label>
          </div>
          <div className="checkout__container-recap-payment-cards">
            <input type="radio" name="payment" id="pay-cards" value="Cards" onClick={() => setIsCards(true)} checked={isCards}></input>
            <label htmlFor="pay-cards">Cartes de paiement</label>
          </div>
          <div className="checkout__container-recap-payment-validation">
            <p>
              Vos données personnelles seront utilisées pour le traitement de
              votre commande, vous accompagner au cours de votre visite du site
              web, et pour d’autres raisons décrites dans notre{' '}
              <Link to="/">politique de confidentialité</Link>.
            </p>
            <span className="checkout__container-recap-payment-validation-sign">
              <input type="checkbox" id="order-sign"></input>
              <label htmlFor="order-sign">
                J’ai lu et j’accepte les <Link to="/">conditions générales</Link>
                <span className="required">*</span>
              </label>
            </span>
            {isCards ? (<div className="checkout__container-recap-payment-validation-confirm">
                <button type="submit" className="submit-button">Régler par carte</button>
            </div>): (<div className="checkout__container-recap-payment-validation-confirm">
                <button type="submit" 
                // disabled={processing || disabled || succeeded}
                className="submit-button">Régler via Paypal</button>
            </div>)}
          </div>
        </div>
      </section>
    </div>
  );
  // }
};

export default Checkout;
