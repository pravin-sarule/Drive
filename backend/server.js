
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./src/routes/authRoutes');
// const fileRoutes = require('./src/routes/fileRoutes');
// const documentRoutes = require('./src/routes/documentRoutes');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors({ origin: 'https://nexintelai.netlify.app', credentials: true }));
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/files', fileRoutes);
// app.use('/api/doc', documentRoutes);

// // Basic error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Global unhandled promise rejection handler
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//   // Optionally, exit the process if the error is critical
//   // process.exit(1);
// });


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const fileRoutes = require('./src/routes/fileRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(cors({
  origin: 'https://nexintelai.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Manually handle preflight OPTIONS requests
app.options('*', cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/doc', documentRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

