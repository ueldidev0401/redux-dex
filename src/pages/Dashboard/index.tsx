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
import confirmImage from '../../assets/img/Shape.png';
import transactionLoader from '../../assets/img/loader.gif';


declare let window: any;

const Dashboard = () => {
    const [depositedAmount, setDepositedAmount] = useState<any>('0');
    const [earnedRDX, setEarnedRDX] = useState<any>('0');
    const [isModalShow, setModalShow] = useState<boolean>(false);
    const [isTransactionConfirm, setIsTransactionConfirm] = useState<boolean>(false);
    const dispatch = useDispatch();
    const WalletState = useSelector(selectors.WalleteState);
    const connectionState = WalletState.wallet_connection;
    const wallet_balance = WalletState.wallet_balance;
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(stakingABI as AbiItem[], StakingAddress);
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

    async function handleAccountChanged(accounts) {
        if (accounts.length === 0) {
          console.log("metamask locked");
          dispatch(
            updateWalletConnection({
              connection_state: false,
              account_address: "",
              wallet_balance : 0,
            })
          );
        } else {
            const rdxAddress = tokenAddresses[0].address;
            const tokenInst = new web3.eth.Contract(tokenABI as AbiItem[], rdxAddress);
            const balanceDec = await tokenInst.methods.balanceOf(accounts[0]).call();
            const balance = await web3.utils.fromWei(balanceDec, "ether");
            const userInfo = await contract.methods.users(accounts[0]).call();
            const depositedAmount_t = web3.utils.fromWei(userInfo[0], "ether");
            setDepositedAmount( depositedAmount_t );
            const earnedRDX_t = await contract.methods.earned(accounts[0]).call();
            const earned_eth = web3.utils.fromWei(earnedRDX_t, "ether");
            setEarnedRDX( earned_eth );
            dispatch(
                updateWalletConnection({
                connection_state: true,
                account_address: accounts[0].toString(),
                wallet_balance : balance,
                })
            );
        }
    }
    const closeModal = () => {
        setModalShow(false);
    };
    const onClaim = async() =>{
        try {
            setModalShow(true);
            setIsTransactionConfirm(false);
            await contract.methods.claimReward().send({
                from : WalletState.account_address
            });
            const userInfo = await contract.methods.users(WalletState.account_address).call();
            const depositedAmount_t = web3.utils.fromWei(userInfo[0], "ether");
            setDepositedAmount( depositedAmount_t );
            const earnedRDX_t = await contract.methods.earned(WalletState.account_address).call();
            const earned_eth = web3.utils.fromWei(earnedRDX_t, "ether");
            setEarnedRDX( earned_eth );
            setIsTransactionConfirm(true);
        } catch (e) {
            setModalShow(false);
        }
    };

    const onCompound = async() => {
        try {
            setModalShow(true);
            setIsTransactionConfirm(false);
            await contract.methods.compound(WalletState.account_address).send({
                from : WalletState.account_address
            });
            const userInfo = await contract.methods.users(WalletState.account_address).call();
            const depositedAmount_t = web3.utils.fromWei(userInfo[0], "ether");
            setDepositedAmount( depositedAmount_t );
            const earnedRDX_t = await contract.methods.earned(WalletState.account_address).call();
            const earned_eth = web3.utils.fromWei(earnedRDX_t, "ether");
            setEarnedRDX( earned_eth );
            setIsTransactionConfirm(true);
        } catch (e) {
            setModalShow(false);
        }
    };
    const onStakePage = () => {
        window.location.href = "/";
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
                                <div className='daboard-content-body'>{Math.round(Number(depositedAmount)*100000)/100000}</div>
                                <div className='button-layout'>
                                    <Button className='dashboard-content-button' onClick={onStakePage}>Stake More</Button>
                                </div>
                            </Col>
                            <Col xl="3" md="6" sm="6" xs="6" style={{padding:"0"}}>
                                <div className="daboard-content-header">Earned RDX</div>
                                <div className='daboard-content-body'>{Math.round(Number(earnedRDX)*100000)/100000}</div>
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
            <Modal className="modal-form" show={isModalShow} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    {
                        !isTransactionConfirm ? (<img className="loadingbar" src={transactionLoader}></img>) : 
                        (<img className="confirmImage" src={confirmImage}></img>)
                    }
                    {
                        !isTransactionConfirm ? (<p className="modal-title">Waiting for Confirmation</p>) : 
                        (<p className="confirm-title">Transaction Submitted</p>)
                    }
                    {
                        !isTransactionConfirm ? (<p className="modal-content">Confirm this transaction in your wallet.</p>) : 
                        (<p className="confirm-content">View on etherscan</p>)
                    }
                </Modal.Body>
                <Modal.Footer className = "modal-footer">
                    {
                        !isTransactionConfirm ? "" : (<Button className="close-button" onClick={closeModal}>Close</Button>)
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;