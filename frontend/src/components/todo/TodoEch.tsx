import { useRef, useState } from 'react'
import {FaPen} from 'react-icons/fa'
import {FaTrashRestore} from 'react-icons/fa'

import './TodoEch.scss'


export type todoProps = {id:number, description: string}
export type finalProps = {
    todo : todoProps
}
export const TodoEch = ({todo}: finalProps) => {
    const todoId = useRef<number>(todo.id)
    const [description, setDescription] = useState<string>(todo.description)
    const [showModal, setShowModal] = useState<boolean>(false)

    const saveThisTodo = () => {
        console.log(todoId)
        setShowModal(false)
    }

    return (
        <div>
            <div className="AppMain__EchT AppMain__smallText">
                <div className="EchT1">{description}</div>
                <div className="EchT2"><span onClick={() => {setShowModal(true)}}><FaPen size="11px" className='iconsO' /> Edit</span></div>
                <div className="EchT3"><span><FaTrashRestore size="11px" className='iconsO' /> Delete</span></div>
            </div>
            {showModal && (
                <div className='TBigBox'>
                    <div className='TBigBox__next'>
                        <div className='InpCvr'>
                            <input
                                type="text"
                                value={description}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                    setDescription(e.target.value)
                                }}
                            />
                            <button onClick={()=> { saveThisTodo() }}>Save update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}