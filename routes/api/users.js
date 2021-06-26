const express = require("express");
const router = express.Router();
const controller = require("../../controllers/users");

router.post("/signup", controller.signUp);

router.post("/login", controller.logIn);

router.post("/logout", controller.logOut);
