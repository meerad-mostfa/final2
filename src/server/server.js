// Required Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Setup Express App
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

// In-Memory Data Store
let tripsData = [];
let currentId = 0;

// Setup Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Route to Serve Main HTML File
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Route to Get All Trips
app.get("/all", (req, res) => {
  res.json(tripsData);
});

// Route to Add a New Trip
app.post("/add", (req, res) => {
  const newTrip = {
    id: ++currentId, // Increment ID
    ...req.body, // Spread body properties
  };
  
  tripsData.push(newTrip);
  res.status(201).json(newTrip);
  console.log("Trip added:", newTrip);
});

// Route to Update an Existing Trip
app.put("/update/:id", (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const index = tripsData.findIndex((trip) => trip.id === tripId);

  if (index !== -1) {
    tripsData[index] = {
      ...tripsData[index],
      ...req.body, // Overwrite with new data
    };

    res.json(tripsData[index]);
    console.log("Trip updated:", tripsData[index]);
  } else {
    res.status(404).json({ message: "Trip not found" });
  }
});

// Route to Delete a Trip
app.delete("/delete/:id", (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const index = tripsData.findIndex((trip) => trip.id === tripId);

  if (index !== -1) {
    tripsData.splice(index, 1);
    res.json({ message: "Trip deleted" });
    console.log("Trip deleted:", tripId);
  } else {
    res.status(404).json({ message: "Trip not found" });
  }
});
