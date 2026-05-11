import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

// ✅ FIX 1: Wrapper centers the card on full screen
const Wrapper = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
`;

// ✅ FIX 2: Component is a proper card — no overlap possible
// Removed margin-top: 100px (was causing overlap with the image header)
const Component = styled(Box)`
  width: 400px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ✅ FIX 3: Header is inside the card, not overlapping it
const Header = styled(Box)`
  width: 100%;
  background: #1976d2;
  padding: 24px 0;
  text-align: center;
`;

const HeaderText = styled(Typography)`
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 6px;
`;

// ✅ FIX 4: Form body has its own padding — completely separate from header
const FormBody = styled(Box)`
  width: 100%;
  padding: 28px 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
`;

const Errortext = styled(Typography)`
  font-size: 12px;
  color: #d32f2f;
  background: #fdecea;
  padding: 8px 12px;
  border-radius: 6px;
  width: 100%;
  text-align: center;
`;

// ✅ FIX 5: loginInitialValues and signupInitialValues are always empty strings
// This prevents any credentials from pre-filling the form
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

    const [accountType, toggleAccount] = useState('Login');

    // ✅ FIX 6: State always starts fresh — no hardcoded values
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    // ✅ FIX 7: Reset form + error when switching between Login / Signup
    const handleToggle = (type) => {
        setLogin(loginInitialValues);
        setSignup(signupInitialValues);
        setError('');
        toggleAccount(type);
    };

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.issuccess) {
            setSignup(signupInitialValues);
            handleToggle('Login');
        } else {
            setError('Signup failed. Please try again.');
        }
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);

        if (response.issuccess) {
            // ✅ FIX 8: Store only the logged-in user's data — never a previous user's
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

            // ✅ FIX 9: Clear login form after successful login
            setLogin(loginInitialValues);
            navigate('/home');

        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <Wrapper>
            {/* ✅ FIX 10: Card layout — header on top, form below, NO overlap */}
            <Component>

                {/* HEADER — stays inside the card */}
                <Header>
                    <HeaderText>BLOG</HeaderText>
                </Header>

                {/* FORM BODY — clearly separated below the header */}
                <FormBody>
                    {accountType === 'Login' ? (
                        <>
                            {/* ✅ FIX 11: value prop controlled — always reads from clean state */}
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                value={login.username}
                                onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })}
                                autoComplete="off"
                            />
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={login.password}
                                onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })}
                                autoComplete="off"
                            />

                            {error && <Errortext>{error}</Errortext>}

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={loginUser}
                                sx={{ padding: '10px', fontSize: '15px', letterSpacing: '1.5px' }}
                            >
                                Login
                            </Button>

                            <Typography sx={{ color: '#555', fontSize: '14px' }}>OR</Typography>

                            <Button
                                onClick={() => handleToggle('Signup')}
                                sx={{ color: '#1976d2', fontWeight: 600, letterSpacing: '1px' }}
                            >
                                Create Account
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                name="name"
                                label="Full Name"
                                value={signup.name}
                                onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })}
                                autoComplete="off"
                            />
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                value={signup.username}
                                onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })}
                                autoComplete="off"
                            />
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={signup.password}
                                onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })}
                                autoComplete="off"
                            />

                            {error && <Errortext>{error}</Errortext>}

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={signupUser}
                                sx={{ padding: '10px', fontSize: '15px', letterSpacing: '1.5px' }}
                            >
                                Signup
                            </Button>

                            <Typography sx={{ color: '#555', fontSize: '14px' }}>OR</Typography>

                            <Button
                                onClick={() => handleToggle('Login')}
                                sx={{ color: '#1976d2', fontWeight: 600, letterSpacing: '1px' }}
                            >
                                Already have an account?
                            </Button>
                        </>
                    )}
                </FormBody>
            </Component>
        </Wrapper>
    );
};

export default Login;