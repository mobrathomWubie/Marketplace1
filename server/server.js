const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const datasetRoutes = require('./routes/datasetRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api/datasets', datasetRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
