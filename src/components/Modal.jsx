import React from 'react'
import './css/Modal.css'
import { useNavigate } from 'react-router-dom';
import * as RiIcons from "react-icons/ri";
const RiCloseLine = RiIcons.RiCloseLine;

export default function Modal({setModalOpen}) {
    const navigate=useNavigate();
  return (
    <div className="darkBackground" onClick={()=>setModalOpen(false)}>
            <div className="centered">
            <div className="modal">
        {/* //Modal Header// */}
        <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
        </div>
        <button className="closeBtn" onClick={()=>setModalOpen(false)}>
            <RiCloseLine></RiCloseLine>
        </button>
        {/* modal content */}
        <div className="modalContent">
            Are you Really Want to Logout ?
        </div>
        <div className="modalActions">
            <div className="actionsContainer">
                <button className="logOutBtn" onClick={()=>{setModalOpen(false);localStorage.clear();navigate('/signin')}}>Log Out</button>
                <button className="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
            </div>
        </div>
    </div>
    </div>
    </div>


  )
}
