import 'dotenv/config';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  ref_Id: {
    type: String,
    lowercase: true,
    trim: true,
  },
  jobTitle: {
    type: String,
    lowercase: true,
    trim: true,
  },
});


async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error in hashPassword()::helper.js", error);
    throw new Error("Failed to hash password");
  }
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to generate JWT token
userSchema.methods.genAuthToken = async function () {
  try {
    const token = jwt.sign(
      { id: this._id, username: this.username },
      process.env.SECRET_KEY,
      { expiresIn: '10m' }
    );
    return token;
  } catch (error) {
    console.error("Error in genAuthToken()", error);
    throw new Error("Failed to generate token");
  }
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Error in comparePassword()", error);
    throw new Error("Failed to compare password");
  }
};

export const User = mongoose.model('User', userSchema);
