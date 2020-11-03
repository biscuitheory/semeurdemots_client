import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { AuthContext } from '../contexts/auth';
import CartContext from '../contexts/cart';
import totalCart from '../services/totalCart';
import OrderContext from '../contexts/order';

const API = process.env.REACT_APP_API_URL;

const Payment = () => {
  const { state: authState } = useContext(AuthContext);
  // let products = useContext(CartContext).cartState;
  const products = useContext(CartContext).cartState;
  const order = useContext(OrderContext).orderState;

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

  const CreatePayment = async () => {
    const amount = totalCart(products);
    if (products.length != 0) {
      try {
        const res = await axios.post(`${API}payment`, { amount });
        if (res.data) {
          setClientSecret(res.data.clientSecret);
          const result = await stripe.confirmCardPayment(clientSecret, {
            receipt_email: document.getElementById('email').value,
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                email,
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const UpdateOrder = async () => {
  //   try {
  //     const res = await axios.patch(`${API}orders`, )
  //   }
  // }

  useEffect(() => {
    CreatePayment();
    console.log('frm payment', location.state.res);
  }, [products, location]);

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
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(
      event.error ? event.error.message : 'Veuillez renseigner une carte valide'
    );
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
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
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to="/confirmation-commande" />;
  }
  return (
    <div className="payment__container">
      <form
        className="payment__container-form"
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <p>
Règlement d&apos;un montant de{totalCart(products)}
€
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
            {' '}
            Stripe dashboard.
          </a>
{' '}
          Refresh the page to pay again.
        </p>
      </form>
    </div>
  );
};

export default Payment;
