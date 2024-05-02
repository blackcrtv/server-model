

const testServer = async (req, res, next) => {
  let version = req.params.version;
  if (version != 1 && version != 2) {
    res.status(400).json({ error: true, message: "Version not found!" });
    return;
  }
  try {
    res.status(200).json({ param: version });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: error + "" });
  }
};

module.exports = {
  testServer,
};
