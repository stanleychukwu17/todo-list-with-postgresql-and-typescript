import { Request, Response } from "express";
import log from '../logger/'
import {getAllTodo} from '../service/todo.service'

export async function getAllTodoHandler (req: Request, res: Response) {
    try {
        const allTodo: any = getAllTodo()
        return res.json({msg:'okay', 'result': allTodo.rows});
    } catch (err: any) {
        log.error(err);
        return res.json({msg:'bad', 'cause':err});
    }
}