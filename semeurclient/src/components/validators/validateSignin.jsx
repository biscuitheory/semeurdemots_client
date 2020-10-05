export default function validateSignin(values) {
    const errors = {};
  
    if (!values.emailOrUsername) {
      errors.emailOrUsername =
        "Un email ou un nom d'utilisateur est obligatoire.";
    } else if (
      !/\S+@\S+\.\S+/.test(values.emailOrUsername) &&
      typeof values.emailOrUsername !== 'string'
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
  