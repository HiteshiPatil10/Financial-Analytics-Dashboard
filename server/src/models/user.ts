import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,   // User's name
    required: true, // This field is required    
    },
    email: {   
    type: String,   // User's email
    required: true, // This field is required
    unique: true,  // Email must be unique
    },
    password: {
    type: String,   // User's password
    required: true, // This field is required
    }},
    {timestamps: true} // Automatically manage createdAt and updatedAt fields
);

export const User = mongoose.model("User", userSchema);

