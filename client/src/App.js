
import './App.css';
import { useState } from 'react';

import Login from './components/accounts/Login';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import DataProvider from './context/DataProvider';
import Home from './components/Home/Home.jsx';
import Header from './components/Header/Header.jsx';

const PrivateRoute = ({isAuthenticated, ...props}) =>
{
  return isAuthenticated ?
      <>
      <Outlet/>
      </>
      : <Navigate replace to ='/' />

}

function App() {

   const [isAuthenticated,isUserAuthenticated]= useState(false);
  return (
   
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path="/" element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path="/home" element={<Home />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    
  );
}

export default App;