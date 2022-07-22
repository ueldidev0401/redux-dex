import React from 'react';
import Footer from './Footer';
import Topbar from './Topbar';

import './layout.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-light d-flex flex-column flex-fill wrapper main_container'style={{ background: "linear-gradient(180deg, #150C2F 0%, #3D1276 100%)", minHeight: "100vh"}}>
      <Topbar />
      <main className='d-flex flex-column flex-grow-1'>
          {children}
      </main>
    </div>
  );
};

export default Layout;
