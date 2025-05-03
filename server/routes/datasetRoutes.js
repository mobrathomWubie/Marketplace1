import express from 'express';
const router = express.Router();
import * as datasetController from '../controllers/datasetControllers.js';

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

export default router;