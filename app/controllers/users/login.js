"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const json = require("../../../usersList.json");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  pass: Joi.string().min(4).max(100).required(),
});

async function loginUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { email, pass } = req.body;

    await schema.validateAsync(req.body);

    const emails = json.users.map((user) => user.email);
    const emailMatch = emails.find((element) => element === email);

    if (!emailMatch) {
      const error = new Error("No existe un usuario con ese email");
      error.status = 409;
      throw error;
    }
    const userLoged = json.users.find((user) => user.email === emailMatch);
    const passwordHash = userLoged.password;

    const isValidPassword = await bcrypt.compare(pass, passwordHash);

    if (!isValidPassword) {
      const error = new Error("El email/pass no es correcto");
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;

    const jwtTokenExpiration = "40m";
    const payload = {
      email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const response = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.send(response);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = loginUser;
