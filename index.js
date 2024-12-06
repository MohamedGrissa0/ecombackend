// server.js or app.js (Node.js backend)
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const productRoute = require("./Routes/product");
const orderRoute = require("./Routes/order");
const CategoryRoute = require("./Routes/category");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors()); // Enable CORS to allow requests from your Next.js app
app.use(express.json());

// Routes
app.use('/api/uploads', express.static('uploads'));
app.use("/api/products", productRoute); // Example API route
app.use("/api/order", orderRoute); // Example API route
app.use("/api/category", CategoryRoute); // Example API route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
