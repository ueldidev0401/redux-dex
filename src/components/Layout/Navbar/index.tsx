import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import logo from '../../../assets/img/main-logo.png';
import './index.scss';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <BsNavbar className='px-4 py-3' expand='lg' collapseOnSelect>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0 c-logo-container'
          to={routeNames.staking}
        >
          <img className="casino-navbar" src={logo}/>
        </Link>

        <BsNavbar.Toggle aria-controls='responsive-navbar-nav' style={{ background: "#D8D3D3" }} />
        <BsNavbar.Collapse id='responsive-navbar-nav' className='nav-menu-wrap'>
          <Nav className='ml-auto'>
            <Link to={routeNames.staking} className='custom-navbar-button custom-navbar-normal-button'>
              Staking
            </Link>
            <Link to={routeNames.dashboard} className='custom-navbar-button custom-navbar-normal-button'>
              Dashboard
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
