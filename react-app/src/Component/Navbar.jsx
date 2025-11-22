import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Lấy role lưu lúc login

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ background: 'white', padding: '1rem 2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6f4e37', display: 'flex', alignItems: 'center', gap: '10px' }}>
        ☕ Coffee Staff
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Chấm Công</Link>
        {role === 'manager' && (
          <Link to="/manager" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Quản Lý</Link>
        )}
        <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #6f4e37', padding: '5px 15px', borderRadius: '20px', color: '#6f4e37', cursor: 'pointer' }}>
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default Navbar;