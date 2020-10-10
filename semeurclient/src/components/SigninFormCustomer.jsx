import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import useForm from './customedhooks/useForm';
import validate from './validators/validateSignin';
import { AuthContext } from '../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const SigninFormCustomer = () => {
  const { dispatch } = useContext(AuthContext);
  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    submit,
    validate
  );
  const [redirect, setRedirect] = useState(false);
  // const history = useHistory();

  async function submit() {
    try {
      const res = await axios.post(`${API}signincustomer`, {
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
        isSubmitting: false,
        errorMessage: error.message,
      });
    }
  }
  if (redirect) {
    return <Redirect to="/mon-compte" />;
  } else {
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
              {errors.emailOrUsername && (
                <p className="error">{errors.emailOrUsername}</p>
              )}
            </div>
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
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="signin__container-form-info-input"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>
          <button type="submit" className="signin__container-form-submitbutton">
            Valider
          </button>
        </form>
      </div>
    );
  }
};

export default SigninFormCustomer;
