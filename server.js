require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

// Initialize Firebase using Environment Variables
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();

// ✅ API Route - Check Server Status
app.get("/", (req, res) => {
  res.send("MSP Backend is Running!");
});

// ✅ API Route - Fetch Data from Firestore
app.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("msp_data").get();
    let data = [];
    
    snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
