import { Request, Response } from "express";
import {omit} from 'lodash'
import {
    registerNewUser, logUserInHandler, getThisUserDts
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

// returns the details of just one user
export async function getThisUserInfo (req: any, res: Response) {
    try {
        const userId = req.userId
        let userDts = await getThisUserDts({'identity':userId, 'toUse':'id'})
        userDts = omit(userDts.rows[0], 'password')
    
        return res.json({'msg':'okay', userDts})
    } catch (err: any) {
        return show_error_msg({'result':err.message, res})
    }
}