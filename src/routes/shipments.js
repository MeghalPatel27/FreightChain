const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');
router.use(authenticateToken);
// 📌 Create a new shipment
router.post('/', async (req, res) => {
  try {
    const { origin, destination, weight } = req.body;

    if (!origin || !destination || !weight) {
      return res.status(400).json({ error: 'Origin, destination, and weight are required' });
    }

    const result = await pool.query(
      `INSERT INTO shipments (origin, destination, weight) VALUES ($1, $2, $3) RETURNING *`,
      [origin, destination, weight]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error creating shipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 📌 Get all shipments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM shipments ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching shipments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 📌 Get a single shipment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM shipments WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error fetching shipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 📌 Update a shipment
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { origin, destination, weight, status } = req.body;

    const result = await pool.query(
      `UPDATE shipments 
       SET origin = COALESCE($1, origin),
           destination = COALESCE($2, destination),
           weight = COALESCE($3, weight),
           status = COALESCE($4, status)
       WHERE id = $5
       RETURNING *`,
      [origin, destination, weight, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error updating shipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 📌 Delete a shipment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`DELETE FROM shipments WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting shipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
