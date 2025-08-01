const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const healthRoutes = require('./routes/health');
const shipmentRoutes = require('./routes/shipments');
const quoteRoutes = require('./routes/quotes');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 60 // requests per IP
});
app.use(limiter);

// Routes
app.use('/', healthRoutes);
app.use('/auth', authRoutes);
app.use('/shipments', shipmentRoutes);
app.use('/quotes', quoteRoutes);

module.exports = app;
