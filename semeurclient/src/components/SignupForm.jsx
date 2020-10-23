import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import useForm from './customedhooks/useForm';
import validate from './validators/validateSignup';

const API = process.env.REACT_APP_API_URL;

const SignupForm = () => {
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

  const notify = () =>
    toast.success(
      "Inscription bien reçue ! Pour activer votre compte, cliquez sur le lien d'activation dans l'email que nous venons de vous envoyer 😉",
      {
        position: 'top-center',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  // const [redirect, setRedirect] = useState(false);

  async function submit() {
    try {
      const res = await axios.post(`${API}signup`, {
        username: values.username,
        email: values.email,
        password: values.password,
        admin: values.admin,
      });

      if (res.status === 201) {
        // setRedirect(true);
      }
    } catch (err) {
      console.log('error from signup', err);
      setValues({
        ...values,
        errorMessage: err.message,
      });
    }
  }

  // if (redirect) {
  //   return <Redirect to="/mon-compte" />;
  // } else {
    return (
      <div className="signup__container">
        <h2>Créer un compte client</h2>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="signup__container-form"
        >
          <div className="signup__container-form-info">
            <label
              htmlFor="username"
              className="signup__container-form-info-label"
            >
              Nom d'utilisateur
            </label>
            <span className="required">*</span>
            <div className="signup__container-form-info-inputbox">
              <input
                id="username"
                type="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                className="signup__container-form-info-input"
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
          </div>
          <div className="signup__container-form-info">
            <label
              htmlFor="email"
              className="signup__container-form-info-label"
            >
              Email
            </label>
            <span className="required">*</span>
            <div className="signup__container-form-info-inputbox">
              <input
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="signup__container-form-info-input"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>
          <div className="signup__container-form-info">
            <label
              htmlFor="password"
              className="signup__container-form-info-label"
            >
              Mot de passe
            </label>
            <span className="required">*</span>
            <div className="signup__container-form-info-inputbox">
              <input
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="signup__container-form-info-input"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="signup__container-form-info-disclaimerbox">
              <p>
                Vos données personnelles seront utilisées pour vous accompagner
                au cours de votre visite du site web, gérer l’accès à votre
                compte, et pour d’autres raisons décrites dans notre politique
                de confidentialité.
              </p>
            </div>
          </div>
          <button
            type="submit"
            onClick={notify}
            className="signup__container-form-submitbutton"
          >
            Valider
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  // }
};

export default SignupForm;
