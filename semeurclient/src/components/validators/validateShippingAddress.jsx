export default function validateShippingAddress(values) {
  const errors = {};

  if (!values.shippingFirstname) {
    errors.shippingFirstname = 'Un prénom est obligatoire.';
  } else if (typeof values.shippingFirstname !== 'string') {
    errors.shippingFirstname =
      'Veuillez utiliser des caractères valides pour saisir votre prénom.';
  }
  if (!values.shippingLastname) {
    errors.shippingLastname = 'Un nom de famille est obligatoire.';
  } else if (typeof values.shippingLastname !== 'string') {
    errors.shippingLastname =
      'Veuillez utiliser des caractères valides pour saisir votre nom de famille.';
  }
  if (!values.shippingAddress) {
    errors.shippingAddress = 'Une adresse est obligatoire.';
  } else if (typeof values.shippingAddress !== 'string') {
    errors.shippingAddress =
      'Veuillez utiliser des caractères valides pour saisir votre adresse.';
  }
  if (!values.shippingZipcode) {
    errors.shippingZipcode = 'Un code postal est obligatoire.';
  } else if (typeof values.shippingZipcode !== 'string') {
    errors.shippingZipcode =
      'Veuillez utiliser des caractères valides pour saisir votre code postal.';
  }
  if (!values.shippingCity) {
    errors.shippingCity = 'Un nom de ville est obligatoire.';
  } else if (typeof values.shippingCity !== 'string') {
    errors.shippingCity =
      'Veuillez utiliser des caractères valides pour saisir le nom de votre ville.';
  }
  if (!values.shippingCountry) {
    errors.shippingCountry = 'Un nom de pays est obligatoire.';
  } else if (typeof values.shippingCountry !== 'string') {
    errors.shippingCountry =
      'Veuillez utiliser des caractères valides pour saisir le nom de votre pays.';
  }
  return errors;
}
