const express = require("express");
const NotificationController = require("../../controllers/notification.controller");
const notificationRoute = express.Router();
notificationRoute.get(
  "/notification/:userId",
  NotificationController.getNotificationForUserId
);
notificationRoute.post(
  "/notification",
  NotificationController.createNotification
);
module.exports = notificationRoute;
