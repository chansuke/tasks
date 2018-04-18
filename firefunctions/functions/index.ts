import 'core-js'
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp(functions.config().firebase);
var tasksRef: admin.database.Reference = admin.database().ref('/tasks');

/**
 * @function { addTask }
 * @return { Object }
 * @parameter { express.Request }, { express.Reponse }
 **/
exports.addTask = functions.https.onRequest((request: any, response: any) => {
  cors()(request, response, () => {
    tasksRef.push({
      task: request.body.task,
      duedate: request.body.duedate,
      tag: request.body.tag
    })
  })
  response.send({
    'msg': 'Done',
    'data': {
      task: request.body.task,
      duedate: request.body.duedate,
      tag: request.body.tag
  }});
})

/**
 * @function { getTaskList }
 * @return { Object }
 * @parameter { express.Request }, { express.Reponse }
 **/
exports.getTaskList = functions.https.onRequest((request: any, response: any) => {
  tasksRef.once('value', (data) => {
    response.send({
      'res': data.val()
    })
  })
})

const app: express.Application = express();
app.use(cors({ origin: true }))
app.put('/:id', (req: any, res: any, next: any) => {
  admin.database().ref('/tasks/' + req.params.id).update({
    task: req.body.task,
    duedata: req.body.task,
    tag: req.body.tag
})
  res.send(req.body)
  next()
})

app.delete('/:id', (req: any, res: any, next: any) => {
 admin.database().ref('/tasks/' + req.params.id).remove()
 res.send(req.params.id)
 next()
})

app.get('/:id', (req: any, res: any, next: any) => {
 admin.database().ref('/tasks/' + req.params.id).once('value', (data) => {
  var sn = data.val()
  res.send({
   'res': sn
  })
  next()
  },(err: any) => res.send({res: err})
 )
})

/**
* @function { getTask }
* @return { Object }
* @parameter { express.Request }, { express.Reponse }
**/
exports.getTask = functions.https.onRequest((request: any, response: any) => {
  return app(request, response)
})

/**
* @function { updateTask }
* @return { Object }
* @parameter { express.Request }, { express.Reponse }
**/
exports.updateTask = functions.https.onRequest((request: any, response: any) => {
  return app(request, response)
})

/**
* @function {deleteTask}
* @return {Object}
* @parameter {express.Request}, {express.Response}
**/
exports.deleteTask = functions.https.onRequest((request: any, response: any) => {
 return app(request, response)
})

