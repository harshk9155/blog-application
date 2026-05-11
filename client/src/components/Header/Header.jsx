import React, { useContext } from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

// ✅ FIX 1: AppBar uses white background + shadow — was using default blue MUI AppBar
const StyledAppBar = styled(AppBar)`
  background: #ffffff;
  color: #000000;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
`;

// ✅ FIX 2: Toolbar centers links cleanly
const Container = styled(Toolbar)`
  justify-content: center;
  gap: 8px;

  & > a {
    padding: 8px 18px;
    color: #333333;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: 6px;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #f0f2f5;
      color: #1976d2;
    }
  }
`;

const Header = () => {
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    // ✅ FIX 3: Logout clears sessionStorage so previous user's data doesn't leak
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        setAccount(null);
        navigate('/');
    };

    return (
        // ✅ FIX 4: Using the styled AppBar, not the raw <AppBar> (which defaults to blue)
        <StyledAppBar position="fixed">
            <Container>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {/* ✅ FIX 5: Logout is a button/action, not a plain Link to '/'
                    The old code navigated to '/' without clearing session,
                    so the next user could still see the previous user's data */}
                <Link to="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                    Logout
                </Link>
            </Container>
        </StyledAppBar>
    );
};

export default Header;