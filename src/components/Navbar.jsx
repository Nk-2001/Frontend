import React,{useContext} from 'react'
import logo from '../components/Img/logo.png'
import './css/Navbar.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar({login}) {
  const navigate = useNavigate()
  const {setModalOpen}=useContext(LoginContext)
  const loginStatus =()=>{
    const token =localStorage.getItem('token')
    if(login||token){
      return[
        <>
        <Link to='/Profile'><li>Profile</li></Link>
        <Link to='/Createpost'><li>Create Post</li></Link>
        <Link to="/followingpost ">My Following Post</Link>
        <Link to={""}>
        <button className='primaryBtn' onClick={()=>setModalOpen(true)}>Log Out</button></Link>
       </>
      ]
    } else{
      return[
        <>
                  <Link to='/SignIn'><li>SignIn</li></Link>
                  <Link to='/SignUp'><li>SignUp</li></Link>
        </>
      ]
    }
  };

  const loginStatusMobile =()=>{
      const token =localStorage.getItem('token')
      if(login||token){
        return[
                  <>
                  <Link to=''><li><span class="material-symbols-outlined">home</span></li></Link>
                   <Link to='/Profile'><li><span class="material-symbols-outlined">account_circle</span></li></Link>
                   <Link to='/Createpost'><li><span class="material-symbols-outlined">add_box</span></li></Link>
                   <Link to="/followingpost "><span class="material-symbols-outlined">explore</span></Link>
                   <Link to={""}>
                   <li onClick={()=>setModalOpen(true)}><span class="material-symbols-outlined">logout</span></li></Link>
                  </>
        ]
      } else{
        return[
          <>
                    <Link to='/SignIn'><li>SignIn</li></Link>
                    <Link to='/SignUp'><li>SignUp</li></Link>
          </>
        ]
      }
  }

  return (
    <div className='navbar'>
        <img id='insta-logo' src={logo} alt='' onClick={()=>{navigate("/")}} />
        <ul className='nav-menu'>{loginStatus()}</ul>
        <ul className='nav-mobile'>{loginStatusMobile()}</ul>
    </div>
  )
}
