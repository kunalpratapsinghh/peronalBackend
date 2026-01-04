const cloudinary = require("../config/cloudinary");
const { default: ApiResponse } = require("../utils/apiresponseConstructor");

exports.getFolders = async (req, res) => {
  try {
    const result = await cloudinary.api.root_folders();
    res.json(new ApiResponse(result.folders, "Folders retrieved successfully", true, 200));
  } catch (err) {
    res.status(500).json(new ApiResponse(null, err.message, false, 500));
  }
};

exports.getMediaByFolder = async (req, res) => {
  const { folder } = req.params;

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by("created_at", "desc")
      .fields("url")
      .execute();
    res.json(new ApiResponse(result.resources, "Media retrieved successfully", true, 200));
  } catch (err) {
    res.status(500).json(new ApiResponse(null, err.message, false, 500));
  }
};
