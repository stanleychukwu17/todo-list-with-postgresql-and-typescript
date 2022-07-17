import {Request, Response, NextFunction} from 'Express'
import jwt from 'jsonwebtoken'
import {Secret} from 'jsonwebtoken' // used for typescript types
require('dotenv').config()

// checks if the token of a user is still valid, use the token of the user to fetch the user_id
type payLoadProps = {userId: number, iat: number, exp: number}
export async function isAuthenticated(req: any, res:Response, next: NextFunction) {
    try {
        const token = req.header("token");
        const secret = process.env.jwtSecret as Secret;
        if (!token) {
            return res.status(403).json("Not Authorize"); // 403 means not authorized
        }

        // the payLoad below returns something that looks like - {userId: ..., iat: ..., exp: ....}
        const payLoad = await jwt.verify(token, secret) as payLoadProps
        const userId = payLoad.userId
        req.userId = userId
        next()
    } catch (err: any) {
        return res.status(403).json({'msg':'bad', 'cause':err.message})
    }
}