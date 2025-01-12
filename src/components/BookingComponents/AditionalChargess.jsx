import React, {useState} from 'react'
import imgService from '../../helper/dataManipulation/globalUtlities'
import {originLocalCharges} from "../../helper/dataManipulation/shipkart_hepler.js"
import userService from '../../services/user_service'
import { useNavigate } from 'react-router-dom'
import { event } from 'jquery'

export default function AditionalChargess({data}) {
   const navigate = useNavigate();
   const [pincodeData, setpincodeData] = useState([]);
   const [nearbypoint, setnearbypoint] = useState({display : 'none'});
   const icdPort = async (event) => {
      event.preventDefault();
      const result  =  await userService.getAdditionalService(process.env.REACT_APP_GET_ADDITIONAL_FEELIST, data.souceCountryCode,'port_houlage', data.size.replace('GP','').replace(/\s/g, ''))
      if(result.data ?.length != 0){
         localStorage.setItem('additonalService', JSON.stringify(result.data));
         navigate('/confirm-booking',{replace:true});
      }
   }

   const icdPortCancel = async (event, service) =>{
       event.preventDefault();
       var obj = null;
       localStorage.setItem(service, obj);
       navigate('/confirm-booking',{replace:true});
   }


   const orginCustom = async (event) => {
      event.preventDefault();
      const result  =  await userService.getAdditionalService(process.env.REACT_APP_GET_ADDITIONAL_FEELIST, data.souceCountryCode,'customs_clearance',  data.size.replace('GP','').replace(/\s/g, ''))
      if(result.data ?.length != 0){
         localStorage.setItem('additonalService1', JSON.stringify(result.data));
         navigate('/confirm-booking',{replace:true});
      }
   }


   const cfsClearence = async (event) => {
      event.preventDefault();
      const result  =  await userService.getAdditionalService(process.env.REACT_APP_GET_ADDITIONAL_FEELIST, data.souceCountryCode,'cfs_clearance',  data.size.replace('GP','').replace(/\s/g, ''))
      if(result.data ?.length != 0){
         localStorage.setItem('additonalService2', JSON.stringify(result.data));
         navigate('/confirm-booking',{replace:true});
      }
   }

   const transport = async (event) => {
      event.preventDefault();
      var destinationLat = document.getElementById('icddes_lat').value;
      var destinationLong = document.getElementById('icddes_long').value;
      var sourceLat = document.getElementById('source_point_lat').value;
      var sourceLong = document.getElementById('source_point_lon').value;
      //var so = document.getElementById('truck_type').value;
      
      const result  =  await userService.getDistance(process.env.REACT_APP_GET_DISTANCE, sourceLat, sourceLong, destinationLat, destinationLong)
      if(result.code == 200){
          const list  =  await userService.getTransport(process.env.REACT_APP_GET_ADDITIONAL_FEELIST, data.souceCountryCode,'transport','chota_hathi')
          if(list.data ?.length != 0){
            var obj = { 'title' : 'Transport', 'price' : result.data.distance*list ?.data[0] ?.payment_strcture[0].price}
            localStorage.setItem('additonalService3', JSON.stringify(obj));
             navigate('/confirm-booking',{replace:true});
         }
      }
    
      
   }

   const searchPincode = async (event)=> {
      var x = document.getElementById("pincode").value;
      if(x.length == 6){
         const result  =  await userService.getLatLong(process.env.REACT_APP_ADDRESS_LATLONG, x, data.souceCountryCode.toLowerCase())
         setpincodeData(result.data);
         setnearbypoint({display : 'block'})
      }

   }

   const getNearByPoint = (event) => {
      document.getElementById('source_point').value = event.formatted;
      document.getElementById('source_point_lat').value = event.lat;
      document.getElementById('source_point_lon').value = event.lon;
      setnearbypoint({display : 'none'})
   }
 

  return (
    <>
    <div className="side-bar">
    <h3>Additional Services</h3>
    <div className="inner">
       <div className="service-link">
          <a href="#" onClick={(event) => originLocalCharges(event, 'service1', 'sidebar1', 'service2')} id="sidebar1" className="sidebar-service">ICD to Port Haulage 
            <span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
            <div className="service-box" id="service1">
            <form>
               <div class="form-row">
                  <span class="tags">{data.quantity.replace('Container','')}x{data.size}, {data.weight}, {data.commodity}</span>
               </div>
               <div class="form-row start-end-point">
               <div class="form-row select-box">
               <div class="info edits">
                  <input type="text" placeholder="Start Point (ICD Name)" id="icd" />
                  <ul class="option-list">
                     <li>Name-1</li>
                     <li>Name-2</li>
                  </ul>
               </div>
            </div>
            <div class="form-row select-box">
               <div class="info edits">
                  <input type="text" placeholder="POL (Port Name/Code)" value={`${data.legPlace}`+'/'+`${data.legFrom}`} />
                  <ul class="option-list">
                     <li>Name-1</li>
                     <li>Name-2</li>
                  </ul>
               </div>
            </div>
         </div>
            <div class="form-row text-right">
               <button class="cancel" onClick={(event) => icdPortCancel(event, 'additonalService')}>Cancel</button>
               <button class="save" onClick={(event) => icdPort(event)}>Save &amp; Proceed</button>
            </div>
            </form>
          </div>
       </div>
       <div className="service-link">
          <a href="#" onClick={(event) => originLocalCharges(event, 'service2', 'sidebar2', 'service3')} id="sidebar2" className="sidebar-service">Origin Customs Clearance<span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
           <div className="service-box" id="service2">
             <form>
                <div className="form-row">
                <label>Origin Cargo Stuffing</label>
                <div className="group">
                   <ul>
                      <li className="active">Factory Stuffing</li>
                      <li>Dock Stuffing</li>
                   </ul>
                </div>
               </div>
               <div className="form-row">
                <span className="tags">{data.quantity.replace('Container','')}x{data.size} {data.type} {data.commodity}</span>
               </div>
               <div className="form-row">
                <label>HS Code</label>
               <span className="select">
                 <input type="text" placeholder="HS Code" />
               </span>
               </div>
               <div className="form-row text-right">
                <button className="cancel" onClick={(event) => icdPortCancel(event, 'additonalService1')}>Cancel</button>
                <button className="save" onClick={(event) => orginCustom(event)}>Save &amp; Proceed</button>
             </div>
          </form>
          </div>
       </div>
       <div className="service-link">
          <a href="#" onClick={(event) => originLocalCharges(event, 'service3', 'sidebar3', 'service4')} id="sidebar3" className="sidebar-service">Origin CFS Clearance<span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
          <div className="service-box" id="service3">
             <form>
               <div class="form-row">
                  <span class="tags">{data.quantity.replace('Container','')}x{data.size}, {data.weight}, {data.commodity}</span>
               </div>
                <div className="form-row">
                  <label>Have AD Code?</label>
                  <div className="group">
                   <button className="active">YES</button>
                   <button>NO</button>
                 </div>
                </div>
                <div className="form-row">
                   <label>Origin CFS Cargo Stuffing</label>
                   <div className="group">
                      <ul>
                         <li>Factory Stuffing</li>
                         <li className="active">Dock Stuffing</li>
                      </ul> 
                  </div>
                 </div>
                 <div className="form-row">
                   <label>Cargo Currency Cargo Value</label>
                   <div className="box">
                      <select>
                         <option>INR</option>
                         <option>USD</option>
                         <option>EUR</option>
                      </select>
                      <input type="text" placeholder="Type Here...." />
                   </div>
                 </div>
                 <div className="form-row text-right">
                   <button className="cancel" onClick={(event) => icdPortCancel(event, 'additonalService2')}>Cancel</button>
                   <button className="save" onClick={(event) => cfsClearence(event)}>Save &amp; Proceed</button>
                </div>
            </form>
          </div>
       </div>

       <div className="service-link">
          <a href="#" onClick={(event) => originLocalCharges(event, 'service4', 'sidebar4', 'service1')} id="sidebar4" className="sidebar-service">Origin Transportation<span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
            <div className="service-box" id="service4">
             <div className="form-row">
             <div className="group">
                <ul>
                   <li>Factory Stuffing</li>
                   <li className="active">Dock Stuffing</li>
                </ul>
             </div>
             </div>
             <form>
                <div className="form-row">
                   <span>
                   <input type="text" id="pincode" placeholder="Select Pin Code" onKeyUp={(event) => searchPincode(event)} />
                   <span>
                   <img src={imgService.search} alt="icon" />
                   </span>
                   </span>
                </div>
                <div class="form-row nearby-search-open" id="nearby-search">
                     <span>
                        <input type="text"  id="source_point" placeholder="Search Nearby Point"/>
                        <input type="hidden"  id="source_point_lat" placeholder="Search Nearby Point"/>
                        <input type="hidden"  id="source_point_lon" placeholder="Search Nearby Point"/>
                        <span>
                        <img src={imgService.search} alt="icon" />
                        </span>
                     </span>
                     <ul class="search-list-transportation" style={nearbypoint}>
                      {pincodeData ?.map((val, index) => {
                        return (
                           <li onClick={() => getNearByPoint(val)}><p>{val.formatted}</p></li>
                        )
                      } ) }
                       
                        
                     </ul>
                     </div>
                <div className="form-row">
                   <label className="textarea-label">Address</label>
                   <textarea placeholder="Enter Full Address"></textarea>
                </div>
                <div className="form-row">
                   <select id="truck_type">
                      <option>Truck Type</option>
                      <option value="chota_hathi">Chhota Hathi</option>
                   </select>
                </div>
                <div className="form-row">
                   <span>
                   <input type="text" id="truck_count" placeholder="Truck Count" />
                </span>
                </div>
                <div className="form-row text-right">
                   <button className="cancel" onClick={(event) => icdPortCancel(event, 'additonalService3')}>Cancel</button>
                   <button className="save" onClick={(event) => transport(event)}>Save & Proceed</button>
                </div>
             </form>
          </div>
       </div>
       {/* <div className="service-link">
          <a href="#" className="sidebar-service">Destination Local charges<span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
          <div className="service-box">
             Text Goes here
          </div>
       </div> */}
       {/* <div className="service-link">
          <a href="#" className="sidebar-service">Destination CFS Clearance<span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
          <div className="service-box">
             Text Goes here
          </div>
       </div>
       <div className="service-link">
          <a href="#" className="sidebar-service">Destination Customs Clearance<span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
          <div className="service-box">
             Text Goes here
          </div>
       </div>
       <div className="service-link">
          <a href="#" className="sidebar-service">Destination Transportation<span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span></a>  
          <div className="service-box">
             Text Goes here
          </div>
       </div> */}
    </div>
 </div>
        <div className="info-box">
        <div className="col">
           <ul className="green-check-list">
              <li>
                 <h5>Confirmation in 24 Hrs</h5>
                 <span>50% <img src={imgService.infoicon} alt="icon" className="info-icon" />
                  <small className="progress-line"></small></span>
              </li>
              <li>
                 <h5>B/L release in 48hrs of ETD</h5>
                 <span>Subject to Payment Received</span>
              </li>
              <li>
                 <h5>Min cancellation fee of $50 will apply</h5>
                 <span>For more details please read T&Cs</span>
              </li>
           </ul>
           <div className="border-box">
           <h5>When your order is placed:</h5>
           <ul className="arrow-list">
              <li><b>Destination:</b> 14 detention day(s) 7 demmurage day(s)</li>
              <li><b>Origin:</b> 4 detention day(s) 4 demmurage day(s)
              <small>For extra day(s) charges refer T&C</small>
              </li>
           </ul>
           </div>
        </div>
        <div className="col">
           <p className="assistance">For any assistance contact ShipmentCargo Support</p>
           <ul className="contact-list">
              <li className="mail">
                 <a href="mailto:shipcargo@shipmentcargo.com">shipcargo@shipmentcargo.com</a>
              </li>
              <li className="call">
                 <a href="call:+91 88884 58798">+91 88884 58798</a>
              </li>
              <li className="whatsapp">
                 <a href="#"> +91 88884 58798</a>
                
              </li>
           </ul>
           <div className="border-box">
           <h5>When your order is placed:</h5>
           <ul className="arrow-list">
              <li>We will send you email confirmation to your registered email ID:rajk.softdev@gmail.com</li>
              <li>You will receive call from our Key Account Manager (KAM), to confirm your booking & get more details`
              </li>
              <li>After confirmation, our team will work on procuring booking note</li>
           </ul>
           </div>
        </div>
     </div>
     </>
  )
}
