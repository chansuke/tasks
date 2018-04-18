"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
var tasksRef = admin.database().ref('/tasks');
exports.helloWorld = functions.https.onRequest(function (request, response) {
    response.send("Hello from Firebase!");
});
