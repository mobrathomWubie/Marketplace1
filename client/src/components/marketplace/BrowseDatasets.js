// src/components/marketplace/BrowseDatasets.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatasets, selectAllDatasets, selectDatasetStatus } from '../../features/datasets/datasetSlice';
import DatasetCard from './DatasetCard';
import Skeleton from 'react-loading-skeleton';
import './BrowseDatasets.css';

const BrowseDatasets = () => {
  const dispatch = useDispatch();
  let datasets = useSelector(selectAllDatasets);
  const status = useSelector(selectDatasetStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const datasetsPerPage = 9;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDatasets());
    }
  }, [status, dispatch]);
  
  // Filtering
  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || dataset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedDatasets = [...filteredDatasets].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    } else if (sortOption === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Pagination
  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = sortedDatasets.slice(indexOfFirstDataset, indexOfLastDataset);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedDatasets.length / datasetsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Categories
  const allCategories = ['all', ...new Set(datasets.map(dataset => dataset.category))];

  const isLoading = status === 'loading';
    return (
    <div className="browse-container">
        <h2 className='browse-title'>Browse Datasets</h2>
        <div className="filter-container">
        <input
          type="text"
          placeholder="Search datasets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
        {allCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      <div className='dataset-list'>
      {status === 'loading' ? (
          <div className="datasets-grid">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="skeleton-card"><Skeleton height={250} /></div>
              ))}
            </div>
        ) : sortedDatasets.length === 0 ?(
          <div className='no-datasets'>No datasets found</div>
        ) :
         (
            <div className="datasets-grid">
            {currentDatasets.map(dataset => (
              <DatasetCard key={dataset._id} dataset={dataset} />
            ))}
          </div>
        )}
      </div>
      {sortedDatasets.length > datasetsPerPage && (
        <nav className="pagination-nav">
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      )}
    </div>
  );
};

export default BrowseDatasets;
