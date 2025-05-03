import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Import database connection
import userRoutes from './routes/userRoutes.js'; // Import user routes
import datasetRoutes from './routes/datasetRoutes.js'; // Import dataset routes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
(async () => {
  try {
      await connectDB();
      console.log('Connection to the database successful')
  } catch (error) {
      console.log('Error connecting to the database', error)
  }
})();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/datasets', datasetRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});