
import { useState } from "react"
import { useAppDispatch } from "../store/store"
import { fetchLogin } from "../store/slices/userSlice"

const Login = () => {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  return (
    <div>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={() => dispatch(fetchLogin({username, password}))}>Login</button>
    </div>
  )
}

export default Login