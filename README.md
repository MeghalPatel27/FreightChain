# 📦 FreightChain – Logistics Platform Mockup

A lightweight logistics management backend API for creating and tracking shipments with automated pricing based on real-world distance calculations.  
Built with **Node.js**, **Express.js**, **PostgreSQL**, and integrated with **Google Maps Distance Matrix API**.

---

## 🚀 Features
- **Create Shipments** — Store shipment details including source, destination, distance, and price.
- **Automated Pricing** — Calculates cost based on real-world travel distance using Google Maps API.
- **Retrieve Shipments** — Fetch all stored shipments in JSON format.
- **RESTful API** — Simple, well-structured endpoints for integration with any frontend or mobile app.

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **API Integration**: Google Maps Distance Matrix API
- **Libraries**: Axios, dotenv, pg

---

## 📂 API Endpoints

### 1️⃣ Create Shipment
**POST** `/api/shipments`
```json
{
  "source": "Ahmedabad",
  "destination": "Mumbai"
}
```
**Response:**
```json
{
  "id": 1,
  "source": "Ahmedabad",
  "destination": "Mumbai",
  "distance_km": 528.4,
  "price_estimate": 1585.2
}
```

---

### 2️⃣ Get All Shipments
**GET** `/api/shipments`
```json
[
  {
    "id": 1,
    "source": "Ahmedabad",
    "destination": "Mumbai",
    "distance_km": 528.4,
    "price_estimate": 1585.2
  }
]
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/freightchain.git
cd freightchain
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```
DB_USER=yourusername
DB_HOST=localhost
DB_NAME=freightchain
DB_PASS=yourpassword
GOOGLE_API_KEY=your_google_maps_api_key
```

4. **Create database table**
```sql
CREATE TABLE shipments (
  id SERIAL PRIMARY KEY,
  source VARCHAR(100),
  destination VARCHAR(100),
  distance_km FLOAT,
  price_estimate FLOAT
);
```

5. **Start the server**
```bash
node server.js
```

---

## 📌 Example Use Case
A logistics company can integrate this API into their booking system to:
- Automatically calculate shipment costs.
- Store shipment records for tracking and invoicing.
- Integrate with mobile or web dashboards.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
