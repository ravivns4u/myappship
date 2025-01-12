import React from 'react'
import imgService from '../../helper/dataManipulation/globalUtlities'
import '../../assets/css_new/style.css'
//import '../../assets/css_new/payment-transaction.css'
import userService from '../../services/user_service'

export default function PaymentTransection() {
  const url = window.location.href;
  let paramString = url.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  var todayDate = new Date().toISOString().slice(0, 10);
  var todayTime =new Date().toLocaleTimeString();
  const user_confirmbooking = JSON.parse(localStorage.getItem('confirmBookingAmount'));
  if(queryString.get('responce') == 1 || queryString.get('responce') == 3){
    const getSuccessCoupon = async (event) => {  
      const result  =  await userService.applyCoupon(process.env.REACT_APP_APPLY_COUPON, user_confirmbooking.coupon_code)
   }
   getSuccessCoupon()
  }
  return (
    <>
    <div class="wrapper">
    {queryString.get('responce') == 1 ?
    <div class="transaction-container">
      <img src={imgService.celebrationicon} alt="icon" />
      <h5>Payment Successful</h5>
      <div class="card-row data">
      <ul>
        <li>
          <b>Date</b>
          <span>{todayDate+' '+todayTime}</span>
        </li>
  
        <li>
          <b>Transaction Id</b>
          <span>{queryString.get('transection_id')}</span>
        </li>
  
        <li>
          <b>Payment Id</b>
          <span>{queryString.get('payment_id')}</span>
        </li>
  
        <li>
          <b>Amount</b>
          <span>{queryString.get('amount')+ ' INR'}</span>
        </li>
        <li>
          <b>Status</b>
          <span>Successful</span>
        </li>
      </ul>
      </div>
     </div>
     : queryString.get('responce') == 3 ?
     <div class="transaction-container">
      <img src={imgService.celebrationicon} alt="icon" />
      <h5>Generate invoice for postpaid booking</h5>
      <div class="card-row data">
      <ul>
        <li>
          <b>Date</b>
          <span>{todayDate+' '+todayTime}</span>
        </li>
        <li>
          <b>Invoice Id</b>
          <span>{queryString.get('payment_id')}</span>
        </li>
  
        <li>
          <b>Booking Id</b>
          <span>{queryString.get('booking_id')}</span>
        </li>
        <li>
          <b>Status</b>
          <span>{queryString.get('status')}</span>
        </li>
      </ul>
      </div>
     </div> :
     <div class="transaction-container">
      <img src={imgService.failedtransaction} alt="icon" />
      <h5>Payment Failed</h5>
      <div class="card-row data">
      <ul>
        <li>
          <b>Date</b>
          <span>11-06-2024</span>
        </li>
  
        <li>
          <b>Transaction Id</b>
          <span>SAT12587</span>
        </li>
  
        <li>
          <b>Payment Id</b>
          <span>001258</span>
        </li>
  
        <li>
          <b>Amount</b>
          <span>4000 INR</span>
        </li>
  
        <li>
          <b>Status</b>
          <span>Failed</span>
        </li>
      </ul>
      </div>
     </div>
     }
    </div>
   </>
  )
}
