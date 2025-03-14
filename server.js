const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all origins (or restrict it to Neocities)
app.use(cors({
    origin: "*", // Change to "https://yourusername.neocities.org" for security
    methods: ["GET"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Sample MSP Data
const mspData = [
    { flower: "Jasmine", year: "2019-2020", msp: 6000 },
    { flower: "Jasmine", year: "2020-2021", msp: 6500 },
    { flower: "Jasmine", year: "2021-2022", msp: 7000 },
    { flower: "Jasmine", year: "2022-2023", msp: 7500 },
    { flower: "Jasmine", year: "2023-2024", msp: 8000 },

    { flower: "Marigold", year: "2019-2020", msp: 5500 },
    { flower: "Marigold", year: "2020-2021", msp: 6000 },
    { flower: "Marigold", year: "2021-2022", msp: 6500 },
    { flower: "Marigold", year: "2022-2023", msp: 7000 },
    { flower: "Marigold", year: "2023-2024", msp: 7500 }
];

// ✅ API Endpoint to Fetch MSP Data
app.get("/msp-data", (req, res) => {
    res.json(mspData);
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
