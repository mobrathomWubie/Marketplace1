const API_BASE_URL = '/api/datasets';

export const getAllDatasets = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch datasets');
  }
  return response.json();
};

export const createDataset = async (datasetData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datasetData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create dataset');
  }
  return response.json();
};

export const updateDataset = async (datasetId, datasetData) => {
  const response = await fetch(`${API_BASE_URL}/${datasetId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datasetData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update dataset');
  }
  return response.json();
};

export const deleteDataset = async (datasetId) => {
  const response = await fetch(`${API_BASE_URL}/${datasetId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete dataset');
  }
  return response.json();
};