export default function validateEditCustomer(values) {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = 'Un prénom est obligatoire.';
  } else if (typeof values.firstname !== 'string') {
    errors.firstname =
      'Veuillez utiliser des caractères valides pour saisir votre prénom.';
  }
  if (!values.lastname) {
    errors.lastname = 'Un nom de famille est obligatoire.';
  } else if (typeof values.lastname !== 'string') {
    errors.lastname =
      'Veuillez utiliser des caractères valides pour saisir votre nom de famille.';
  }
  if (!values.username) {
    errors.username = "Un nom d'utilisateur est obligatoire.";
  } else if (typeof values.username !== 'string') {
    errors.username =
      "Veuillez utiliser des caractères valides pour saisir votre nom d'utilisateur.";
  }
  if (!values.email) {
    errors.email = 'Une adresse e-mail est obligatoire.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Veuillez insérer un e-mail valide.';
  }
  //   if (!values.password) {
  //     errors.password = 'Un mot de passe est obligatoire.';
  //   }
  if (!values.phone) {
    errors.phone = 'Un numéro de téléphone est obligatoire.';
  } else if (typeof values.phone !== 'string') {
    errors.phone =
      'Veuillez utiliser des caractères valides pour saisir votre numéro de téléphone.';
  } else if (!/^-?\d*\.?\d*$/.test(values.phone)) {
    errors.phone =
      'Veuillez utiliser des chiffres pour saisir votre numéro de téléphone.';
  }

  if (!values.address) {
    errors.address = 'Une adresse est obligatoire.';
  } else if (typeof values.address !== 'string') {
    errors.address =
      "Veuillez utiliser des caractères valides pour saisir votre nom d'utilisateur.";
  }
  if (!values.zipcode) {
    errors.zipcode = 'Un code postal est obligatoire.';
  } else if (typeof values.zipcode !== 'string') {
    errors.zipcode =
      "Veuillez utiliser des caractères valides pour saisir votre nom d'utilisateur.";
  }
  if (!values.city) {
    errors.city = 'Un nom de ville est obligatoire.';
  } else if (typeof values.city !== 'string') {
    errors.city =
      "Veuillez utiliser des caractères valides pour saisir votre nom d'utilisateur.";
  }
  if (!values.country) {
    errors.country = 'Un nom de pays est obligatoire.';
  } else if (typeof values.country !== 'string') {
    errors.country =
      "Veuillez utiliser des caractères valides pour saisir votre nom d'utilisateur.";
  }

  //   if (!values.newpassword) {
  //     errors.newpassword = 'Un mot de passe est obligatoire.';
  //   } else if (values.newpassword.length < 8) {
  //     errors.newpassword =
  //       'Le nouveau mot de passe doit contenir au moins 8 caractères.';
  //   }
  //   if (!values.newpasswordbis) {
  //     errors.newpasswordbis = 'Un mot de passe est obligatoire.';
  //   } else if (values.newpasswordbis != values.newpassword) {
  //     errors.newpasswordbis = 'Les mots de passe ne sont pas identiques.';
  //   }

  return errors;
}
