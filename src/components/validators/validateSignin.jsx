export default function validateSignin(values) {
  const errors = {};

  if (!values.emailOrUsername) {
    errors.emailOrUsername =
      "Un email ou un nom d'utilisateur est obligatoire.";
  } else if (
    !/^(?=[a-z0-9.]{3,20}$)[a-z0-9]+\.?[a-z0-9]+$|^.*@\w+\.[\w.]+$/i.test(
      values.emailOrUsername
    )
  ) {
    errors.emailOrUsername =
      "Veuillez insérer un nom d'utilisateur ou un e-mail valide.";
  }
  if (!values.password) {
    errors.password = 'Un mot de passe est obligatoire.';
  } else if (values.password.length < 8) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
  }

  return errors;
}
