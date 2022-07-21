import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { updateLoggedOut } from "../../redux/userSlice"


export default function LogOut() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(updateLoggedOut())
        navigate('/')
    }, [dispatch, navigate])

    return (
        <div>LogOut</div>
    )
}