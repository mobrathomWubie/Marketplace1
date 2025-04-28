import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Components
import Header from './components/Header';
import Home from './components/marketplace/Home';
import BrowseDatasets from './components/marketplace/BrowseDatasets';
import DatasetDetail from './components/marketplace/DatasetDetail';
import Login from './components/Login';
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import UserRoute from './components/UserRoute';
import Admin from './components/Admin';
import User from './components/User';
import Cart from './components/marketplace/Cart';
import Checkout from './components/marketplace/Checkout';

//Styles
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<BrowseDatasets />} />
        <Route path="/dataset/:id" element={<DatasetDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Admin and User Protected Routes */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/user" element={<UserRoute><User /></UserRoute>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
