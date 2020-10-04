export default function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Un prénom est obligatoire.';
  } else if (typeof values.username !== 'string') {
    errors.username =
      'Veuillez utiliser des caractères valides pour saisir votre prénom.';
  }
  if (!values.email) {
    errors.email = 'Une adresse e-mail est obligatoire.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Veuillez insérer un e-mail valide.';
  }
  if (!values.password) {
    errors.password = 'Un mot de passe est obligatoire.';
  } else if (values.password.length < 8) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
  }

  return errors;
}
