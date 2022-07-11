import { Request, Response } from "express";
import log from '../logger/'
import {getAllTodo, getOneTodo} from '../service/todo.service'

// gets all of the todo's
export async function getAllTodoHandler (req: Request, res: Response) {
    try {
        const allTodo: any = await getAllTodo()
        return res.json({msg:'okay', 'result': allTodo.rows});
    } catch (err: any) {
        log.error(err);
        return res.json({msg:'bad', 'cause':err});
    }
}

// returns just one todo item
export async function getOneToDoHandler (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (id <= 0) {
            const errMsg = 'Invalid id provided'
            return res.json({msg:'bad', 'cause':errMsg});
        }

        const oneTodo: any = await getOneTodo(id)
        return res.json({msg:'okay', 'result': oneTodo.rows[0]});
    } catch (err: any) {
        log.error(err);
        return res.json({msg:'bad', 'cause':err});
    }
}