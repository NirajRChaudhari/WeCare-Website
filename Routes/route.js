const express = require("express");
const router = express.Router();
const controller = require("../Controller/controller");

//      POST Methods
router.post("/users/login", controller.post_users_login);
router.post("/users", controller.post_users);
router.post("/coaches/login", controller.post_coaches_login);
router.post("/coaches", controller.post_coaches);
router.post(
  "/users/booking/:userID/:coachID",
  controller.post_users_booking_userID_coachID
);

//      PUT Methods
router.put("/booking/:bookingID", controller.put_booking_bookingID);

//      DELETE Methods
router.delete("/booking/:bookingID", controller.delete_booking_bookingID);

//      GET Methods
router.get("/coaches/all", controller.get_coaches_all);
router.get("/coaches/booking/:coachID", controller.get_coaches_booking_coachID);
router.get("/coaches/:coachID", controller.get_coaches_coachID);
router.get("/users/booking/:userID", controller.get_users_booking_userID);
router.get("/users/:userID", controller.get_users_userID);

router.get("/", controller.default_invalid_path);
module.exports = router;
