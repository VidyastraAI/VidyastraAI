const Progress = require("./ProgressModel");

exports.getProgress = async (req, res) => {
    try {
        const progress = await Progress.findOne();
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};