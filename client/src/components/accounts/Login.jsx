import {useState, useContext} from 'react';

import {Box, TextField, Button, styled, Typography} from '@mui/material';

import {API} from '../../service/api.js';

import { DataContext } from '../../context/DataProvider.jsx';

import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  
  width: 400px;
  margin: auto ;
  padding: 25px;
  display: flex;
  flex-direction : column;
  gap: 20;
  box-shadow: 5px 2px 5px  2px rgb(0 0 0 / 0.6);
  align-items: center;
  margin-top: 100px;

`;
const Img= styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
    alignContent: 'center',
})

const Wrapper = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Errortext = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const SignButton = styled(Button)`background: #1976d2; color: #fff; width: 50%; &:hover { background: #bbbec2; } `;

const LoginButton = styled(Button)`background: #1976d2; color: #fff; width: 70%; &:hover { background: #bbbec2; } `;
const loginInitialValues = {
    username: '',
    password: ''
}

const signupInitialValues=
    {
        name: '' ,
        username: '',
        password: ''

    }







const Login = ({isUserAuthenticated}) => {

     const imageURL = 'https://dummyimage.com/600x200/1976d2/ffffff&text=BLOG';


     const [account, toggleAccount] = useState('Login');
     const [signup, setSignup] = useState(signupInitialValues);
     const [login, setlogin] = useState(loginInitialValues);
     const [error, seterror] = useState('');

     const {setAccount} = useContext(DataContext);

     const navigate = useNavigate();

     const toggleAccounts = () => { account === 'signup' ? toggleAccount('Login'):
        toggleAccount('Signup')};

    const onInputchange =(e) => {
        setSignup({...signup, [e.target.name]: e.target.value});
    }

    const signupUser = async () => {
   
   try {
    const response = await API.userSignup(signup);
    console.log("Response 1:", response);

    if (response?.issuccess) {
      seterror('');
      setSignup(signupInitialValues);
      toggleAccount('Login');
    } else {
      seterror('Something went wrong! Please try again.');
    }

  } catch (err) {
    console.log("error:", err);
    seterror('Server error! Please try again.');
  }
};

  const onvaluechange =(e) => {
      setlogin({...login, [e.target.name]: e.target.value});
  }

   const loginUser = async () => {
  console.log("Login clicked");

  try {
    let response = await API.userLogin(login);

    console.log("Response:", response);   

    if (response && response.issuccess) {
      seterror('');

      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('refreshToken', response.data.refreshToken);

      setAccount({
        username: response.data.username,
        name: response.data.name
      });
      isUserAuthenticated(true);

      navigate('/home');

    } else {
      seterror('Invalid credentials');
    }

  } catch (error) {
    console.log(error);
    seterror('Server error while login');
  }
};
    
        return (
  <Wrapper>
    <Component>
      <Img src={imageURL} alt="Login" />

      {account === 'Login' ? (
        <>
          <TextField name = "username" value={login.username} variant="outlined" label="Enter Username" onChange={(e)=> onvaluechange(e)} />
          <TextField name = "password" value={login.password} variant="outlined" label="Enter Password" type="password" onChange={(e)=> onvaluechange(e)} />

          {error && <Errortext>{error}</Errortext>}

          <LoginButton variant="contained" sx={{ mt: 2 }} onClick={() => loginUser()}>
            Login
          </LoginButton>

          <Typography sx={{ mt: 2 }}>OR</Typography>

          <SignButton onClick={() => toggleAccount('Signup')}>
            Create an account
          </SignButton>
        </>
      ) : (
        <>
          <TextField name = "name" value={signup.name}  InputLabelProps={{ shrink: true }} variant="standard" onChange={(e)=> onInputchange(e)} label="Name" />
          <TextField name = "username" value={signup.username}  InputLabelProps={{ shrink: true }} variant="standard" onChange={(e)=> onInputchange(e)} label="Username" />
          <TextField name = "password" value={signup.password}  InputLabelProps={{ shrink: true }} variant="standard" onChange={(e)=> onInputchange(e)} label="Password" type="password" />

            {error && <Errortext>{error}</Errortext>}


          <SignButton variant="contained" sx={{ mt: 2 }} onClick={signupUser}>
            Signup
          </SignButton>

          <Typography sx={{ mt: 2 }}>OR</Typography>

          <LoginButton onClick={() => toggleAccount('Login')} sx={{color: '#1976d2'}}>
            Already have an account
          </LoginButton>
        </>
      )}
    </Component>
  </Wrapper>
);



    
}

export default Login;