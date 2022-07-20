import * as React from 'react';

import {
  Col,
  ProgressBar
} from 'react-bootstrap';
import './index.scss';
import {
  PRESALE_CONTRACT_ADDRESS,
  CASINO_TOKEN_TICKER,
} from 'config';
import {
  precisionRound,
  getCurrentTimestamp,
} from 'utils';
import { convertEsdtToWei } from '../../utils/convert';
import Time from './Time';

const Presale = () => {

  const [presale, setPresale] = React.useState<any>();
  const tokenSaleTargetRef = React.useRef(null);

  const [buyAmountInEgld, setBuyAmountInEgld] = React.useState<number>(0);
  const [buyAmountInEsdt, setBuyAmountInEsdt] = React.useState<number>(0);

  const [buyButtonDisabled, setBuyButtonDisabled] = React.useState<boolean>(true);

  const [buyStateInfo, setBuyStateInfo] = React.useState<string>('');

  const onChangeBuyAmountInEgld = (value) => {
    // if (!presale) return;
    setBuyAmountInEgld(value);
    setBuyAmountInEsdt(precisionRound(value / 0.003));
  };
  async function buyToken() {
    const tx = {
      value: convertEsdtToWei(buyAmountInEgld),
      data: 'buy',
      receiver: PRESALE_CONTRACT_ADDRESS,
      gasLimit: 10000000,
    };
  }

  return (
    <>
      <div className='bitxwrapper background-1'>
        <div className='container'>
          <Col md={12} lg={6} className='custom-presale-col'>
            <div className='custom-presale-left'>
              <h1 className='custom-presale-header color-white'>Token Sale Is {presale?.state == 'NotStarted' ? 'Coming' : (presale?.state == 'Started' ? 'Live' : 'Ended')}!</h1>

              {
                presale?.state == 'Started' && (<div className='custom-timer-header'>Last Moment To Grab The Tokens</div>)
              }

              <div className='custom-presale-body'>
                <Time presale={presale} />

                <div className='custom-progress-container'>
                  <ProgressBar now={presale && (presale.total_bought_amount_in_esdt / presale.token_sale_amount * 100)} ref={tokenSaleTargetRef} />
                  <div className='custome-progress-number color-white'>{presale?.total_bought_amount_in_esdt} / {presale?.token_sale_amount} {CASINO_TOKEN_TICKER}</div>
                </div>

                {/* <div className='custom-presale-price'>1 Casino = {presale?.exchange_rate} {CASINO_TOKEN_TICKER}</div> */}
                <div className='custom-presale-price'>1 Casino = 0.003 BUSD</div>

              </div>

            </div>
          </Col>
          <Col md={12} lg={6} className='custom-presale-col'>
            <div className='custom-buy-card'>
              <div className='custom-buy-card-body'>
                <h3 className='custom-buy-card-header color-white'>Buy Tokens</h3>
                <div className='custom-buy-card-amount'>
                  <div className='custom-buy-card-amount-header'>Amount To Pay</div>
                  <div className='custom-buy-card-amount-container'>
                    <input className='custom-buy-card-amount-input' type='number' onChange={e => onChangeBuyAmountInEgld(Number(e.target.value))} defaultValue={buyAmountInEgld} />
                    <span className='custom-buy-card-amount-unit color-white'>BUSD</span>
                  </div>
                </div>
                <div className='custom-buy-card-amount'>
                  <div className='custom-buy-card-amount-header'>Amount To Get</div>
                  <div className='custom-buy-card-amount-container'>
                    <input className='custom-buy-card-amount-input' type='number' disabled={true} value={buyAmountInEsdt} />
                    <span className='custom-buy-card-amount-unit color-white'>{CASINO_TOKEN_TICKER}</span>
                  </div>
                </div>

                <div className='custom-buy-card-info color-white'>Minimum Buy Amount:&nbsp;&nbsp;{presale?.min_buy_limit} EGLD</div>
                <div className='custom-buy-card-info color-white'>Maximum Buy Amount:&nbsp;&nbsp;{'No Limit'}</div>

                <div style={{ paddingTop: '32px' }}>
                  <button className="custom-buy-card-buy-button" onClick={buyToken} disabled={buyButtonDisabled}>Buy {CASINO_TOKEN_TICKER}</button>
                  <div className='custom-buy-card-buy-state-info'>{buyStateInfo}</div>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </div >
    </>
  );
};

export default Presale;
