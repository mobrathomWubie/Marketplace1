import React, { useState, useEffect } from 'react';
import './Admin.css'

function Admin() {
  const [datasets, setDatasets] = useState([]);
  const [newDataset, setNewDataset] = useState({
    name: '',
    description: '', 
      price: 0,
      category: 'Agriculture', // Default category
      tags: [],
      format: '',
      seller: '',
      numberOfRecords: 0,
      size: '',
      license: '',
      sample: '',
      isFeatured: false, // Default isFeatured
  });
  const [editingDataset, setEditingDataset] = useState(null);
  const [updatedDataset, setUpdatedDataset] = useState({
    tags: [],
    format: '',
    seller: '',
    numberOfRecords: 0,
    size: '',
    license: '',
    name: '',
    description: '', 
    price: 0,
    category: 'Agriculture',
    isFeatured: false, 
  });
  const [error] = useState(null);

  const categories = ["Agriculture", "Finance", "Healthcare", "Government", "Education", "Technology"];

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch('/api/datasets');
        if (!response.ok) {
          throw new Error('Failed to fetch datasets');
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDataset({ ...newDataset, [name]: value });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedDataset({ ...updatedDataset, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/datasets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete dataset');
      }

      // Refetch datasets after deleting
      const datasetsResponse = await fetch('/api/datasets');
      if (!datasetsResponse.ok) {
        throw new Error('Failed to fetch datasets after deletion');
      }
      const datasetsData = await datasetsResponse.json();
      setDatasets(datasetsData);
    } catch (error) {
      console.error('Error deleting dataset:', error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/datasets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDataset),
      });
      if (!response.ok) {
        throw new Error('Failed to create dataset');
      }
      
      // Refetch datasets after creating a new one
      const datasetsResponse = await fetch('/api/datasets');
      if (!datasetsResponse.ok) {
          throw new Error('Failed to fetch datasets after creation');
      }
      const datasetsData = await datasetsResponse.json();
        setDatasets(datasetsData);
      setNewDataset({...newDataset, name:'', description: '',price: 0, category: 'Agriculture', isFeatured:false})
    } catch (error) {
      console.error('Error creating dataset:', error);
    }
  };

  const handleUpdate = (dataset) => {
    setEditingDataset(dataset);
    setUpdatedDataset(dataset);
  }

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/datasets/${editingDataset._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDataset),
      });
      if (!response.ok) throw new Error('Failed to update dataset');
      const datasetsResponse = await fetch('/api/datasets');
      if (!datasetsResponse.ok) throw new Error('Failed to fetch datasets after update');
      const datasetsData = await datasetsResponse.json();
      setDatasets(datasetsData);
      setEditingDataset(null);
      setUpdatedDataset({});
      
    } catch (error) {
      console.error('Error creating dataset:', error);
    }
  };

  return (
    <div>
      <h1 className='text-center'>Welcome to the Admin Page!</h1>
      <h2 className='text-center'>Create New Dataset</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form-grid">
         <div className="form-group">
            <label htmlFor="name" className="form-label">Aname:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newDataset.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">Adescription:</label>
            <textarea
              id="description"
              name="description"
              value={newDataset.description}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">Aprice:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newDataset.price}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label">Acategory:</label>
            <select
              id="category"
              name="category"
              value={newDataset.category}
              onChange={handleInputChange}
              className="form-input"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
          <label htmlFor="isFeatured" className="form-label">Ais Featured:</label>
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={newDataset.isFeatured}
            onChange={(e) => setNewDataset({ ...newDataset, isFeatured: e.target.checked })}
          />
          </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-label">Atags:</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={newDataset.tags}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="format" className="form-label">Aformat:</label>
                    <input
                        type="text"
                        id="format"
                        name="format"
                        value={newDataset.format}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="seller" className="form-label">Aseller:</label>
                    <input
                        type="text"
                        id="seller"
                        name="seller"
                        value={newDataset.seller}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfRecords" className="form-label">Anumber of Records:</label>
                    <input
                        type="number"
                        id="numberOfRecords"
                        name="numberOfRecords"
                        value={newDataset.numberOfRecords}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="size" className="form-label">Asize:</label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        value={newDataset.size}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="license" className="form-label">Alicense:</label>
                    <input
                        type="text"
                        id="license"
                        name="license"
                        value={newDataset.license}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                 </div>
                 <div className="form-group"> <label htmlFor="sample" className="form-label">Sample:</label> <input type="text" id="sample" name="sample" value={newDataset.sample} onChange={handleInputChange} className="form-input"/> </div>
          
        <button type="submit" className="submit-button">Create Dataset</button>
      </form>
        {editingDataset && (
          <>
            <h2 className='text-center'>Update Dataset</h2>
            <form onSubmit={handleUpdateSubmit} className="form-grid">
            <div className="form-group">
                <label htmlFor="name" className="form-label">Aname:</label>                
                 <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedDataset.name || ''}
                    onChange={handleUpdateInputChange}
                    className="form-input"/>               
                </div>
                <div className="form-group">
                <label htmlFor="description" className="form-label">Adescription:</label>
                    <textarea
                    id="description"
                    name="description"
                    value={updatedDataset.description || ''}
                    onChange={handleUpdateInputChange}
                    className="form-input"
                    />
                </div>
                <div className="form-group">
                <label htmlFor="price" className="form-label">Aprice:</label>
                <input
                        type="number"
                        id="price"
                        name="price"
                        value={updatedDataset.price || 0}
                        onChange={handleUpdateInputChange} className="form-input"/>
                </div>
                <div className="form-group">
                <label htmlFor="category" className="form-label">Acategory:</label>
                <select
                    id="category"
                    name="category"
                    value={updatedDataset.category || "Agriculture"}
                    onChange={handleUpdateInputChange}
                    className="form-input"
                >
                    {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                </div>
                <div className="form-group">
                  <label htmlFor="isFeatured" className="form-label">Ais Featured:</label>
                  <input
                    type="checkbox"
                        id="isFeatured"
                        name="isFeatured"
                        checked={updatedDataset.isFeatured || false}
                        onChange={(e) => setUpdatedDataset({ ...updatedDataset, isFeatured: e.target.checked })}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-label">Atags:</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={updatedDataset.tags || ""}
                        onChange={handleUpdateInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="format" className="form-label">Aformat:</label>
                    <input
                        type="text"
                        id="format"
                        name="format"
                        value={updatedDataset.format || ""}
                        onChange={handleUpdateInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="seller" className="form-label">Aseller:</label>
                    <input
                        type="text"
                        id="seller"
                        name="seller"
                        value={updatedDataset.seller || ""}
                        onChange={handleUpdateInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfRecords" className="form-label">Anumber of Records:</label>
                    <input
                        type="number"
                        id="numberOfRecords"
                        name="numberOfRecords"
                        value={updatedDataset.numberOfRecords || 0}
                        onChange={handleUpdateInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="size" className="form-label">Asize:</label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        value={updatedDataset.size || ""}
                        onChange={handleUpdateInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="license" className="form-label">Alicense:</label>
                    <input
                        type="text"
                        id="license"
                        name="license"
                        value={updatedDataset.license || ""}
                        onChange={handleUpdateInputChange}
                        className="form-input"/>
                </div>
                 <div className="form-group"> <label htmlFor="sample" className="form-label">Asample:</label> <input type="text" id="sample" name="sample" value={updatedDataset.sample|| ""} onChange={handleUpdateInputChange} className="form-input"/> </div>
            <button type="submit" className="submit-button">Update Dataset</button> </form> </>)}

      <h2>Existing Datasets</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((dataset) => (            
            <tr key={dataset._id}>
              <td>{dataset.name}</td>
              <td>{dataset.category}</td>
              <td>{dataset.price}</td>
              <td>{dataset.seller}</td>
              <td><button onClick={() => handleUpdate(dataset)}>Update</button> <button onClick={() => handleDelete(dataset._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Admin;