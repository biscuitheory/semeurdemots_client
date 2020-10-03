import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// const rubriques = [
//   'Accueil',
//   'Poisson rouge',
//   'Ambassadeurs',
//   'Editions',
//   'Commander',
//   'Mon compte',
//   'Panier',
// ];

const SubHeader = ({title}) => {
  console.log(title)
  return (
    <div className="subheader__container">
      <div className="subheader__container-titlebox">
  <h1 className="subheader__container-title">{title}</h1>
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
