import React, { useState } from 'react'
import UserHeader from '../CommonComponents/UserHeader'
import '../../assets/css_new/finance-page.css'
import imgService from '../../helper/dataManipulation/globalUtlities'



export default function UserFinance() {
    const user_obj = JSON.parse(localStorage.getItem('user'));
    const [showAllRates,setAllRates] = useState('allRates');
    const [showRateUp,setRateUp] = useState('tab_content');
    const [showRateDown,setRateDown] = useState('tab_content');
    const [showActive,setActive] = useState('active');
    const [upActive,setupActive] = useState('');
    const [downActive,setdownActive] = useState('');
    const [style, setStyle] = useState({ opacity: 1 })
    const [styleup, setupStyle] = useState({ opacity: 0 })
    const [styledown, setdownStyle] = useState({ opacity: 0 })

    function dashboard(){
        setStyle({ opacity: 1 });
        setupStyle({ opacity: 0 });
        setdownStyle({ opacity: 0 });
        setTimeout(() => {
            showAllRates ? setAllRates('allRates') : setAllRates('tab_content');
            showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
            showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
            showActive ? setActive('') : setActive('active');
            upActive ? setupActive('') : setupActive('');
            downActive ? setdownActive('') : setdownActive('');
        }, 0.1999999880); 
     }
     function invoice(){
        setStyle({ opacity: 0 });
        setupStyle({ opacity: 1 });
        setdownStyle({ opacity: 0 });
        setTimeout(() => {
            showRateUp ? setRateUp('allRates') : setRateUp('tab_content');
            showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
            showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
            showActive ? setActive('') : setActive('');
            upActive ? setupActive('') : setupActive('active');
            downActive ? setdownActive('') : setdownActive('');
        }, 0.1999999880);
     }
     function transection(){
        setStyle({ opacity: 0 });
        setupStyle({ opacity: 0 });
        setdownStyle({ opacity: 1 });
        setTimeout(() => {
            showRateDown ? setRateDown('allRates') : setRateDown('tab_content');
            showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
            showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
            showActive ? setActive('active') : setActive('');
            upActive ? setupActive('') : setupActive('');
            downActive ? setdownActive('') : setdownActive('active');
          
        }, 0.1999999880);
     }
  return (
    <>
    {localStorage.getItem('user') == null ? 'Page Not Found!':
    <section className="main-container">
    <UserHeader />
       <section className="inner-body">
            <div className="finance-container">
            <div className="profile-area">
             <h5>Finance</h5>
             <div className="profile-row">
               <figure>
                  <span className="inner"><img src={imgService.profileimage} alt="icon" /></span>
               </figure>
               <div className="name">
                  <h5>Hello {user_obj.name},</h5>
                  <span>Overview</span>
               </div>
             </div>
            </div>
          <div className="details-container">
            <div className="head-links">
            <ul className="detail-links">
             <li className={`${showActive}`}><a href="#" onClick={() => dashboard()}><svg id="Group_220332" data-name="Group 220332" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path id="Path_297773" data-name="Path 297773" d="M0,0H24V24H0Z" fill="none"/>
              <path id="Path_297774" data-name="Path 297774" d="M3,12a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4Zm0,8a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V16a1,1,0,0,0-1-1H4a1,1,0,0,0-1,1Zm10,0a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1ZM14,3a1,1,0,0,0-1,1V8a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1Z" fill="#903bde"/>
            </svg> Dashboard <img src={imgService.checkboxcircleline} alt="icon" className="green-icon" /></a></li>
             <li className={`${upActive}`}><a href="#" onClick={() => invoice()}><svg id="Group_220333" data-name="Group 220333" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path id="Path_297775" data-name="Path 297775" d="M0,0H24V24H0Z" fill="none"/>
              <path id="Path_297776" data-name="Path 297776" d="M20,22H4a1,1,0,0,1-1-1V3A1,1,0,0,1,4,2H20a1,1,0,0,1,1,1V21A1,1,0,0,1,20,22ZM8,9v2h8V9Zm0,4v2h8V13Z" fill="#363636"/>
            </svg> Invoices <img src={imgService.checkboxcircleline} alt="icon" className="green-icon" /></a></li>
             <li className={`${downActive}`}><a href="#" onClick={() => transection()}><svg id="Group_220334" data-name="Group 220334" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path id="Path_297777" data-name="Path 297777" d="M0,0H24V24H0Z" fill="none"/>
              <path id="Path_297778" data-name="Path 297778" d="M20,8V5H4V8Zm0,2H4v9H20ZM3,3H21a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3Zm8,11h6v2H6.5L11,11.5Z"/>
            </svg> Transactions <img src={imgService.checkboxcircleline} alt="icon" className="green-icon" /></a></li>
            </ul>
         </div>

        
         <div className={`dashboard ${showAllRates}`}>
          <div className="card-row">
            <div className="card Outstanding">
              <h5>Total Outstanding Amount</h5>
              <strong className="text-blur-color">₹ 3,25,000</strong>
              <button className="card-btn bg-blur-color">42 Invoices</button>
            </div>
            <div className="card paid">
              <h5>Paid On Account</h5>
              <strong className="text-green-color">₹ 3,25,000</strong>
              <button className="card-btn bg-green-color">42 Invoices</button>
            </div>
            <div className="card total">
              <h5>Total Orders</h5>
              <strong className="text-yellow-color">₹ 3,25,000</strong>
              <button className="card-btn bg-yellow-color">42 Invoices</button>
            </div>
          </div>
          
           <div className="table-group">
            <div className="table-outer">
           <table>
            <tr className="heading">
              <td colspan="5"><h5>Recent Transactions</h5></td>
            </tr>
            <tr className="head-active">
              <th>Transaction No.</th>
              <th>Bill Type</th>
              <th>Bill Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
            <tr>
              <td><b>2907019</b></td>
              <td>Booking</td>
              <td>12 Jun 2024</td>
              <td>₹ 1,25,000</td>
              <td>Unpaid</td>
            </tr>
            <tr>
              <td><b>2907019</b></td>
              <td>Booking</td>
              <td>12 Jun 2024</td>
              <td>₹ 1,25,000</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td><b>2907019</b></td>
              <td>Booking</td>
              <td>12 Jun 2024</td>
              <td>₹ 1,25,000</td>
              <td>Paid</td>
            </tr>
           </table>
          </div>
          <div className="table-outer">
            <table>
              <tr className="heading">
                <td colspan="4"><h5>Recent Invoices</h5></td>
              </tr>
            <tr className="head-active">
              <th>Invoice No.</th>
              <th>Invoice Date</th>
              <th>Invoice Amount</th>
              <th>Status</th>
             </tr>
             <tr>
              <td><b className="invoice-no">6737388</b></td>
              <td>28 Jul 2024</td>
              <td>₹ 1,00,000</td>
              <td>Paid</td>
             </tr>
             <tr>
              <td><b className="invoice-no">6737388</b></td>
              <td>28 Jul 2024</td>
              <td>₹ 1,00,000</td>
              <td>Paid</td>
             </tr>
             <tr>
              <td><b className="invoice-no">6737388</b></td>
              <td>28 Jul 2024</td>
              <td>₹ 1,00,000</td>
              <td>Paid</td>
             </tr>
            </table>
           </div>
           </div>
          </div>

     
          <div className={`invoices ${showRateUp}`} style={styleup}>
            <form>
              <div className="form-row">
              <ul>
                <li>
                 <div className="outer">
                    <label>Enter Invoice No.</label>
                    <input type="text" placeholder="Enter ID" />
                 </div>
                </li>
                <li>
                  <div className="outer">
                     <label>Status</label>
                     <select>
                       <option>Paid</option>
                       <option>Unpaid</option>
                    </select>
                  </div>
                 </li>
                <li>
                 <div className="outer">
                    <label>Select Date Range</label>
                    <input type="text" placeholder="Select" />
                    <span className="date-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path id="Path_297004" data-name="Path 297004" d="M14,2.6h3.2a.8.8,0,0,1,.8.8V16.2a.8.8,0,0,1-.8.8H2.8a.8.8,0,0,1-.8-.8V3.4a.8.8,0,0,1,.8-.8H6V1H7.6V2.6h4.8V1H14ZM3.6,7.4v8H16.4v-8ZM5.2,9H6.8v1.6H5.2Zm4,0h1.6v1.6H9.2Zm4,0h1.6v1.6H13.2Z" transform="translate(-2 -1)" fill="#aeaeae"/>
                    </svg></span>
                 </div>
                </li>
              </ul>
            <ul>
                <li className="mobile-btn"><button className="small-btn mini">Apply</button></li>
                <li className="mobile-btn"><button className="reset-btn">RESET</button></li>
                <li className="mobile-btn"><button className="border-btn mini"><svg id="Group_15857" data-name="Group 15857" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <path id="Path_71110" data-name="Path 71110" d="M0,0H16V16H0Z" fill="none"/>
                  <path id="Path_71111" data-name="Path 71111" d="M9.333,7.667h3.333l-4,4-4-4H8V3H9.333Zm-6,6H14V9h1.333v5.333a.667.667,0,0,1-.667.667h-12A.667.667,0,0,1,2,14.333V9H3.333Z" transform="translate(-0.667 -1)" fill="#903bde"/>
                </svg>DOWNLOAD</button></li>

              </ul>
            </div>

              <div className="pagination-row">
                <select>
                  <option>1 of 10</option>
                </select>
                <ul className="pagination">
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li>5...</li>
                  <li>120</li>
                </ul>
              </div>
              <div className="table-outer">
              <table>
                <tr className="head-active">
                  <th>Invoice No.</th>
                  <th>Invoice Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Unpaid</td>
                  <td>Online</td>
                  <td><button className="paynow">Pay Now</button></td>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Paid</td>
                  <td>Online</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Partial Paid</td>
                  <td>Online</td>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Unpaid</td>
                  <td>Online</td>
                  <td><button className="paynow">Pay Now</button></td>
                </tr>
               </table>
              </div>
           </form>
          </div>

           <div className={`Transactions ${showRateDown}`} style={styledown}>
            <form>
              <div className="form-row">
              <ul>
                <li>
                  <div className="outer">
                     <label>Bill Type</label>
                     <select>
                       <option>Select</option>
                       <option>Select</option>
                    </select>
                  </div>
                 </li>
                 <li>
                  <div className="outer">
                     <label>Status</label>
                     <select>
                       <option>Paid</option>
                       <option>Unpaid</option>
                    </select>
                  </div>
                 </li>
                <li>
                 <div className="outer">
                    <label>Select Date Range</label>
                    <input type="text" placeholder="Select" />
                    <span className="date-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path id="Path_297004" data-name="Path 297004" d="M14,2.6h3.2a.8.8,0,0,1,.8.8V16.2a.8.8,0,0,1-.8.8H2.8a.8.8,0,0,1-.8-.8V3.4a.8.8,0,0,1,.8-.8H6V1H7.6V2.6h4.8V1H14ZM3.6,7.4v8H16.4v-8ZM5.2,9H6.8v1.6H5.2Zm4,0h1.6v1.6H9.2Zm4,0h1.6v1.6H13.2Z" transform="translate(-2 -1)" fill="#aeaeae"/>
                    </svg></span>
                 </div>
                </li>
                </ul>
                <ul>
                <li><button className="small-btn mini">Apply</button></li>
                <li><button className="reset-btn">RESET</button></li>
              </ul>
            </div>
              <div className="pagination-row">
                <select>
                  <option>1 of 10</option>
                </select>
                <ul className="pagination">
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li>5...</li>
                  <li>120</li>
                </ul>
              </div>
              <div className="table-outer">
              <table>
                <tr className="head-active">
                  <th>Transaction No.</th>
                  <th>Bill Type</th>
                  <th>Bill Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>Subscriptions</td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Unpaid</td>
                  <td>Online</td>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>Booking</td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Paid</td>
                  <td>Online</td>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>Booking</td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Paid</td>
                  <td>Online</td>
                </tr>
                <tr>
                  <td><b className="invoice-no">2907019</b></td>
                  <td>Booking</td>
                  <td>12 Jun 2024</td>
                  <td>₹ 1,25,000</td>
                  <td>Unpaid</td>
                  <td>Online</td>
                </tr>
            
               </table>
              </div>
           </form>
          </div>
         </div>
            </div>
         </section>
         </section>
      
          }
          </>
  )
}
