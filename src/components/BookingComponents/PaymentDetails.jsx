import React, {useState} from 'react'
import UserHeader from '../CommonComponents/UserHeader'
import '../../assets/css_new/style.css'
import imgService from '../../helper/dataManipulation/globalUtlities'
import userService from '../../services/user_service'
import {useUserData} from '../../helper/custom_hooks/user_hooks'
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useNavigate } from 'react-router-dom'
import {prePaid, collectPaid} from "../../helper/dataManipulation/shipkart_hepler.js"

export default function PaymentDetails() {
   const navigate = useNavigate();
   const charges = JSON.parse(localStorage.getItem('additonalService'));
   const charges1 = JSON.parse(localStorage.getItem('additonalService1'));
   const charges2 = JSON.parse(localStorage.getItem('additonalService2'));
   const charges3 = JSON.parse(localStorage.getItem('additonalService3'));
   const { error, isLoading, Razorpay } = useRazorpay();
   const [invoiceData, setinvoiceData] = useState([]);
   const user_token = localStorage.getItem('accessToken');
   const user_obj = JSON.parse(localStorage.getItem('user'));
   const user_confirmbooking = JSON.parse(localStorage.getItem('confirmBookingAmount'));
   var amounts = user_confirmbooking.grandTotal.replace('INR ','');
   var baseamounts = user_confirmbooking.base_amount.replace('INR ','');
   var localamounts = user_confirmbooking.curent_curency.replace('INR ','');
   var bscharge = baseamounts*5/100;
   var lccharge = localamounts*18/100;
   var totalGstcharges = bscharge + lccharge;
   var gdAmount = 0;
       gdAmount += Math.round(amounts);
       gdAmount += Math.round(totalGstcharges);
       if(charges !== null){
         gdAmount +=  charges[0].payment_strcture[0].price*18/100;
         var porthog = charges[0].payment_strcture[0].price*18/100;
       }if(charges1 !== null){
         gdAmount +=  charges1[0].payment_strcture[0].price*18/100;
         var custome = charges1[0].payment_strcture[0].price*18/100;
       }if(charges2 !== null){
         gdAmount +=  charges2[0].payment_strcture[0].price*18/100;
         var cfs = charges1[0].payment_strcture[0].price*18/100;
       }if(charges3 !== null){
         gdAmount +=  charges3[0].payment_strcture[0].price*18/100;
         var tran =  charges3[0].payment_strcture[0].price*18/100;
       } 
       if(user_confirmbooking.blcharge != null){
         gdAmount += user_confirmbooking.blcharge*18/100;
         var blc =   user_confirmbooking.blcharge*18/100;
       }if(user_confirmbooking.Convenfee != null){
         gdAmount += user_confirmbooking.Convenfee*18/100;
         var cns = user_confirmbooking.Convenfee*18/100;
       }
   var totalGdAmount =  Math.round(gdAmount);
   const { data, loading, errors } = useUserData(process.env.REACT_APP_NEW_GETUSERDATA,user_token,user_obj._id);
  
   
   const readyToCollect = async () => {
      if(user_confirmbooking.coupon_id != ''){
            var obj = {
               'ref_booking' : user_confirmbooking.refrelbooking_Id,
               'ref_coupon' : user_confirmbooking.coupon_id,
               'comment' : 'generate invoice for postpaid booking'
               }
      }else{
            var obj = {
               'ref_booking' : user_confirmbooking.refrelbooking_Id,
               'comment' : 'generate invoice for postpaid booking'
            }
      }
      const result  =  await userService.confirmBooking(process.env.REACT_APP_GENERATE_INVOICE, obj)
      setinvoiceData(result)
      if(result.code == 200){
         var obj = null;
         localStorage.setItem('additonalService', obj);
         localStorage.setItem('additonalService1', obj);
         localStorage.setItem('additonalService2', obj);
         localStorage.setItem('additonalService3', obj);
         navigate('/payment-transaction?responce=3&payment_id='+result.data.invoice_id+'&booking_id='+result.data.ref_booking+'&status='+result.data.invoice_status,{replace:true});
      }
   }

   const readyToPay = async () => {
        const obj = {
           'ref_booking' : user_confirmbooking.refrelbooking_Id,
           'currency' : 'INR',
           'amount' : totalGdAmount*100,
           'comment' : 'for payment',
        }
        const result  =  await userService.confirmBooking(process.env.REACT_APP_PAYMENT_ORDER, obj)
      
        if(result.code == 200){
        // alert(result.code)
         const options: RazorpayOrderOptions = {
            key: "rzp_test_5ehvDdC5CkBeKI",
            amount: result.data.amount, // Amount in paise
            currency: "INR",
            name: data.company_name,
            description: "Transaction to Pay",
            order_id: result.data.id, // Generate order_id on server
            handler: async (response) => {
                const objres = {'ref_booking' : user_confirmbooking.refrelbooking_Id,
                   'ref_payment_order' : result.data.receipt,
                   'order_id' : response.razorpay_order_id,
                   'payment_id' : response.razorpay_payment_id,
                   'payment_signature': response.razorpay_signature,
                   'payment_term': 'prepaid',
                   'currency': 'INR',
                   'amount': totalGdAmount,
                   'comment' : 'for Payment',
                   'payment_status' : 'success'
              }
              var obj = null;
              localStorage.setItem('additonalService', obj);
              localStorage.setItem('additonalService1', obj);
              localStorage.setItem('additonalService2', obj);
              localStorage.setItem('additonalService3', obj);
              const dataresult  =  await userService.confirmBooking(process.env.REACT_APP_PAYMENT_PROCESS, objres)
               navigate('/payment-transaction?responce=1&payment_id='+response.razorpay_payment_id+'&transection_id='+user_confirmbooking.refrelbooking_Id+'&amount='+totalGdAmount,{replace:true});
            },
            prefill: {
              name: data.ref_user.name,
              email: data.ref_user.email,
              contact: data.ref_user.phone_number,
            },
            theme: {
              color: "#F37254",
            },
          };
      
          const razorpayInstance = new Razorpay(options);
          razorpayInstance.on('payment.failed', function (response){
            var obj = null;
            localStorage.setItem('additonalService', obj);
            localStorage.setItem('additonalService1', obj);
            localStorage.setItem('additonalService2', obj);
            localStorage.setItem('additonalService3', obj);
            navigate('/payment-transaction?responce=2&payment_id='+response.error.metadata.payment_id+'&transection_id='+response.error.metadata.order_id+'&amount='+amounts,{replace:true});
            razorpayInstance.close();
          });
          razorpayInstance.open();
         
        }
        
   }
  return (
    <>
     { invoiceData ?.length !== 0 ?
      <div className="alert alert-success add-fav-alert" id="success-alert">
      <i className="bi bi-check-circle-fill"></i> {invoiceData.message}
      </div> : '' }
    
    {localStorage.getItem('user') == null ? 'Page Not Found!':
    <section className="main-container">
    <UserHeader />
      <section className="inner-body">
            <div className="wrapper">
               <div className="tab_container">
                  <div className="booking-container">
                     <div className="two-part-layout">
                        <div className="left-box payment-details">
                           <h4>Payment Terms</h4>
                           <div className="Payment-cards">
                              <ul>
                                 <li onClick={(event) => prePaid(event)}>
                                    <div className="card-btn">
                                       <img src={imgService.prepaid} alt="icon" /> Prepaid 
                                        <a href="#" className="arrow"><img src={imgService.cardarrow} alt="icon" /></a>
                                    </div>
                                 </li>
                                 <li onClick={(event) => collectPaid(event)}>
                                    <div className="card-btn">
                                       <img src={imgService.collect} alt="icon" /> Collect
                                       <a href="#" className="arrow"><img src={imgService.cardarrow} alt="icon" /></a>
                                    </div>
                                 </li>
                              </ul>
                           </div>
                        </div>
                        <div className="booking-box">
                           <table className="total-cost">
                              <tr>
                              <td>FCL Freight <small>({user_confirmbooking.size} {user_confirmbooking.type}) x{user_confirmbooking.quantity}</small></td>
                              <td>{user_confirmbooking.base_amount}</td>
                              </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              <tr>
                              <td>Origin Local charges<small>({user_confirmbooking.size} {user_confirmbooking.type}) x{user_confirmbooking.quantity}</small></td>
                              <td>{user_confirmbooking.curent_curency}</td>
                              </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              {charges ?
                              <tr>
                              <td>{charges[0].title}<small>(Additional Service Charges)</small></td>
                              <td>INR {charges[0].payment_strcture[0].price + porthog}</td>
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
                              <td>INR {charges1[0].payment_strcture[0].price + custome}</td>
                              </tr> :  <tr>
                              <td>If any<small>(Additional Service Charges)</small></td>
                              <td>INR ---</td>
                              </tr> }
                              <tr><td className="gap"></td></tr>
                              {charges2 ?
                              <tr>
                              <td>{charges2[0].title}<small>(Additional Service Charges)</small></td>
                              <td>INR {charges2[0].payment_strcture[0].price + cfs}</td>
                              </tr> : <tr>
                              <td>If any<small>(Additional Service Charges)</small></td>
                              <td>INR ---</td>
                              </tr> }
                              <tr><td className="gap"></td></tr>
                              {charges3 ?
                              <tr>
                              <td>{charges3.title}<small>(Additional Service Charges)</small></td>
                              <td>INR {charges3[0].payment_strcture[0].price + tran}</td>
                              </tr> : <tr>
                              <td>If any<small>(Additional Service Charges)</small></td>
                              <td>INR ---</td>
                              </tr> }

                              <tr><td className="gap"></td>
                              </tr>
                              <tr>
                              <td>BL Charges<small>(USD {user_confirmbooking.blcharges}) x1 </small></td>
                              <td>{Math.round(user_confirmbooking.blcharge + blc)}</td>
                              </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              <tr>
                              <td>Convenience Fee<small>(USD {user_confirmbooking.Convenfees})</small></td>
                              <td>{Math.round(user_confirmbooking.Convenfee + cns)}</td>
                              </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              <tr>
                              <td>Coupon Discount</td>
                              <td>INR {user_confirmbooking.discount_amount}</td>
                              </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              <tr>
                              <td>GST<small>(18% On Local Services & 5% On Ocean Freight)</small></td>
                              <td>INR {Math.round(totalGstcharges)}</td>
                             </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              <tr>
                              <td><strong>Total Landed Cost</strong></td>
                              <td><strong>INR {totalGdAmount}</strong></td>
                              </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              <tr>
                              <td className="gap"></td>
                              </tr>
                              <tr>
                              <td colspan="2">
                              <div className="promo-row">
                                 <div className="inner">
                                    <input type="text" placeholder="Enter a coupon code" />
                                    <button>Apply</button>
                                    <img src={imgService.close} alt="close" className="close" />
                                 </div>
                              </div>
                           </td>
                              </tr>
                           </table>
                          <div className="cancellation-box">
                          <h4>Cancellation Charges</h4>
                          <span>Non Refundable</span>
                        <p>Penalty may be charged by the Shipment Cargo based on how close to departure date you cancel. View fare rules to know more.</p>
                        <a href="#" className="policy-view">View POLICY
                        </a> 
                          </div>
                          <button id="prepaid" className="full-btn"  style={{ display: 'block'}} onClick={() => readyToPay()}>I'm Ready to Pay</button>
                          <button id="collect" className="full-btn" style={{ display: 'none'}} onClick={() => readyToCollect()}>I'm Ready to Collect</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
    </section>
    }
    </>
  )
}
