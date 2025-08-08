
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


// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./src/routes/authRoutes');
// const fileRoutes = require('./src/routes/fileRoutes');
// const documentRoutes = require('./src/routes/documentRoutes');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // CORS Configuration
// app.use(cors({
//   origin: 'https://nexintelai.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// // Manually handle preflight OPTIONS requests
// // app.options('*', cors());

// // Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/files', fileRoutes);
// app.use('/api/doc', documentRoutes);

// // Basic error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Server Start
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Global unhandled promise rejection handler
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const pool = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const fileRoutes = require('./src/routes/fileRoutes');
const documentRoutes = require('./src/routes/documentRoutes');

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'https://nexintelai.netlify.app',  // Production frontend
  'http://localhost:3000',           // Backend itself (if tested in browser)
  'http://localhost:3001',           // Frontend development port
  'http://localhost:3002'            // Optional secondary frontend port
];

// ✅ CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Preflight headers (for OPTIONS)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/doc', documentRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ✅ Graceful shutdown on unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
