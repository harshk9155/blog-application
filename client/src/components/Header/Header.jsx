import React from 'react';

import { AppBar, Toolbar, Typography, colors, styled} from '@mui/material';

import { Link } from 'react-router-dom';

const Component = styled(AppBar)({
  background: '#FFFFFF',
  color: '#000'
});

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
  
  }
  `;




const Header = () => {
      return (
        <AppBar>
            <Container>
           
               <Link to='/home'>Home</Link>
               <Link to='/about'>About</Link>
               <Link to='/contact'>Contact</Link>
               <Link to='/'>Logout</Link>
            
            </Container>

        </AppBar>
      )
}

export default Header;