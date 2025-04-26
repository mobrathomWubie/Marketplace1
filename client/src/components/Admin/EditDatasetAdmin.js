import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditDatasetAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    dataTypes: '',
    size: '',
    sampleDataLink: '',
  });

  useEffect(() => {
    const fetchDataset = async () => {
      if (!user || !user.isAdmin) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch(`/api/datasets/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dataset');
        }
        const data = await response.json();
        setDataset(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          dataTypes: data.dataTypes,
          size: data.size,
          sampleDataLink: data.sampleDataLink,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataset();
  }, [id, navigate, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/datasets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update dataset');
      }
      navigate('/admin/datasets');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dataset) {
    return <div>Dataset not found</div>;
  }

  return (
    <div>
      <h2>Edit Dataset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
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
            value={formData.price}
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
            value={formData.category}
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
            value={formData.dataTypes}
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
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sampleDataLink">Sample Data Link:</label>
          <input
            type="text"
            id="sampleDataLink"
            name="sampleDataLink"
            value={formData.sampleDataLink}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Dataset</button>
      </form>
    </div>
  );
}

export default EditDatasetAdmin;