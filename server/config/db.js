const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/marketplace', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectDB();
module.exports = connectDB;

module.exports = connectDB;