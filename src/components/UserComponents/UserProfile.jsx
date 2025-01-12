import React, { useState, useEffect } from 'react'
import UserHeader from '../CommonComponents/UserHeader'
import '../../assets/css_new/user-profile.css'
import {useUserData, useCountryList} from '../../helper/custom_hooks/user_hooks'
import userService from '../../services/user_service'
import UserProfileShimmer from './UserProfileShimmer'
import imgService from '../../helper/dataManipulation/globalUtlities'


export default function Update() {
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [updateUserList, setupdateUserList] = useState([]);
    const [showAllRates,setAllRates] = useState('allRates');
    const [showRateUp,setRateUp] = useState('tab_content');
    const [showRateDown,setRateDown] = useState('tab_content');
    const [showtracktrace,settracktrace] = useState('tab_content');
    const [showActive,setActive] = useState('active');
    const [upActive,setupActive] = useState('');
    const [downActive,setdownActive] = useState('');
    const [trackActive,settrackActive] = useState('');
    const [style, setStyle] = useState({ opacity: 1 })
    const [styleup, setupStyle] = useState({ opacity: 0 })
    const [styledown, setdownStyle] = useState({ opacity: 0 })
    const [styletrack, settrackStyle] = useState({ opacity: 0 })
    const [filePan, setFilePan] = useState();
    const [fileIEC, setFileIEC] = useState();
    const [fileBank, setFileBank] = useState();
    const [fileAut, setFileAut] = useState();
    const [fileWca, setFileWca] = useState();
    const [fileReg, setFileReg] = useState();
    const [fileUb, setFileUb] = useState();
    const [filePort, setFilePort] = useState();
    const [fileIcd, setFileIcd] = useState();
    const [fileOther, setFileOther] = useState();
    const user_obj = JSON.parse(localStorage.getItem('user'));
    const user_token = localStorage.getItem('accessToken');


   const handlePan = (event) => {
     // document.getElementById("file-name1").innerHTML = event.target.files[0].name;
      setFilePan(event.target.files[0])
     };

   const uploadFile2 = (event) => {
     //  document.getElementById("file-name2").innerHTML = event.target.files[0].name;
      setFileIEC(event.target.files[0])
   };

   const uploadFile3 = (event) => {
     // document.getElementById("file-name3").innerHTML = event.target.files[0].name;
      setFileBank(event.target.files[0])
   };

   const uploadFile4 = (event) => {
     // document.getElementById("file-name4").innerHTML = event.target.files[0].name;
      setFileAut(event.target.files[0])
   };

   const uploadFile5 = (event) => {
     // document.getElementById("file-name5").innerHTML = event.target.files[0].name;
      setFileWca(event.target.files[0])
   };

   const uploadFile6 = (event) => {
     // document.getElementById("file-name6").innerHTML = event.target.files[0].name;
      setFileReg(event.target.files[0])
   };
   
   const uploadFile7 = (event) => {
     // document.getElementById("file-name7").innerHTML = event.target.files[0].name;
      setFileUb(event.target.files[0])
   };

   const uploadFile8 = (event) => {
     // document.getElementById("file-name8").innerHTML = event.target.files[0].name;
      setFilePort(event.target.files[0])
   };

   const uploadFile9 = (event) => {
     // document.getElementById("file-name9").innerHTML = event.target.files[0].name;
      setFileIcd(event.target.files[0])
   };

   const uploadFile10 = (event) => {
     // document.getElementById("file-name10").innerHTML = event.target.files[0].name;
      setFileOther(event.target.files[0])
   };
    

    const { data, loading, error } = useUserData(process.env.REACT_APP_NEW_GETUSERDATA,user_token,user_obj._id);
    const { countrylist, loadingCountry, errorCountry } = useCountryList(process.env.REACT_APP_COUNTRY_LIST,user_token);

    useEffect(() => {
      if(data ?.ref_country ?._id != null){
        const getStname = async (event) => {
        const result  =  await userService.getListData(user_token,process.env.REACT_APP_STATE_LIST,data.ref_country._id )
        setStateList(result.data);
      }
      getStname()
     }

     if(data ?.ref_state != null){
         const getCtname = async (event) => {
            const result  =  await userService.getListData(user_token,process.env.REACT_APP_CITY_LIST,data.ref_state)
            setCityList(result.data);
         }
         getCtname()
     }
   }, [data]);

     if (loading && stateList && cityList && loadingCountry) return <UserProfileShimmer />;
     if (error && errorCountry) return <p>Error Error time out: {error.message}</p>;

 
     // get State List
    const getStateName = async (event) => {
       if(event != 0){
       const result  =  await userService.getListData(user_token,process.env.REACT_APP_STATE_LIST,event)
       setStateList(result.data);
       }
    }
   
    // get City List
    const getCityName = async (event) => {
      if(event != 0){
      const result  =  await userService.getListData(user_token,process.env.REACT_APP_CITY_LIST,event)
      setCityList(result.data);
      }
    }


    const userProfileUpdate = async (event) => {
      event.preventDefault();
      const results  =  await userService.getUserProfileUpdate(process.env.REACT_APP_NEW_GETUSERDATA,event,user_obj._id)
      setupdateUserList(results)
    }

    const userCompanyProfileUpdate = async (event) => {
      event.preventDefault();
      const results  =  await userService.getUsercmpProfileUpdate(process.env.REACT_APP_NEW_GETUSERDATA,event,user_obj._id)
      setupdateUserList(results)
    }

    const userPocUpdate = async (event) => {
      event.preventDefault();
      const results  =  await userService.getUserPocUpdate(process.env.REACT_APP_NEW_GETUSERDATA,event,user_obj._id)
      setupdateUserList(results)
    }


   //User Upload Documents
 const userUploadDoc = async (event) => {
   event.preventDefault();
  // alert(event)
    const document_type  =  await userService.getDocumentType(process.env.REACT_APP_GET_DOCUMENT_TYPE)
     if(document_type != null){
       const pancard_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,filePan,event.target['pan_cards'].value,document_type.data[2]._id)
       if(pancard_proof.code == 200){
         const iec_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileIEC,event.target['iec_document'].value,document_type.data[3]._id)
         const bank_statement_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileBank,event.target['bank_statement'].value,document_type.data[4]._id)
         const authority_letter_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileAut,event.target['authority_letter'].value,document_type.data[5]._id)
         const wca_certificate_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileWca,event.target['wca_certificate'].value,document_type.data[6]._id)
         const registration_document_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileReg,event.target['registration_document'].value,document_type.data[7]._id)
         const utility_bill_document_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileUb,event.target['utility_bill_document'].value,document_type.data[8]._id)
         const port_registration_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,filePort,event.target['port_registration'].value,document_type.data[9]._id)
         const icd_registration_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileIcd,event.target['icd_registration'].value,document_type.data[10]._id)
         const other_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileOther,event.target['other'].value,document_type.data[11]._id)
         if(pancard_proof.code == 200 || iec_proof.code == 200 || bank_statement_proof.code == 200 || authority_letter_proof.code == 200|| wca_certificate_proof.code == 200|| registration_document_proof.code == 200|| utility_bill_document_proof.code == 200 || port_registration_proof.code == 200 || icd_registration_proof.code == 200 || other_proof.code == 200){
            setupdateUserList(pancard_proof);
         } 
       }
     } 
 }
    


    function profile(){
        setStyle({ opacity: 1 });
        setupStyle({ opacity: 0 });
        setdownStyle({ opacity: 0 });
        settrackStyle({ opacity: 0 });
        setTimeout(() => {
            showAllRates ? setAllRates('allRates') : setAllRates('tab_content');
            showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
            showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
            showtracktrace ? settracktrace('tab_content') : settracktrace('allRates');
            showActive ? setActive('') : setActive('active');
            upActive ? setupActive('') : setupActive('');
            downActive ? setdownActive('') : setdownActive('');
            trackActive ? settrackActive('') : settrackActive('');
        }, 0.1999999880); 
     }
     function company_details(){
        setStyle({ opacity: 0 });
        setupStyle({ opacity: 1 });
        setdownStyle({ opacity: 0 });
        settrackStyle({ opacity: 0 });
        setTimeout(() => {
            showRateUp ? setRateUp('allRates') : setRateUp('tab_content');
            showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
            showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
            showtracktrace ? settracktrace('tab_content') : settracktrace('allRates');
            showActive ? setActive('') : setActive('');
            upActive ? setupActive('') : setupActive('active');
            downActive ? setdownActive('') : setdownActive('');
            trackActive ? settrackActive('') : settrackActive('');
        }, 0.1999999880);
     }
     function address(){
        setStyle({ opacity: 0 });
        setupStyle({ opacity: 0 });
        setdownStyle({ opacity: 1 });
        settrackStyle({ opacity: 0 });
        setTimeout(() => {
            showRateDown ? setRateDown('allRates') : setRateDown('tab_content');
            showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
            showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
            showtracktrace ? settracktrace('tab_content') : settracktrace('allRates');
            showActive ? setActive('active') : setActive('');
            upActive ? setupActive('') : setupActive('');
            downActive ? setdownActive('') : setdownActive('active');
            trackActive ? settrackActive('') : settrackActive('');
        }, 0.1999999880);
     }
    
     function document(){
        setStyle({ opacity: 0 });
        setupStyle({ opacity: 0 });
        setdownStyle({ opacity: 0 });
        settrackStyle({ opacity: 1 });
        setTimeout(() => {
            showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
            showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
            showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
            showtracktrace ? settracktrace('allRates') : settracktrace('tab_content');
            showActive ? setActive('active') : setActive('');
            upActive ? setupActive('') : setupActive('');
            downActive ? setdownActive('') : setdownActive('');
            trackActive ? settrackActive('') : settrackActive('active');
        }, 0.1999999880);
     }


     
  return (
    <>
   { updateUserList ?.length !== 0 ?
   <div className="alert alert-success add-fav-alert" id="success-alert">
   <i className="bi bi-check-circle-fill"></i> {updateUserList.message}
   </div> : '' }
    {localStorage.getItem('user') == null ? 'Page Not Found!': 
    <section className="main-container">
     <UserHeader />
    <section className="inner-body">
    <div className="user-profile-container">
       <a href="#" className="close-icon"><img src={imgService.close} alt="icon" /></a>
    <div className="profile-area">
     <h5>Profile</h5>
     <div className="profile-row">
       <figure>
          <span className="inner"><img src={imgService.profileimage} alt="icon" /> <a href="#" className="edit"><img src={imgService.pencil} alt="icon" /></a></span>
       </figure>
       <div className="name">
          <h5>Hello {user_obj.name},</h5>
          <span>{data ?.company_name}</span>
       </div>
     </div>
    </div>
  <div className="details-container">
    <div className="head-links">
    <ul className="detail-links">
     <li className={`${showActive}`}><a href="#" onClick={() => profile()}><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="10" r="3" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M17 17C17 14.7909 14.7614 13 12 13C9.23858 13 7 14.7909 7 17" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><rect height="18" rx="3" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"/></svg> Profile <img src={imgService.checkboxcircleline} alt="icon" className="green-icon" /></a></li>
     <li className={`${upActive}`}><a href="#" onClick={() => company_details()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 2H17V6H23V22H1V6H7V2ZM9 6H15V4H9V6ZM3 13V20H21V13H13V14H11V13H3ZM11 11H3V8H21V11H13V10H11V11Z" fill="black"/></svg> Company Details <img src={imgService.checkboxcircleline} alt="icon" className="green-icon" /></a></li>
     <li className={`${downActive}`}><a href="#" onClick={() => address()}><svg id="road-map-line" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
       <path id="Path_66817" data-name="Path 66817" d="M0,0H20V20H0Z" fill="none"/>
       <path id="Path_66818" data-name="Path 66818" d="M3.667,5.286V15.973l4.221-1.808,5,2.5L17,14.9V4.214l1.086-.465a.417.417,0,0,1,.581.383V16l-5.833,2.5-5-2.5L2.581,18.251A.417.417,0,0,1,2,17.868V6Zm10.2,4.25-3.536,3.535L6.8,9.536a5,5,0,1,1,7.072,0Zm-3.536,1.178L12.69,8.357a3.333,3.333,0,1,0-4.713,0Z" transform="translate(-0.333 -0.167)" fill="#363636"/>
     </svg> Addresses <img src={imgService.checkboxcircleline} alt="icon" className="green-icon" /></a></li>
     <li className={`${trackActive}`}><a href="#" onClick={() => document()}><svg id="file-upload-line" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
       <path id="Path_66815" data-name="Path 66815" d="M0,0H20V20H0Z" fill="none"/>
       <path id="Path_66816" data-name="Path 66816" d="M13,3.667H4.667V17H16.333V7H13ZM3,2.827A.829.829,0,0,1,3.832,2h10L18,6.167V17.827a.833.833,0,0,1-.828.839H3.827A.833.833,0,0,1,3,17.84Zm8.333,7.507v3.333H9.667V10.333h-2.5L10.5,7l3.333,3.333Z" transform="translate(-0.5 -0.333)" fill="#363636"/>
     </svg> Documents <img src={imgService.checkboxcircleline} alt="icon" className="green-icon" /></a></li>
    </ul>
    {/* <ul className="next-prev">
     <li className="prev"><a href="#"><img src={imgService.arrowdownsline} alt="icon" /></a></li>
     <li className="next"><a href="#"><img src={imgService.arrowdownsline} alt="icon" /></a></li>
    </ul> */}
 </div>

 <div className={`profile ${showAllRates}`}>
 <div className="head-row">
    <h4>Profile</h4>
 </div>
 <form onSubmit={(event) => userProfileUpdate(event)}>
    <ul className="form-row">
      <li>
       <div className="outer">
          <label>Name</label>
          <input type="text" name="name" value={user_obj.name} placeholder="name" />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Mobile Number</label>
          <input type="text" name="mobile_no" value={user_obj.phone_number} placeholder="8890678432" />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Alt. Mobile No.</label>
          <input type="text" name="alt_mobile_no" value={data ?.alternet_mobile} placeholder="8890678432" />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Email Address</label>
          <input type="email" name="email" value={user_obj.email} placeholder="email" />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Languages</label>
          <select name="languages" >
            <option  selected ={data ?.language == 'english' ? 'selected' : ''} value='english'>English</option>
            <option  selected ={data ?.language == 'hindi' ? 'selected' : ''} value='hindi'>Hindi</option>
          
         </select>
       </div>
      </li>
    </ul>
    <ul className="form-row">
      <li>
        <div className="outer">
          <label>Country<sup>*</sup></label>
          <select id="countryList" name="country" onChange={(event) => getStateName(event.target.value)}>
          <option value='0'>Select Country</option>
            {countrylist ?.data.map((val,index)=>{
               return (  
                  <option  selected ={data ?.ref_country ?._id == val ?._id ? 'selected' : ''} value={val._id} >{val.name}</option>
                )}
             )}
          </select>
        </div>
       </li>
       <li>
        <div className="outer">
           <label>State<sup>*</sup></label>
           <select name="statename" id="stateListData" onChange={(event) => getCityName(event.target.value)}>
           <option value='0'>Select State</option>
            { stateList ?.map((val,index)=>{
               return (  
                  <option selected ={data ?.ref_state == val._id ? 'selected' : ''} value={val._id}>{val.name}</option>
                )}
             ) }
          </select>
        </div>
       </li>
       <li>
        <div className="outer">
          <label>City<sup>*</sup></label>
          <select name="city">
            <option value='0'>Select City</option>
            {cityList ?.map((val,index)=>{
               return (  
                  <option selected={data ?.ref_city == val._id ? 'selected' : ''} value={val._id}>{val.name}</option>
                )}
             ) } 
          </select>
        </div>
       </li>
       <li>
          <div className="outer">
            <label>PIN Code / Zip Code<sup>*</sup></label>
            <input type="text" name='pincode' value={data ?.pin_code}  placeholder="110006" />
          </div>
         </li>
     </ul>
     <button className="small-btn" type="submit">Save</button>
 </form>
</div>


<div className={`Company-Detail ${showRateUp}`} style={styleup}>
 <div className="head-row">
    <h4>Company Details</h4>
 </div>
 <form onSubmit={(event) => userCompanyProfileUpdate(event)}>
    <ul className="form-row">
      <li>
       <div className="outer">
          <label>Company Name</label>
          <input type="text" name="company_name" value={data ?.company_name} placeholder="Vijani" required/>
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Company PAN</label>
          <input type="text" name="company_pan" value={data ?.company_pan} placeholder="Enter" required/>
       </div>
      </li>
      <li>
       <div className="outer">
          <label>GST Number</label>
          <input type="text"  name="gst_number" value={data ?.gst_number} placeholder="NA" required readOnly/>
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Customer Code</label>
          <input type="text"  name="customer_code" value={data ?.ref_user.customer_code} placeholder="Vij1417151720418190" required readOnly/>
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Website</label>
          <input type="text" name="website_url" value={data ?.website_url} placeholder="India" />
       </div>
      </li>
    </ul>
    <ul className="form-row">
    <li>
        <div className="outer">
           <label>Country<sup>*</sup></label>
           <select id="countryList" name="country" onChange={(event) => getStateName(event.target.value)}>
          <option value='0'>Select Country</option>
            {countrylist ?.data.map((val,index)=>{
               return (  
                  <option  selected ={data ?.ref_country ?._id == val._id ? 'selected' : ''} value={val._id} >{val.name}</option>
                )}
             )}
          </select>
        </div>
       </li>
       <li>
        <div className="outer">
           <label>City<sup>*</sup></label>
           <select name="city">
            <option value='0'>Select City</option>
            {cityList ?.map((val,index)=>{
               return (  
                  <option selected={data ?.ref_city == val._id ? 'selected' : ''} value={val._id}>{val.name}</option>
                )}
             ) } 
          </select>
        </div>
       </li>
       
    
     </ul>
     <button className="small-btn">Save</button>
 </form>
</div>
<div className={`Address ${showRateDown}`} style={styledown}>
<div className="head-row">
    <h4>Address</h4>
 </div>
<form onSubmit={(event) => userPocUpdate(event)}>
 <div className="billing-address-outer">
    <div className="inner">
       <div className="top">
    <h5>Billing Address</h5>
    <a href="#" className="minus-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 11H17V13H7V11Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="black"/></svg></a>
 </div>

    <ul className="form-row">
      <li>
       <div className="outer">
          <label>Billing Party Name</label>
          <input type="text" name="company_name" value={data ?.company_name} placeholder="Sekyoor Solution Pvt Ltd." />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>POC Name</label>
          <input type="text" name="poc_name"  value={data ?.poc_name} placeholder="Enter" />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>POC Mobile Number</label>
          <input type="text"  name="poc_mobile" value={data ?.poc_mobile} placeholder="9999 768 987" />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>POC Email</label>
          <input type="email" name="poc_email" value={data ?.poc_email} placeholder="POC Email" />
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Country<sup>*</sup></label>
          <select id="countryList" name="country" onChange={(event) => getStateName(event.target.value)}>
          <option value='0'>Select Country</option>
            {countrylist ?.data.map((val,index)=>{
               return (  
                  <option  selected ={data ?.ref_country ?._id == val._id ? 'selected' : ''} value={val._id} >{val.name}</option>
                )}
             )}
          </select>
       </div>
      </li>
    </ul>
    <ul className="form-row">
       <li>
        <div className="outer">
           <label>Building/Street</label>
           <input type="text" name="building" value={data ?.billing_address ?.building}  placeholder="Enter" />
        </div>
       </li>
       <li>
        <div className="outer">
           <label>Landmark</label>
           <input type="text" name="landmark" value={data ?.billing_address ?.landmark}  placeholder="Enter" />
        </div>
       </li>
       <li>
          <div className="outer">
             <label>City<sup>*</sup></label>
             <select name="city">
            <option value='0'>Select City</option>
            {cityList ?.map((val,index)=>{
               return (  
                  <option selected={data ?.ref_city == val._id ? 'selected' : ''} value={val._id}>{val.name}</option>
                )}
             ) } 
          </select>
          </div>
         </li>
         <li>
          <div className="outer">
             <label>Pincode</label>
             <input type="text" name='pincode' value={data ?.pin_code}  placeholder="110006" />
          </div>
         </li>
     </ul>

</div>
</div>

<div className="billing-address-outer">
<div className="inner">
 <div className="top">
 <h5>Other Address</h5>
 <a href="#" className="plus-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 7V11H17V13H13V17H11V13H7V11H11V7H13Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="black"/></svg></a>
</div>
</div>
<button className="small-btn">Save</button>
</div>
</form>
</div>


<div className={`Document ${showtracktrace}`} style={styletrack}>
 <div className="head-row">
    <h4>Document</h4>
 </div>
 <form onSubmit={(event) => userUploadDoc(event)}>
    <ul className="form-row">
      <li>
       <div className="outer">
          <label>ID Proof (PAN Card)*</label>
          <div className="inputfile-box">
             <input type="hidden" name="pan_cards" value="pan_card" className="form-control" placeholder="Enter" />
             <input type="file" id="file1" name="pancards" className="inputfile" onChange={handlePan} required/>
             <label for="file1" className="file-label">
               <span id="file-name1" className="file-name"></span>
               <span className="file-button">
                Uplaod file
                 <img src={imgService.fileupload} alt="icon" />
               </span>
             </label>
           </div>
       </div>
      </li>
      <li>
       <div className="outer">
          <label>IEC Document</label>
          <div className="inputfile-box">
             <input type="hidden" name="iec_document" value="iec_document" className="form-control" placeholder="Enter" />
             <input type="file" id="file2" className="inputfile" onChange={uploadFile2} required />
             <label for="file2" className="file-label">
               <span id="file-name2" className="file-name"></span>
               <span className="file-button">
                Uplaod file
                 <img src={imgService.fileupload} alt="icon" />
               </span>
             </label>
           </div>
          
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Bank Statement Copy</label>
          <div className="inputfile-box">
             <input type="hidden" name="bank_statement" value="bank_statement" className="form-control" placeholder="Enter" />
             <input type="file" id="file3" className="inputfile"  onChange={uploadFile3} />
             <label for="file3" className="file-label">
               <span id="file-name3" className="file-name"></span>
               <span className="file-button">
                Uplaod file
                 <img src={imgService.fileupload} alt="icon" />
               </span>
             </label>
           </div>
          
       </div>
      </li>
      <li>
       <div className="outer">
          <label>Authority Letter</label>
          <div className="inputfile-box">
             <input type="hidden" name="authority_letter" value="authority_letter" className="form-control" placeholder="Enter" />
             <input type="file" id="file4" className="inputfile"  onChange={uploadFile4} />
             <label for="file4" className="file-label">
               <span id="file-name4" className="file-name"></span>
               <span className="file-button">
                Uplaod file
                 <img src={imgService.fileupload} alt="icon" />
               </span>
             </label>
           </div>
         
       </div>
      </li>
      <li>
       <div className="outer">
          <label>WCA Certificate</label>
          <div className="inputfile-box">
             <input type="hidden" name="wca_certificate" value="wca_certificate" className="form-control" placeholder="Enter" />
             <input type="file" id="file5" className="inputfile"  onChange={uploadFile5} />
             <label for="file5" className="file-label">
               <span id="file-name5" className="file-name"></span>
               <span className="file-button">
                Uplaod file
                 <img src={imgService.fileupload} alt="icon" />
               </span>
             </label>
           </div>
          
       </div>
      </li>
    </ul>
    <ul className="form-row">
       <li>
          <div className="outer">
             <label>Registration Document</label>
             <div className="inputfile-box">
                <input type="hidden" name="registration_document" value="registration_document" className="form-control" placeholder="Enter" />
                <input type="file" id="file6" className="inputfile"  onChange={uploadFile6} />
                <label for="file6" className="file-label">
                  <span id="file-name6" className="file-name"></span>
                  <span className="file-button">
                   Uplaod file
                    <img src={imgService.fileupload} alt="icon" />
                  </span>
                </label>
              </div>
             
          </div>
         </li>
         <li>
          <div className="outer">
             <label>Utility Bill Document</label>
             <div className="inputfile-box">
                <input type="hidden" name="utility_bill_document" value="utility_bill_document" className="form-control" placeholder="Enter" />
                <input type="file" id="file7" className="inputfile"  onChange={uploadFile7} />
                <label for="file7" className="file-label">
                  <span id="file-name7" className="file-name"></span>
                  <span className="file-button">
                   Uplaod file
                    <img src={imgService.fileupload} alt="icon" />
                  </span>
                </label>
              </div>
           
          </div>
         </li>
         <li>
          <div className="outer">
             <label>Port Registration</label>
             <div className="inputfile-box">
                <input type="hidden" name="port_registration" value="port_registration" className="form-control" placeholder="Enter" /> 
                <input type="file" id="file8" className="inputfile"  onChange={uploadFile8} />
                <label for="file8" className="file-label">
                  <span id="file-name8" className="file-name"></span>
                  <span className="file-button">
                   Uplaod file
                    <img src={imgService.fileupload} alt="icon" />
                  </span>
                </label>
              </div>
          </div>
         </li>
         <li>
          <div className="outer">
             <label>ICD Registration</label>
             <div className="inputfile-box">
                <input type="hidden" name="icd_registration" value="icd_registration" className="form-control" placeholder="Enter" /> 
                <input type="file" id="file9" className="inputfile"  onChange={uploadFile9} />
                <label for="file9" className="file-label">
                  <span id="file-name9" className="file-name"></span>
                  <span className="file-button">
                   Uplaod file
                    <img src={imgService.fileupload} alt="icon" />
                  </span>
                </label>
              </div>
            
          </div>
         </li>
     </ul>
     <hr />
  <ul className="form-row">
    <li>
       <div className="outer">
          <label>Document Name</label>
          <input type="text" name="other"  placeholder="Enter" />
       </div>
      </li>
    <li>
       <div className="outer">
          <label>Upload Document</label>
          <div className="inputfile-box">
             <input type="file" id="file10" className="inputfile"  onChange={uploadFile10} />
             <label for="file9" className="file-label">
               <span id="file-name10" className="file-name"></span>
               <span className="file-button">
                Uplaod file
                 <img src={imgService.fileupload} alt="icon" />
               </span>
             </label>
           </div>
       </div>
      </li>
      <li>
       <button className="border-btn Verify">Add other Document</button>
      </li>
  </ul>
  <p className="note"><b>Note:</b>Each Document file size should not exceed more than 2 MB</p>
  <button className="small-btn" type="submit">Save</button>
 </form>

</div>

  </div>
    </div>
 </section>
 </section>
}
 </>
  )
}
