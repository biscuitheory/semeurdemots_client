import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { AuthContext } from '../contexts/auth';
// import CartContext from '../contexts/cart';
import totalCart from '../services/totalCart';

const API =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const Payment = () => {
  const { state: authState } = useContext(AuthContext);
  // const products = useContext(CartContext).cartState;

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [redirect, setRedirect] = useState(false);

  const location = useLocation();

  const { order_id, products } = location.state;

  console.log('whee ', location.state);
  const initialState = {
    id: order_id,
    status_id: 2,
    user_email: authState.user.email,
    user_username: authState.user.username,
  };

  const [values, setValues] = useState(initialState);

  const CreatePayment = async () => {
    const amount = totalCart(products);
    if (products.length != 0) {
      try {
        const res = await axios.post(`${API}payment`, { amount });
        console.log('total amount products on Payment', amount);
        if (res.data) {
          setClientSecret(res.data.clientSecret);
          // console.log('fit', clientSecret);
          await stripe.confirmCardPayment(clientSecret, {
            receipt_email: authState.user.email,
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                email,
              },
            },
          });
        }
      } catch (error) {
        console.log('stripe err', error);
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#444444',
        fontFamily: 'Poppins, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '1em',
        '::placeholder': {
          color: '#444444',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(
      event.error ? event.error.message : 'Veuillez renseigner une carte valide'
    );
    setValues({
      ...values,
    });
  };

  const UpdateOrder = async () => {
    try {
      const res = await axios.patch(
        `${API}orders`,
        {
          id: order_id,
          status_id: values.status_id,
          user_email: values.user_email,
          user_username: values.user_username,
        },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      if (res) {
        console.log('Submitted Succesfully');
        console.log(res);
      }
    } catch (err) {
      console.log('error from payment update order', err);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: authState.user.email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setValues({
        ...values,
      });
      UpdateOrder();
      // fullOrder();
      setRedirect(true);
    }
    // fullOrder();
  };
  console.log('from payment update order passed values ', values);

  useEffect(() => {
    CreatePayment();
    console.log('frm payment location state', location.state);
  }, []);
  // }, [products, location]);

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/confirmation-commande',
          state: { fullorder: location.state },
        }}
      />
    );
  }
  return (
    <div className="payment__container">
      <form
        className="payment__container-form"
        id="payment-form"
        onSubmit={handleSubmit}
        // onSubmit={() => {
        //   handleSubmit();
        //   fullOrder();
        // }}
      >
        <p>
          Règlement d&apos;un montant de&nbsp;
          {totalCart(products)}
          &nbsp;€
        </p>
        <input
          type="text"
          id="email"
          value={authState.user.email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="Saisir adresse email"
          style={{ display: 'none' }}
        />
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner" /> : 'Valider'}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded, see the result in your
          <a href="https://dashboard.stripe.com/test/payments">
            &nbsp;Stripe dashboard.
          </a>
          &nbsp;Refresh the page to pay again.
        </p>
      </form>
    </div>
  );
};

export default Payment;
