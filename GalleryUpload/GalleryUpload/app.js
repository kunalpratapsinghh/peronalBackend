require("dotenv").config();
const express = require("express");
const cors = require("cors");

const galleryRoutes = require("./routes/gallery.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/gallery", galleryRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
