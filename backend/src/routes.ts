import {Express, Request, Response} from 'express';
import {getAllTodoHandler} from './controller/todo.controller'

export default function (app: Express) {

    app.get('/api/', (req:Request, res:Response) => {
        res.json('work on the api')
    })

    // get all the todo's
    app.get('/todo', getAllTodoHandler)
}


// async (req, res) => {
//     try {
//         try {
//             const newTodo = await pool.query("SELECT * FROM todo");
//             res.json({msg:'okay', 'result': newTodo.rows});
//         } catch (err) {
//             res.json({msg:'bad', 'result':err});
//         }
//     } catch (err) {
//         res.json({msg:'bad', 'result':'A try and catch error', err});
//     }
// }