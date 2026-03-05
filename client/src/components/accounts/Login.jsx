import {useState} from 'react';

import {Box, TextField, Button, styled, Typography} from '@mui/material';

import {API} from '../../service/api.js';

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

const LoginButton = styled(Button)`color: #1976d2; color: #fff; width: 70%; &:hover { background: #bbbec2; } `;
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







const Login = () => {

     const imageURL = 'https://dummyimage.com/600x200/1976d2/ffffff&text=BLOG';


     const [account, toggleAccount] = useState('Login');
     const [signup, setSignup] = useState(signupInitialValues);
     const [login, setlogin] = useState(loginInitialValues);
     const [error, seterror] = useState('');

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
      setlogin({...login, [e.targetname]: e.target.value});
  }

    const loginUser =async() => {
      let response = await API.userLogin(login); 
      if(response.issuccess){
        seterror('');
      }else{
        setError('Something went wrong!please try again later');
      }

    }
    
        return (
  <Wrapper>
    <Component>
      <Img src={imageURL} alt="Login" />

      {account === 'Login' ? (
        <>
          <TextField name = "username" value={login.username} variant="standard" label="Enter Username" onChange={(e)=> onvaluechange(e)} />
          <TextField name = "password" value={login.password} variant="standard" label="Enter Password" type="password" onChange={(e)=> onvaluechange(e)} />

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
          <TextField name = "name" variant="standard" onChange={(e)=> onInputchange(e)} label="Name" />
          <TextField name = "username" variant="standard" onChange={(e)=> onInputchange(e)} label="Username" />
          <TextField name = "password" variant="standard" onChange={(e)=> onInputchange(e)} label="Password" type="password" />

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