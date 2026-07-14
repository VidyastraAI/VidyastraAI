const express = require("express");
const router = express.Router();
const { getNotifications, markAllRead } = require("./NotificationsController");

router.get("/", getNotifications);
router.patch("/mark-all-read", markAllRead);

module.exports = router;