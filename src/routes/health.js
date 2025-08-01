// src/routes/health.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Health check route
router.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      time: result.rows[0].now
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
});

module.exports = router;
