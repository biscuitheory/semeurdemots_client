import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import useForm from './customedhooks/useForm';
import validate from './validators/validateSignin';
import { AuthContext } from '../contexts/auth';
import usePasswordToggle from './customedhooks/usePasswordToggle';

const API =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const SigninFormAdmin = () => {
  const { dispatch } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const initialState = {
    username: '',
    email: '',
    password: '',
    admin: false,
    // isSubmitting: false,
    // errorMessage: null,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );
  // const history = useHistory();

  async function submit() {
    try {
      const res = await axios.post(`${API}signinadmin`, {
        emailOrUsername: values.emailOrUsername,
        password: values.password,
        admin: values.admin,
      });
      if (res.status === 200) {
        dispatch({
          type: 'SIGNIN',
          payload: res,
        });
        setRedirect(true);
        // return;
      }
      throw res;
    } catch (error) {
      setValues({
        ...values,
        errorMessage: error.message,
      });

      toast.error("Ce compte n'existe pas", {
        // className: 'error-toast',
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

  if (redirect) {
    return <Redirect to="/mon-compte" />;
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

export default SigninFormAdmin;
