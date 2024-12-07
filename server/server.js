// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js"; // Note the .js extension

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample route
app.get("/", (req, res) => {
  console.log("GET / - Welcome route accessed");
  res.send("Welcome to the Gamified Financial App API");
});

// Check if user exists
app.get("/api/checkUser/:clerkId", async (req, res) => {
  const { clerkId } = req.params;
  console.log(`GET /api/checkUser/${clerkId} - Checking if user exists`);

  try {
    const user = await User.findOne({ clerkId });
    if (user) {
      console.log(`User found: ${user}`);
      return res.status(200).json({ exists: true });
    }
    console.log(`No user found with clerkId: ${clerkId}`);
    res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Error checking user", error });
  }
});

// Login or create user
app.post("/api/login", async (req, res) => {
  const {
    clerkId,
    firstName,
    lastName,
    email,
    phone,
    age,
    gender,
    income,
    profession,
    familyMembers,
    dream,
    savings,
  } = req.body;

  console.log(
    `POST /api/login - Attempting to log in or create user with clerkId: ${clerkId}`
  );

  try {
    let user = await User.findOne({ clerkId });
    if (!user) {
      console.log(`Creating new user with clerkId: ${clerkId}`);
      user = new User({
        clerkId,
        firstName,
        lastName,
        email,
        phone,
        age,
        gender,
        income,
        profession,
        familyMembers,
        dream,
        savings,
      });
      await user.save();
      console.log(`User created: ${user}`);
      return res.status(201).json({ message: "User created", user });
    }
    console.log(`User already exists: ${user}`);
    res.status(200).json({ message: "User exists", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.get("/api/checkUser/:clerkId", async (req, res) => {
  const { clerkId } = req.params;

  try {
    const user = await User.findOne({ clerkId });
    if (user) {
      return res.status(200).json({ exists: true });
    }
    res.status(200).json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: "Error checking user", error });
  }
});

const clerkApiKey = process.env.CLERK_API_KEY; // Use the secret key in your backend

app.listen(PORT, () => {
  console.log(`Server is running on https://finquest.onrender.com:${PORT}`);
});
