import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import imgSource from '../../helper/dataManipulation/globalHome'

export default function Footer() {
   const [sourceDest, setSourceDestlist] = useState([]);
   const [sourceDestUrl, setSourceDestUrl] = useState();


   // get Source Destination list API
      useEffect(() => {
         axios
           .get(process.env.REACT_APP_GETSOURCEDES_URL)
           .then((res) => setSourceDestlist(res.data.data))
           .catch((err) => console.log(err));
       }, []);

   // console.log(sourceDest)

  return (
    <footer>
   <section className="grey-container">
      <div className="container">
       <div className="row">
         <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
          <div className="links-row">
            <h4>Products <Link to="#">View More <img src={imgSource.viewmore} alt="icon" className="arrow-icon" /></Link></h4>
            <ul className="page-links">
               <li><Link to="#">Ocean Freight Search</Link></li>
               <li><Link to="#">Ocean FCL</Link></li>
               <li><Link to="#">Ocean LCL</Link></li>
               <li><Link to="#">Customs and Handling</Link></li>
               <li><Link to="#">Trailer & Rail Container Haulage</Link></li>
               <li><Link to="#">FTL, PTL, Rail</Link></li>
               <li><Link to="#">Freight Rates & Schedules</Link></li>
               <li><Link to="#">Tracking & Visibility</Link></li>
            </ul>
          </div>

          <div className="links-row">
            <h4>Partners <Link to="#">View More <img src={imgSource.viewmore} alt="icon" className="arrow-icon" /></Link></h4>
            <ul className="page-links">
               <li><Link to="#">Global Partner Network</Link></li>
               <li><Link to="#">Freight Forwarders</Link></li>
               <li><Link to="#">Transporters</Link></li>
               <li><Link to="#">Custom Agents</Link></li>
               <li><Link to="#">Overseas Agents</Link></li>
            </ul>
          </div>

          <div className="links-row">
            <h4>Tools <Link to="#">View More <img src={imgSource.viewmore} alt="icon" className="arrow-icon" /></Link></h4>
            <ul className="page-links">
               <li><Link to="#">Rate Discovery</Link></li>
               <li><Link to="#">Tracking</Link></li>
               <li><Link to="#">HS Code Finder</Link></li>
               <li><Link to="#">Personal Key Manager</Link></li>
            </ul>
          </div>
          <div className="links-row">
            <h4>Company <Link to="#">View More <img src={imgSource.viewmore} alt="icon" className="arrow-icon" /></Link></h4>
            <ul className="page-links">
               <li><Link to="#">Company</Link></li>
               <li><Link to="#">About Us</Link></li>
               <li><Link to="#">Work with Us</Link></li>
               <li><Link to="#">Newsroom</Link></li>
               <li><Link to="#">Login</Link></li>
               <li><Link to="#">Signup</Link></li>
               <li><Link to="#">Blogs</Link></li>
               <li><Link to="#">Terms of Use</Link></li>
               <li><Link to="#">Privacy Policy</Link></li>
            </ul>
          </div>
         </div>
       </div>
      </div>
   </section>


   <section className="blue-container">
      <div className="container">
       <div className="row">
         <h4>Contact Us</h4>
         <div className="col-md-9 col-lg-9 col-xl-9 col-xxl-9">
            <ul className="contact-links">
               <li><img src={imgSource.envelop} alt="icon" /><Link to="mailto:info@shipkrates.com">info@shipkrates.com</Link></li>
               <li><img src={imgSource.pinmap} alt="icon" /><p>A1/B, VDS, Sector 16, NOIDA, Gautam Budh Nagar, Uttar Pradesh 201301, India</p></li>
               <li><img src={imgSource.envelop} alt="icon" /><Link to="mailto:support@shipkrates.com">support@shipkrates.com</Link></li>
               <li><img src={imgSource.tel} alt="icon" /><Link to="tel:+91 97119 49529">+91 97119 49529</Link></li>
            </ul>

         </div>
         <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <h4>Follow Us On</h4>
            <ul className="social-media">
              <li><Link to="#"><img src={imgSource.twitter} alt="icon" /></Link></li>
              <li><Link to="#"><img src={imgSource.insta} alt="icon" /></Link></li>
              <li><Link to="#"><img src={imgSource.youtube} alt="icon" /></Link></li>
              <li><Link to="#"><img src={imgSource.facebook} alt="icon" /></Link></li>
              <li><Link to="#"><img src={imgSource.linkedin} alt="icon" /></Link></li>
            </ul>
         </div>
      </div>
     </div>
  </section>



  <section className="grey-container">
   <div className="container">
    <div className="row">
      <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3">
         <ul className="foot-links">  
            { sourceDest.map((des, index)=>{
               if(index <= 4 && index >= 0){
                  var searchURL = 'search-result?source='+des.source_port_code+'&placename='+des.source_port_name+'&distenation='+des.destination_port_code+'&destname='+des.destination_port_name+'&numberOfContainer=1&weightPerContainer=400&containertypedata=Standard&commoditydata=AKF&equipmentGroupIsoCode=20GP&AST0OJG1AJLVOT6KKPOOKKFZOZIQL';
               return (
                  <li><Link to={searchURL} key={index}>{des.source_port_name} to {des.destination_port_name}</Link></li>
               )
            }
            }
            ) }
         </ul>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3">
         <ul className="foot-links">
         { sourceDest.map((des, index)=>{
               if(index <= 9 && index >= 5){
                  var searchURL = 'search-result?source='+des.source_port_code+'&placename='+des.source_port_name+'&distenation='+des.destination_port_code+'&destname='+des.destination_port_name+'&numberOfContainer=1&weightPerContainer=400&containertypedata=Standard&commoditydata=AKF&equipmentGroupIsoCode=20GP&AST0OJG1AJLVOT6KKPOOKKFZOZIQL';
               return (
                  <li><Link to={searchURL} key={index}>{des.source_port_name} to {des.destination_port_name}</Link></li>
               )
              }
            }
            ) }
         </ul>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3">
         <ul className="foot-links">       
         { sourceDest.map((des, index)=>{
               if(index <= 14 && index >= 10){
                  var searchURL = 'search-result?source='+des.source_port_code+'&placename='+des.source_port_name+'&distenation='+des.destination_port_code+'&destname='+des.destination_port_name+'&numberOfContainer=1&weightPerContainer=400&containertypedata=Standard&commoditydata=AKF&equipmentGroupIsoCode=20GP&AST0OJG1AJLVOT6KKPOOKKFZOZIQL';
               return (
                  <li><Link to={searchURL} key={index}>{des.source_port_name} to {des.destination_port_name}</Link></li>
               )
            }  
            }
            ) }
         </ul>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3">
         <ul className="foot-links">
            { sourceDest.map((des, index)=>{
               if(index <= 20 && index >= 15){
                  var searchURL = 'search-result?source='+des.source_port_code+'&placename='+des.source_port_name+'&distenation='+des.destination_port_code+'&destname='+des.destination_port_name+'&numberOfContainer=1&weightPerContainer=400&containertypedata=Standard&commoditydata=AKF&equipmentGroupIsoCode=20GP&AST0OJG1AJLVOT6KKPOOKKFZOZIQL';
               return (
                  <li><Link to={searchURL} key={index}>{des.source_port_name} to {des.destination_port_name}</Link></li>
               )
               }  
            }
            ) }
         </ul>
      </div>
   </div>
   <div className="row">
      <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
         <p className="copyright">©2024 Shipkrate. All Rights Reserved</p>
      </div>
   </div>
  </div>
</section>

</footer>
  )
}
