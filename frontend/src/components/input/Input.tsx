import React, { useState } from 'react'
import './Input.scss'

type inputProps = {
    token: string
}
export const Input = ({token}: inputProps) => {
    const [description, setDescription] = useState<string>('')
    console.log(description)

    return (
        <div className="InpCvr">
            <input
                type="text"
                value={description}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setDescription(e.target.value)
                }}
            />
            <button onClick={()=> { console.log('lets show gql why we love it!')  }}>Add to list</button>
        </div>
    )
}