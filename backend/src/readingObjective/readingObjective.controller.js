const ReadingObjective = require('./readingObjective.model');

const getReadingObjective = async (req, res) => {
  const filter = { userId: req.user.uid };
  try {
    const objective = await ReadingObjective.findOne(filter).lean();
    if (!objective) {
      return res.status(404).json({ message: 'No reading objective found' });
    }
    res.status(200).json(objective);
  } catch (error) {
    console.error('Failed to load reading objective', error);
    res.status(500).json({ message: 'Failed to load reading objective' });
  }
};

const setReadingObjective = async (req, res) => {
  try {
    const { readingObjective, objectiveStartDate } = req.body;
    if (readingObjective == null || !objectiveStartDate) {
      return res
        .status(400)
        .json({ message: 'Reading objective or start date not provided.' });
    }
    const filter = { userId: req.user.uid };
    const update = {
      readingObjective,
      objectiveStartDate,
      userId: req.user.uid,
    };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const newObjective = await ReadingObjective.findOneAndUpdate(
      filter,
      update,
      options
    );
    res.status(200).json({
      message: 'Reading objective saved successfully',
      readingObjective: newObjective,
    });
  } catch (error) {
    console.error('Failed to save reading objective.', error);
    res.status(500).json({
      message: 'Failed to save reading objective',
      error: error.message,
    });
  }
};

module.exports = {
  getReadingObjective,
  setReadingObjective,
};
