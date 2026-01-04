const cloudinary = require("../config/cloudinary");

exports.getFolders = async (req, res) => {
  try {
    const result = await cloudinary.api.root_folders();
    res.json(result.folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMediaByFolder = async (req, res) => {
  const { folder } = req.params;

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    res.json(result.resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
