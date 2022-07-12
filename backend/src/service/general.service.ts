import {Response} from 'express'
import log from '../logger/'

type msgProps = {
    res: Response
    result: string | {} | any[]
}
// shows an error message back to the user
export function show_error_msg({result, res}: msgProps) {
    log.error(result);
    return res.json({msg:'bad', 'cause':result});
}

// shows an error message back to the user
export function show_good_msg({result, res}: msgProps) {
    return res.json({msg:'okay', result});
}