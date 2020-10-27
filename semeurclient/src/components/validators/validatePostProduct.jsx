export default function validatePostProduct(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Un nom de produit est obligatoire.';
  } else if (typeof values.name !== 'string') {
    errors.name =
      'Veuillez utiliser des caractères valides pour saisir le nom de produit.';
  }
  //   if (!values.type) {
  //     errors.lastname = 'Un type de produit est obligatoire.';
  //   } else if (typeof values.type !== 'string') {
  //     errors.type =
  //       'Veuillez utiliser des caractères valides pour saisir votre nom de famille .';
  //   }
  if (!values.price) {
    errors.price = 'Un prix est obligatoire.';
  } else if (typeof values.price !== 'string') {
    errors.price = 'Veuillez utiliser des chiffres pour saisir le prix.';
  } else if (!/^-?\d*\.?\d*$/.test(values.price)) {
    errors.price = 'Veuillez utiliser des chiffres pour saisir le prix.';
  }

  if (!values.stock) {
    errors.stock = 'Un nombre de stock est obligatoire.';
  } else if (typeof values.stock !== 'string') {
    errors.stock =
      'Veuillez utiliser des caractères valides pour saisir le stock de produits.';
  } else if (!/^-?\d*\.?\d*$/.test(values.stock)) {
    errors.stock =
      'Veuillez utiliser des chiffres pour saisir le stock de produits.';
  }

  if (!values.description) {
    errors.description = 'Une description du produit est obligatoire.';
  } else if (typeof values.description !== 'string') {
    errors.description =
      'Veuillez utiliser des caractères valides pour saisir la description du produit.';
  }

  return errors;
}
