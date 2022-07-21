import React from 'react';
import { Row, Col, Button, ButtonGroup, Card } from 'react-bootstrap';
import { useState } from 'react';
import './index.scss';
import cardLogo from '../assets/img/card-logo.png';

import { routeNames } from 'routes';

const CasinoProtocolHome = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const onClick = (flag) => {
        if(flag == 'Deposit')
            setIsButtonClicked(false);
        else
            setIsButtonClicked(true);
    };
    return (
        <div className="home-container mb-5" style={{ fontFamily: 'Segoe UI', color: 'white', marginTop: '28px' }}>
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
                                        <img src={cardLogo} style={{width:'33px'}}></img>
                                        <span style={{fontSize:'26px', marginLeft:'15px', color:'black'}}>0.00</span>
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
                        <Button className="card-content-button">
                            Connect Wallet
                        </Button>
                        <p className="card-content-footer">
                        Your RDX tokens will be locked for 30 days. After this period, you’re free to withdraw at any time.
                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CasinoProtocolHome;