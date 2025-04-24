const notificationModel = require("../models/notification.model");

class NotificationController {
  getNotificationForUserId = async (req, res, next) => {
    const { userId } = req.params;
    const results = await notificationModel.find({
      userId,
    });
    return res.status(200).json({
      message: "get notification success",
      metadata: results,
    });
  };

  createNotification = async (req, res, next) => {
    const { content, isAccepted, expireAt, userId, typeNotifi, sendTo } =
      req.body;
    const newNotification = await notificationModel.create({
      content,
      isAccepted,
      expireAt,
      userId,
      typeNotifi,
      sendTo,
    });
    return res.status(201).json({
      message: "Create new notification successful!",
      newNotification,
    });
  };
}
module.exports = new NotificationController();
