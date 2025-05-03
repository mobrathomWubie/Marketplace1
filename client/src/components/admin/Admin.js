import React, { useState, useEffect } from 'react';
import './Admin.css'
import Footer from '../Footer';
import { getAllDatasets, createDataset, updateDataset, deleteDataset } from '../../services/datasetService';

function Admin() {
  const [datasets, setDatasets] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
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
  
  const categories = ["Agriculture", "Finance", "Healthcare", "Government", "Education", "Technology"];

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const data = await getAllDatasets();
        setDatasets(data);
      } catch (error) {
          if(error.message === 'Failed to fetch datasets'){
             setError('Failed to fetch datasets. Please check your connection and try again.');
          }
          else setError('An unexpected error occurred while fetching datasets.');
        console.error('Error fetching datasets:', error);
        setError('An unexpected error occurred while fetching datasets.');
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
       await deleteDataset(id);
      
     
      // Update datasets after deletion
      setDatasets(datasets.filter(dataset => dataset._id !== id));

      setMessage('Dataset deleted successfully.');
      setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
    } catch (err) {
      setError(err.message || 'An error occurred while deleting the dataset.');
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    }};
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const createdDataset = await createDataset(newDataset);
       
       
        setDatasets([...datasets, createdDataset]); // Add new dataset to the list

      // Clear the form
      setNewDataset({ ...newDataset, name: '', description: '', price: 0, category: 'Agriculture', isFeatured: false });
        setMessage('Dataset created successfully.');
        setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds

    } catch (err) {
      setError(err.message || 'An error occurred while creating the dataset.');
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    }
  };

  const handleUpdate = (dataset) => {
    setEditingDataset(dataset);
    setUpdatedDataset(dataset);
  }

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
       await updateDataset(editingDataset._id, updatedDataset);
      
      // Update dataset in the state
        setDatasets(datasets.map(dataset => dataset._id === editingDataset._id ? updatedDataset : dataset));
      
      // Clear editing state
      setEditingDataset(null);
      setUpdatedDataset({});

      setMessage('Dataset updated successfully.');
      setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds

    } catch (error) {
      console.error('Error creating dataset:', error);
    }
  };

  return (
    <div>
        <h1 className='text-center'>Admin Page</h1>
        <h2 className='text-center'>Create New Dataset</h2>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form-grid">
         <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newDataset.name}
              placeholder='Enter dataset name'
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
              placeholder='Enter dataset description'
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
              placeholder='Enter dataset price'
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
            placeholder='Enter dataset isFeatured'
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
                        placeholder='Enter dataset tags'
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
                        placeholder='Enter dataset format'
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
                        placeholder='Enter dataset seller'
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
                        placeholder='Enter dataset number of records'
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
                        placeholder='Enter dataset size'
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
                        placeholder='Enter dataset license'
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group"> <label htmlFor="sample" className="form-label">Sample:</label> <input type="text" id="sample" name="sample" value={newDataset.sample} placeholder='Enter dataset sample' onChange={handleInputChange} className="form-input" /> </div>


        <button type="submit" className="submit-button">Create Dataset</button>
      </form>
        {editingDataset && (
          <>
            <h2 className='text-center'>Update Dataset</h2>
            <form onSubmit={handleUpdateSubmit} className="form-grid">
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                 <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedDataset.name || ''}
                    placeholder='Enter dataset name'
                    onChange={handleUpdateInputChange}
                    className="form-input"/>               
                </div>
                <div className="form-group">
                <label htmlFor="description" className="form-label">Adescription:</label>
                    <textarea
                    id="description"
                    name="description"
                    value={updatedDataset.description || ''}
                    placeholder='Enter dataset description'
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
                        placeholder='Enter dataset price'
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
                        placeholder='Enter dataset isFeatured'
                        onChange={(e) => setUpdatedDataset({ ...updatedDataset, isFeatured: e.target.checked })}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-label">Atags:</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        placeholder='Enter dataset tags'
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
                        placeholder='Enter dataset format'
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
                        placeholder='Enter dataset seller'
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
                        placeholder='Enter dataset number of records'
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
                        placeholder='Enter dataset size'
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
                        placeholder='Enter dataset license'
                        onChange={handleUpdateInputChange}
                        className="form-input"/>
                </div>
                <div className="form-group"> <label htmlFor="sample" className="form-label">Sample:</label> <input type="text" id="sample" name="sample" value={updatedDataset.sample || ""} placeholder='Enter dataset sample' onChange={handleUpdateInputChange} className="form-input" /> </div>
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
      <Footer/>
    </div>
  );
}
export default Admin;