import React, { useState, useEffect } from 'react';
import BridgeLogo from 'assets/img/bridge.png';
import './index.scss';

const Bridge = () => {
    return (
        <div className="home-container mb-5" style={{ fontFamily: 'Segoe UI', color: 'white', marginTop: '28px' }}>
            <div className='d-flex justify-content-center'>
                <div style={{ width: '180px' }}>
                    <img src={BridgeLogo} width={'100%'} />
                </div>
            </div>
            <div className='text-center d-flex flex-column mt-3'>
                <span style={{ fontFamily: 'Segoe UI', fontWeight: '600', fontSize: '30px' }}>Bridge</span>
                <div className='d-flex justify-content-center mt-3'>
                    <span style={{ color: '#R707070', width: '1000px' }}>{"Use your casino token on your favourite chain."}
                    <br></br>
                    <span style={{ fontFamily: 'Segoe UI', fontWeight: '600', fontSize: '26px' }}>
                        {"Coming soon!!"}
                    </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Bridge;