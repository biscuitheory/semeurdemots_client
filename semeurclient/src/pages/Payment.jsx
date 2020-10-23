import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    CardElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";

  const API = process.env.REACT_APP_API_URL;

const Payment = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      const fetchProducts = async () => {
          const res = await axios.post(`${API}payment`);
          setClientSecret(res.data.clientSecret)
          // console.log(res.data.clientSecret);
      };          
      fetchProducts();          
    }, []);

    const cardStyle = {
      style: {
        base: {
          color: "#444444",
          fontFamily: 'Poppins, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "1em",
          "::placeholder": {
            color: "#444444"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };

    const handleChange = async (event) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "Veuillez renseigner une carte valide");
    };

    const handleSubmit = async ev => {
      ev.preventDefault();
      setProcessing(true);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        receipt_email: email,
        payment_method: {
          card: elements.getElement(CardElement)
        }
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
    } else {
    return (
    <div className="payment__container">
      <form className="payment__container-form" id="payment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Saisir adresse email"
        />
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Valider"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a
            href={`https://dashboard.stripe.com/test/payments`}
          >
            {" "}
            Stripe dashboard.
          </a> Refresh the page to pay again.
        </p>
      </form>
    </div>
    )
  }
}

export default Payment;