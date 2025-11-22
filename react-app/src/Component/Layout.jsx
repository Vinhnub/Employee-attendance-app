import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet /> {/* Nơi nội dung các trang sẽ hiển thị */}
      </div>
      <footer style={{ textAlign: 'center', padding: '20px', color: '#888', fontSize: '0.8rem' }}>
        © 2025 Coffee Shop System. Designed for Baristas.
      </footer>
    </div>
  );
};

export default Layout;