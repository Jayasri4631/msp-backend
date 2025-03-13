const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("firebase-key.json", "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://msp-prediction.firebaseio.com"
});

const db = admin.firestore();
const app = express();
app.use(cors());

// API Route to Fetch MSP Data
app.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("flower_msp").get();
        let data = {};
        snapshot.forEach(doc => {
            data[doc.id] = doc.data();
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});