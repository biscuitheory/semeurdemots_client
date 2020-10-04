import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Breakpoint } from 'react-socks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <nav className="navbar__container">
      <Breakpoint customQuery="(max-width: 1025px)">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setModalIsOpen(true)}
          className="navbar__container-icon"
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="navbar__container-modal"
        >
          <FontAwesomeIcon
            type="button"
            title="close modal"
            onClick={() => setModalIsOpen(false)}
            icon={faTimesCircle}
            className="navbar__container-modal-crossbtn"
          />
          <DropdownMenu />
        </Modal>
      </Breakpoint>
      <Breakpoint customQuery="(min-width: 1025px)">
        <DropdownMenu />
      </Breakpoint>
    </nav>
  );

  function DropdownMenu() {
    return (
      <ul className="navbar__container-list">
        <DropdownItem href="/">Accueil</DropdownItem>
        <DropdownItem href="/poisson-rouge">Poisson rouge</DropdownItem>
        <DropdownItem href="/ambassadeurs">Ambassadeurs</DropdownItem>
        <DropdownItem href="/editions">Editions</DropdownItem>
        <DropdownItem href="/commander">Commander</DropdownItem>
        <DropdownItem href="/compte-client">Compte client</DropdownItem>
        <DropdownItem href="/panier">Panier</DropdownItem>
      </ul>
    );
  }

  function DropdownItem(props) {
    console.log(props.href);
    return (
      <Link to={props.href} className="navbar__container-list-item">
        {props.children}
      </Link>
    );
  }
};

export default Navbar;
