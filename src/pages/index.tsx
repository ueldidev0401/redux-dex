import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './index.scss';

import { routeNames } from 'routes';

const CasinoProtocolHome = () => {
    return (
        <div className="home-container mb-5" style={{ fontFamily: 'Segoe UI', color: 'white', marginTop: '28px' }}>
            <div className='text-center d-flex flex-column mt-3'>
                <span style={{ fontFamily: 'Segoe UI', fontWeight: '600', fontSize: '30px' }}>Staking</span>
                <div className='d-flex justify-content-center mt-3'>
                    <span style={{ fontFamily: 'Segoe UI', fontWeight: '600', fontSize: '26px' }}>
                        {"Coming soon!!"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CasinoProtocolHome;