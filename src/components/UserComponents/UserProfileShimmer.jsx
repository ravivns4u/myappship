import React from 'react'
import '../../assets/css_new/user-shimmer.css'
import UserHeader from '../CommonComponents/UserHeader'

export default function UserProfileShimmer() {
  return (
    <>
     <section className="main-container">
     <UserHeader />
   <div class="shimmernew">
    <div class="wrappernew">
        <div class="image-card animatenew"></div>
        <div class="stroke animatenew titlenew"></div>
        <div class="stroke animatenew linknew"></div>
        <div class="stroke animatenew descriptionnew"></div>
    </div>
    </div>
    <div class="shimmer">
    <div class="wrapper">
        <div class="image-card animatenew"></div>
        <div class="stroke animatenew titlenew"></div>
        <div class="stroke animatenew linknew"></div>
        <div class="stroke animatenew descriptionnew"></div>
    </div>
    </div>
    </section>


</>
  )
}
