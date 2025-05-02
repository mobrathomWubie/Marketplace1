import React from 'react';


//Components
import Header from './components/Header';
import Home from './components/marketplace/Home';
import BrowseDatasets from './components/marketplace/BrowseDatasets';
import DatasetDetail from './components/marketplace/DatasetDetail';
import Login from './components/Login';
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Admin from './components/Admin';
import User from './components/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/marketplace/Cart';
import Checkout from './components/marketplace/Checkout';
import FeaturedDatasets from './components/marketplace/FeaturedDatasets';
import TrendingDatasets from './components/marketplace/TrendingDatasets';

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
        <Route path="/featured" element={<FeaturedDatasets />} />
        <Route path="/trending" element={<TrendingDatasets />} />
        {/* Admin and User Protected Routes */}
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
