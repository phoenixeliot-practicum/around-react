import React from 'react';
import logoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__section">
      <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" />
    </header>
  );
}

export default Header;
