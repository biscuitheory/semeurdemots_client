import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import EditBillingForm from '../components/EditBillingForm';
// import EditShippingForm from '../components/EditShippingForm';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateShippingAddress';
import { AuthContext } from '../contexts/auth';
import CartContext from '../contexts/cart';
import totalCart from '../services/totalCart';

const API = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const { state: authState } = useContext(AuthContext);
  const products = useContext(CartContext).cartState;
  // const [redirect, setRedirect] = useState(false);
  // console.log('lerara ', products)
  const [isVisible, setIsVisible] = useState(false);
  const [isCards, setIsCards] = useState(false);

  const initialState = {
    user_id: authState.user.id,
    status_id: 1,
    shipping_firstname: '',
    shipping_lastname: '',
    shipping_address: '',
    shipping_zipcode: '',
    shipping_city: '',
    shipping_country: '',
    payment: '',
  };

  // console.log('from checkout e ', authState.user.id);
  // console.log('from checkout e ', initialState);

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  // console.log('valou ', values);

  // pour MAJ données facturation utilisateur

  async function submit() {
    if (authState.user.id !== undefined) {
      // console.log('detec');
      if (authState.user.id) {
        try {
          const res = await axios.post(
            `${API}orders/`,
            {
              user_id: authState.user.id,
              status_id: values.status_id,
              shipping_firstname: values.shippingFirstname
                ? values.shippingFirstname
                : authState.user.firstname,
              shipping_lastname: values.shippingLastname
                ? values.shippingLastname
                : authState.user.lastname,
              shipping_address: values.shippingAddress
                ? values.shippingAddress
                : authState.user.address,
              shipping_zipcode: values.shippingZipcode
                ? values.shippingZipcode
                : authState.user.zipcode,
              shipping_city: values.shippingCity
                ? values.shippingCity
                : authState.user.city,
              shipping_country: values.shippingCountry
                ? values.shippingCountry
                : authState.user.country,
              payment: values.payment,
            }
            // {
            //   user_id: authState.user.id,
            //   status_id: values.status_id,
            //   shipping_firstname: values.shipping_firstname
            //     ? values.shipping_firstname
            //     : authState.user.firstname,
            //   shipping_lastname: values.shipping_lastname
            //     ? values.shipping_lastname
            //     : authState.user.lastname,
            //   shipping_address: values.shipping_address
            //     ? values.shipping_address
            //     : authState.user.address,
            //   shipping_zipcode: values.shipping_zipcode
            //     ? values.shipping_zipcode
            //     : authState.user.zipcode,
            //   shipping_city: values.shipping_city
            //     ? values.shipping_city
            //     : authState.user.city,
            //   shipping_country: values.shipping_country
            //     ? values.shipping_country
            //     : authState.user.country,
            //   payment: values.payment,
            // }
            // { headers: { Authorization: `Bearer ${authState.token}` } }
          );
          console.log('res ', authState.user.id);
          if (res) {
            console.log('Submitted Succesfully');
            console.log(res);
          }
          throw res;
        } catch (err) {
          console.log('error from checkout', err);
          setValues({
            ...values,
            isSubmitting: false,
            errorMessage: err.message,
          });
        }
      }
    }
  }

  // dois envoyer données livraison vers table orders => context shippingInfo, à récupérer dans page de confirmation

  // if (redirect) {
  //     return <Redirect to="/payment" />
  //   } else {
  return (
    <div className="checkout__container">
      <SubHeader title="Livraison et Facturation" />
      <form
        onSubmit={handleSubmit}
        noValidate
        className="checkout__container-main"
      >
        <section className="checkout__container-forms">
          {/* <EditBillingForm /> */}

          {isVisible ? (
            <div className="checkout__container-form-shipping">
              <span className="checkout__container-form-shipping-title">
                <input
                  type="checkbox"
                  id="shipping-address-form"
                  name="shippingForm"
                  onClick={() => setIsVisible(false)}
                  checked
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
                    name="shippingFirstname"
                    value={values.shippingFirstname}
                    onChange={handleChange}
                    id="shipping-firstname"
                  />
                  {errors.shippingFirstname && (
                    <p className="error">{errors.shippingFirstname}</p>
                  )}
                </span>
                <span className="checkout__container-form-names-lastname">
                  <label htmlFor="shipping-lastname">Nom</label>
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="shippingLastname"
                    value={values.shippingLastname}
                    onChange={handleChange}
                    id="shipping-lastname"
                  />
                  {errors.shippingLastname && (
                    <p className="error">{errors.shippingLastname}</p>
                  )}
                </span>
              </section>
              <section className="checkout__container-form-otherinfo">
                <label htmlFor="shipping-address">
                  Adresse
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shippingAddress"
                  value={values.shippingAddress}
                  onChange={handleChange}
                  id="shipping-address"
                />
                {errors.shippingAddress && <p className="error">{errors.shippingAddress}</p>}
                <label htmlFor="zipcode">
                  Code postal
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shippingZipcode"
                  value={values.shippingZipcode}
                  onChange={handleChange}
                  id="shipping-zipcode"
                />
                {errors.shippingZipcode && <p className="error">{errors.shippingZipcode}</p>}
                <label htmlFor="shipping-city">
                  Ville
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shippingCity"
                  value={values.shippingCity}
                  onChange={handleChange}
                  id="shipping-city"
                />
                {errors.shippingCity && <p className="error">{errors.shippingCity}</p>}
                <label htmlFor="shipping-country">
                  Pays
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="shippingCountry"
                  value={values.shippingCountry}
                  onChange={handleChange}
                  id="shipping-country"
                />
                {errors.shippingCountry && <p className="error">{errors.shippingCountry}</p>}
              </section>
            </div>
          ) : (
            <>
              <span className="checkout__container-form-shipping-title">
                <input
                  type="checkbox"
                  id="shipping-address-form"
                  name="shippingForm"
                  onClick={() => setIsVisible(true)}
                />
                <label htmlFor="shipping-address-form">
                  <h2>Expédier à une adresse différente ?</h2>
                </label>
              </span>
            </>
          )}
        </section>
        <section className="checkout__container-recap">
          <div className="checkout__container-recap-header">
            <h2>Votre commande</h2>
          </div>
          <table className="checkout__container-recap-table">
            <thead>
              <tr className="checkout__container-recap-table-important">
                <th className="checkout__container-recap-table-lg">Produit</th>
                <th className="checkout__container-recap-table-sm">
                  Sous-total
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={i}>
                  <td>
                    {product.name}
{' '}
x{product.quantity}
                  </td>
                  <td> 
{' '}
{product.quantity * product.price} €</td>
                </tr>
              ))}
              {/* <tr>
              <td>Poisson rouge</td>
              <td>8.00 €</td>
            </tr> */}
              <tr className="checkout__container-recap-table-important">
                <td className="checkout__container-recap-table-lg">
                  Sous-total
                </td>
                <td> 
{' '}
{totalCart(products)}€</td>
              </tr>
              <tr className="checkout__container-recap-table-important">
                <td className="checkout__container-recap-table-lg">
                  Expédition
                </td>
                <td>Forfait</td>
              </tr>
              <tr className="checkout__container-recap-table-important">
                <td className="checkout__container-recap-table-lg">Total</td>
                <td> 
{' '}
{totalCart(products)}€</td>
              </tr>
            </tbody>
          </table>
          <div className="checkout__container-recap-payment">
            <div className="checkout__container-recap-payment-paypal">
              <input
                type="radio"
                name="payment"
                id="pay-paypal"
                value="Paypal"
                onChange={handleChange}
                onClick={() => setIsCards(false)}
              />
              <label htmlFor="payment">Paypal</label>
            </div>
            <div className="checkout__container-recap-payment-cards">
              <input
                type="radio"
                name="payment"
                id="pay-card"
                value="Card"
                onChange={handleChange}
                onClick={() => setIsCards(true)}
                checked={isCards}
              />
              <label htmlFor="payment">Cartes de paiement</label>
            </div>
            <div className="checkout__container-recap-payment-validation">
              <p>
                Vos données personnelles seront utilisées pour le traitement de
                votre commande, vous accompagner au cours de votre visite du
                site web, et pour d’autres raisons décrites dans notre
                <Link to="/">politique de confidentialité</Link>
.
</p>
              <span className="checkout__container-recap-payment-validation-sign">
                <input type="checkbox" id="order-sign" />
                <label htmlFor="order-sign">
                  J’ai lu et j’accepte les
                  <Link to="/">conditions générales</Link>
                  <span className="required">*</span>
                </label>
              </span>
            </div>
          </div>
          <div className="checkout__container-recap-payment-validation-confirm">
            <button type="submit" className="submit-button">
              Régler 
{' '}
{isCards ? ' par carte' : 'via Paypal'}
            </button>
            {/* </Link> */}
          </div>
        </section>
      </form>
    </div>
  );
};

export default Checkout;
