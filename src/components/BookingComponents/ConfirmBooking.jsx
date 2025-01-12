import React from 'react'
import UserHeader from '../CommonComponents/UserHeader'
import '../../assets/css_new/style.css'
import ReviewBooking from './ReviewBooking'


export default function ConfirmBooking() {
   const user_booking = JSON.parse(localStorage.getItem('bookingData'));
  return (
    <>
    {localStorage.getItem('user') == null ? 'Page Not Found!':
    <section className="main-container">
    <UserHeader />
    <section className="inner-body">
          <div className="wrapper">
               <div className="tab_container">
                  <div className="booking-container">
                    <ReviewBooking data={user_booking} />
                  </div>
                  </div>
             </div>
    </section>                    
    </section>
    }
    </>
  )
  
}
