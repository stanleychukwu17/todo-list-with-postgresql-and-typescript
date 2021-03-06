import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

// importing mutation queries for graphql
import { ADD_THIS_ITEM_TO_THIS_USER_TODO_LIST } from '../../GraphQL/mutations/todoMutations'

// importing the sass stylesheet
import './Input.scss'

type inputProps = {
    token: string,
    callBack: Function
}
export const Input = ({token, callBack}: inputProps) => {
    const [description, setDescription] = useState<string>('')
    const [saveNewTodo, {data, error}] = useMutation(ADD_THIS_ITEM_TO_THIS_USER_TODO_LIST, {
        variables: {description, token}
    })

    // the function that saves the new todo
    const saveThisTodo = () => {
        if (description.length <= 0) { return }

        saveNewTodo()
        setDescription('')
    }

    // if there are any errors 
    if (error) {
        alert(error.message)
    }
    if (data) {
        callBack()
    }

    return (
        <div className="InpCvr">
            <input
                type="text"
                value={description}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setDescription(e.target.value)
                }}
            />
            <button onClick={()=> { saveThisTodo() }}>Add to list</button>
        </div>
    )
}