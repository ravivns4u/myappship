import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../assets/css/style.css"
import '../../assets/css_new/partner-login-signup.css'
import imgSource from '../../helper/dataManipulation/globalHome'
import {isNumber, validateForm, validateFormEmail, validateFormEmailPass} from "../../helper/dataManipulation/shipkart_hepler.js"
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    const [scrolltopdata, setscrolltopdata] = useState('');
    const [showData,setShowData] = useState(false);
    const [showLogin,setLoginData] = useState(false);
    const [showith,setWithData] = useState();
    const [showMobile,setWithMobile] = useState({display : 'block'});
    const [showEmail,setWithEmail] = useState({ display: 'none' });
    const [showOtp,setOtpData] = useState();
    const [showEP,setEPData] = useState();
    const [showEmailPass,setWithEmailPass] = useState({ display: 'none' });
    const [otpVerifed,setotpVerifed] = useState({ display: 'none' });
    const [verifyedMobilesNo,setverifyMobilesNo] = useState({ display: 'none' });
    const [showithOtp,setWithOtpData] = useState({ display: 'none' });
    const [showalomostThere,setalomostThere] = useState({ display: 'none' });
    const [showalomostThereEmail,setalomostThereEmail] = useState({ display: 'none' });
    const [mobileActive,setMobileActive] = useState('active');
    const [emailActive,setEmailActive] = useState('');
    const [errors, setErrors] = useState({})
    const [otpSend, setOtpSend] = useState([])
    const [newUserRegister, setnewUserRegister] = useState([])
    const [verifiUser, setverifiUser] = useState([])
    const [verifiOtp, setverifiOtp] = useState([])
    const [loginSuccess, setloginSuccess] = useState([])
    const [items, setItem] = useState([]);
    const [mobileNo, setMobileNo] = useState()
    const [emailID, setEmailID] = useState()
    const [formData, setFormData] = useState({
        mobile: '',
      });
    const [formDataNewUser, setFormDataNewUser] = useState({
         name: '',
         email: '',
         password: '',
       });  
    const [formDataPass, setFormDataPass] = useState({
         email: '',
         password: '',
       });  
   const [formDataOtp, setFormDataOtp] = useState({
      otp_a: '',
      otp_b: '',
      otp_c: '',
      otp_d: '',
      otp_e: '',
      otp_f: '',
      });

    useEffect(() => {
   
        window.addEventListener('scroll', () => {
            if (window.scrollY < 15) {
                setscrolltopdata('');
            } else {
                setscrolltopdata('sticky');
            }
        });
        const inputs = document.getElementById("inputs");
        inputs.addEventListener("input", function (e) {
          const target = e.target;
          const val = target.value;
          if (isNaN(val)) {
            target.value = "";
            return;
          }
        
          if (val != "") {
            const next = target.nextElementSibling;
            if (next) {
              next.focus();
            }
          }
        });
        
        inputs.addEventListener("keyup", function (e) {
          const target = e.target;
          const key = e.key.toLowerCase();
          if (key == "backspace" || key == "delete") {
            target.value = "";
            const prev = target.previousElementSibling;
            if (prev) {
              prev.focus();
            }
            return;
          }
        });

    }, [])

    function selectLogin(){
          if(showData === 'show')
              setShowData('')
          else
              setShowData('show')
              
       }

       function getLogin(){
        if(showLogin === 'show'){
             setLoginData('')
             setWithData({ display: 'none' })
            }else{
             setLoginData('')
             setWithData({ top : "50%" })
             document.body.classList.add('fixed');
            
            }
         }
         //close login form
         function closeLogin(){
          setLoginData('')
          setWithData({ top: '-1200px' })
          document.body.classList.remove("fixed");
      }

      function onMobile(){
         setWithMobile({ display: 'block' })
         setWithEmail({ display: 'none' })
         setMobileActive('active')
         setEmailActive('')
      }

      function onEmail(){
         setWithEmail({ display: 'block' })
         setWithMobile({ display: 'none' })
         setEmailActive('active')
         setMobileActive('')
        
      }

      const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData({
             ...formData,
             [name]: value,
         });
         setFormDataOtp({
            ...formData,
            [name]: value,
        });
        setFormDataPass({
         ...formData,
         [name]: value,
     });
        setFormDataNewUser({
         ...formData,
         [name]: value,
     });
     };
     const loginWithEmail = (e) => {
      e.preventDefault();
     // alert('email')
      const newEmailErrors = validateFormEmail(formData);
         setErrors(newEmailErrors);
         if (Object.keys(newEmailErrors).length === 0) {
            const payload = {
               email: formData.email, 
             }
             setEmailID(formData.email)
             const test = JSON.stringify(payload);
             const obj = JSON.parse(test);
             const config = { headers: { "Content-Type": "application/json" } };
               axios
               .post(process.env.REACT_APP_VALIDATE_USER_URL, obj, config)
               .then((res) => {
                   if(res.data.data['loginVia'] == "email"){
                        setWithMobile({ display : 'none'})
                        setWithMobile({ display : 'none'})
                        setOtpData({ display : 'none'})
                        setWithEmailPass({ display : 'block'})
                   }else{
                     const payload = {
                        type : "email",
                        email: formData.email, 
                      }
                      setMobileNo(formData.email)
                      const test = JSON.stringify(payload);
                      const obj = JSON.parse(test);
                      const config = { headers: { "Content-Type": "application/json" } };
                        axios
                        .post(process.env.REACT_APP_SEND_OTP_URL, obj, config)
                        .then((res) => setOtpSend(res.data))
                        .catch((err) => console.log(err));
                        setWithOtpData({ display: 'block' })
                        setOtpData({display : 'none'})
                        setWithEmail({display : 'none'})
                        var i = 30;
                        (function timer(){
                          if (--i < 0) return;
                          setTimeout(function(){
                           if(i !== null){
                             document.getElementById("progressBar").innerHTML = i ;
                           }
                             timer();
                          }, 1000);
                       })();
                   }
                  setverifiUser(res.data);
               })
               .catch((err) => console.log(err));
              
      }else{
         console.log('login submission failed due to validation errors.');
        }

     }

    // console.log(verifiUser)

    const loginWithEmailPassWord = (e) => {
          e.preventDefault();
          const newEmailPassErrors = validateFormEmailPass(formDataPass);
          setErrors(newEmailPassErrors);
          if (Object.keys(newEmailPassErrors).length === 0) {
            const payload_list = {
               email: formData.email, 
               password : formData.password,
     
             }
             const test_data = JSON.stringify(payload_list);
             const obj_data = JSON.parse(test_data);
             const config = { headers: { "Content-Type": "application/json" } };
               axios
               .post(process.env.REACT_APP_LOGIN_WITH_EMIAL_URL, obj_data, config)
               .then((res) => { 
                 localStorage.setItem('accessToken', res.data.data['token']);
                 localStorage.setItem('user', JSON.stringify(res.data.data['user']));
                 localStorage.setItem('user_kyc', JSON.stringify(res.data));
                 setloginSuccess(res.data.data);
                 })
               .catch((err) => console.log(err));  
               setTimeout(function(){
                 navigate('/dashboard-page',{replace:true});
                 document.body.classList.remove("fixed");
               },1000);

          }
    }

    



      const loginSubmit = async (e) => {
         e.preventDefault();
         //alert('my number');
         const newErrors = validateForm(formData);
         setErrors(newErrors);
         if (Object.keys(newErrors).length === 0) {
            const payload = {
               type : "phone_number",
               email: formData.mobile, 
             }
             setMobileNo(formData.mobile)
             const test = JSON.stringify(payload);
             const obj = JSON.parse(test);
             const config = { headers: { "Content-Type": "application/json" } };
               axios
               .post(process.env.REACT_APP_SEND_OTP_URL, obj, config)
               .then((res) => setOtpSend(res.data))
               .catch((err) => console.log(err));

              const payloadData = {
                 email: formData.mobile, 
               } 
               const listData = JSON.stringify(payloadData);
               const objs = JSON.parse(listData);
                 axios
                 .post(process.env.REACT_APP_VALIDATE_USER_URL, objs, config)
                 .then((res) => setverifiUser(res.data))
                 .catch((err) => console.log(err));
                  setWithOtpData({ display: 'block' })
                  setOtpData({display : 'none'})
                  var i = 30;
                 (function timer(){
                    if (--i < 0) return 0;
                    setTimeout(function(){
                     if(i !== null){
                       document.getElementById("progressBar").innerHTML = i ;
                     }
                       timer();
                    }, 1000);
                 })();
              
      }else{
         console.log('login submission failed due to validation errors.');
        }
     };

      

    
      

     const loginWithOtp = (e) => {
         e.preventDefault();
         const mob = document.getElementById("mobile_num").value;
         const get_otp =  formDataOtp.otp_a+''+formDataOtp.otp_b+''+formDataOtp.otp_c+''+formDataOtp.otp_d+''+formDataOtp.otp_e+''+formDataOtp.otp_f;
         if(isNumber(mob) === true){
         const payload_lsit = {
             email: mob, 
             type : "phone_number",
             otp :get_otp,
           }
           const test_data = JSON.stringify(payload_lsit);
           const obj_data = JSON.parse(test_data);
           const config = { headers: { "Content-Type": "application/json" } };
             axios
             .post(process.env.REACT_APP_VERIFYOTP_URL, obj_data, config)
             .then((res) => setverifiOtp(res.data))
             .catch((err) => console.log(err)); 
             console.log(verifiOtp); 
            const logon_with_suceess = {
               phone_number: mobileNo, 
               otp : get_otp,
               }  
               const logon_with_suceess_data = JSON.stringify(logon_with_suceess);
               const obj_login = JSON.parse(logon_with_suceess_data);
             
            if(verifiUser.code == '200' && verifiUser.data.loginVia == 'phone_number'){   
            axios
            .post(process.env.REACT_APP_LOGIN_URL, obj_login, config)
            .then((res) => { 
             localStorage.setItem('accessToken', res.data.data['token']);
             localStorage.setItem('user', JSON.stringify(res.data.data['user']));
             localStorage.setItem('user_kyc', JSON.stringify(res.data));
             })
            .catch((err) => console.log(err));  
             setTimeout(function(){
               navigate('/dashboard-page',{replace:true});
               document.body.classList.remove("fixed");
             },1000);
            
            }else{
               setOtpData({display : 'none'})
               setWithOtpData({ display: 'none' })
               setalomostThere({display : 'block'})
            }
         }else{

            const payload_lsit = {
               email: mob, 
               type : "email",
               otp :get_otp,
             }
             const test_data = JSON.stringify(payload_lsit);
             const obj_data = JSON.parse(test_data);
             const config = { headers: { "Content-Type": "application/json" } };
               axios
               .post(process.env.REACT_APP_VERIFYOTP_URL, obj_data, config)
               .then((res) => {
                  if(res.data.code == "200"){
                     setOtpData({display : 'none'})
                     setWithOtpData({ display: 'none' })
                     setalomostThereEmail({display : 'block'})

                  } 
                  setverifiOtp(res.data);
                }) 
               .catch((err) => console.log(err));  

         }  
   }

   const verifyEmail = (e) => {
     const emails = document.getElementById("email").value;
     const payload = {
      type : "email",
      email: emails, 
    }
    const test = JSON.stringify(payload);
    const obj = JSON.parse(test);
    const config = { headers: { "Content-Type": "application/json" } };
      axios
      .post(process.env.REACT_APP_SEND_OTP_URL, obj, config)
      .then((res) => setOtpSend(res.data))
      .catch((err) => console.log(err));
      setotpVerifed({display : 'block' })
       var i = 30;
                  (function timer(){
                     if (--i < 0) return;
                     setTimeout(function(){
                     document.getElementById("otptimer").innerHTML = i ;
                        timer();
                     }, 1000);
                  })();

   }

   const verifyMobilesNo = (e) => {
      const emails = document.getElementById("email").value;
      const payload = {
       type : "phone_number",
       email: emails, 
     }
     const test = JSON.stringify(payload);
     const obj = JSON.parse(test);
     const config = { headers: { "Content-Type": "application/json" } };
       axios
       .post(process.env.REACT_APP_SEND_OTP_URL, obj, config)
       .then((res) => setOtpSend(res.data))
       .catch((err) => console.log(err));
       setverifyMobilesNo({display : 'block' })
        var i = 30;
                   (function timer(){
                      if (--i < 0) return;
                      setTimeout(function(){
                      document.getElementById("otptimers").innerHTML = i ;
                         timer();
                      }, 1000);
                   })();
 
    }
    //console.log(otpSend)

   
   

   const newRegistration = async (e) => {
      const waitTime = 2000;
      setTimeout(() => console.log("Request taking a long time"), waitTime);
      e.preventDefault();
      const register_users = {
         name : formDataNewUser.name,
         phone_number : mobileNo,
         email: formDataNewUser.email, 
         otp: formDataNewUser.email_code,
         password: formDataNewUser.password,
         user_type : 'standard',
         business_name: formDataNewUser.bussiness_name,
       }
       const newuserData = JSON.stringify(register_users);
       const objnewuserData = JSON.parse(newuserData);
      try {
          const result = await axios({
              method: "POST",
              url: process.env.REACT_APP_NEW_USER_REGISTER,
              data: objnewuserData,
              headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
              }
          });
         //  console.log(result.data.data['token']);
         //  console.log(result.data.data['user']);
         localStorage.setItem('accessToken', result.data.data['token']);
         localStorage.setItem('user', JSON.stringify(result.data.data['user']['ref_user']));
         localStorage.setItem('user_kyc', JSON.stringify(result.data));
         navigate('/dashboard-page',{replace:true});
         document.body.classList.remove("fixed");
         setnewUserRegister(result.data);
      } catch(error) {
          console.log("FAIL!", error.message);
      }
  };
   

  // console.log(loginSuccess.user);
 
  const user_obj = JSON.parse(localStorage.getItem('user'));  
     
  return (
    <>
{ errors.mobile && (
<div className="alert alert-success add-fav-alert" id="success-alert">
<i className="bi bi-check-circle-fill"></i> {errors.mobile}
</div>
)}
{ otpSend.length != 0 ?
<div className="alert alert-success add-fav-alert" id="success-alert">
<i className="bi bi-check-circle-fill"></i> {otpSend.message}
</div> : '' }
{ newUserRegister.length != 0 ?
<div className="alert alert-success add-fav-alert" id="success-alert">
<i className="bi bi-check-circle-fill"></i> {newUserRegister.message}
</div> : '' }
    <header className={`${scrolltopdata}`}>
    <section className="container">
     <div className="row">
       <div className="col-md-2">
         <Link to={`/`} className="logo"><img src={imgSource.logo} alt="logo" /></Link>
       </div>
          <div className="col-md-10">
             <ul className="header-menu">
                <li><Link to="#">Product</Link></li>
                <li><Link to="#">Tools</Link></li>
                <li><Link to={`/about-us`}>Company</Link></li>
                <li><Link to={`/contact-us`}>Contact Us</Link></li>
                {localStorage.getItem('user') != null ?     <li className="active"><a href="#" className="user-profile"><img src={imgSource.userprofile} alt="icon" /> {user_obj.name} <svg id="Component_8_1" data-name="Component 8 – 1" xmlns="http://www.w3.org/2000/svg" width="18.001" height="24.001" viewBox="0 0 18.001 24.001">
<path id="Path_69717" data-name="Path 69717" d="M0,0H18V24H0Z" fill="none"/><path id="Path_69718" data-name="Path 69718" d="M10.5,14.5,6,10h9Z" transform="translate(-1.5 0.834)"/>
</svg></a>
          <div className="profile-box">
             <ul className="profile-links">
                <li className="active"><a href="/user-profile"> <img src={imgSource.accountsetting} alt="icon" /> Account Setting</a></li>
                <li><a href="#" > <img src={imgSource.finance} alt="icon" /> Finance</a></li>
                <li><a href="#"> <img src={imgSource.subscriptions} alt="icon" /> Subscriptions</a></li>
                <li><a href="#"> <img src={imgSource.signout} alt="icon" /> Sign Out</a></li>
             </ul>
          </div>
          </li> :
                <li><Link to="#" onClick={() => selectLogin()} className={`login-signup ${showData}`}>Login/Signup</Link>
                   <ul className={`dropdown-box ${showData}`} >
                      <li><Link to="#" onClick={() => getLogin()}>Customer</Link></li>
                      <li><Link to="#" onClick={() => getLogin()}>Partner</Link></li>
                    </ul>
                </li>
                 }
             </ul>
          </div>
    </div>
    </section>
   </header>


  <div className={`login-signup-container ${showLogin}`}  style={showith}>
   <a href="#" className="close-icon" onClick={() => closeLogin()}><img src={imgSource.close} alt="icon" /></a>
   <div className="left">
     <h3>Streamlining Global Trade and Logistics</h3>
     <p>Real-time tracking, efficient handling, customizable solutions, secure transport, global network, cost-effective, customer suppor</p>
     <img src={imgSource.logingraphics} alt="image" className="login-graphics" />
   </div>
   <div className="right">
   <div id="step1" className='step' style={showOtp}>
     <h5>Login</h5>
     <p>To get personalised experience<br /> and easy transaction</p>
     <div className="form-group">
      <ul className="tab-btn">
         <li className={mobileActive} onClick={() => onMobile()}><span >Mobile No.</span></li>
         <li className={emailActive} onClick={() => onEmail()}><span >Email</span></li>
      </ul>
     </div>
     <form onSubmit={loginSubmit} style={showMobile}>
     <div className="form-group" >
      <div className="outer-box" >
         <span className="label">Mobile No.</span>
       <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number*" />
      </div>
       <button id="get-otp" className="form-btn" >Get OTP</button>
       <span className="not-register">Not a Register Member? <a href="#">Sign UP</a></span>
       <span className="bottom-line"><img src={imgSource.safeicon} alt="icon" /> information is completely safe with us</span>
     </div>
   </form>
    <form onSubmit={loginWithEmail} style={showEmail}>
    <div className="form-group" >
      <div className="email-login"  >
         <div className="outer-box">
            <span className="label">Email</span>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email*" />
         </div>
      </div>
      <button id="get-otp" className="form-btn" >Get OTP</button>
       <span className="not-register">Not a Register Member? <a href="#">Sign UP</a></span>
       <span className="bottom-line"><img src={imgSource.safeicon} alt="icon" /> information is completely safe with us</span>
      </div>
    </form>
    </div>

   <form id="step5" onSubmit={loginWithEmailPassWord} style={showEmailPass}>
     <h5>Login</h5>
     <p>To get personalised experience<br /> and easy transaction</p>
 
     <div className="form-group">
      <div className="email-login" >
         <div className="outer-box">
            <span className="label">Email</span>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="raj.kumar@ymail.com" />
         </div>
         <div className="outer-box">
            <span className="label">Password</span>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter" />
         </div>
      </div>
       <button id="get-otp" className="form-btn" >Get OTP</button>
       <span className="not-register">Not a Register Member? <a href="#">Sign UP</a></span>
       <span className="bottom-line"><img src={imgSource.safeicon} alt="icon" /> information is completely safe with us</span>
     </div>
   </form>

   <form id="step2" onSubmit={loginWithOtp} style={showithOtp}>
      <div className="otp-verified">
         <img src={imgSource.greentick} alt="icon" /> OTP verified successfully
       </div>
      <h5>Login</h5>
      <p>To get personalised experience <br />and easy transaction <a href="#" className="edit-number">EDIT NUMBER</a></p>
      <div className="form-group">
         <input type="text" id="mobile_num" value={mobileNo} />
         </div>
         <div className="form-group">
         <ul className="otp-box" id="inputs">
         <input type="text" name='otp_a' inputmode="numeric" maxlength="1" value={formData.otp_a} onChange={handleChange} placeholder="-" />
          <input type="text" name='otp_b' inputmode="numeric" maxlength="1" value={formData.otp_b} onChange={handleChange} placeholder="-" />
          <input type="text" name='otp_c' inputmode="numeric" maxlength="1" value={formData.otp_c} onChange={handleChange} placeholder="-" />
          <input type="text" name='otp_d' inputmode="numeric" maxlength="1" value={formData.otp_d} onChange={handleChange} placeholder="-" />
          <input type="text" name='otp_e' inputmode="numeric" maxlength="1" value={formData.otp_e} onChange={handleChange} placeholder="-" />
          <input type="text" name='otp_f' inputmode="numeric" maxlength="1" value={formData.otp_f} onChange={handleChange} placeholder="-" />
         </ul>
         </div>
         <div className="form-group">
         <ul className="otp-timer">
          <li>Didn’t receive the code? <br /><small >Resend in 00:<span id="progressBar"></span></small></li>
          <li><a href="#">RESEND OTP</a></li>
         </ul>
         </div>
         <div className="form-group">
         <button id="continue" className="form-btn" type='submit'>Continue</button>
         <span className="bottom-line"><img src={imgSource.safeicon} alt="icon" /> information is completely safe with us</span>
       </div>
    </form>
    <form id="step3" onSubmit={newRegistration} style={showalomostThere}>
      
      <h5>Almost There</h5>
      <p>You are just 1 step away please provide information below</p>

     <div className="form-group">
      <small>Name*</small>
      <input type="text" name='name' id="name" value={formData.name} onChange={handleChange} placeholder="Enter" />
     </div>

     <div className="form-group">
      <small>Email Id*</small>
      <input type="Email" name='email' id="email" value={formData.email} onChange={handleChange} placeholder="Enter" className="code-btn-fix" />
      <span className="get-code" onClick={() => verifyEmail()}>Get Code</span>
     </div>
     <div className="form-group" style={otpVerifed}>
         <ul className="otp-timer">
          <li>Didn’t receive the code? <br /><small>Resend in 00:<span id="otptimer">30</span></small></li>
          <li><a href="#">RESEND OTP</a></li>
         </ul>
     </div>
     <div className="form-group">
      <small>Verification code from Email</small>
      <input type="text" name="email_code" id="email_code" value={formData.email_code} onChange={handleChange} placeholder="Enter" />
     </div>
     <div className="form-group">
      <small>Password</small>
      <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" />
     </div>
     <div className="form-group">
      <small>Re Enter Password</small>
      <input type="password" name="repassword" id="repassword" value={formData.repassword} onChange={handleChange} placeholder="Re Enter Enter" />
     </div>
     <div className="form-group">
      <small>Business Name*</small>
      <input type="text" name="bussiness_name" id="bussiness_name" value={formData.bussiness_name} onChange={handleChange} placeholder="Business Name" />
     </div>
   
<div className="form-group">
   <span className="terms-condition">By signing up, you are accepting the <a href="#"> Terms and Conditions </a> & <a href="#"> Privacy Policy</a></span> 
</div>
<div className="form-group">
   <button className="form-btn" >Continue</button>
   <span className="bottom-line"><img src={imgSource.safeicon} alt="icon" /> information is completely safe with us</span>
 </div>
    </form>

    <form id="step4" onSubmit={newRegistration} style={showalomostThereEmail}>
      
      <h5>Almost There</h5>
      <p>You are just 1 step away please provide information below</p>

     <div className="form-group">
      <small>Name*</small>
      <input type="text" name='name' id="name" value={formData.name} onChange={handleChange} placeholder="Enter" />
     </div>

     <div className="form-group">
      <small>Mobile*</small>
      <input type="text" name='email' id="email" value={formData.email} onChange={handleChange} placeholder="Enter" className="code-btn-fix" />
      <span className="get-code" onClick={() => verifyMobilesNo()}>Get Code</span>
     </div>
     <div className="form-group" style={verifyedMobilesNo}>
         <ul className="otp-timer">
          <li>Didn’t receive the code? <br /><small>Resend in 00:<span id="otptimers">30</span></small></li>
          <li><a href="#">RESEND OTP</a></li>
         </ul>
     </div>
     <div className="form-group">
      <small>Otp from mobile</small>
      <input type="text" name="email_code" id="email_code" value={formData.email_code} onChange={handleChange} placeholder="Enter" />
     </div>
     <div className="form-group">
      <small>Password</small>
      <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" />
     </div>
     <div className="form-group">
      <small>Re Enter Password</small>
      <input type="password" name="repassword" id="repassword" value={formData.repassword} onChange={handleChange} placeholder="Re Enter Enter" />
     </div>
     <div className="form-group">
      <small>Business Name*</small>
      <input type="text" name="bussiness_name" id="bussiness_name" value={formData.bussiness_name} onChange={handleChange} placeholder="Business Name" />
     </div>
   
<div className="form-group">
   <span className="terms-condition">By signing up, you are accepting the <a href="#"> Terms and Conditions </a> & <a href="#"> Privacy Policy</a></span> 
</div>
<div className="form-group">
   <button className="form-btn" >Continue</button>
   <span className="bottom-line"><img src={imgSource.safeicon} alt="icon" /> information is completely safe with us</span>
 </div>
    </form>
   </div>
     </div>
   </>
  )
}
