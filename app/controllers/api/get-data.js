"use strict";

const createJsonError = require("../errors/create-json-errors");
const fetch = require("node-fetch");

const url = "https://anapioficeandfire.com/api/characters/583";

async function getCharacter(req, res) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send({ data });
  } catch (err) {
    createJsonError(err, res);
  }
}

async function getCharacterById(req, res) {
  const { id } = req.params;

  const url2 = `https://anapioficeandfire.com/api/characters/${id}`;

  try {
    const response = await fetch(url2);
    const data = await response.json();
    res.send({ data });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = { getCharacter, getCharacterById };
