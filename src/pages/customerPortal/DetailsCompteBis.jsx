import React, { useState, useContext, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import useForm from '../../components/customedhooks/useForm';
import validate from '../../components/validators/validateEditCustomer';
import { AuthContext } from '../../contexts/auth';
import EditBillingForm from '../../components/EditBillingForm';
import EditShippingForm from '../../components/EditShippingForm';

const API = process.env.REACT_APP_API_URL;

Modal.setAppElement('#root');

const DetailsCompte = () => {
  const [customer, setCustomer] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await axios.get(`${API}users`);
      setCustomer(res.data);
    };
  }, []);

  const notify = () =>
    toast.success('Les modifications ont bien été prises en compte 😉', {
      position: 'bottom-center',
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const { state: authState } = useContext(AuthContext);

  const initialState = {
    username: '' ? '' : authState.user.username,
    firstname: '' ? '' : authState.user.firstname,
    lastname: '' ? '' : authState.user.lastname,
    phone: '' ? '' : authState.user.phone,
    email: '' ? '' : authState.user.email,
    address: '' ? '' : authState.user.address,
    zipcode: '' ? '' : authState.user.zipcode,
    city: '' ? '' : authState.user.city,
    country: '' ? '' : authState.user.country,
    // password: '',
    // newpassword: '',
    // newpasswordbis: '',
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  // const [redirect, setRedirect] = useState(false);

  // console.log('from details compte', values);

  async function submit() {
    try {
      const res = await axios.patch(
        `${API}users/`,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          phone: values.phone,
          email: values.email,
          address: values.address,
          zipcode: values.zipcode,
          city: values.city,
          country: values.country,
          // password: values.password,
        },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      // console.log('res ', values);
      if (res) {
        console.log('Submitted Succesfully');
        console.log(res);
        // setRedirect(true);
      }
      throw res;
    } catch (err) {
      console.log('error from details compte', err);
      setValues({
        ...values,
        isSubmitting: false,
        // errorMessage: error.message,
      });
    }
  }

  return (
    <div className="detailscompte__container">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="detailscompte__container-form"
      >
        <h2>Coordonnées</h2>
        <section className="detailscompte__container-form-names">
          <span className="detailscompte__container-form-field">
            <label htmlFor="firstname">Prénom</label>
            <span className="required">*</span>
            <input
              type="text"
              name="firstname"
              value={values.firstname || ''}
              onChange={handleChange}
              id="firstname"
            />
            {errors.firstname && <p className="error">{errors.firstname}</p>}
          </span>
          <span className="detailscompte__container-form-field">
            <label htmlFor="lastname">Nom</label>
            <span className="required">*</span>
            <input
              type="text"
              name="lastname"
              value={values.lastname || ''}
              id="lastname"
              // placeholder="Nom"
              onChange={handleChange}
            />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
          </span>
          <span className="detailscompte__container-form-field">
            <label htmlFor="username">
              Pseudo
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={values.username || ''}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </span>
        </section>
        <section className="detailscompte__container-form-otherinfo">
          <span className="detailscompte__container-form-field">
            <label htmlFor="phone">
              Téléphone
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={values.phone || ''}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </span>
          <span className="detailscompte__container-form-field">
            <label htmlFor="email">
              Email
              <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email || ''}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </span>
        </section>
        <span className="detailscompte__container-form-button">
          <button type="submit" onClick={notify} className="submit-button">
            Enregister les modifications
          </button>
        </span>
      </form>
      <section className="detailscompte__container-form-addresses">
        <h2>Adresses</h2>
        <div className="detailscompte__container-form-addresses-billing">
          <span className="detailscompte__container-form-addresses-billing-header">
            <h3>Adresse de facturation</h3>
          </span>
          <span className="detailscompte__container-form-addresses-billing-info">
            <span className="detailscompte__container-form-addresses-billing-info-name">
              <p>
                {authState.user.firstname} 
{' '}
{authState.user.lastname}
              </p>
            </span>
            <p>{authState.user.address}</p>
            <p>
              {authState.user.zipcode} {authState.user.city}
            </p>
            <p>{authState.user.country}</p>
            <p>{authState.user.phone}</p>
            <FontAwesomeIcon
              icon={faEdit}
              style={{ fontSize: '1.6em', margin: '1em 0 0 0' }}
              onClick={() => setModalIsOpen(true)}
            />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              className="Modal"
              overlayClassName="Overlay"
            >
              <span className="Modal__header">
                <button
                  type="button"
                  className="cross-button"
                  title="close modal"
                  onClick={() => setModalIsOpen(false)}
                >
                  ✕
                </button>
              </span>
              <EditBillingForm />
            </Modal>
          </span>
        </div>
        {/* <div className="detailscompte__container-form-addresses-shipping">
        </div> */}
      </section>
      <ToastContainer />
    </div>
  );
};

export default DetailsCompte;
