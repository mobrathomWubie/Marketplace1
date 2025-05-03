import React from 'react';
import './Home.css';
import FeaturedDatasetsSection from './FeaturedDatasetsSection';
import NewDatasetsSection from './NewDatasetsSection';
import TrendingDatasetsSection from './TrendingDatasetsSection';

function Home() {
  return (
    <>
    <div className="main-home-container">
      <h1 className="home-title">Welcome to Our Data Marketplace</h1>

      <div className="home-container">
        <section>
          <FeaturedDatasetsSection />
        </section>
        <section>
          <NewDatasetsSection />
        </section>
        <section>
          <TrendingDatasetsSection />
        </section>
      </div>
    </div>
    </>

  );
}

export default Home;

