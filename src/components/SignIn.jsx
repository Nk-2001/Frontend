import React, { useState, useContext} from 'react'
import "./css/SignIn.css"
import logo from './Img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/LoginContext';
// toast.configure()

export default function SignIn() {
  const {setUserLogin}=useContext(LoginContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //Toast Functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const postData = () => {
    //checking Email
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email")
      return
    }
    // Sending data to the server
    fetch("https://naveen-gj1x.onrender.com/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB("Signed in Successfully")
          console.log(data.token)
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          setUserLogin(true)
          navigate('/')
        }
        console.log(data)
      })
  }


  return (
    <div className='SignIn'>
      <div>
        <div className="loginForm">
          <img className='SignUpLogo' src={logo} alt='' />
          <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
          <div></div>
          <div>
            <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <input type="Submit" id='login-btn' onClick={()=>{postData()}} value="SignIn" />
        </div>
        <div className="loginForm2">
          Don't have an account? <Link to="/SignUp" style={{ color: 'blue', cursor: 'pointer' }}>SignUp</Link>
        </div>
      </div>
    </div>
  )
}
