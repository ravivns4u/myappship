import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css_new/style.css'
import imgService from '../../helper/dataManipulation/globalUtlities'



export default function UserHeader() {
   const user_obj = JSON.parse(localStorage.getItem('user'));
   const navigate = useNavigate();
   const [showData,setShowData] = useState(false);
   const [userProfiles,setuserProfile] = useState({display : 'none'});
   
   function logOut(){
       localStorage.removeItem("user");
       localStorage.removeItem("accessToken");
       localStorage.clear();
       navigate('/',{replace:true});
     
   }
   function selectLogin(){
      if(showData === 'show'){
          setShowData('')
          setuserProfile({ display : 'none'})   
      }else{
          setShowData('show') 
          setuserProfile({ display : 'block'})    
      }
   }

  return (
   <>
   {localStorage.getItem('user') == null ? 'Page Not Found!':
    <header className='header-row'>
    <div className="wrapper">
       <a href="/" className="logos"><img src={imgService.logo} alt="logo" /></a>
       <ul className="header-menus">
         <li><a href="/dashboard-page">Dashboard</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Tools</a></li>
          <li><a href="/about-us">Company</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
          <li className="active"><a href="#" onClick={() => selectLogin()} className={`user-profile ${showData}`}><img src={imgService.userprofile} alt="icon" /> {user_obj.name} <svg id="Component_8_1" data-name="Component 8 – 1" xmlns="http://www.w3.org/2000/svg" width="18.001" height="24.001" viewBox="0 0 18.001 24.001">
<path id="Path_69717" data-name="Path 69717" d="M0,0H18V24H0Z" fill="none"/>
<path id="Path_69718" data-name="Path 69718" d="M10.5,14.5,6,10h9Z" transform="translate(-1.5 0.834)"/>
</svg></a>
          
          <div className={`profile-box ${showData}`} style={userProfiles}>
             <ul className="profile-links">
                <li className="active"><a href="/user-profile"> <img src={imgService.accountsetting} alt="icon" /> Account Setting</a></li>
                <li><a href="/finance" > <img src={imgService.finance} alt="icon" /> Finance</a></li>
                <li><a href="#"> <img src={imgService.subscriptions} alt="icon" /> Subscriptions</a></li>
                <li ><a href="#" onClick={() => logOut()}> <img src={imgService.signout} alt="icon" /> Sign Out</a></li>
             </ul>
          </div>
          </li>
       </ul>
    </div>
    <a  href="#" className="toggle-menus"><img src={imgService.toggle} alt="icon" /></a>
    <span id="progressBar"></span>
 </header>
 
   }
   </>
  )
}
