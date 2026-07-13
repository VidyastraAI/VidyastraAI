const LectureLibrary = require("./LectureLibraryModel");

exports.getAllLectures = async (req, res) => {
    try {
        const lectures = await LectureLibrary.find();
        res.status(200).json(lectures);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.toggleWatched = async (req, res) => {
    try {
        const lecture = await LectureLibrary.findOne({ id: req.params.id });
        if (!lecture) {
            return res.status(404).json({ success: false, message: "Lecture not found" });
        }
        lecture.watched = !lecture.watched;
        await lecture.save();
        res.status(200).json({ success: true, watched: lecture.watched });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};