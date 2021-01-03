import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div className="errorpage__container">
        <h1>Oups ! </h1>
        <h2>
          La page que vous demandiez n&apos;a pu être trouvée, il semblerait que
          vous ayez perdu votre chemin ?
        </h2>
        <div className="errorpage__container-barre" />
        <p>Pas de panique, Nina va vous raccompagner 🙂</p>
        <Link to="/">
          <button className="submit-button" type="button">
            Retourner à la page d&apos;accueil
          </button>
        </Link>
      </div>
    </>
  );
};
export default ErrorPage;
