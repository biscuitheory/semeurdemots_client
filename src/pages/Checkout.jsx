import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import EditBillingForm from '../components/EditBillingForm';
import validate from '../components/validators/validateShippingAddress';
import { AuthContext } from '../contexts/auth';
import totalCart from '../services/totalCart';
import OrderContext from '../contexts/order';

const API =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const Checkout = () => {
  const { state: authState } = useContext(AuthContext);
  const { setOrderState } = useContext(OrderContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isCards, setIsCards] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const location = useLocation();

  // console.log('location state frm SI/SU ', location.state);
  // console.log('AS checkout ', authState);
  // console.log('product frm SI/SU ', location.state.products);

  const { products, user, user_id, newuser } = location.state;
  // const { products, user } = location.state;
  // const { product } = location.state;
  // console.log('totalCart frm checkout ', totalCart(products));

  const initialState = {
    // user_id: authState.user.id,
    user_id: user_id || user.id,
    status_id: 1,
    shipping_firstname: '',
    shipping_lastname: '',
    shipping_address: '',
    shipping_zipcode: '',
    shipping_city: '',
    shipping_country: '',
    total_price: totalCart(products),
    payment: '',
  };

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIsSigned();
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
    });
    setErrors(validate(values));
    setIsSubmitting(true);
    submit(isVisible);
  };

  useEffect(() => {}, [errors, isSubmitting]);

  // console.log('from checkout e ', user.id);

  console.log('shippingform values from checkout ', values);

  const history = useHistory();

  // pour MAJ données facturation utilisateur

  async function submit() {
    if (authState.user.id !== undefined) {
      if (user_id && newuser) {
        const inputValue = isVisible ? '' : true;
        // console.log('shipping address form ', inputValue);
        try {
          const res = await axios.post(`${API}orders/`, {
            user_id: values.user_id,
            status_id: values.status_id,
            shipping_firstname: inputValue
              ? newuser.firstname
              : values.shippingFirstname,
            shipping_lastname: inputValue
              ? newuser.lastname
              : values.shippingLastname,
            shipping_address: inputValue
              ? newuser.address
              : values.shippingAddress,
            shipping_zipcode: inputValue
              ? newuser.zipcode
              : values.shippingZipcode,
            shipping_city: inputValue ? newuser.city : values.shippingCity,
            shipping_country: inputValue
              ? newuser.country
              : values.shippingCountry,
            total_price: totalCart(products),
            payment: values.payment,
          });
          console.log('inputValue from post orders ', inputValue);
          if (res) {
            console.log('Submitted Succesfully from user_id && new_user', res);
            setOrderState(res.data.id);
            history.push('/payment', {
              order_id: res.data.id,
              product_id: products,
              products,
            });
          }
        } catch (err) {
          console.log('error from checkout', err);
          setValues({
            ...values,
            isSubmitting: false,
            errorMessage: err.message,
          });
        }
      } else if (user_id && user) {
        try {
          const res = await axios.post(`${API}orders/`, {
            user_id: values.user_id,
            status_id: values.status_id,
            shipping_firstname: values.shippingFirstname
              ? values.shippingFirstname
              : user.firstname,
            shipping_lastname: values.shippingLastname
              ? values.shippingLastname
              : user.lastname,
            shipping_address: values.shippingAddress
              ? values.shippingAddress
              : user.address,
            shipping_zipcode: values.shippingZipcode
              ? values.shippingZipcode
              : user.zipcode,
            shipping_city: values.shippingCity
              ? values.shippingCity
              : user.city,
            shipping_country: values.shippingCountry
              ? values.shippingCountry
              : user.country,
            total_price: totalCart(products),
            payment: values.payment,
          });
          if (res) {
            console.log('Submitted Succesfully from user_id && user ', res);
            setOrderState(res.data.id);
            history.push('/payment', {
              order_id: res.data.id,
              product_id: products,
              products,
            });
          }
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

  return (
    <div className="checkout__container">
      <SubHeader title="Livraison et Facturation" />

      <section className="checkout__container-forms">
        <div className="checkout__container-form-billing">
          <EditBillingForm products={products} />
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="checkout__container-main"
        >
          {isVisible ? (
            <div className="checkout__container-form-shipping">
              <span className="checkout__container-form-shipping-title">
                <input
                  type="checkbox"
                  id="shipping-address-form"
                  name="shippingForm"
                  onChange={() => setIsVisible(false)}
                  checked
                />
                <label htmlFor="shipping-address-form">
                  <h2>Expédier à une adresse différente ?</h2>
                </label>
              </span>
              <section className="checkout__container-form-names">
                <span className="checkout__container-form-names-firstname">
                  <label htmlFor="shipping-firstname">
                    Prénom
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="shippingFirstname"
                      value={values.shippingFirstname}
                      onChange={handleChange}
                      id="shipping-firstname"
                    />
                  </label>
                  {errors.shippingFirstname && (
                    <p className="error">{errors.shippingFirstname}</p>
                  )}
                </span>
                <span className="checkout__container-form-names-lastname">
                  <label htmlFor="shipping-lastname">
                    Nom
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="shippingLastname"
                      value={values.shippingLastname}
                      onChange={handleChange}
                      id="shipping-lastname"
                    />
                  </label>
                  {errors.shippingLastname && (
                    <p className="error">{errors.shippingLastname}</p>
                  )}
                </span>
              </section>
              <section className="checkout__container-form-otherinfo">
                <label htmlFor="shipping-address">
                  Adresse
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="shippingAddress"
                    value={values.shippingAddress}
                    onChange={handleChange}
                    id="shipping-address"
                  />
                </label>
                {errors.shippingAddress && (
                  <p className="error">{errors.shippingAddress}</p>
                )}
                <label htmlFor="zipcode">
                  Code postal
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="shippingZipcode"
                    value={values.shippingZipcode}
                    onChange={handleChange}
                    id="shipping-zipcode"
                  />
                </label>
                {errors.shippingZipcode && (
                  <p className="error">{errors.shippingZipcode}</p>
                )}
                <label htmlFor="shipping-city">
                  Ville
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="shippingCity"
                    value={values.shippingCity}
                    onChange={handleChange}
                    id="shipping-city"
                  />
                </label>
                {errors.shippingCity && (
                  <p className="error">{errors.shippingCity}</p>
                )}
                <label htmlFor="shipping-country">
                  Pays
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="shippingCountry"
                    value={values.shippingCountry}
                    onChange={handleChange}
                    id="shipping-country"
                  />
                </label>
                {errors.shippingCountry && (
                  <p className="error">{errors.shippingCountry}</p>
                )}
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

          <section className="checkout__container-recap">
            <div className="checkout__container-recap-header">
              <h2>Votre commande</h2>
            </div>
            <table className="checkout__container-recap-table">
              <thead>
                <tr className="checkout__container-recap-table-important">
                  <th className="checkout__container-recap-table-lg">
                    Produit
                  </th>
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
                      &nbsp;x
                      {product.quantity}
                    </td>
                    <td>
                      &nbsp;
                      {product.quantity * product.price}
                      &nbsp;€
                    </td>
                  </tr>
                ))}
                <tr className="checkout__container-recap-table-important">
                  <td className="checkout__container-recap-table-lg">
                    Sous-total
                  </td>
                  <td>
                    &nbsp;
                    {totalCart(products)}
                    &nbsp;€
                  </td>
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
                    &nbsp;
                    {totalCart(products)}
                    &nbsp;€
                  </td>
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
                  Vos données personnelles seront utilisées pour le traitement
                  de votre commande, vous accompagner au cours de votre visite
                  du site web, et pour d’autres raisons décrites dans notre
                  &nbsp;
                  <Link to="/">politique de confidentialité</Link>
                  .&nbsp;
                </p>
                <span className="checkout__container-recap-payment-validation-sign">
                  <input
                    type="checkbox"
                    id="order-sign"
                    checked={isSigned}
                    onChange={() => setIsSigned(!isSigned)}
                  />
                  <label htmlFor="order-sign">
                    J’ai lu et j’accepte les&nbsp;
                    <Link to="/" target="blank">
                      conditions générales
                    </Link>
                    <span className="required">*</span>
                  </label>
                </span>
                {!isSigned && (
                  <p className="error">
                    Merci de cocher cette case afin de passer au règlement de
                    votre commande.
                  </p>
                )}
              </div>
            </div>
            <div className="checkout__container-recap-payment-validation-confirm">
              <button
                type="submit"
                className="submit-button"
                disabled={!isSigned}
              >
                Régler&nbsp;
                {isCards ? ' par carte' : 'via Paypal'}
              </button>
            </div>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
