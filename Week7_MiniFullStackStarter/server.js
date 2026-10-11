const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const userRoutes = require('./users');

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// MongoDB Connect + Start Server
async function start() {
    try {

        // Check if MongoDB URI exists
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error('ERROR: MONGO_URI is missing!');
            console.error('Please check your .env file.');
            process.exit(1);
        }

        console.log('Connecting to MongoDB Atlas...');

        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('MongoDB connected successfully!');

        // Start server
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error('MongoDB Connection Failed!');
        console.error('Error:', error.message);

        process.exit(1);
    }
}

start();