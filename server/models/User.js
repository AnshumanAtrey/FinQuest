import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  clerkId: { type: String }, // Unique identifier for the user
  firstName: { type: String }, // Add first name field
  lastName: { type: String }, // Add last name field
  email: { type: String }, // User's email
  phone: { type: String }, // Add phone field
  age: { type: Number }, // Add age field
  gender: { type: String }, // Add gender field
  income: { type: Number }, // Add income field
  profession: { type: String }, // Add profession field
  familyMembers: { type: Number }, // Add family members field
  dream: { type: String }, // Add dream field
  savings: { type: Number }, // Add savings field
  // Add other fields as necessary
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
