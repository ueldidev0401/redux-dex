import React from 'react';
import Web3 from 'web3';
import { Row, Col, Button, ButtonGroup, Card, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import './index.scss';
import cardLogo from '../assets/img/card-logo.png';
import loader from '../assets/img/loader.gif';

const Staking = () => {
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
    const [isConnectedWallet, setIsConnectedWallet] = useState<boolean>(false);
    const [isModalShow, setModalShow] = useState<boolean>(false);

    const onClick = (flag) => {
        if(flag == 'Deposit')
            setIsButtonClicked(false);
        else
            setIsButtonClicked(true);
    };
    const onConnetWallet = async () => {
        if(!isConnectedWallet) {
            setIsConnectedWallet(true);
            return;
        }else {
            setModalShow(true);
        }
    };
    const closeModal = () => {
        setModalShow(false);
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
                        <Button className="card-content-button" onClick={() => onConnetWallet()}>
                            {
                                !isConnectedWallet ? "Connect Wallet" : 
                                (
                                    !isButtonClicked ? "Deposit & Lock" : "Withdraw"
                                )
                            }
                        </Button>
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