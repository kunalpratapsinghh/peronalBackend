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
    const prefix = `${folder}/`
    // 1. Delete images
    await cloudinary.api.delete_resources_by_prefix(prefix, {
      resource_type: "image",
      type: "upload",
    });
    // 2. Delete videos
    await cloudinary.api.delete_resources_by_prefix(prefix, {
      resource_type: "video",
      type: "upload",
    });

    // 3. Delete raw files (MOST COMMONLY MISSED)
    await cloudinary.api.delete_resources_by_prefix(prefix, {
      resource_type: "raw",
      type: "upload",
    });

    // 4. Delete folder
    const result = await cloudinary.api.delete_folder(folder);

    res.json(
      new ApiResponse(result, "Folder deleted successfully", true, 200)
    );

  } catch (err) {
    console.error("Cloudinary delete folder error:", err);
    const statusCode = err?.error?.http_code || 500;
    const message =
      err?.error?.message ||
      err?.message ||
      "Failed to delete folder";

    res.status(statusCode).json(
      new ApiResponse(null, message, false, statusCode)
    );
  }
};





