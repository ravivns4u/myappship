import React from 'react'
import  "../../assets/css/about.css"
import Header from '../CommonComponents/Header'
import Footer from '../CommonComponents/Footer'
import imgSource from '../../helper/dataManipulation/globalHome'


export default function AboutUs() {
  return (
    <>
     <section className="main">
    <Header />
    <section className="about-banner">
   <div className="container">
      <div className="row">
      <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4">
       <figure>
         <img src={imgSource.aboutimgbanner} alt="banner images" />
       </figure>
       </div>
       <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-8">
         <div className="info-text">
         <h1><img src={imgSource.shipkart} alt="logo" /> is making</h1>
         <p>logistics operations more easy & digital.</p>
         <p>Engage with smart & innovative supply chain management.</p>
       </div>
       </div>
      </div>
   </div>
   </section>


   <section className="common-text-container bg-light-grey">
      <div className="container">
         <div className="row">
         <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <h3>Company Journey</h3>
            <p>At ShipKrate, our journey began with a vision: to revolutionize ship and offshore logistics. Established in 2023, we saw an unfulfilled need within global trade—a demand for a seamless, efficient solution that could navigate the complexities of modern logistics. From our humble beginnings, we have steadily evolved into a leading shipment and logistics solution provider, leveraging technology and problem-solving expertise to create transformative solutions for businesses of all sizes. Our growth has been marked by a commitment to innovation, resilience, and a steadfast dedication to our clients’ needs.</p>
         </div>
         </div>
      </div>
   </section>


   <section className="common-text-container">
      <div className="container">
         <div className="row">
         <div className="col-md-9 col-lg-9 col-xl-9 col-xxl-9">
            <h3>Purpose and Goals</h3>
            <div className="text-fix">
            <p>Our purpose extends beyond just providing logistics solutions; we aim to simplify the intricacies of international trade. At ShipKrate, our goal is to empower businesses by equipping them with the tools and insights necessary to thrive in a global marketplace. We are dedicated to fostering long-term partnerships that facilitate growth, adaptability, and success. Our strategic approach focuses on constant improvement and reimagining the logistics landscape, ensuring that our clients always receive the highest quality service tailored to their unique needs.</p>
         </div>
         </div>
         <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <figure><img src={imgSource.goals} alt="image" /></figure>
         </div>
         </div>
      </div>
   </section>


   <section className="offering-container">
      <div className="container">
         <div className="row">
         <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
            <h3>Offerings</h3>
            <p>ShipKrate offers a comprehensive suite of offerings designed to streamline and enhance every aspect of your logistics experience. Our prominent<br /> services include:</p>
         </div>
         </div>
         <div className="card-row">
            <div className="card">
               <figure>
                  <img src={imgSource.customlogistic} alt="icon" />
               </figure>
               <h4>Custom Logistics Solutions</h4>
               <p>ailored logistics strategies designed to fit the specific requirements of each client.</p>
            </div>
            
            <div className="card">
               <figure>
                  <img src={imgSource.freight} alt="icon" />
               </figure>
               <h4>Freight Management Services</h4>
               <p>Efficient and cost-effective management of shipments to ensure timely deliveries.</p>
            </div>
            <div className="card">
               <figure>
                  <img src={imgSource.global} alt="icon" />
               </figure>
               <h4>Global Trade Platform</h4>
               <p>A state-of-the-art, technology-driven platform that simplifies international trade processes.</p>
            </div>
            <div className="card">
               <figure>
                  <img src={imgSource.localhandling} alt="icon" />
               </figure>
               <h4>Local Handling</h4>
               <p>Local transportation, customs & warehousing options that maximize efficiency and reduce operational costs.</p>
            </div>
         </div>
   </div>
   </section>

   <section className="common-text-container bg-light-grey">
      <div className="container">
         <div className="row">
         <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <h3>Introduction to the Team</h3>
            <p>Teamwork is at the core of ShipKrate’s philosophy. Our diverse and experienced team is comprised of industry veterans who bring a wealth of knowledge and expertise to the table. With backgrounds in logistics, technology, and customer service, our professionals are dedicated to not only understanding your challenges but also addressing them with innovative solutions. We believe in nurturing relationships, and our team thrives on collaboration, ensuring that we are always adapting to meet the evolving needs of our clients.</p>
         </div>
         </div>
      </div>
   </section>

   <section className="common-text-container customer">
      <div className="container">
         <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
               <figure><img src={imgSource.customeropenion} alt="image" /></figure>
            </div>
         <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div className="openion-text">
            <h3>Customer Opinions</h3>
            <p>Our clients are at the heart of what we do at ShipKrate. We take pride in cultivating lasting relationships built on trust and exceptional service. Here’s what some of our clients have to say:</p>
            <strong>“ShipKrate transformed our shipping process. Their expertise and technology made international trade feel effortless.”</strong>
            <strong>“Working with ShipKrate is a game-changer. Their team truly understands our needs and consistently delivers outstanding results.”</strong>
         </div>
         </div>
         </div>
      </div>
   </section>

   <section className="common-text-container bg-light-grey call-to-action">
      <div className="container">
         <div className="row">
         <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <h3>Call to Action</h3>
            <p>Are you ready to simplify your logistics and elevate your trading experience? Join the ShipKrate family today! Contact us to discover how our innovative solutions can be tailored to meet your specific needs. Whether you’re just starting or looking to optimize your existing processes, we are here to guide you every step of the way.</p>
            <div className="cta-link">
               <a href="#">Let’s navigate the world of trade together!</a>
            </div>
            
         </div>
         </div>
      </div>
   </section>
   <Footer />
   </section>
    </>
  )
}
