import React, { useState } from 'react'
import imgService from '../../helper/dataManipulation/globalUtlities'
import userService from '../../services/user_service'
import {handleSourceData, handleDesData} from "../../helper/dataManipulation/shipkart_hepler.js"
export default function ShipmentDetails({data}) {
   const [icdData, seticdData] = useState([]);
   const [icddesData, seticddesData] = useState([]);
   const selectICDSource = async (event) => {
      var des = document.getElementById('destinationeicdopen');
      des.classList.remove('open');
      var elm = document.getElementById('sourceIcdopen');
       elm.classList.add('open');
       const result  =  await userService.getICD(process.env.REACT_APP_ICD_LIST, data.souceCountryCode)
       seticdData(result.data);
     }
    const selectICDDestination = async (event) => {
      var des = document.getElementById('sourceIcdopen');
      des.classList.remove('open');
      var elm = document.getElementById('destinationeicdopen');
       elm.classList.add('open');
       const result  =  await userService.getICD(process.env.REACT_APP_ICD_LIST, data.destinationCountyCode)
       seticddesData(result.data);
     } 
     
     

  return (
    <div className="card-rows shadow c-booking">
    <h5>Shipment Details <small>(Select Start Point & End Point)</small></h5>
    <div className="select-rows">
       <div className="select-box">
        <img src={imgService.sourceicon} alt="icon" className="source-icon" />
          <div className="info edits" id="sourceIcdopen">
             <label onClick={() => selectICDSource()} id="icdsource">Select Origin ICD</label>
             <input type="text" placeholder="Enter Port Name/Code" id="icd_id"  style={{ display : 'none'}} />
                <ul className="option-list">
                  {icdData ?.map((val,index) => { 
                     return (
                     <li onClick={() => handleSourceData(val)}>
                       <p>{val.title} <small> {val.description}</small></p>
                      </li>
                      )})}
                   </ul>
          </div>
       </div>
       <div className="select-box">
        <img src={imgService.sourceicon} alt="icon" className="source-icon" />
          <div className="info edits" id="destinationeicdopen">
             <label  onClick={() => selectICDDestination()} id="icddest">Select Destination ICD <small>(If needed)</small></label>
             <input type="hidden" placeholder="Enter Port Name/Code" id="icddes_lat"  />
             <input type="hidden" placeholder="Enter Port Name/Code" id="icddes_long" />
             <input type="text" placeholder="Enter Port Name/Code" id="icddes_id" style={{ display : 'none'}} />
                <ul className="option-list">
                {icddesData ?.map((val,index) => { 
                     return (
                     <li onClick={() => handleDesData(val)}>
                       <p>{val.title} <small> {val.description}</small></p>
                      </li>
                      )})}
                   </ul>
          </div>
       </div>
    </div>
 </div> 
 
  )
}
