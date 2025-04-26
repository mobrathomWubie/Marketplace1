import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteDataset } from '../../features/datasets/datasetSlice';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteDatasetAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this dataset?')) {
      dispatch(deleteDataset(id))
        .then(() => {
          navigate('/admin/datasets');
        })
        .catch((error) => {
          console.error('Failed to delete dataset:', error);
        });
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Dataset
    </button>
  );
};

export default DeleteDatasetAdmin;