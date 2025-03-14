const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors()); // Allow frontend to access backend
app.use(express.json());

// Initialize Firebase
const serviceAccount = require('./path/to/your/firebase-private-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// API to fetch MSP Data
app.get('/', async (req, res) => {
    try {
        const collectionRef = db.collection('flower_msp');
        const snapshot = await collectionRef.get();
        
        let data = {};
        snapshot.forEach(doc => {
            data[doc.id] = doc.data();
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
