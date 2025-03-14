const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);


const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://msp-prediction.firebaseio.com"
});

const db = admin.firestore();

app.use(cors());
app.use(express.json()); // To parse JSON data

// API to fetch data from Firestore
app.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("flower_msp").get();
        
        if (snapshot.empty) {
            return res.status(404).json({ error: "No data found" });
        }

        let data = [];
        snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
