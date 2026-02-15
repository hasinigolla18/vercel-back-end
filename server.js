const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// IMPORTANT CORS FIX
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());


// MongoDB Atlas connection
mongoose.connect("mongodb+srv://hasinigolla21_db_user:hasini1807@hasini.keyu7nx.mongodb.net/soulsync?retryWrites=true&w=majority&appName=hasini")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));


// Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  mood: String
});

const Profile = mongoose.model("Profile", profileSchema);


// TEST route
app.get("/", (req, res) => {
  res.send("Backend is working");
});


// SAVE PROFILE route
app.post("/save-profile", async (req, res) => {

  try {

    console.log("Received:", req.body);

    const newProfile = new Profile({
      name: req.body.name,
      mood: req.body.mood
    });

    await newProfile.save();

    res.json({
      success: true,
      message: "Profile saved successfully"
    });

  }
  catch(error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error saving profile"
    });

  }

});


// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});