import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock user database (in-memory)
const users = [];

// Helper function to find a user by email
const findUserByEmail = (email) => users.find((user) => user.email === email);

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  if (findUserByEmail(email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

// Log in a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate token
  const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

// Log out a user (This would typically be handled on the client side by removing the token)
export const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

// Get user profile
export const getUserProfile = (req, res) => {
  const { id } = req.user;

  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ id: user.id, name: user.name, email: user.email });
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { id } = req.user;
  const { name, email, password } = req.body;

  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  res.status(200).json({ message: "User profile updated successfully" });
};
