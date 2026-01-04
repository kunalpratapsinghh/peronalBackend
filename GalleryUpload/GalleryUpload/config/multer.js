const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
      return {
    folder: req.query.folder || "Gallery",
    resource_type: "auto", // image + video
  };
  },
});

module.exports = storage;
