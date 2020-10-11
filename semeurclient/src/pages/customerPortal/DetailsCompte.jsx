import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import axios from 'axios';

import useForm from '../../components/customedhooks/useForm';
import validate from '../../components/validators/validateEditCustomer';
import usePasswordToggle from '../../components/customedhooks/usePasswordToggle';

const API = process.env.REACT_APP_API_URL;

const DetailsCompte = () => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [NewPasswordInputType, NewToggleIcon] = usePasswordToggle();
  const [NewPasswordInputTypeBis, NewToggleIconBis] = usePasswordToggle();

  const { state: authState } = useContext(AuthContext);
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );

  async function submit() {
    try {
      const res = await axios.put(`${API}users/${values.id}`, {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        password: values.password,
        admin: values.admin,
      });
      if (res) {
        console.log('res from details compte', res);
      }
    } catch (err) {
      console.log('error from details compte', err);
      // setValues({
      //   ...values,
      //   isSubmitting: false,
      //   errorMessage: error.message,
      // });
    }
  }

  return (
    <div className="detailscompte__container">
      <form
        onSubmit={handleSubmit}
        noValidate
        method="PUT"
        action={`${API}users/${values.id}`}
        className="detailscompte__container-form"
      >
        <span className="detailscompte__container-form-names">
          <span className="detailscompte__container-form-firstname">
            <label htmlFor="firstname">Prénom</label>
            <span className="required">*</span>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Prénom"
            ></input>
          </span>
          <span className="detailscompte__container-form-lastname">
            <label htmlFor="lastname">Nom</label>
            <span className="required">*</span>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Nom"
              onChange={handleChange}
            ></input>
          </span>
        </span>
        <span className="detailscompte__container-form-otherinfo">
          <label htmlFor="username">
            Nom d'utilisateur<span className="required">*</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
          ></input>
          <label htmlFor="email">
            Email<span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          ></input>
        </span>
        <div className="detailscompte__container-form-passwordupdate">
          <p>Changement du mot de passe</p>
          <label htmlFor="password">
            Mot de passe actuel<span className="required">*</span>
          </label>
          <span className="detailscompte__container-form-passwordupdate-inputbox">
            <input
              type={PasswordInputType}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
            ></input>
            <span className="password-toggle-icon">{ToggleIcon}</span>
          </span>
          {errors.password && <p className="error">{errors.password}</p>}
          <label htmlFor="newpassword">
            Nouveau mot de passe<span className="required">*</span>
          </label>
          <span className="detailscompte__container-form-passwordupdate-inputbox">
            <input
              type={NewPasswordInputType}
              name="newpassword"
              id="newpassword"
              onChange={handleChange}
            ></input>
            <span className="password-toggle-icon">{NewToggleIcon}</span>
          </span>
          {errors.newpassword && <p className="error">{errors.newpassword}</p>}
          <label htmlFor="newpasswordbis">
            Confirmer le mot de passe<span className="required">*</span>
          </label>
          <span className="detailscompte__container-form-passwordupdate-inputbox">
            <input
              type={NewPasswordInputTypeBis}
              name="newpasswordbis"
              id="newpasswordbis"
              onChange={handleChange}
            ></input>
            <span className="password-toggle-icon">{NewToggleIconBis}</span>
          </span>
          {errors.newpasswordbis && <p className="error">{errors.newpasswordbis}</p>}
        </div>
        <button type="submit" className="submit-button">
          Enregister les modifications
        </button>
      </form>
    </div>
  );
};

export default DetailsCompte;
