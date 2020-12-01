import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import EditBillingForm from '../components/EditBillingForm';
// import EditShippingForm from '../components/EditShippingForm';
import validate from '../components/validators/validateShippingAddress';
import { AuthContext } from '../contexts/auth';
// import CartContext from '../contexts/cart';
import totalCart from '../services/totalCart';
import OrderContext from '../contexts/order';

const API = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const { state: authState } = useContext(AuthContext);
  // const products = useContext(CartContext).cartState;
  const { setOrderState } = useContext(OrderContext);
  // const [redirect, setRedirect] = useState(false);
  // console.log('cartstate from Checkout ', products);
  const [isVisible, setIsVisible] = useState(false);
  const [isCards, setIsCards] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const location = useLocation();

  console.log('location state frm SI/SU ', location.state);
  console.log('AS checkout ', authState);
  console.log('product frm SI/SU ', location.state.products);

  const { products, user, user_id, newuser } = location.state;
  // const { products, user } = location.state;
  // const { product } = location.state;
  console.log('totalCart frm checkout ', totalCart(products));

  const initialState = {
    // user_id: authState.user.id,
    user_id: user_id ? user_id : user.id,
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

  // const handleSubmit = (event, totalPrice) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
    });
    setErrors(validate(values));
    setIsSubmitting(true);
    submit(isVisible);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submit(isVisible);
    }
  }, [errors, isSubmitting]);

  // console.log('from checkout e ', user.id);

  console.log('shippingform values from checkout ', values);

  const history = useHistory();

  // pour MAJ données facturation utilisateur

  async function submit(isChecked) {
    // if (authState.user.id !== undefined) {
    // console.log('detec');
    console.log('tru', isChecked);
    if (user_id && user) {
      const inputValue = isChecked ? '' : true;
      try {
        const res = await axios.post(
          `${API}orders/`,
          {
            user_id: values.user_id,
            status_id: values.status_id,
            shipping_firstname: inputValue
              ? user.firstname
              : values.shippingFirstname,
            shipping_lastname: inputValue
              ? user.lastname
              : values.shippingLastname,
            shipping_address: inputValue
              ? user.address
              : values.shippingAddress,
            shipping_zipcode: inputValue
              ? user.zipcode
              : values.shippingZipcode,
            shipping_city: inputValue ? user.city : values.shippingCity,
            shipping_country: inputValue
              ? user.country
              : values.shippingCountry,
            total_price: totalCart(products),
            payment: values.payment,
          }
          // try {
          //   const res = await axios.post(
          //     `${API}orders/`,
          //     {
          //       user_id: values.user_id,
          //       status_id: values.status_id,
          //       shipping_firstname: inputValue
          //         ? authState.user.firstname
          //         : values.shippingFirstname,
          //       shipping_lastname: inputValue
          //         ? authState.user.lastname
          //         : values.shippingLastname,
          //       shipping_address: inputValue
          //         ? authState.user.address
          //         : values.shippingAddress,
          //       shipping_zipcode: inputValue
          //         ? authState.user.zipcode
          //         : values.shippingZipcode,
          //       shipping_city: inputValue
          //         ? authState.user.city
          //         : values.shippingCity,
          //       shipping_country: inputValue
          //         ? authState.user.country
          //         : values.shippingCountry,
          //       total_price: totalCart(products),
          //       payment: values.payment,
          //     }
          // { headers: { Authorization: `Bearer ${authState.token}` } }
        );
        // console.log('res ', authState.user.id);
        if (res) {
          console.log('Submitted Succesfully');
          console.log(res);
          setOrderState(res.data.id);
          history.push('/payment', {
            order_id: res.data.id,
            product_id: products,
          });
        }
        // throw res;
      } catch (err) {
        console.log('error from checkout', err);
        setValues({
          ...values,
          isSubmitting: false,
          errorMessage: err.message,
        });
      }
    }
    if (user_id && newuser) {
      const inputValue = isChecked ? '' : true;
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
        // console.log('res ', authState.user.id);
        if (res) {
          console.log('Submitted Succesfully');
          console.log(res);
          setOrderState(res.data.id);
          history.push('/payment', {
            order_id: res.data.id,
            product_id: products,
          });
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
    // }
  }

  // dois envoyer données livraison vers table orders => context shippingInfo, à récupérer dans page de confirmation

  // if (redirect) {
  //   return <Redirect to="/payment" />;
  // }
  return (
    <div className="checkout__container">
      <SubHeader title="Livraison et Facturation" />

      <section className="checkout__container-forms">
        <div className="checkout__container-form-billing">
          <EditBillingForm />
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
                {/* <tr>
              <td>Poisson rouge</td>
              <td>8.00 €</td>
            </tr> */}
                <tr className="checkout__container-recap-table-important">
                  <td className="checkout__container-recap-table-lg">
                    Sous-total
                  </td>
                  <td>
                    &nbsp;
                    {totalCart(products)}€
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
                    {totalCart(products)}€
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
                  <Link to="/">politique de confidentialité</Link>.
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
                    Merci de cocher cette case afin de poursuivre votre achat.
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
