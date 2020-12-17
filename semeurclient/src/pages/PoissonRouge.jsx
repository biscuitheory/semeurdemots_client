import React from 'react';

const PoissonRouge = () => {
  return (
    <div
      className="homepage__container"
      style={{
        paddingTop: '10em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>🚧 Partie du site en chantier 🚧</h2>
      <p>La partie éditoriale est en cours de réécriture...</p>
      <p>
        Si vous souhaitez tout de même consulter la version bêta du site
        réalisée sur Wordpress, elle est disponible à l&apos;adresse suivante
        :&nbsp;
        <a href="https://www.semeurdemots.fr">https://www.semeurdemots.fr/</a>
      </p>
      <p>
        En attendant, vous pouvez bien entendu visiter la boutique en ligne et
        passer vos commandes 🛒
      </p>
    </div>
  );
};
export default PoissonRouge;
