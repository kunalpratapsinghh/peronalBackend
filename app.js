require("dotenv").config();
const express = require("express");
const cors = require("cors");

const galleryRoutes = require("./routes/gallery.routes");
const homeRoutes = require("./routes/home.routes"); // <-- import

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", homeRoutes);           // <-- home route
app.use("/api/gallery", galleryRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
