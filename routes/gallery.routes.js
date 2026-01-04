const express = require("express");
const multer = require("multer");
const storage = require("../config/multer");
const controller = require("../controllers/gallery.controller");
const { default: ApiResponse } = require("../utils/apiresponseConstructor");

const router = express.Router();
const upload = multer({ storage });

router.post("/uploads", upload.any(), (req, res) => {
  try {
    const files = req.files || [];

    if (!files.length) {
      return res.status(400).json(
        new ApiResponse(null, "No files uploaded", false, 400)
      );
    }

    res.status(200).json(
      new ApiResponse(
        {
          files: files.map(file => ({
            url: file.path,
            public_id: file.filename,
          })),
        },
        "Files uploaded successfully",
        true,
        200
      )
    );
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json(
      new ApiResponse(null, "Internal Server Error", false, 500)
    );
  }
});


router.get("/folders", controller.getFolders);
router.get("/media/:folder", controller.getMediaByFolder);

module.exports = router;
