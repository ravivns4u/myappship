import React, {useState} from 'react'
import imgService from '../../helper/dataManipulation/globalUtlities'
import {originLocalCharges} from "../../helper/dataManipulation/shipkart_hepler.js"

export default function OrignalLocalCharges({data, curUSD, curEUR, curGBP}) {
   if(data.currency1 == 'USD'){ var cr1 = Math.round(data.basicchange1*curUSD); }else if(data.currency1 == 'EUR'){ var cr1 = Math.round(data.basicchange1*curEUR); }else if(data.currency1 == 'GBP'){ var cr1 = Math.round(data.basicchange1*curGBP); } else{ var cr1 = Math.round(data.basicchange1);}
   if(data.currency2 == 'USD'){ var cr2 = Math.round(data.basicchange2*curUSD); }else if(data.currency2 == 'EUR'){ var cr2 = Math.round(data.basicchange2*curEUR); }else if(data.currency2 == 'GBP'){ var cr2 = Math.round(data.basicchange2*curGBP); }else{ var cr2 = Math.round(data.basicchange2);}
   if(data.currency3 == 'USD'){ var cr3 = Math.round(data.basicchange3*curUSD); }else if(data.currency3 == 'EUR'){ var cr3 = Math.round(data.basicchange3*curEUR); }else if(data.currency3 == 'GBP'){ var cr3 = Math.round(data.basicchange3*curGBP); }else{ var cr3 = Math.round(data.basicchange3);}
   if(data.currency4 == 'USD'){ var cr4 = Math.round(data.basicchange4*curUSD); }else if(data.currency4 == 'EUR'){ var cr4 = Math.round(data.basicchange4*curEUR); }else if(data.currency4 == 'GBP'){ var cr4 = Math.round(data.basicchange4*curGBP); }else{ var cr4 = Math.round(data.basicchange4);}
   if(data.currency5 == 'USD'){ var cr5 = Math.round(data.basicchange5*curUSD); }else if(data.currency5 == 'EUR'){ var cr5 = Math.round(data.basicchange5*curEUR); }else if(data.currency5 == 'GBP'){ var cr5 = Math.round(data.basicchange5*curGBP); }else{ var cr5 = Math.round(data.basicchange5);}
   if(data.currency6 == 'USD'){ var cr6 = Math.round(data.basicchange6*curUSD); }else if(data.currency6 == 'EUR'){ var cr6 = Math.round(data.basicchange6*curEUR); }else if(data.currency6 == 'GBP'){ var cr6 = Math.round(data.basicchange6*curGBP); }else{ var cr6 = Math.round(data.basicchange6);}
   if(data.currency7 == 'USD'){ var cr7 = Math.round(data.basicchange7*curUSD); }else if(data.currency7 == 'EUR'){ var cr7 = Math.round(data.basicchange7*curEUR); }else if(data.currency7 == 'GBP'){ var cr7 = Math.round(data.basicchange7*curGBP); }else{ var cr7 = Math.round(data.basicchange7);}
   
  return (
    <div className="side-bar">                 
    <div className="inner">
       <div className="service-link">
          <a href="#" onClick={(event) => originLocalCharges(event, 'servicebox', 'sidebar', 'basiccharge')} id="sidebar" className="sidebar-service">Origin Local charges 
            <img src={imgService.circletick} alt="icon" className="green-icon" /> 
            <span className="icons">
              <img src={imgService.blackarrow} alt="" />
              </span>
          </a>  
          <div className="service-box" id="servicebox" style={{ display: 'block'}}>
           <table className='tables'>
             <tr>
                <td>{data.basicname1}</td>
                <td>{data.quantity.replace('Container','')} x {data.currency1} {data.basicchange1} / per bl</td>
                <td><b>INR {cr1}</b></td>
             </tr>
             <tr>
                <td>{data.basicname2}</td>
                <td>{data.quantity.replace('Container','')} x {data.currency2} {data.basicchange2} / per container</td>
                <td><b>INR {cr2}</b></td>
             </tr>
             {data.basicname3 ?
             <tr>
                <td>{data.basicname3}</td>
                <td>{data.quantity.replace('Container','')} x {data.currency3} {data.basicchange3} / per bl</td>
                <td><b>INR {cr3}</b></td>
             </tr>
             : ''}
             {data.basicname4 ?
             <tr>
                <td>{data.basicname4}</td>
                <td>{data.quantity.replace('Container','')} x {data.currency4} {data.basicchange4} / per container</td>
                <td><b>INR {cr4}</b></td>
             </tr>
             : ''}
             {data.basicname5 ?
             <tr>
                <td>{data.basicname5}</td>
                <td>{data.quantity.replace('Container','')} x {data.currency5} {data.basicchange5} / per container</td>
                <td><b>INR {cr5}</b></td>
             </tr>
             : ''}
             {data.basicname6 ?
             <tr>
                <td>{data.basicname6}</td>
                <td>{data.quantity.replace('Container','')} x {data.currency6} {data.basicchange6} / per container</td>
                <td><b>INR {cr6}</b></td>
             </tr>
              : ''}
             {data.basicname7 ?
             <tr>
                <td>{data.basicname7}</td>
                <td>{data.quantity.replace('Container','')} x {data.currency7} {data.basicchange7} / per container</td>
                <td><b>INR {cr7}</b></td>
             </tr>
              : ''}
              

           </table>
          </div>
       </div>
       <div className="service-link">
          <a href="#" className="sidebar-service" onClick={(event) => originLocalCharges(event, 'basiccharge', 'basicsidebar', 'servicebox')} id="basicsidebar">FCL Freight
            <img src={imgService.circletick} alt="icon" className="green-icon" />
            <span className="icons">
            <img src={imgService.blackarrow} alt="" />
            </span>
          </a>  
          <div className="service-box" id="basiccharge" style={{ display: 'none'}}>
             <table>
                <tr>
                   <td>Basic Freight (BAS)</td>
                   <td>1 x {data.currency1} {data.basicAmount} / per container</td>
                   <td><b>{data.currency1} {data.basicAmount}</b></td>
                </tr>
              </table>
          </div>
       </div>

    </div>
 </div>

  )
}
