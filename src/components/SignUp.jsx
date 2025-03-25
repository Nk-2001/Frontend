import React,{ useState} from 'react'
import logo from '../components/Img/logo.png'
import './css/SignUp.css'
import { Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

export default function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    //toast functions
    const notifyA =(msg)=>toast.error(msg) 
    const notifyB =(msg)=>toast.success(msg) 
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    

    const postData=()=>{
    //checking Email
    if(!emailRegex.test(email)){
      notifyA("Invalid Email")
      return
    } else if(!passRegex.test(password)){
      notifyA("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
      return
    }

    // Sending data to the server
    fetch("https://naveen-gj1x.onrender.com/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        userName:userName,
        password:password
      })
    }).then(res=>res.json())
      .then(data=>{
        if(data.error){
          notifyA(data.error)
        }else{
          notifyB(data.message)
          navigate('/SignIn')
        }
        console.log(data)})
    }



  return (
    <div className='SignUp'>
      <div className='form-container'>
        <div className='form'>  
        <img className='SignUpLogo' src={logo} alt='' />
        <p className='loginpara'>SignUp to See Post and Videos <br />From Your Friends</p>
        <div>
          <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
        <div>
          <input type='text' name='name' id='name' placeholder='Full Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div>
          <input type='text' name='username' id='username' placeholder='Username' value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
        </div>
        <div>
          <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <p className='loginpara' style={{fontSize:"12px",margin:"3px 0px"}}>By Signing Up ,you agree to out Terms, <br/> Privacy Policy and Cookies Policy.</p>
        <input type='submit' id='submit-btn' value='SignUp' onClick={()=>{postData()}} />
        </div>
        <div className='form2'>
          Already have an account? <Link to='/SignIn' style={{color:'blue',cursor:'pointer'}}>SignIn</Link>
        </div>
      </div>
    </div>
  )
}
