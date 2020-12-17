import React from 'react';
import { Link } from 'react-router-dom';

const PoissonRouge = () => {
  return (
    <div
      className="homepage__container"
      style={{
        // paddingTop: '10em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>🚧 Partie du site en chantier 🚧</h2>
      <p style={{ textAlign: 'center' }}>
        La partie éditoriale est en cours de réécriture...
      </p>
      <p style={{ textAlign: 'center' }}>
        Si vous souhaitez tout de même consulter la version bêta du site
        réalisée sur Wordpress, elle est disponible à l&apos;adresse suivante
        :&nbsp;
      </p>
      <a
        style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '1em' }}
        href="https://www.semeurdemots.fr"
      >
        https://www.semeurdemots.fr/
      </a>
      <p style={{ textAlign: 'center' }}>
        En attendant, vous pouvez bien entendu visiter la&nbsp;
        <Link to="/">
          <button className="submit-button" type="button">
            Boutique en ligne
          </button>
        </Link>
        &nbsp; et tester la commande de produits 🛒
      </p>
    </div>
  );
};
export default PoissonRouge;
