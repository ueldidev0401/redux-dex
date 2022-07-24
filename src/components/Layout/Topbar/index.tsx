import React, { useEffect, useState } from "react";
import {
  Navbar as BsNavbar,
  NavItem,
  Nav,
  NavDropdown,
  Modal as BsModal,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routeNames } from "routes";
import logo from "../../../assets/img/main-logo.png";
import metamaskLogo from "../../../assets/img/metamask.png";
import "./index.scss";
import Web3 from "web3";

import { useDispatch, useSelector } from "react-redux";
import * as selectors from "store/selectors";
import { updateWalletConnection } from "store/actions";

declare let window: any;

const Topbar = () => {
  const dispatch = useDispatch();
  const WalletState = useSelector(selectors.WalleteState);

  const connectionState = WalletState.wallet_connection;
  const account = WalletState.account_address;

  const onhandleConnectWalletButton = () => {
    if (connectionState) return;
    loadWeb3();
  };

  const onhandleBuyRDXButton = () => {
    alert("buy RDX!");
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
      checkConnection();
    }
  }, []);

  function checkConnection() {
    window.ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountChanged)
      .catch(console.error);
  }

  function handleAccountChanged(accounts) {
    if (accounts.length === 0) {
      console.log("metamask locked");
      dispatch(
        updateWalletConnection({
          connection_state: false,
          account_address: "",
        })
      );
    } else {
      dispatch(
        updateWalletConnection({
          connection_state: true,
          account_address: accounts[0].toString(),
        })
      );
    }
  }

  const loadWeb3 = async () => {
    try {
      if (window.ethereum?.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = Web3.utils.toChecksumAddress(accounts[0]).toString();
        dispatch(
          updateWalletConnection({
            connection_state: true,
            account_address: account,
          })
        );
      } else {
        console.log("should install metamask");
      }
    } catch (error) {
      dispatch(
        updateWalletConnection({
          connection_state: false,
          account_address: "",
        })
      );
    }
  };

  return (
    <div>
      <div className="Topbar">
        <p>
          Always make sure the URL is reduxprotocol.io - bookmark it to be safe.
        </p>
      </div>
      <BsNavbar className="px-5 py-3" expand="lg" collapseOnSelect>
        <div className="container-fluid">
          <Link
            className="d-flex align-items-center navbar-brand mr-0 c-logo-container"
            to={routeNames.staking}
          >
            <img src={logo} />
          </Link>
          <BsNavbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ background: "#D8D3D3" }}
          />
          <BsNavbar.Collapse
            id="responsive-navbar-nav"
            className="nav-menu-wrap"
          >
            <Nav className="ml-auto">
              <Link
                to={routeNames.staking}
                className="custom-navbar-button custom-navbar-normal-button"
              >
                Staking
              </Link>
              <Link
                to={routeNames.dashboard}
                className="custom-navbar-button custom-navbar-normal-button"
              >
                Dashboard
              </Link>
              <Link
                to={"#"}
                className="custom-navbar-button auth-button"
                onClick={onhandleConnectWalletButton}
              >
                {connectionState ? (
                  <>
                    <img src={metamaskLogo} style={{ width: "25px" }} />
                    <span style={{ fontSize: "15px" }}>
                      &nbsp;
                      {account.slice(0, 6) +
                        "..." +
                        account.slice(account.length - 4, account.length)}{" "}
                    </span>
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Link>
              <Link
                to={"#"}
                className="custom-navbar-button buy-rdx-button"
                onClick={onhandleBuyRDXButton}
              >
                Buy $RDX
              </Link>
            </Nav>
          </BsNavbar.Collapse>
        </div>
      </BsNavbar>
    </div>
  );
};

export default Topbar;
