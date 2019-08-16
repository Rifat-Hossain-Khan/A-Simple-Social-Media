const express = require("express");
const { check } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    check("email", "Please Enter a valid email.")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    check("password")
      .trim()
      .isLength({ min: 5 }),
    check("name")
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post("/login", authController.login);
module.exports = router;
