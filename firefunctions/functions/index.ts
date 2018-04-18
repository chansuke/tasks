import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp(functions.config().firebase)
var tasksRef: admin.database.Reference = admin.database().ref('/tasks')

exports.helloWorld = functions.https.onRequest((request: express.Request, response: express.Response
) => {
  response.send("Hello from Firebase!");
});
