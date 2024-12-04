// Import required dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/products');
const path = require('path');
const userProductRoutes = require(path.join(__dirname, '../../User/backend/routes/productRoutes'));

// Import additional security packages
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false
}));
app.use(mongoSanitize()); // Prevent NoSQL injection

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const userImagesDir = path.join(__dirname, 'uploads', 'user-images');
if (!fs.existsSync(userImagesDir)) {
    fs.mkdirSync(userImagesDir, { recursive: true });
}

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with retry logic and better options
const connectDB = async () => {
    const options = {
        dbName: 'Samipya_sellers',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 5,
        retryWrites: true
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('Connected to MongoDB Atlas');
        console.log('=== MongoDB Connection Status ===');
        console.log('Database Name:', mongoose.connection.name);
        console.log('Connection State:', mongoose.connection.readyState);
        console.log('Host:', mongoose.connection.host);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// Initialize GridFS after MongoDB connection
mongoose.connection.once('open', () => {
    console.log('GridFS initialized');
});

// Serve static uploads directory
app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'credentialless');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Log requests to image paths for debugging
app.use('/uploads', (req, res, next) => {
    console.log('Image request path:', req.path);
    console.log('Full image path:', path.join(__dirname, 'uploads', req.path));
    next();
});

// Seller Routes
app.use('/seller/auth', require('./routes/auth'));
app.use('/seller/reviews', require('./routes/reviews'));
app.use('/seller/notifications', require('./routes/notifications'));
app.use('/seller/userProfiles', require('./routes/userProfiles'));
app.use('/seller/users', userRoutes);
app.use('/seller/products', productsRoutes);

// User Routes (with prefix)
app.use('/user/api/products', userProductRoutes); // Add user routes with prefix

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        timestamp: new Date().toISOString()
    });

    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            status: 'error',
            message: 'File upload error',
            error: err.message
        });
    }

    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Configure multer with better error handling and validation
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads','user-images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExt = path.extname(file.originalname).toLowerCase();
        cb(null, `profile-${uniqueSuffix}${fileExt}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
        return;
    }

    if (file.size > maxSize) {
        cb(new Error('File size too large. Maximum size is 5MB.'), false);
        return;
    }

    cb(null, true);
};


// Serve uploaded images
app.use('/user-images', express.static(path.join(__dirname, 'uploads/user-images')));

// Add graceful shutdown
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
