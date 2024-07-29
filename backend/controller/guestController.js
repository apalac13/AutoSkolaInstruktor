const Test = require("../models/test");

exports.getTest = async (req, res) => {
  const testname = req.params.id;
  try {
    const test = await Test.findOne({ testName: testname });
    res.status(200).json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: error.message });
  }
};
