import { useState } from "react"
import { useAppDispatch } from "../store/store"
import { fetchRgister } from "../store/slices/userSlice"

const Register = () => {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState(0)
  return (
    <div>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="number" onChange={(e) => setAge(+e.target.value)}/>
        <button onClick={() => dispatch(fetchRgister({username, password, age}))}>Register</button>
    </div>
  )
}

export default Register