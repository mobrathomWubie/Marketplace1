import Dataset from '../models/Dataset.js';

export const getAllDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find();
    res.status(200).json(datasets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDataset = async (req, res) => {
  try {
    const newDataset = new Dataset(req.body);
    const datasets = await newDataset.save();
    res.status(200).json(datasets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.status(200).json(dataset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewDatasets = async (req, res) => {
  try {
    const newDatasets = await Dataset.find().sort({ lastUpdated: -1 }).limit(10);
    res.status(200).json(newDatasets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingDatasets = async (req, res) => {
  try {
    const trendingDatasets = await Dataset.find().sort({ views: -1 }).limit(10);
    res.status(200).json(trendingDatasets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Dataset.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBestSellingDatasets = async (req, res) => {
  try {
    const bestSellingDatasets = await Dataset.find().sort({ sales: -1 }).limit(10);
    res.status(200).json(bestSellingDatasets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDataset = async (req, res) => {
  try {
    const updatedDataset = await Dataset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.status(200).json(updatedDataset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDataset = async (req, res) => {
  try {
    const deletedDataset = await Dataset.findByIdAndDelete(req.params.id);
    if (!deletedDataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.status(200).json({ message: 'Dataset deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBestSellers = async (req, res) => {
    try {
      const bestSellers = await Dataset.aggregate([
        {
          $group: {
            _id: '$seller',
            totalSales: { $sum: '$sales' },
          },
        },
        { $sort: { totalSales: -1 } },
        { $limit: 10 },
      ]);
      res.status(200).json(bestSellers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
