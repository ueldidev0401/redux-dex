import React from 'react';
import './index.scss';
import chromeWallet from '../../assets/img/maiar chrome wallet.png';
import ledgerWallet from '../../assets/img/maiar ledger wallet.png';
import maiarLogo from '../../assets/img/maiar logo.png';
import mobileWallet from '../../assets/img/maiar mobile wallet.png';
import webWallet from '../../assets/img/maiar web wallet.png';


export const UnlockRoute: (props: any) => JSX.Element = (props) => {

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center' style={{ width: "300px" }}>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4' style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom:"40px" }}>
            <h4 className='mb-4' style={{color: "white"}}>Unlock Wallet</h4>
              <div className="d-flex align-items-center wallet-extension">
                <img src={chromeWallet} />
                <span>{"Extension"}</span>
              </div>
              <div className="d-flex align-items-center wallet-web">
                <img src={webWallet} style={{ height: "30px" }}/>
                <span>{"Web wallet"}</span>
              </div>
              <div className="d-flex align-items-center wallet-ledger">
                <img src={ledgerWallet} style={{ width: "33px" }} />
                <span>{"Ledger"}</span>
              </div>
              <div className="d-flex align-items-center wallet-mobile">
                <img src={mobileWallet} style={{ width: "25px" }} />
                <span>{"Maiar"}</span>
              </div>

            <img className="maiar" src={maiarLogo} />

          </div>
        </div>
      </div>
    </div >
  );
};

export default UnlockRoute;
