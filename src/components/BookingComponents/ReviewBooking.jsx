import React, { useState, useEffect } from 'react'
import imgService from '../../helper/dataManipulation/globalUtlities'
import userService from '../../services/user_service'
import ShipmentDetails from './ShipmentDetails'
import OrignalLocalCharges from './OrignalLocalCharges'
import AditionalChargess from './AditionalChargess'
import RightBox from './RightBox'

export default function ReviewBooking({data}) {
   const user_booking = JSON.parse(localStorage.getItem('bookingData'));
   const [currencyData, setUsdCurrency] = useState([]);
   const [currencyEURData, setEURCurrency] = useState([]);
   const [currencyGBPData, setGBPCurrency] = useState([]);

   useEffect(() => {  
      const currencyExchangeUsdtoINR = async (event) => {
         const result  =  await userService.getCurrencyExchange(process.env.REACT_APP_CURENCY_EXCHANGE,'USD')
         setUsdCurrency(result.data);
      }
      if(data.currency1 == 'USD' || data.currency2 == 'USD' || data.currency3 == 'USD' || data.currency4 == 'USD' || data.currency5 == 'USD' || data.currency6 == 'USD' || data.currency7 == 'USD')
      {
         currencyExchangeUsdtoINR()
      }

      const currencyExchangeEURtoINR = async (event) => {
         const resulteur  =  await userService.getCurrencyExchange(process.env.REACT_APP_CURENCY_EXCHANGE,'EUR')
         setEURCurrency(resulteur.data);
      }
      if(data.currency1 == 'EUR' || data.currency2 == 'EUR' || data.currency3 == 'EUR' || data.currency4 == 'EUR' || data.currency5 == 'EUR' || data.currency6 == 'EUR' || data.currency7 == 'EUR')
      {
          currencyExchangeEURtoINR()
      }

      const currencyExchangeGBPtoINR = async (event) => {
         const resulteur  =  await userService.getCurrencyExchange(process.env.REACT_APP_CURENCY_EXCHANGE,'GBP')
         setGBPCurrency(resulteur.data);
      }
      if(data.currency1 == 'GBP' || data.currency2 == 'GBP' || data.currency3 == 'GBP' || data.currency4 == 'GBP' || data.currency5 == 'GBP' || data.currency6 == 'GBP' || data.currency7 == 'GBP')
         {
          currencyExchangeGBPtoINR()
         }
   }, []);




  return (
   <div className="two-part-layout">
                        <div className="left-boxs">
                           <h4>Review your booking</h4>
                           <p className="terms-condition">By placing this booking you agree to our <a href="https://www.google.com/" target="_blank">Terms & Conditions</a> & <a href="https://www.google.com/" target="_blank">Privacy Policy</a></p>
    <div className="card-rows booking-data">
    <img src={imgService.CMA} alt="" className="logo-fixs" />
       <div className="booking-rows">
          <div className="c_one">
             <h5>{data.legFrom}, {data.legcountry}</h5>
             <span>{data.legPlace}</span>
          </div>
          <div className="c_two center">
             <h5>&nbsp;</h5>
             <strong className="green-border"></strong>
             <span>&nbsp;</span>
          </div>
          <div className="c_three">
             <h5>{data.legto}, {data.legtocountry}</h5>
             <span>{data.legPlaceto}</span>
          </div>
          <div className="c_four">
          </div>
       </div>
       <div className="days">
          <ul>
             <li><span><img src={imgService.green_tick} alt="icon" /></span>{data.size}. Container ({data.type})</li>
             <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity: {data.quantity.replace('Container','')}</li>
             <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity: {data.commodity}</li>
             <li><span><img src={imgService.green_tick} alt="icon" /></span>{data.weight}</li>
          </ul>
          
       </div>
       <div className="last-row">
          <p>Currency Exchange: <a href='#'> {currencyData ?.length != 0 ? 'USD = INR '+ currencyData ?.rate+',' : '' }  {currencyEURData ?.length != 0 ? 'EUR = INR '+ currencyEURData ?.rate+',' : '' } {currencyGBPData ?.length != 0 ? 'GBP = INR '+ currencyGBPData ?.rate : '' }</a></p>
          <p>*We save you money by charging shown Exchange Rate, irrespective exhange rate increase fluctuation</p>
       </div>
   </div>
   <ShipmentDetails data={user_booking}/>
   <OrignalLocalCharges data={user_booking} curUSD={currencyData ?.rate} curEUR={currencyEURData ?.rate} curGBP={currencyGBPData ?.rate}/>
   <AditionalChargess data={user_booking} /> 
   </div>
   <RightBox data={user_booking} curUSD={currencyData ?.rate} curEUR={currencyEURData ?.rate} curGBP={currencyGBPData ?.rate}/>
   </div>
   
  )
}
