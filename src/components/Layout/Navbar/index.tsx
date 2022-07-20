import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import logo from '../../../assets/img/casino-navbar.png';
import './index.scss';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <BsNavbar className='px-4 py-3' expand='lg' collapseOnSelect style={{ background: "#141414", borderBottom: "1px solid #707070" }}>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0 c-logo-container'
          to={routeNames.home}
        >
          <img className="casino-navbar" src={logo}/>
        </Link>

        <BsNavbar.Toggle aria-controls='responsive-navbar-nav' style={{ background: "#D8D3D3" }} />
        <BsNavbar.Collapse id='responsive-navbar-nav' className='nav-menu-wrap'>
          <Nav className='ml-auto'>
            <Link to={routeNames.casinoswap} className='custom-navbar-button custom-navbar-normal-button'>
              Casinoswap
            </Link>
            <Link to={routeNames.dicegame} className='custom-navbar-button custom-navbar-normal-button'>
              Dice game
            </Link>
            <Link to={routeNames.farms} className='custom-navbar-button custom-navbar-normal-button'>
              Farms
            </Link>
            <Link to={routeNames.presale} className='custom-navbar-button custom-navbar-normal-button'>
              Presale
            </Link>
            <Link to={routeNames.bridge} className='custom-navbar-button custom-navbar-normal-button'>
              Bridge
            </Link>
            <Link to={{ pathname: routeNames.unlock }} state={{ pastURL: location.pathname }} className='custom-navbar-button auth-button'>
              Connect Wallet
            </Link>
          </Nav>
        </BsNavbar.Collapse>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
