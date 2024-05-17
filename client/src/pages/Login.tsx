import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import "./login.css"



function Login() {

  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate()

  function handleChange(e: any) {
    // const { name, value } = e.target
    setUser((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async response => response.json())
      .then(data => {
        if (data.res === "success") {
          navigate("/home")
        } else {
          alert(data.message)
        }
      })
      .catch(error => console.error(error));


    // console.log(user)
  }

  return (
    <div role="dialog">
      <h1>Login</h1>
      <form className={"modal-wrapper"} onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" onChange={handleChange} value={user.username} />
        </label>
        <label>
          Password
          <input type="password" name="password" onChange={handleChange} value={user.password} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login