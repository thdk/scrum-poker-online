import * as React from 'react';

import './header.css';
import { Link } from 'react-router-dom';

export const Header = () => (
  <div className="header">
    <Link
      to="/game"
      className="header__link"
    >
      GAME
    </Link>
    <Link
      to="/settings"
      className="header__link"
    >
      SETTINGS
    </Link>
  </div>
);
