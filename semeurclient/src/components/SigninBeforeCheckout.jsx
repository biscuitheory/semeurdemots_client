import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validateSignin';
import { AuthContext } from '../contexts/auth';
import CartContext from '../contexts/cart';
import usePasswordToggle from './customedhooks/usePasswordToggle';

const API = process.env.REACT_APP_API_URL;

const SigninBeforeCheckout = () => {
  const { dispatch, state: authState } = useContext(AuthContext);
  const products = useContext(CartContext).cartState;
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [redirect, setRedirect] = useState(false);

  const location = useLocation();

  const { product } = location.state;

  const history = useHistory();

  const initialState = {
    username: '',
    email: '',
    password: '',
    admin: false,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  async function submit() {
    try {
      const res = await axios.post(`${API}signincustomer`, {
        emailOrUsername: values.emailOrUsername,
        password: values.password,
        admin: values.admin,
      });
      // console.log('res ', res);
      if (res.status === 200) {
        dispatch({
          type: 'SIGNIN',
          payload: res,
        });
        history.push('/checkout', {
          product: products,
          user: authState.user,
        });
      }
      throw res;
    } catch (error) {
      console.log(error.message);
      setValues({
        ...values,
        errorMessage: error.message,
      });
    }
  }
  return (
    <div className="signin__container">
      <h2>S'identifier</h2>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="signin__container-form"
      >
        <div className="signin__container-form-info">
          <label
            htmlFor="emailOrUsername"
            className="signin__container-form-info-label"
          >
            Nom d'utilisateur ou Email
          </label>
          <span className="required">*</span>
          <div className="signin__container-form-info-inputbox">
            <input
              type="text"
              name="emailOrUsername"
              value={values.emailOrUsername || ''}
              onChange={handleChange}
              className="signin__container-form-info-input"
            />
          </div>
          {errors.emailOrUsername && (
            <p className="error">{errors.emailOrUsername}</p>
          )}
        </div>
        <div className="signin__container-form-info">
          <label
            htmlFor="password"
            className="signin__container-form-info-label"
          >
            Mot de passe
          </label>
          <span className="required">*</span>
          <div className="signin__container-form-info-inputbox">
            <input
              type={PasswordInputType}
              name="password"
              value={values.password}
              onChange={handleChange}
              className="signin__container-form-info-input"
            />
            <span className="password-toggle-icon">{ToggleIcon}</span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" className="signin__container-form-submitbutton">
          Valider
        </button>
      </form>
    </div>
  );
};

export default SigninBeforeCheckout;
