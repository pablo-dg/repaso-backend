"user strict";

const express = require("express");
const registerUser = require("../controllers/users/register");
const loginUser = require("../controllers/users/login");
const validateAuth = require("../middleware/validate-auth");

const {
  getCharacterById,
  getCharacter,
} = require("../controllers/api/get-data");
const router = express.Router();

router.route("/register").post((req, res) => registerUser(req, res));
router.route("/login").post((req, res) => loginUser(req, res));

router
  .route("/")
  .all(validateAuth)
  .get((req, res) => getCharacter(req, res));

router
  .route("/:id")
  .all(validateAuth)
  .get((req, res) => getCharacterById(req, res));

module.exports = router;
