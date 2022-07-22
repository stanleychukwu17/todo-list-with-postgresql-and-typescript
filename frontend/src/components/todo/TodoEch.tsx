import { useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import {FaPen} from 'react-icons/fa'
import {FaTrashRestore} from 'react-icons/fa'

import './TodoEch.scss'
import { DELETE_THIS_TODO_ITEM, UPDATE_THIS_TODO_ITEM } from '../../GraphQL/mutations/todoMutations'


// define the types needed for the component
export type todoProps = {id:number, description: string}
export type finalProps = {
    todo: todoProps,
    token: string
}
export const TodoEch = ({todo, token}: finalProps) => {
    const todoId = useRef<number>(todo.id)
    const [description, setDescription] = useState<string>(todo.description)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)

    // used for updating/saving of changes made to a todo
    const [updateTodo, {error: error4update}] = useMutation(UPDATE_THIS_TODO_ITEM, {
        variables:{
            id: String(todoId.current), // converts the id to string because of gql problem
            description,
            token
        }
    })

    // used for deleting of a todo item
    const [deleteTodo, {data, error: error4delete}] = useMutation(DELETE_THIS_TODO_ITEM, {
        variables: {
            id: String(todoId.current)
        }
    })


    // if any error when updating the todo item
    if (error4update) alert(error4update.message);

    // if any errors when delete an item from list of todo's
    if (error4delete) {
        alert(error4delete.message);
    }

    // function that saves the changes/update to the edited todo item
    const saveThisTodo = () => {
        updateTodo()
        setShowModal(false)
    }

    // deletes the todo
    const deleteThisTodo = () => {
        deleteTodo()
        setDeleted(true)
    }

    if (deleted) {
        return <></>
    } else {
        return (
            <div>
                <div className="AppMain__EchT AppMain__smallText">
                    <div className="EchT1">{description}</div>
                    <div className="EchT2">
                        <span onClick={() => {setShowModal(true)}}><FaPen size="11px" className='iconsO' /> Edit</span>
                    </div>
                    <div className="EchT3">
                        <span onClick={() => {deleteThisTodo()}}><FaTrashRestore size="11px" className='iconsO' /> Delete</span>
                    </div>
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
}