export default function validateBillingAddress(values) {
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
  if (!values.email) {
    errors.email = 'Une adresse e-mail est obligatoire.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Veuillez insérer un e-mail valide.';
  }
  if (!values.phone) {
    errors.phone = 'Un numéro de téléphone est obligatoire.';
  } else if (!/^-?\d*\.?\d*$/.test(values.phone)) {
    errors.phone =
      'Veuillez utiliser des chiffres pour saisir votre numéro de téléphone.';
  }
  if (!values.address) {
    errors.address = 'Une adresse est obligatoire.';
  } else if (typeof values.address !== 'string') {
    errors.address =
      'Veuillez utiliser des caractères valides pour saisir votre adresse.';
  }
  if (!values.zipcode) {
    errors.zipcode = 'Un code postal est obligatoire.';
  } else if (typeof values.zipcode !== 'string') {
    errors.zipcode =
      'Veuillez utiliser des caractères valides pour saisir votre code postal.';
  }
  if (!values.city) {
    errors.city = 'Un nom de ville est obligatoire.';
  } else if (typeof values.city !== 'string') {
    errors.city =
      'Veuillez utiliser des caractères valides pour saisir le nom de votre ville.';
  }
  if (!values.country) {
    errors.country = 'Un nom de pays est obligatoire.';
  } else if (typeof values.country !== 'string') {
    errors.country =
      'Veuillez utiliser des caractères valides pour saisir le nom de votre pays.';
  }
  return errors;
}
