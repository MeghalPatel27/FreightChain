function calculateQuote(distanceKm, weight) {
  const basePrice = 50; // fixed cost
  const pricePerKm = 2; // per km
  const pricePerKg = 0.5; // per kg
  return basePrice + (distanceKm * pricePerKm) + (weight * pricePerKg);
}

module.exports = { calculateQuote };
