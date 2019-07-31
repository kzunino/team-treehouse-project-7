import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {

  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/travel">Travel</NavLink></li>
        <li><NavLink to="/hiking">Hiking</NavLink></li>
        <li><NavLink to="/camping">Camping</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;
