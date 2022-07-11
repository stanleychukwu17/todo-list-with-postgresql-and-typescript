import {Express, Request, Response} from 'express';
import {getAllTodoHandler, getOneToDoHandler} from './controller/todo.controller'

export default function (app: Express) {

    app.get('/api/', (req:Request, res:Response) => {
        res.json('work on the api')
    })

    // get all the todo's
    app.get('/todo', getAllTodoHandler)

    // get just one request
    app.get('/todo/:id', getOneToDoHandler)

}
