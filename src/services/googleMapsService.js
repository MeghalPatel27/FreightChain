const axios = require('axios');
require('dotenv').config();

async function getDistanceKm(origin, destination) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;

  try {
    const response = await axios.get(url, {
      params: {
        origins: origin,
        destinations: destination,
        key: apiKey
      }
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Google Maps API Error: ${response.data.status}`);
    }

    const element = response.data.rows[0].elements[0];
    if (element.status !== 'OK') {
      throw new Error(`No route found: ${element.status}`);
    }

    const distanceKm = element.distance.value / 1000; // meters → km
    return distanceKm;

  } catch (error) {
    console.error('❌ Error fetching distance:', error.message);
    throw error;
  }
}

module.exports = { getDistanceKm };
