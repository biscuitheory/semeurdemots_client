import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="footer__container">
      <section className="footer__container-links">
        <a>Mentions légales</a>
        <a>CGU / CGV</a>
        <a>Politique de confidentialité</a>
        <a>Presse</a>
        <a>Contact</a>
      </section>
      <div className="footer__container-title">
        <h2>Semeur de mots</h2>
      </div>
      <section className="footer__container-social">
        <a href="https://www.facebook.com/semeurdemotsOfficiel " target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
        <a href="https://www.instagram.com/semeurdemots/" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
      </section>
    </div>
  );
};

export default Footer;
