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

exports.deleteMedia = async (req, res) => {
  const { public_id } = req.query;
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.json(new ApiResponse(result, "Media deleted successfully", true, 200));
  } catch (err) {
    res.status(500).json(new ApiResponse(null, err.message, false, 500));
  }
}

exports.deleteFolder = async (req, res) => {
  const { folder } = req.params;
  try {
    await cloudinary.api.delete_resources_by_prefix(folder);
    const result = await cloudinary.api.delete_folder(folder);
    res.json(new ApiResponse(result, "Folder deleted successfully", true, 200));
  } catch (err) {
    console.error(err);
    res.status(500).json(new ApiResponse(null, err.message, false, 500));
  }
};





