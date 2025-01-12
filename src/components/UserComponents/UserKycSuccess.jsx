import React from 'react'
import '../../assets/css_new/congratulations-popup.css'
import { useNavigate } from 'react-router-dom'
import imgService from '../../helper/dataManipulation/globalUtlities'

export default function UserKycSuccess() {
    const navigate = useNavigate();
    const celebrationData = () => {
        navigate('/dashboard-page',{replace:true});
    }
  return (
    <>
     {localStorage.getItem('user') == null ? 'Page Not Found!': 
    // <section className="main-container">
      <div className="congratulations-outer">
         <span className="close"><img src={imgService.close} alt="icon" /></span>
        <div className="congratulations-box">
        <img src={imgService.celebration} alt="icon" />
        <h3>Congratulations</h3>
        <p>Thank you for Completing your KYC.<br /> <b>Your request has been submitted Successfully.</b></p>
        <button className="continue-btn" onClick={celebrationData}>Continue</button>
        </div>
      </div>
    //   </section>
     }
      </>
  )
}
