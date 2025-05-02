const mongoose = require('mongoose');
const Dataset = require('../models/Dataset');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');

const seedData = [
  {
    name: 'Dataset 1',
    description: 'This is dataset 1',
    price: 10,
    category: 'Finance',
    tags: ['finance', 'data'],
    format: 'CSV',
    lastUpdated: new Date('2023-10-26'),
    preview: 'https://example.com/preview/financial',
    seller: 'MarketData Corp',
    numberOfRecords: 150000,
    size: '1.5GB',
    license: 'Commercial',
    sample: 'https://example.com/sample/financial'
  },  
  {
    name: 'Dataset 2',
    description: 'This is dataset 2',
    price: 20,
    category: 'Health',
    tags: ['health', 'medical'],
    format: 'CSV',
    lastUpdated: new Date('2023-10-25'),
    preview: 'https://example.com/preview/healthcare',
    seller: 'HealthData Inc',
    numberOfRecords: 500000,
    size: '3GB',
    license: 'Research',
    sample: 'https://example.com/sample/healthcare'
  },  
  {
    name: 'Dataset 3',
    description: 'This is dataset 3',
    price: 30,
    category: 'Sports',
    tags: ['sports', 'data'],
    format: 'JSON',
    lastUpdated: new Date('2023-10-24'),
    preview: 'https://example.com/preview/football',
    seller: 'SportsStats Co',
    numberOfRecords: 100000,
    size: '1GB',
    license: 'Commercial',
    sample: 'https://example.com/sample/football'
  },  
  {
    name: 'Dataset 4',
    description: 'This is dataset 4',
    price: 40,
    category: 'Environment',
    tags: ['environment', 'data'],
    format: 'CSV',
    lastUpdated: new Date('2023-10-23'),
    preview: 'https://example.com/preview/climate',
    seller: 'EcoData Solutions',
    numberOfRecords: 200000,
    size: '2GB',
    license: 'Research',
    sample: 'https://example.com/sample/climate'
  },  
  {
    name: 'Dataset 5',
    description: 'This is dataset 5',
    price: 50,
    category: 'Finance',
    tags: ['customers', 'sales', 'marketing'],
    format: 'CSV',
    lastUpdated: new Date('2023-10-22'),
    preview: 'https://example.com/preview/ecommerce',
    seller: 'OnlineRetail Insights',
    numberOfRecords: 300000,
    size: '2.5GB',
    license: 'Commercial',
    sample: 'http://example.com/sample5',
  },  
  {
    name: 'Dataset 6',
    description: 'This is dataset 6',
    price: 60,
    category: 'Social Media',
    tags: ['trends', 'hashtags', 'social'],
    format: 'JSON',
    lastUpdated: new Date('2023-10-21'),
    preview: 'https://example.com/preview/socialmedia',
    seller: 'Social Trends Ltd',
    numberOfRecords: 80000,
    size: '800MB',
    license: 'Commercial',
    sample: 'http://example.com/sample6',
  },  
  {
    name: 'Dataset 7',
    description: 'This is dataset 7',
    price: 70,
    category: 'Real Estate',
    tags: ['property', 'sales', 'market'],
    format: 'CSV',
    lastUpdated: new Date('2023-10-20'),
    preview: 'https://example.com/preview/realestate',
    seller: 'Property Analytics',
    numberOfRecords: 250000,
    size: '1.8GB',
    license: 'Commercial',
    sample: 'http://example.com/sample7',
  },  
  {
    name: 'Dataset 8',
    description: 'This is dataset 8',
    price: 80,
    category: 'Education',
    tags: ['students', 'performance', 'education'],
    format: 'CSV',
    lastUpdated: new Date('2023-10-19'),
    preview: 'https://example.com/preview/education',
    seller: 'EduData Group',
    numberOfRecords: 400000,
    size: '2.8GB',
    license: 'Research',
    sample: 'http://example.com/sample8',
  },  
  {
    name: 'Dataset 9',
    description: 'This is dataset 9',
    price: 90,
    category: 'Environment',
    tags: ['pollution', 'deforestation', 'impact'],
    format: 'CSV',
    lastUpdated: new Date('2023-10-18'),
    preview: 'https://example.com/preview/environmental',
    seller: 'Green Earth Insights',
    numberOfRecords: 350000,
    size: '3.2GB',
    license: 'Research',
    sample: 'http://example.com/sample9',
  },  
  {
    name: 'Dataset 10',
    description: 'This is dataset 10',
    price: 100,
    category: 'Travel',
    tags: ['travel', 'tourism', 'destinations'],
    format: 'JSON',
    lastUpdated: new Date('2023-10-17'),
    preview: 'https://example.com/preview/travel',
    seller: 'Seller 10',
    numberOfRecords: 10000,
    size: '100MB',
    license: 'Non-Commercial',
    sample: 'http://example.com/sample10',
  },
];

const seedUsers = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password', salt);

    // Create Admin user
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    });

    //Create user with user role
    const userUser = new User({
      username: 'user',
      password: hashedPassword,
      role: 'user',
    });

    await userUser.save();
    console.log('User user created!');
    await adminUser.save();
    console.log('Admin user created!');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    await connectDB();

    console.log('Connected to MongoDB! seeding database');
    
    // Delete existing data
    await User.deleteMany({});
    await Dataset.deleteMany({});
    await seedUsers();
    await Dataset.insertMany(seedData);
    console.log('Database seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
