import React, { useState, useEffect } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap/dist/js/bootstrap.bundle.min"
import  "../../assets/css/support.css"
import axios from 'axios'
import Header from '../CommonComponents/Header'
import Footer from '../CommonComponents/Footer'
import imgSource from '../../helper/dataManipulation/globalHome'



export default function ContactUs() {
    const [listform, setlistform] = useState({ display: 'none' })
    const [listopen, setlistOpen] = useState()
    const [listservice, setlistService] = useState([])
    const [listcontact, setlistContact] = useState([])
    const [listid, setlistId] = useState()
    const [listname, setlistName] = useState()
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        msg:'',
      });

    // getlocation API
    useEffect(() => {
        axios
          .get(process.env.REACT_APP_GETCONTATCSERVICES_URL)
          .then((res) => setlistService(res.data.data))
          .catch((err) => console.log(err));
      }, []);

     // console.log(listservice)


    function getForm(id, name){
        setlistId(id)
        setlistName(name)
        setlistform({ display: 'block' })
        setlistOpen('show');

    }

    function closeForm(){
        setlistform({ display: 'none' })
        setlistOpen('hide');

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const payload = {
                ref_contact_service:  document.getElementById("services_id").value, 
                contact_service_name: document.getElementById("services_name").value, 
                full_name: formData.name, 
                mobile_number: formData.mobile, 
                email_id: formData.email, 
                subject: formData.subject, 
                message: formData.msg, 
              }
              const test = JSON.stringify(payload);
              const obj = JSON.parse(test);
              const config = { headers: { "Content-Type": "application/json" } };
             
                axios
                .post(process.env.REACT_APP_GETCONTATC_URL, obj, config)
                .then((res) => setlistContact(res.data.data))
                .catch((err) => console.log(err));
                const timeout = setTimeout(() => setlistContact([]), 3000);
                return () => {
                clearTimeout(timeout);
                };
           
           // console.log('Form submitted successfully!');
        } else {
            console.log('Form submission failed due to validation errors.');
        }
    };

  
    
    const validateForm = (data) => {
        const errors = {};
        if (!data.name.trim()) {
            errors.name = 'Name is required';
        } else if (data.name.length < 4) {
            errors.name = 'Name must be at least 4 characters long';
        }

        if (!data.subject.trim()) {
            errors.subject = 'Subject is required';
        } else if (data.subject.length < 4) {
            errors.subject = 'Subject must be at least 4 characters long';
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.mobile) {
            errors.mobile = 'Mobile is required';
        } else if (data.mobile.length < 10) {
            errors.mobile = 'Mobile must be at least 10 characters long';
        }

    
        return errors;
    };
   // console.log(listcontact.length+'#####')
    
  return (
   <>
    <section className="main">
   <Header />
{ listcontact.length !== 0 ?
<div className="alert alert-success add-fav-alert" id="success-alert">
<i className="bi bi-check-circle-fill"></i> {listcontact.message}
</div> : '' }
   <section className="support-hero">
   <div className="container">
      <div className="row">
         <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12">
           <h1>Contact Our Support Teams</h1>
           <p>Questions & feedback — we’re here to assist with all your shipment needs.</p>
         </div>
      </div>
   </div>
   </section>

   <section className="quick-support">
      <div className="container">
         <div className="row">
         {
            listservice.map((val,index)=> { 
                var id = val._id;
                var name = val.name;
                return (
                    <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4" key={index}>
                    <h4>{val.name}</h4>
                    <p>{val.description}</p>
                    <button data-bs-toggle="modal" data-bs-target="#contact-modal" onClick={() => getForm(id,name)}>{val.text}</button>
                 </div>
                )
            })
        }
           
         </div>
      </div>
   </section>
   <div className={`modal fade ${listopen}`} id="contact-modal"  aria-labelledby="contact-modalLabel" aria-modal="true" style={listform}  role="dialog">
   <div className="modal-dialog modal-dialog-centered">
     <div className="modal-content">
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeForm()}><img src={imgSource.closecircle} alt="icon" /></button>
       <div className="modal-body">
         <div className="left-box">
            <img src={imgSource.contactbgform} alt="image" />
         </div>
         <div className="right-box">
            <form onSubmit={handleSubmit}>
            <h5>Contact US</h5>
            <span>We’re always happy to hear from you! Feel free to reach out anytime.</span>
            <div className="form-row">
               <input type="hidden" value={listid} id="services_id" className="form-control" placeholder="Service ID" />
               <input type="hidden" value={listname} id="services_name"  className="form-control" placeholder="Service Name" />
               <input type="text" className="form-control" name='name' value={formData.name} onChange={handleChange} placeholder="Full Name" />
               {errors.name && (
                        <span className="error-message">
                            {errors.name}
                        </span>
                    )}
            </div>
            <div className="form-row">
               <input type="text" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" />
               {errors.mobile && (
                        <span className="error-message">
                            {errors.mobile}
                        </span>
                    )}
            </div>
            <div className="form-row">
               <input type="email" className="form-control" name='email' value={formData.email} onChange={handleChange} placeholder="Email ID" />
               {errors.email && (
                        <span className="error-message">
                            {errors.email}
                        </span>
                    )}
            </div>
            <div className="form-row">
               <input type="text" className="form-control"  name='subject' onChange={handleChange} value={formData.subject} placeholder="Subject" />
               {errors.subject && (
                        <span className="error-message">
                            {errors.subject}
                        </span>
                    )}
            </div>
            <div className="form-row">
               <textarea placeholder="Message" name='msg' onChange={handleChange} value={formData.msg}></textarea>
            </div>
            <div className="form-row">
               <button type="submit">CONTINUE</button>
               <p className="bottom-line"><img src={imgSource.safeicon} alt="icon" /> Your information is completely safe with us</p>
            </div>
            </form>
         </div>
            
         </div>
       </div>
    
     </div>
   </div>
   <Footer />
   </section>
   </>
  )
}
