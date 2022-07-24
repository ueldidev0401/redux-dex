import React from 'react';
import Web3 from 'web3';
import { Row, Col, Button, ButtonGroup, Card, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import './index.scss';
import cardLogo from '../assets/img/card-logo.png';
import loader from '../assets/img/loader.gif';

import { useDispatch, useSelector } from "react-redux";
import * as selectors from "store/selectors";
import { updateWalletConnection } from "store/actions";
declare let window: any;

const Staking = () => {
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
    const [isModalShow, setModalShow] = useState<boolean>(false);

    const dispatch = useDispatch();
    const WalletState = useSelector(selectors.WalleteState);

    const connectionState = WalletState.wallet_connection;

    const onClick = (flag) => {
        if(flag == 'Deposit')
            setIsButtonClicked(false);
        else
            setIsButtonClicked(true);
    };
    const onStaking = () => {
        setModalShow(true);
    };
    const closeModal = () => {
        setModalShow(false);
    };

    const onConnetWallet = async () => {
        if(connectionState) {
            return;
        }else {
            loadWeb3();
        }
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
        <div className="home-container mb-5" style={{ fontFamily: 'Segoe UI', color: 'white'}}>
            <Row style={{justifyContent:'center'}}>
                <Col xl="4" md="12" sm="12" className="card-layout">
                    <ButtonGroup>
                        <Button className='main-button' onClick={()=>{onClick('Deposit');}} style={{backgroundColor : isButtonClicked ? 'transparent' : '#9400FF'}}>Deposit & Lock</Button>
                        <Button className='main-button' onClick={()=>{onClick('withdraw');}} style={{backgroundColor : isButtonClicked ? '#9400FF' : 'transparent'}}>Withdraw</Button>
                    </ButtonGroup>
                    <Card className="custom-card">
                        <Row className='card-content-header'>
                            <Col>
                                <p>
                                    Stake RDX to participate in whitelists for our upcoming IDOs. 
                                    <span style={{color:'#6600AE'}}>&nbsp;Learn more</span>
                                </p>
                            </Col>
                        </Row>
                        <Row className='card-content-body'>
                            <Col>
                                <p style={{float:'left'}}>
                                    Stake Amount
                                </p>
                                <p style={{textAlign:'right'}}>
                                    Balance : 0
                                </p>
                            </Col>
                        </Row>
                        <Card className='balance-card'>
                            <Row>
                                <Col>
                                    <div style={{float:'left'}}>
                                        <img src={cardLogo} style={{float:'left'}}></img>
                                        <Form.Control type="text" placeholder="0.00" size="lg" style={{width:"100px", border:'0px', marginLeft:'40px'}}></Form.Control>
                                    </div>
                                    <Button className="balance-card-buttion">MAX</Button>    
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{float:'left'}}>
                                        <p style={{marginTop:"10px"}}>RDX</p>
                                    </div>
                                    <span style={{float:'right', marginTop:'10px', color:'black'}}>$0.00</span>
                                </Col>
                            </Row>
                        </Card>
                        {
                            !connectionState? (
                                <Button className="card-content-button" onClick={() => onConnetWallet()}>Connect Wallet</Button>        
                            ) : (
                                <Button className="card-content-button" onClick={() => onStaking()}>
                                    {
                                        !isButtonClicked ? "Deposit & Lock" : "Withdraw"
                                    }
                                </Button>        
                            )
                        }
                        <p className="card-content-footer">
                        Your RDX tokens will be locked for 30 days. After this period, you’re free to withdraw at any time.
                        </p>
                    </Card>
                </Col>
            </Row>
            <Modal show={isModalShow} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header style={{border:"0px"}}>
                </Modal.Header>
                <Modal.Body>
                    <h4>Waiting for Confirmation</h4>
                    <p>Confirm this transaction in your wallet.</p>
                </Modal.Body>
                <Modal.Footer style={{border:"0px"}}>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Staking;