import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: Number,
    default: 1,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://photosvibe.in/wp-content/uploads/2024/05/whatsapp-no-icon-dp-broken_19.webp",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Examiner", userSchema);

export default User;