import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav, NavDropdown, Modal as BsModal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import logo from '../../../assets/img/main-logo.png';
import './index.scss';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onhandleConnectWalletButton = () => {
    alert('connect wallet');
  };

  const onhandleBuyRDXButton = () => {
    alert('buy RDX!');
  };

  return (
    <BsNavbar className='px-5 py-3' expand='lg' collapseOnSelect>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0 c-logo-container'
          to={routeNames.staking}
        >
          <img src={logo}/>
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
            <Link to={'#'} className='custom-navbar-button auth-button' onClick={onhandleConnectWalletButton}>
              Connect Wallet
            </Link>
            <Link to={ '#' } className='custom-navbar-button buy-rdx-button' onClick={onhandleBuyRDXButton}>
              Buy $RDX
            </Link>
          </Nav>
        </BsNavbar.Collapse>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
