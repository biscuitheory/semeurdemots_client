import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="footer__container">
      <section className="footer__container-links">
        <a href="/">Mentions légales</a>
        <a href="/">CGU / CGV</a>
        <a href="/">Politique de confidentialité</a>
        <a href="/">Presse</a>
        <a href="/">Contact</a>
      </section>
      <div className="footer__container-title">
        <a href="/"><h2>Semeur de mots</h2></a>
      </div>
      <section className="footer__container-social">
        <a href="https://www.facebook.com/semeurdemotsOfficiel " target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
        <a href="https://www.instagram.com/semeurdemots/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
      </section>
    </div>
  );
};

export default Footer;
