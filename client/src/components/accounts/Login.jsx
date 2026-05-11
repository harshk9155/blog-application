import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
  align-items: center;
  margin-top: 100px;
`;

const Img = styled('img')({
    width: 200,
    margin: 'auto',
});

const Wrapper = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Errortext = styled(Typography)`
  font-size: 10px;
  color: red;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
};

const Login = () => {

    const imageURL = 'https://dummyimage.com/600x200/1976d2/ffffff&text=BLOG';

    const [accountType, toggleAccount] = useState('Login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const signupUser = async () => {
        let response = await API.userSignup(signup);

        if (response.issuccess) {
            setSignup(signupInitialValues);
            toggleAccount('Login');
        } else {
            setError('Signup failed');
        }
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);

        if (response.issuccess) {

            sessionStorage.setItem('user', JSON.stringify({
                username: response.data.username,
                name: response.data.name
            }));

            sessionStorage.setItem('accessToken', response.data.accessToken);
            sessionStorage.setItem('refreshToken', response.data.refreshToken);

            setAccount({
                username: response.data.username,
                name: response.data.name
            });

            navigate('/home');

        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <Wrapper>
            <Component>
                <Img src={imageURL} alt="login" />

                {accountType === 'Login' ? (
                    <>
                        <TextField name="username" label="Username" onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} />
                        <TextField name="password" label="Password" type="password" onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} />

                        {error && <Errortext>{error}</Errortext>}

                        <Button variant="contained" onClick={loginUser}>Login</Button>

                        <Typography>OR</Typography>

                        <Button onClick={() => toggleAccount('Signup')}>
                            Create Account
                        </Button>
                    </>
                ) : (
                    <>
                        <TextField name="name" label="Name" onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })} />
                        <TextField name="username" label="Username" onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })} />
                        <TextField name="password" label="Password" type="password" onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })} />

                        <Button variant="contained" onClick={signupUser}>Signup</Button>

                        <Typography>OR</Typography>

                        <Button onClick={() => toggleAccount('Login')}>
                            Already have account
                        </Button>
                    </>
                )}
            </Component>
        </Wrapper>
    );
};

export default Login;