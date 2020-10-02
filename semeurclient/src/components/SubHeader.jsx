import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const rubriques = [
  'Accueil',
  'Poisson rouge',
  'Ambassadeurs',
  'Editions',
  'Commander',
  'Mon compte',
  'Panier',
];

const SubHeader = () => {
  return (
    <div className="subheader__container">
      <div className="subheader__container-titlebox">
      {rubriques.map((rubrique, i) => (<h1 className="subheader__container-title">{rubrique}</h1>))}
      </div>
      <div className="subheader__container-breadcrumbbox">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        {'>'}
        <p>Commander</p>
      </div>
    </div>
  );
};

export default SubHeader;
