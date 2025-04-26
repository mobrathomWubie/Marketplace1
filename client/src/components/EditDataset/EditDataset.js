import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditDataset = () => {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [dataset, setDataset] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    dataTypes: '',
    size: '',
    sampleDataLink: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await fetch(`/api/datasets/${datasetId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
          }
          if (response.status === 403) {
            setError('You are not the creator of this dataset.');
            setLoading(false);
          }
          throw new Error('Could not fetch dataset');
        }
        const data = await response.json();
        if (user._id !== data.creator) {
          setError('You are not the creator of this dataset.');
          setLoading(false);
        } else {
          setDataset(data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDataset();
  }, [datasetId, navigate, user]);

  const handleChange = (e) => {
    setDataset({ ...dataset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/datasets/${datasetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(dataset),
      });

      if (!response.ok) {
        throw new Error('Could not update dataset');
      }

      navigate('/mydatasets');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Dataset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Dataset Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={dataset.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={dataset.description}
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
            value={dataset.price}
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
            value={dataset.category}
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
            value={dataset.dataTypes}
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
            value={dataset.size}
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
            value={dataset.sampleDataLink}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Dataset</button>
      </form>
    </div>
  );
};

export default EditDataset;