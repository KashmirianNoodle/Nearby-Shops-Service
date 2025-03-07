const checkLocation = (req, res, next) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }
  next();
};

module.exports = { checkLocation };
