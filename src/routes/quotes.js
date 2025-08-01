const express = require('express');
const router = express.Router();
const pool = require('../db');
const { getDistanceKm } = require('../services/googleMapsService');
const { calculateQuote } = require('../services/quoteCalculator');

// 📌 Generate and store quote for a shipment
router.post('/:shipmentId', async (req, res) => {
  try {
    const { shipmentId } = req.params;

    // Get shipment details
    const shipmentResult = await pool.query(`SELECT * FROM shipments WHERE id = $1`, [shipmentId]);
    if (shipmentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    const shipment = shipmentResult.rows[0];

    // Get distance from Google Maps
    const distanceKm = await getDistanceKm(shipment.origin, shipment.destination);

    // Calculate price
    const price = calculateQuote(distanceKm, shipment.weight);

    // Store quote in DB
    const quoteResult = await pool.query(
      `INSERT INTO quotes (shipment_id, distance_km, price) VALUES ($1, $2, $3) RETURNING *`,
      [shipmentId, distanceKm, price]
    );

    res.json({
      message: 'Quote generated successfully',
      quote: quoteResult.rows[0]
    });

  } catch (error) {
    console.error('❌ Error generating quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 📌 Get quotes for a shipment
router.get('/:shipmentId', async (req, res) => {
  try {
    const { shipmentId } = req.params;
    const result = await pool.query(`SELECT * FROM quotes WHERE shipment_id = $1`, [shipmentId]);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching quotes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
