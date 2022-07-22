import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav, NavDropdown, Modal as BsModal, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Navbar} from 'react-responsive-navbar-overlay';
import { routeNames } from 'routes';
import logo from '../../../assets/img/main-logo.png';
import './index.scss';


const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onhandleConnectWalletButton = () => {
    alert('connect wallet');
  };

  const onhandleBuyRDXButton = () => {
    alert('buy RDX!');
  };

  const customlinks = [
    {
      text : 'Staking',
      link : '/'
    },
    {
      text : 'Dashboard',
      link : '/dashboard'
    },
    {
      text : 'Connect Wallet',
      link : '#'
    }
    ,
    {
      text : 'Buy $RDX',
      link : '#'
    }
  ];

  return (
    <div>
      <div className="Topbar">
        <p>Always make sure the URL is reduxprotocol.io - bookmark it to be safe.</p>
      </div>
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
      {/* <Navbar backgroundColor={"transparent"} brand={""} links={customlinks}></Navbar> */}
    </div>
  );
};

export default Topbar;