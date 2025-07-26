const mongoose = require('mongoose');

const readingObjectiveSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        readingObjective: {
            type: Number,
            required: true,
        },
        objectiveStartDate: {
            type: Date,
            required: true,
        }
    }
)

module.exports = mongoose.model('ReadingObjective', readingObjectiveSchema)