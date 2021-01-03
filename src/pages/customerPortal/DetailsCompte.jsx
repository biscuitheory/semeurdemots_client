import React, { useContext } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import useForm from '../../components/customedhooks/useForm';
import validate from '../../components/validators/validateEditCustomer';
import { AuthContext } from '../../contexts/auth';
// import usePasswordToggle from '../../components/customedhooks/usePasswordToggle';

const API = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const DetailsCompte = () => {
  // const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  // const [NewPasswordInputType, NewToggleIcon] = usePasswordToggle();
  // const [NewPasswordInputTypeBis, NewToggleIconBis] = usePasswordToggle();

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
          <span className="detailscompte__container-form-firstname">
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
          <span className="detailscompte__container-form-lastname">
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
        </section>
        <section className="detailscompte__container-form-otherinfo">
          <label htmlFor="username">
            Nom d&apos;utilisateur
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
        </section>
        <section className="detailscompte__container-form-addresses">
          <div className="detailscompte__container-form-addresses-billing">
            <h2>Adresse de facturation</h2>
            <label htmlFor="address">
              Adresse
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address || ''}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
            <label htmlFor="zipcode">
              Code postal
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              value={values.zipcode || ''}
              onChange={handleChange}
            />
            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
            <label htmlFor="city">
              Ville
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={values.city || ''}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}
            <label htmlFor="country">
              Pays
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={values.country || ''}
              onChange={handleChange}
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
          <div className="detailscompte__container-form-addresses-livraison" />
        </section>
        {/* <div className="detailscompte__container-form-passwordupdate">
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
          {errors.password && <p className="error">{errors.password}</p>} */}
        {/* <label htmlFor="newpassword">
              Nouveau mot de passe<span className="required">*</span>
            </label>
            <span className="detailscompte__container-form-passwordupdate-inputbox">
              <input
                type={NewPasswordInputType}
                name="newpassword"
                id="newpassword"
                // onChange={handleChange}
              ></input>
              <span className="password-toggle-icon">{NewToggleIcon}</span>
            </span>
            {errors.newpassword && (
              <p className="error">{errors.newpassword}</p>
            )}
            <label htmlFor="newpasswordbis">
              Confirmer le mot de passe<span className="required">*</span>
            </label>
            <span className="detailscompte__container-form-passwordupdate-inputbox">
              <input
                type={NewPasswordInputTypeBis}
                name="newpasswordbis"
                id="newpasswordbis"
                // onChange={handleChange}
              ></input>
              <span className="password-toggle-icon">{NewToggleIconBis}</span>
            </span>
            {errors.newpasswordbis && (
              <p className="error">{errors.newpasswordbis}</p>
            )} */}
        {/* </div> */}
        <button type="submit" onClick={notify} className="submit-button">
          Enregister les modifications
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DetailsCompte;
