const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Adjust the frontend URL
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("✅ MongoDB Connected Successfully");
}).catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
});

// Routes
app.use('/api', todoRoutes); // ✅ Correct route prefix

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});