"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
var functions = require("firebase-functions");
var admin = require("firebase-admin");
var express = require("express");
var cors = require("cors");
admin.initializeApp(functions.config().firebase);
var tasksRef = admin.database().ref('/tasks');
/**
 * @function { addTask }
 * @return { Object }
 * @parameter { express.Request }, { express.Reponse }
 **/
exports.addTask = functions.https.onRequest(function (request, response) {
    cors()(request, response, function () {
        tasksRef.push({
            task: request.body.task,
            duedate: request.body.duedate,
            tag: request.body.tag
        });
    });
    response.send({
        'msg': 'Done',
        'data': {
            task: request.body.task,
            duedate: request.body.duedate,
            tag: request.body.tag
        }
    });
});
/**
 * @function { getTaskList }
 * @return { Object }
 * @parameter { express.Request }, { express.Reponse }
 **/
exports.getTaskList = functions.https.onRequest(function (request, response) {
    tasksRef.once('value', function (data) {
        response.send({
            'res': data.val()
        });
    });
});
var app = express();
app.use(cors({ origin: true }));
app.put('/:id', function (req, res, next) {
    admin.database().ref('/tasks/' + req.params.id).update({
        task: req.body.task,
        duedata: req.body.task,
        tag: req.body.tag
    });
    res.send(req.body);
    next();
});
app.delete('/:id', function (req, res, next) {
    admin.database().ref('/tasks/' + req.params.id).remove();
    res.send(req.params.id);
    next();
});
app.get('/:id', function (req, res, next) {
    admin.database().ref('/tasks/' + req.params.id).once('value', function (data) {
        var sn = data.val();
        res.send({
            'res': sn
        });
        next();
    }, function (err) { return res.send({ res: err }); });
});
/**
* @function { getTask }
* @return { Object }
* @parameter { express.Request }, { express.Reponse }
**/
exports.getTask = functions.https.onRequest(function (request, response) {
    return app(request, response);
});
/**
* @function { updateTask }
* @return { Object }
* @parameter { express.Request }, { express.Reponse }
**/
exports.updateTask = functions.https.onRequest(function (request, response) {
    return app(request, response);
});
/**
* @function {deleteTask}
* @return {Object}
* @parameter {express.Request}, {express.Response}
**/
exports.deleteTask = functions.https.onRequest(function (request, response) {
    return app(request, response);
});
