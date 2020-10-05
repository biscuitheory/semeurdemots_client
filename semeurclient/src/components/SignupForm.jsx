import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validateSignup';

const API = process.env.REACT_APP_API_URL;

const SignupForm = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );
  const history = useHistory();
  async function submit() {
    try {
      const res = await axios.post(`${API}signuplite`, {
        username: values.username,
        email: values.email,
        password: values.password,
        admin: values.admin,
      });
      if (res) {
        history.push('/compte-client');
      }
    } catch (err) {
      console.log('error from signup', err);
    }
  }

  return (
    <div className="signup__container">
      <h2>Créer un compte client</h2>
      <form
        onSubmit={handleSubmit}
        noValidate
        method="POST"
        action={`${API}signuplite`}
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
          <label htmlFor="email" className="signup__container-form-info-label">
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
              Vos données personnelles seront utilisées pour vous accompagner au
              cours de votre visite du site web, gérer l’accès à votre compte,
              et pour d’autres raisons décrites dans notre politique de
              confidentialité.
            </p>
          </div>
        </div>
        <button type="submit" className="signup__container-form-submitbutton">
          Valider
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
