import {Request, Response, NextFunction} from 'Express'
import jwt from 'jsonwebtoken'
import {Secret} from 'jsonwebtoken' // used for typescript types
require('dotenv').config()

// checks if the token of a user is still valid, use the token of the user to fetch the user_id
export async function isAuthenticated(req: Request, res:Response, next: NextFunction) {
    try {

    } catch (err: any) {
        return res.status(403).json({'msg':'bad', 'cause':err.message})
    }
}