import React, { useState } from 'react';
import axios from 'axios';

import useForm from '../../components/customedhooks/useForm';

const API = process.env.REACT_APP_API_URL;

const DetailsCompte = () => {
  // const { handleChange, handleSubmit, values, setValues, errors } = useForm(
  //   submit
  // );

  // async function submit() {
  //   try {
  //     const res = await axios.put(`${API}users/${values.id}`, {
  //       firstname: values.firstname,
  //       lastname: values.lastname,
  //       username: values.username,
  //       password: values.password,
  //       admin: values.admin,
  //     });
  //   } catch (error) {
  //     setValues({
  //       ...values,
  //       isSubmitting: false,
  //       errorMessage: error.message,
  //     });
  //   }

  return (
    <div className="detailscompte__container">
      <form noValidate className="detailscompte__container-form">
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
            placeholder="Nom"
          ></input>
          <label htmlFor="email">
            Email<span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          ></input>
        </span>
        <div className="detailscompte__container-form-passwordupdate">
          <p>Changement du mot de passe</p>
          <label htmlFor="password">
            Mot de passe actuel<span className="required">*</span>
          </label>
          <input type="text" name="password" id="password"></input>
          <label htmlFor="newpassword">
            Nouveau mot de passe<span className="required">*</span>
          </label>
          <input type="text" name="password" id="newpassword"></input>
          <label htmlFor="newpasswordbis">
            Confirmer le mot de passe<span className="required">*</span>
          </label>
          <input type="text" name="password" id="newpasswordbis"></input>
        </div>
        <button type="submit" className="submit-button">
          Enregister les modifications
        </button>
      </form>
    </div>
  );
};

export default DetailsCompte;
