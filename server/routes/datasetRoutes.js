const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/datasetControllers');

router.get('/', datasetController.getAllDatasets);
router.get('/:id', datasetController.getDatasetById);
router.get('/new', datasetController.getNewDatasets); //get new dataset
router.get('/trending', datasetController.getTrendingDatasets);
router.get('/categories', datasetController.getCategories);
//create new dataset
router.post('/', datasetController.createDataset);
//update a dataset
router.put('/:id', datasetController.updateDataset);
//delete a dataset
router.delete('/:id', datasetController.deleteDataset);



module.exports = router;