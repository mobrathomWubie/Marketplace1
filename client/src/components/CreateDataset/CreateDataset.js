import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDataset } from '../../features/datasets/datasetApi'; 

const CreateDataset = () => {
  const dispatch = useDispatch();
  const [datasetData, setDatasetData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    dataTypes: '',
    size: '',
    sampleDataLink: '',
  });

  const handleChange = (e) => {
    setDatasetData({ ...datasetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await dispatch(createDataset(datasetData));
        setDatasetData({
            name: '',
            description: '',
            price: '',
            category: '',
            dataTypes: '',
            size: '',
            sampleDataLink: '',
          });
    } catch (error) {
      console.error('Error creating dataset:', error);
    }
  };

  return (
    <div>
      <h2>Create New Dataset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Dataset Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={datasetData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={datasetData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={datasetData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={datasetData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dataTypes">Data Types:</label>
          <input
            type="text"
            id="dataTypes"
            name="dataTypes"
            value={datasetData.dataTypes}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="size">Size:</label>
          <input
            type="text"
            id="size"
            name="size"
            value={datasetData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sampleDataLink">Sample Data Link:</label>
          <input
            type="url"
            id="sampleDataLink"
            name="sampleDataLink"
            value={datasetData.sampleDataLink}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Dataset</button>
      </form>
    </div>
  );
};

export default CreateDataset;