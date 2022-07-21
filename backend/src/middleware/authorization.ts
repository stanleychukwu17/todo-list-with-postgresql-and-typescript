import {Request, Response, NextFunction} from 'Express'
import jwt from 'jsonwebtoken'
import {Secret} from 'jsonwebtoken' // used for typescript types
require('dotenv').config()

// props for payLoad returned from jwt
type payLoadProps = {userId: number, iat: number, exp: number}

// checks if the token of a user is still valid, use the token of the user to fetch the user_id
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

// checks if a token is valid and returns the user_id from the token
export async function getUserIdFromThisToken(token:string): Promise<{msg:'okay'|'bad', cause:string, userId:number}> {
    const secret = process.env.jwtSecret as Secret;

    if (token.length <= 0 || !secret) {
        return {'msg':'bad', 'cause':'Important value is missing', userId:0}
    }

    // the payLoad below returns something that looks like - {userId: ..., iat: ..., exp: ....}
    const payLoad = await jwt.verify(token, secret) as payLoadProps
    return {'msg':'okay', 'cause':'', userId:payLoad.userId}
}