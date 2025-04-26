const Dataset = require('../models/dataset');
const { generateSlug } = require('../utils/generateSlug');

exports.uploadDataset = async (req, res) => {
  try {
    const dataset = new Dataset({
      ...req.body,
      fileUrl: req.file.path,
      format: req.file.mimetype,
      size: req.file.size,
      publisher: req.user.id,
      slug: generateSlug(req.body.name),
      isApproved: req.user.role === 'admin' // Auto-approve admin uploads
    });

    await dataset.save();
    res.status(201).json(dataset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all datasets with filtering, sorting, and search
exports.getAllDatasets = async (req, res) => {
  try {
    const { category, sortBy, sortOrder, search, page = 1, limit = 10 } = req.query;

    const query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const sort = {};
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1; // Default sort by latest
    }

    const skip = (page - 1) * limit;

    const totalDatasets = await Dataset.countDocuments(query);
    const datasets = await Dataset.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('publisher', 'name email');

    res.json({
      datasets,
      totalPages: Math.ceil(totalDatasets / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new dataset
exports.createDataset = async (req, res) => {
  try {
    const { name, description, category, dataTypes, size, sampleDataLink } = req.body;
    const newDataset = new Dataset({
      name,
      description,
      category,
      dataTypes,
      size,
      sampleDataLink,
      creator: req.user.id, // Assuming you have user authentication
      slug: generateSlug(name),
    });
    await newDataset.save();
    res.status(201).json(newDataset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a dataset by ID
exports.getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id).populate('creator', 'name email');
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.json(datasets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a dataset
exports.updateDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.json(dataset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a dataset
exports.deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findByIdAndDelete(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.json({ message: 'Dataset deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};