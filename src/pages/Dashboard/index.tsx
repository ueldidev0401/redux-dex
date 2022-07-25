import React from 'react';
import Web3 from 'web3';
import { Row, Col, Button, ButtonGroup, Card, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import './index.scss';
import cardLogo from '../assets/img/card-logo.png';

import { useDispatch, useSelector } from "react-redux";
import * as selectors from "store/selectors";
import { updateWalletConnection } from "store/actions";
import { tokenAddresses } from 'config';
import { AbiItem } from 'web3-utils';
import tokenABI from '../../abi/token.abi.json';
import stakingABI from '../../abi/staking.abi.json';
import { StakingAddress } from 'config';

declare let window: any;

const Dashboard = () => {

    const dispatch = useDispatch();
    const WalletState = useSelector(selectors.WalleteState);
    const connectionState = WalletState.wallet_connection;
    const wallet_balance = WalletState.wallet_balance;
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(stakingABI as AbiItem[], StakingAddress);
    const onClaim = async() =>{
        await contract.methods.claimReward().send({
            from : WalletState.account_address
        });
    };

    const onCompound = async() => {
        await contract.methods.compound(WalletState.account_address).send({
            from : WalletState.account_address
        });
    };
    return (
        <div className="home-container mb-5" style={{ fontFamily: 'Inter', color: 'white'}}>
            <Row style={{justifyContent:'center', marginTop:"40px"}}>
                <Col xl="6" md="12" sm="12" style={{textAlign : "center"}}>
                    <p className="dashboard-title">My Dashboard</p>
                    <Card className="custom-card">
                        <Row>
                            <Col xl="3" md="6" sm="6" xs="6" style={{padding:"0"}}>
                                <div className="daboard-content-header">Deposited</div>
                                <div className='daboard-content-body'>500.00</div>
                                <div className='button-layout'>
                                    <Button className='dashboard-content-button'>Stake More</Button>
                                </div>
                            </Col>
                            <Col xl="3" md="6" sm="6" xs="6" style={{padding:"0"}}>
                                <div className="daboard-content-header">Earned RDX</div>
                                <div className='daboard-content-body'>12.30</div>
                                <div className='button-layout'>
                                    <Button className='dashboard-content-button' onClick={() => onClaim()}>Claim</Button>
                                    <Button className='dashboard-content-button-compound' onClick={() => onCompound()}>Compound</Button>
                                </div>
                            </Col>
                            <Col xl="3" md="6" sm="6" xs="6" style={{padding:"0"}}>
                                <div className="daboard-content-header">APY</div>
                                <div className='daboard-content-body'>2.56%</div>
                            </Col>
                            <Col xl="3" md="6" sm="6" xs="6" style={{padding:"0"}}>
                                <div className="daboard-content-header">TVL</div>
                                <div className='daboard-content-body'>$12.55M</div>
                            </Col>  
                        </Row>
                    </Card>
                    <p className="dashboard-content">Your RDX tokens will be locked for 30 days. After this period, you’re free to withdraw at any time. Stake a minimum of 500 RDX for 30 days to participate. Every additional 500 RDX gets you an additional lottery ticket increasing your probability of being whitelisted in one of our IDOs.</p>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;