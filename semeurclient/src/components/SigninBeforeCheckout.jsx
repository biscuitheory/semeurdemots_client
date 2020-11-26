import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import useForm from './customedhooks/useForm';
import validate from './validators/validateSignin';
import { AuthContext } from '../contexts/auth';
import CartContext from '../contexts/cart';
import usePasswordToggle from './customedhooks/usePasswordToggle';

const API = process.env.REACT_APP_API_URL;

const SigninBeforeCheckout = (products) => {
  const { dispatch, state: authState } = useContext(AuthContext);
  // const products = useContext(CartContext).cartState;
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  // const [redirect, setRedirect] = useState(false);

  console.log('the props passed from parent BC ', products);

  // const location = useLocation();

  // const { product } = location.state;

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
      console.log('res ', res);
      if (res.status === 200) {
        dispatch({
          type: 'SIGNIN',
          payload: res,
        });
        console.log('response SI ', res);
        // history.push('/checkout', {
          // product: products,
        //   products,
        //   user: authState.user,
        // });
        history.push('/checkout', {
          products,
          user: res.data.user,
          user_id: authState.user.id,
        });
      }
      throw res;
    } catch (error) {
      console.log('err from SI BCO', error.message);
      setValues({
        ...values,
        errorMessage: error.message,
      });
      toast.error("Ce compte n'existe pas ! Veuillez créer un compte", {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className="signin__container">
      <h2>S&apos;identifier</h2>
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
            Nom d&apos;utilisateur ou Email
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
        <button
          type="submit"
          onClick={toast}
          className="signin__container-form-submitbutton"
        >
          Valider
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SigninBeforeCheckout;
