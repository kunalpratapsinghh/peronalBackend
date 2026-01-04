const express = require("express");
const multer = require("multer");
const storage = require("../config/multer");
const controller = require("../controllers/gallery.controller");

const router = express.Router();
const upload = multer({ storage });

router.post("/uploads", upload.array("file"), (req, res) => {
  res.json({
    files: req.files.map(file => ({
      url: file.path,
      public_id: file.filename,
    })),
  });
});

router.get("/folders", controller.getFolders);
router.get("/media/:folder", controller.getMediaByFolder);

module.exports = router;
