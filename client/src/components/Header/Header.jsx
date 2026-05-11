import { useContext } from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

const Component = styled(AppBar)({
    background: '#FFFFFF',
    color: '#000'
});

const Container = styled(Toolbar)`
    justify-content: center;
    & > a, & > span {
        padding: 20px;
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

const Header = () => {
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        setAccount(null);
        navigate('/');
    };

    return (
        <Component>
            <Container>
                <Link to='/home'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                <span onClick={handleLogout}>Logout</span>
            </Container>
        </Component>
    );
};

export default Header;