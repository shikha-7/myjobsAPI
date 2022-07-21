const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please Provide company name"],
    },
    position: {
        type: String,
        required: [true, "please provide position"],
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true, "Please Provide User"]
    }

}, { timestamps: true });

module.exports = mongoose.model("job", JobSchema);