import React, {useState, useEffect} from 'react'
import imgService from '../../helper/dataManipulation/globalUtlities'
import { useNavigate } from 'react-router-dom'
import userService from '../../services/user_service'
import {promoCode, closepromoCode} from "../../helper/dataManipulation/shipkart_hepler.js"

export default function RightBox({data, curUSD, curEUR, curGBP}) {
   const navigate = useNavigate();
   const charges = JSON.parse(localStorage.getItem('additonalService'));
   const charges1 = JSON.parse(localStorage.getItem('additonalService1'));
   const charges2 = JSON.parse(localStorage.getItem('additonalService2'));
   const charges3 = JSON.parse(localStorage.getItem('additonalService3'));
   const [bookingData, setbookingData] = useState([]);
   const [couponData, setcouponData] = useState([]);
   const [blcharges, setBlcharges] = useState([]);
   if(data.currency1 == 'USD'){ var cr1 = Math.round(data.basicchange1*curUSD); }else if(data.currency1 == 'EUR'){ var cr1 = Math.round(data.basicchange1*curEUR); }else if(data.currency1 == 'GBP'){ var cr1 = Math.round(data.basicchange1*curGBP); } else{ var cr1 = Math.round(data.basicchange1);}
   if(data.currency2 == 'USD'){ var cr2 = Math.round(data.basicchange2*curUSD); }else if(data.currency2 == 'EUR'){ var cr2 = Math.round(data.basicchange2*curEUR); }else if(data.currency2 == 'GBP'){ var cr2 = Math.round(data.basicchange2*curGBP); }else{ var cr2 = Math.round(data.basicchange2);}
   if(data.currency3 == 'USD'){ var cr3 = Math.round(data.basicchange3*curUSD); }else if(data.currency3 == 'EUR'){ var cr3 = Math.round(data.basicchange3*curEUR); }else if(data.currency3 == 'GBP'){ var cr3 = Math.round(data.basicchange3*curGBP); }else{ var cr3 = Math.round(data.basicchange3);}
   if(data.currency4 == 'USD'){ var cr4 = Math.round(data.basicchange4*curUSD); }else if(data.currency4 == 'EUR'){ var cr4 = Math.round(data.basicchange4*curEUR); }else if(data.currency4 == 'GBP'){ var cr4 = Math.round(data.basicchange4*curGBP); }else{ var cr4 = Math.round(data.basicchange4);}
   if(data.currency5 == 'USD'){ var cr5 = Math.round(data.basicchange5*curUSD); }else if(data.currency5 == 'EUR'){ var cr5 = Math.round(data.basicchange5*curEUR); }else if(data.currency5 == 'GBP'){ var cr5 = Math.round(data.basicchange5*curGBP); }else{ var cr5 = Math.round(data.basicchange5);}
   if(data.currency6 == 'USD'){ var cr6 = Math.round(data.basicchange6*curUSD); }else if(data.currency6 == 'EUR'){ var cr6 = Math.round(data.basicchange6*curEUR); }else if(data.currency6 == 'GBP'){ var cr6 = Math.round(data.basicchange6*curGBP); }else{ var cr6 = Math.round(data.basicchange6);}
   if(data.currency7 == 'USD'){ var cr7 = Math.round(data.basicchange7*curUSD); }else if(data.currency7 == 'EUR'){ var cr7 = Math.round(data.basicchange7*curEUR); }else if(data.currency7 == 'GBP'){ var cr7 = Math.round(data.basicchange7*curGBP); }else{ var cr7 = Math.round(data.basicchange7);}
   
   var localCharges = 0;
   if(data.basicchange1){ localCharges += cr1; }if(data.basicchange2){ localCharges += cr2; }if(data.basicchange3){ localCharges += cr3; }if(data.basicchange4){ localCharges += cr4; }if(data.basicchange5){ localCharges += cr5; }if(data.basicchange6){ localCharges += cr6; }if(data.basicchange7){ localCharges += cr7; }

   const getCoupon = async (event) => {
     event.preventDefault();
     var couponCode =  document.getElementById('coupon_code').value;
     const result  =  await userService.applyCoupon(process.env.REACT_APP_GET_COUPON_DETAILS, couponCode)
     setcouponData(result);
   }



    useEffect(() => {   
      const getBlcharges = async (event) => {  
        const result  =  await userService.getBlcharges(process.env.REACT_APP_GET_ADDITIONAL_FEELIST, data.souceCountryCode,'fixed')
        setBlcharges(result.data);
      }
      getBlcharges()
     }, []);


    var totalAmount = 0;
    var curent_curency = 'INR '+ localCharges;
    var base_amount = 'INR '+Math.round(curUSD*data.basicAmount);
    var x= Math.round(localCharges);
    var y= Math.round(curUSD*data.basicAmount);
    var blcharge = 'INR '+ Math.round(curUSD*blcharges[0] ?.default_amount);
    var Convenfee = 'INR '+ Math.round(curUSD*blcharges[1] ?.default_amount);
    totalAmount += x;
    totalAmount += y;
    totalAmount += Math.round(curUSD*blcharges[0] ?.default_amount);
    totalAmount += Math.round(curUSD*blcharges[1] ?.default_amount);
    if(charges != null){
      totalAmount += charges[0].payment_strcture[0].price;
    }
    if(charges1 != null){
      totalAmount += charges1[0].payment_strcture[0].price;
    }
    if(charges2 != null){
      totalAmount += charges2[0].payment_strcture[0].price;
    }
    if(charges3 != null){
      totalAmount += Math.round(charges3.price);
    }
    if(couponData ?.length !== 0 && couponData ?.code !== 500){
     totalAmount -= couponData ?.data.coupon_amount;
     var couponAmount = couponData ?.data.coupon_amount;
     var couponCode = couponData ?.data.coupon_code;
     var couponId = couponData ?.data._id;
    }else{
      var couponAmount = 0;
      var couponCode = '';
      var couponId = '';
    }
    var grandTotal = 'INR '+totalAmount;
    var items = [{'base_currency': 'USD', 'conver_currency': 'INR', 'rate': curUSD}];
    if(curEUR != null)
      items.push({'base_currency': 'EUR', 'conver_currency': 'INR', 'rate': curEUR});
    if(curGBP != null)
      items.push({'base_currency': 'GBP', 'conver_currency': 'INR', 'rate': curGBP});
     
    var lcharges = [{'localchargesname1' : data.basicname1, 'localcharges1' : cr1}];
    if(data ?.basicname2)
      lcharges.push({'localchargesname2' : data.basicname2, 'localcharges2' : cr2});
    if(data ?.basicname3)
      lcharges.push({'localchargesname3' : data.basicname3, 'localcharges3' : cr3});
    if(data ?.basicname4)
      lcharges.push({'localchargesname4' : data.basicname4, 'localcharges4' : cr4});
    if(data ?.basicname5)
      lcharges.push({'localchargesname5' : data.basicname5, 'localcharges5' : cr5});
    if(data ?.basicname6)
      lcharges.push({'localchargesname6' : data.basicname6, 'localcharges6' : cr6});
    if(data ?.basicname7)
      lcharges.push({'localchargesname7' : data.basicname7, 'localcharges7' : cr7});
  
    const confirmBooking = async () => {
    const obj = {
        'provider' : 'CGM',
        'source' : data.legPlace,
        'destination' : data.legPlaceto,
        'icd' :  document.getElementById('icd_id').value,
        'booking_service_details': '',
        'address':'xyz',
        'description':'xyz',
        'local_charges':lcharges,
        'ocean_basic_freight': y,
        'forex_rate':  items,
        'additional_services_charge': '',
        'convenience_fees': Math.round(curUSD*blcharges[1] ?.default_amount),
        'bl_charges': Math.round(curUSD*blcharges[0] ?.default_amount),
        'amount': totalAmount,
        'quantity': data.quantity.replace('Container',''),
        'departure_date': data.departure_date,
        'arrival_date': data.arrival_date,
        'origin_detention': data.origin_detention,
        'origin_demurrage': data.origin_demurrage,
        'destination_detention': data.destination_detention,
        'destination_demmurage' : data.destination_demmurage,
        'transit_time': data.transit_time,
        'travelmode': data.travelmode
        }
        const result  =  await userService.confirmBooking(process.env.REACT_APP_CONFIRM_BOOKING, obj)
        if(result.code == 200){
          const objArray = {
            'base_amount' : base_amount,
            'curent_curency' : curent_curency,
            'blcharge' : Math.round(curUSD*blcharges[0] ?.default_amount),
            'Convenfee' : Math.round(curUSD*blcharges[1] ?.default_amount),
            'grandTotal' : grandTotal,
            'refrelbooking_Id' : result.data._id,
            'discount_amount' : couponAmount,
            'coupon_code' : couponCode,
            'coupon_id' : couponId,
            'blcharges' : blcharges[0] ?.default_amount,
            'Convenfees' : blcharges[1] ?.default_amount,
            'quantity': data.quantity.replace('Container',''),
            'size': data.size,
            'type' : data.type
          }
          localStorage.setItem('confirmBookingAmount', JSON.stringify(objArray));
          setbookingData(result.data);
          navigate('/payment-details',{replace:true});
      }
   }
   //console.log(bookingData)
 

  return (
    <>
    { couponData ?.length !== 0 ?
      <div className="alert alert-success add-fav-alert" id="success-alert">
      <i className="bi bi-check-circle-fill"></i> {couponData.message}
      </div> : '' }
    <div className="booking-box">
    <table className="total-cost">
       <tr>
        <td>FCL Freight <small>({data.size} {data.type}) x{data.quantity.replace('Container','')}</small></td>
        <td>{base_amount}</td>
       </tr>
       <tr>
        <td className="gap"></td>
       </tr>
       <tr>
        <td>Origin Local charges<small>({data.size} {data.type}) x{data.quantity.replace('Container','')}</small></td>
        <td>{curent_curency}</td>
       </tr>
       <tr>
        <td className="gap"></td>
       </tr>
        {charges ?
        <tr>
        <td>{charges[0].title}<small>(Additional Service Charges)</small></td>
        <td>INR {charges[0].payment_strcture[0].price}</td>
        </tr> : <tr>
        <td>If any<small>(Additional Service Charges)</small></td>
        <td>INR ---</td>
        </tr> }
       <tr>
        <td className="gap"></td>
       </tr>
       {charges1 ?
        <tr>
        <td>{charges1[0].title}<small>(Additional Service Charges)</small></td>
        <td>INR {charges1[0].payment_strcture[0].price}</td>
        </tr> :  <tr>
        <td>If any<small>(Additional Service Charges)</small></td>
         <td>INR ---</td>
      </tr> }
       <tr><td className="gap"></td></tr>
       {charges2 ?
        <tr>
        <td>{charges2[0].title}<small>(Additional Service Charges)</small></td>
        <td>INR {charges2[0].payment_strcture[0].price}</td>
        </tr> : <tr>
        <td>If any<small>(Additional Service Charges)</small></td>
         <td>INR ---</td>
      </tr> }
       <tr><td className="gap"></td></tr>
       {charges3 ?
        <tr>
        <td>{charges3.title}<small>(Additional Service Charges)</small></td>
        <td>INR {Math.round(charges3.price)}</td>
        </tr> : <tr>
        <td>If any<small>(Additional Service Charges)</small></td>
         <td>INR ---</td>
      </tr> }
       
       <tr><td className="gap"></td></tr>
       <tr>
        <td>{blcharges[0] ?.title}<small>(USD {blcharges[0] ?.default_amount}) x{data.quantity.replace('Container','')} </small></td>
        <td>{blcharge}</td>
       </tr>
       <tr>
        <td className="gap"></td>
       </tr>
       <tr>
        <td>{blcharges[1] ?.title}<small>(USD {blcharges[1] ?.default_amount})</small></td>
        <td>{Convenfee}</td>
       </tr>
       <tr>
        <td className="gap"></td>
       </tr>
       <tr>
        <td>Coupon Discount</td>
        <td>INR {couponData ?.data ?.coupon_amount}</td>
       </tr>
       <tr>
        <td className="gap"></td>
       </tr>
       <tr>
        <td><strong>Total Landed Cost</strong></td>
        <td><strong> {grandTotal}</strong></td>
       </tr>
       <tr>
        <td className="gap"></td>
       </tr>
       <tr>
        <td><a href="#" className="promo" id="promo" onClick={ (event)=> promoCode(event)}>Have a coupon code?</a></td>
        <td></td>
       </tr>
      <tr>
      <td className="gap"></td>
      </tr>
      <tr>
      <td colspan="2">
        <div className="promo-row" id="promorow" style={{display:'none'}}>
           <div className="inner">
            <input type="text" id="coupon_code" placeholder="Enter a coupon code" />
            <button onClick={(event) => getCoupon(event)}>Apply</button>
            <img src={imgService.close} alt="close" className="close"  onClick={ (event)=> closepromoCode(event)}/>
           </div>
        </div>
     </td>
      </tr>
    </table>
    <div className="cancellation-box">
            <h4>Cancellation Charges</h4>
            <span>Non Refundable</span>
            <p>Penalty may be charged by the Shipment Cargo based on how close to departure date you cancel. View fare rules to know more.</p>
            <a href="#" className="policy-view">View POLICY</a> 
    </div>
    <button className="full-btn" onClick={() => confirmBooking()}>CONFIRM BOOKING</button>
  </div>
  </>
  )
}
