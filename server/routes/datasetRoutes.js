const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { 
  uploadDataset,
  getAllDatasets,
  getDatasetById,
  updateDataset,
  deleteDataset,
  getReviewsAndRatings
} = require('../controllers/datasetControllers');
const upload = require('../utils/multer');
const auth = require('../middleware/auth');

// Route for creating a dataset (POST)
router.post(
  '/',
  protect,
  admin,
  upload.single('datasetFile'),
  uploadDataset
); 

// Route for getting all datasets (GET) with filtering, sorting, and searching
router.get('/', getAllDatasets);

// Route for getting a dataset by ID (GET)
router.get('/:id', getDatasetById);

// Route for updating a dataset (PUT)
router.put('/:id', protect, admin, upload.single('datasetFile'), updateDataset);

// Route for deleting a dataset (DELETE)
router.delete('/:id', protect, admin, deleteDataset);

// Route to get reviews and ratings for a dataset
router.get('/:id/reviews', getReviewsAndRatings);



module.exports = router;