"use strict";

const fs = require("fs");

async function insertUserToJsonFile(email, passwordHash) {
  let usersList = {
    users: [],
  };

  fs.readFile("usersList.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      usersList = JSON.parse(data);
      usersList.users.push({ email: email, password: passwordHash });
      let json = JSON.stringify(usersList);
      fs.writeFile("usersList.json", json, "utf8", function () {
        console.log("Usuario escrito en archivo JSON");
      });
    }
  });
}

module.exports = {
  insertUserToJsonFile,
};
