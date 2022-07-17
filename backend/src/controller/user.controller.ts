import { Request, Response } from "express";
import log from '../logger/'
import {
    registerNewUser, logUserInHandler
} from '../service/user.service'
import { show_error_msg, show_good_msg } from "../service/general.service";

// gets all of the todo's
export async function regUserHandler (req: Request, res: Response) {
    try {
        const newUser = await registerNewUser(req.body)
        if (newUser.msg === 'okay') {
            return res.json(newUser)
        } else {
            return show_error_msg({'result':newUser.cause as string, res})
        }
    } catch (err: any) {
        return show_error_msg({'result':err.message, res})
    }
}

// login a user
export async function logUserIn (req: Request, res: Response) {
    try {
        const userLogin = await logUserInHandler(req.body)

        if (userLogin.msg === 'okay') {
            return res.json(userLogin)
        } else {
            return show_error_msg({'result':userLogin.cause as string, res})
        }
    } catch (err: any) {
        return show_error_msg({'result':err.message, res})
    }
}