const express = require("express");
const multer = require("multer");
const storage = require("../config/multer");
const controller = require("../controllers/gallery.controller");

const router = express.Router();
const upload = multer({ storage });

router.post("/uploads", upload.array("file"), (req, res) => {
  res.json(new ApiResponse({
    files: req.files.map(file => ({
      url: file.path,
      public_id: file.filename,
    })),
  }, "Files uploaded successfully", true, 200));
});

router.get("/folders", controller.getFolders);
router.get("/media/:folder", controller.getMediaByFolder);

module.exports = router;
