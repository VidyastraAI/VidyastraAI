const express = require("express");
const router = express.Router();
const { getAllLectures, toggleWatched } = require("./LectureLibraryController");

router.get("/", getAllLectures);
router.patch("/:id/toggle", toggleWatched);

module.exports = router;