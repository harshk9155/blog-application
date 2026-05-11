import './App.css';
import { useContext } from 'react';

import Login from './components/accounts/Login';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import DataProvider, { DataContext } from './context/DataProvider';
import Home from './components/Home/Home.jsx';
import Header from './components/Header/Header.jsx';
import CreatePost from './components/createpost/CreatePost.jsx';
import Detailview from './components/details/Detailview.jsx';
import Update from './components/createpost/Update.jsx';
import About from './components/about/About.jsx';
import Contact from './components/contact/Contact.jsx';

const PrivateRoute = () => {
  const { account, loading } = useContext(DataContext);

  // ✅ FIX: Wait for session check to complete before deciding to redirect
  // Without this, the page would flash to Login every time on hard refresh
  if (loading) return null;

  return account?.username ? (
    <>
      <Header />
      {/*
        ✅ FIX: marginTop: 64 pushes content below the fixed AppBar (64px tall).
        If you remove this, the top of every page is hidden behind the navbar.
      */}
      <div style={{ marginTop: 64 }}>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ FIX: Login route has NO marginTop wrapper — it centers itself */}
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/details/:id" element={<Detailview />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;