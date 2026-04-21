
import './App.css';
import { useState } from 'react';

import Login from './components/accounts/Login';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import DataProvider from './context/DataProvider';
import Home from './components/Home/Home.jsx';
import Header from './components/Header/Header.jsx';
import CreatePost from './components/createpost/CreatePost.jsx';

const PrivateRoute = ({isAuthenticated}) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to='/' />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>

            <Route path="/" element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;