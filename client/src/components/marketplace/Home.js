import React from 'react';
import './Home.css';
import FeaturedDatasets from './FeaturedDatasets';
import DatasetCategories from './DatasetCategories';
import SearchBar from './SearchBar';
import NewDatasets from './NewDatasets';
import TrendingDatasets from './TrendingDatasets';

// Home component for the main landing page
const Home = () => {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <div className='home-components'>
      <FeaturedDatasets />
      </div>
      <div className='home-components'>
      <DatasetCategories />
      </div>
      <div className='home-components'>
      <SearchBar />
      </div>
      <NewDatasets />
      <TrendingDatasets />
    </div>
  );
};

export default Home;