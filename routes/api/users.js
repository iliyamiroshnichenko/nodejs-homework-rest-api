const express = require("express");
const router = express.Router();
const controller = require("../../controllers/users");
const upload = require("../../helpers/multer");

const {
  regLogValidation,
  reVerifyValidation,
} = require("../../middlewares/userValidation");
const { protect } = require("../../middlewares/authProtect");

router.post("/signup", regLogValidation, controller.signUp);

router.post("/login", regLogValidation, controller.logIn);

router.post("/logout", protect, controller.logOut);

router.get("/current", protect, controller.currentUser);

router.patch("/avatars", protect, upload.single("avatar"), controller.avatars);

router.get("/verify/:token", controller.verify);

router.post("/verify/", reVerifyValidation, controller.reVerify);

module.exports = router;
