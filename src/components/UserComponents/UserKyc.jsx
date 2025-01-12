import React, { useState } from 'react'
import UserHeader from '../CommonComponents/UserHeader'
import userService from '../../services/user_service'
import '../../assets/css_new/partner-kyc-verification.css'
import { useNavigate } from 'react-router-dom'
import imgService from '../../helper/dataManipulation/globalUtlities'


export default function UserKyc() {
  const navigate = useNavigate();
  const [gstList, setGstData] = useState([]);
  const [file, setFile] = useState()
  const [fileCmp, setFileCmp] = useState()
  //const [filePan, setFilePan] = useState()
  const [updateUserList, setupdateUserList] = useState([]);
  const user_obj = JSON.parse(localStorage.getItem('user'));
 
  const handleChange = (event) => {
      document.getElementById("file-name1").innerHTML = event.target.files[0].name;
      setFile(event.target.files[0])
   };

   const handleCompany = (event) => {
    document.getElementById("file-name2").innerHTML = event.target.files[0].name;
      setFileCmp(event.target.files[0])
   };

  //  const handlePancard = (event) => {
  //     document.getElementById("file-name3").innerHTML = event.target.files[0].name;
  //     setFilePan(event.target.files[0])
  //  };

  
  const getGst = async () => {
    const gstno = document.getElementById("gst_no").value;
    if(gstno != null){
    const result  =  await userService.getGst(process.env.REACT_APP_GST_API,gstno)
    //alert(result ?.data ?.statusCode)
    if(result ?.data ?.statusCode !== 503){
      setGstData(result.data);
    }else{
      alert('apisetu.gov.in portal is not working please try after sometime!')
    }
    }
 }

//kyc Upload Documents
 const userKycUpload = async (event) => {
  event.preventDefault();
  const document_type  =  await userService.getDocumentType(process.env.REACT_APP_GET_DOCUMENT_TYPE)
  if(document_type != null){
  const kycproof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,file,event.target['gst_name'].value,document_type.data[1]._id)
   if(kycproof.code == 200){
    const add_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,fileCmp,event.target['address_proof'].value,document_type.data[0]._id)
    if(add_proof.code == 200){
     // const pancard_proof  =  await userService.getUserKfc(process.env.REACT_APP_UPLOAD_USER_DOCUMENT,filePan,event.target['pan_cards'].value,document_type.data[2]._id)
     // if(pancard_proof.code == 200){
       const results  =  await userService.getUserKycUpdate(process.env.REACT_APP_NEW_GETUSERDATA,event,user_obj._id)
        if(results.code == 200){
           setupdateUserList(results)
           localStorage.setItem('user_kyc', JSON.stringify(results.data));
           navigate('/kycsuccess',{replace:true});
        } 
    //  }
     } 
   } 
  }
}

console.log(updateUserList)
    
  return (
    <>
    {localStorage.getItem('user') == null ? 'Page Not Found!':
    <section className="main-container">
    <UserHeader />
    <div className="kyc-form-inner">
            <span className="close"><img src={imgService.close} alt="icon" /></span>
            <div className="form-data">
               <div className="left-data">
                <h2>Streamlining Global <br />Trade and Logistics</h2>
                
                <ul>
                  <li>
                     <p>Finish your KYC to unlock full account access & benefits.</p>
                  </li>
                  <li>
                     <p>Complete your KYC & discover freight rates.</p>
                  </li>
                  <li>
                     <p>KYC done? Enjoy seamless secure services!</p>
                  </li>
                  <li>
                     <p>KYC completion means more secure & efficient interactions.</p>
                  </li>
                </ul>
                <img src={imgService.kycbg} alt="image" className="kyc-img" />
               </div>
               <div className="right-data">
                  <h3>KYC Verification Form</h3>
                  <h5>We just need some additional details from you</h5>
                <form onSubmit={(event) => userKycUpload(event)} >
                  <div className="form-row">
                     <div className="col">
                        <label>GST Number</label>
                        <input type="hidden" name="gst" value="gst" className="form-control" placeholder="Enter" />
                        <input type="text" name="gst_no" id="gst_no" className="form-control" placeholder="Enter" required/>
                        <span className="verify" onClick={() => getGst()}>Verify</span>
                        
                      </div>
                      <div className="col">
                        <label>GST Certificate</label>
                        <div className="inputfile-box">
                        <input type="hidden" name="gst_name" value="gst_certificate" className="form-control" placeholder="Enter" />
                           <input type="file" id="file1" name="gst_certificate" className="inputfile" onChange={handleChange} required />
                           <label for="file1" className="file-label">
                             <span id="file-name1" className="file-name"></span>
                             <span className="file-button">
                               <img src={imgService.fileupload} alt="icon" />
                               Upload
                             </span>
                           </label>
                         </div>
                      </div>
                  </div>
                  <div className="form-row">
                     <div className="col autofill">
                        <label>Legal Name</label>
                        <input type="text" name="legal_name" value={gstList.length != 0 ? gstList ?.legalNameOfBusiness: ''} className="form-control" placeholder="Auto" readOnly required/>
                      </div>
                      <div className="col autofill">
                        <label>Registered Address</label>
                        <input type="text" name="register_address" value={gstList.length != 0 ? gstList ?.principalPlaceOfBusinessFields ?.principalPlaceOfBusinessAddress.buildingName+' '+gstList ?.principalPlaceOfBusinessFields ?.principalPlaceOfBusinessAddress.districtName+' '+ gstList ?.stateJurisdiction: ''} className="form-control" placeholder="Auto fill" readOnly required/>
                      </div>
                  </div>
                  <div className="form-row">
                     <div className="col">
                        <label>Company Address</label>
                        <input type="text" name="co_address" className="form-control" placeholder="Enter"  required />
                      </div>
                      <div className="col">
                        <label>Company Address Proof</label>
                        <div className="inputfile-box">
                        <input type="hidden" name="address_proof" value="address_proof" className="form-control" placeholder="Enter" />
                           <input type="file" id="file2" name="address_prf" className="inputfile" onChange={handleCompany} required />
                           <label for="file2" className="file-label">
                             <span id="file-name2" className="file-name"></span>
                             <span className="file-button">
                               <img src={imgService.fileupload} alt="icon" />
                               Upload
                             </span>
                           </label>
                         </div>
                      </div>
                  </div>
{/* 
                  <div className="form-row">
                     <div className="col">
                        <label>Authorised Person Name</label>
                        <input type="text" name="person" className="form-control" placeholder="Enter" />
                      </div>
                      <div className="col">
                        <label>Authorised Person PAN Card</label>
                        <div className="inputfile-box">
                        <input type="hidden" name="pan_cards" value="pan_card" className="form-control" placeholder="Enter" />
                           <input type="file" name="pan_card" id="file3" className="inputfile" onChange={handlePancard} required/>
                           <label for="file3" className="file-label">
                             <span id="file-name3" className="file-name"></span>
                             <span className="file-button">
                               <img src={imgService.fileupload} alt="icon" />
                               Upload
                             </span>
                           </label>
                         </div>
                      </div>
                  </div> */}
                  <div className="form-row">
                     <label className="chk_box"><input type="checkbox" checked="checked" /> <span className="checkmark"></span> You are accepting the <a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a></label> 
                     
                  </div>
                  
                  <div class="form-row last">
                     <button class="form-btn half-width" >Complete Your KYC</button>
                  </div>
                </form>
               </div>
            </div>
         
            </div>
            </section>
      
          }
          </>
     
  )
}
