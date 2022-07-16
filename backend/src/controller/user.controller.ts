import { Request, Response } from "express";
import log from '../logger/'
import {
    registerNewUser
} from '../service/user.service'
import { show_error_msg, show_good_msg } from "../service/general.service";

// gets all of the todo's
export async function regUserHandler (req: Request, res: Response) {
    try {
        // const allTodo: any = await getAllTodo()
        registerNewUser(req.body)
        return show_good_msg({'result':'allTodo', res})
    } catch (err: any) {
        return show_error_msg({'result':err.message, res})
    }
}
