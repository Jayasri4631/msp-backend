const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

// ✅ Enable CORS to allow frontend requests
app.use(
    cors({
        origin: "", // Replace "" with "https://your-neocities-site.neocities.org" if needed
        methods: ["GET"],
        allowedHeaders: ["Content-Type"],
    })
);

// ✅ Initialize Firebase Firestore
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ API Endpoint to Fetch MSP Data
app.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("msp").get();
        let mspData = [];
        snapshot.forEach((doc) => {
            mspData.push({ id: doc.id, ...doc.data() });
        });
        res.json(mspData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
