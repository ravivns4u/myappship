import React from 'react'
import '../../assets/css_new/invoice.css'
export default function Invoice() {
  return (
    <>
      <div className="outer-invoice-container">
       <div className="invoice-container">
        <div className="invoice-header">
            <div>
                <h1>Invoice <span style={{backgroundColor: '#52c41a', fontSize:'12px', fontSize: '16px', color: '#fff', verticalAlign: 'middle', padding:'5px 10px', borderRadius: '5px' }} className="paid">Paid</span></h1>
               <table className="invoice-number">
                <tr>
                    <td style={{fontSize: '14px', lineHeight: '18px', color:'#8C989A !important', fontWeight: '600', width: '120px' }}>Invoice No #</td>
                    <td style={{fontSize: '14px', lineHeight: '18px', color:'#363636 !important', fontWeight: '600' }}>24july02</td>
                </tr>
                <tr><td style={{height: '5px'}}></td></tr>
                <tr>
                    <td style={{fontSize: '14px', lineHeight: '18px', color:'#8C989A !important', fontWeight: '600', width: '120px' }}>Invoice Date</td>
                    <td style={{fontSize: '14px', lineHeight: '18px', color:'#363636 !important', fontWeight: '600' }}>Jul 01, 2024</td>
                </tr>   
               </table> 
            </div>
            <div className="logo">
                <img src="https://i.ibb.co/42wxVQk/header-logo.png" alt="logo" />
            </div>
        </div>

        <div className="invoice-details">
            <div className="billed-by" style={{backgroundColor: '#efebf9', padding: '15px', borderRadius:'10px', width: '100%' }}>
                <p style={{margin: '0 0 15px 0', color:'#6e45c3', fontSize:'18px', marginBottom: '10px' }}>Billed By</p>
                <b>Sekyoor Solutions Pvt Ltd</b>
                <p style={{ fontZize: '14px', lineHeight:'20px', margin:'5px 0 0 0' }}>A1/B Sector-16, <br /> Noida, <br /> Uttar Pradesh, India - 201301</p>
                <p style={{ fontZize: '14px', lineHeight:'20px', marginBottom:'0' }}><b>GST No:</b> 09ABLCS1809C1ZE</p>
    
            </div>
            <div className="billed-to" style={{backgroundColor: '#efebf9', padding: '15px', borderRadius:'10px', width: '100%' }}>
                <p style={{margin: '0 0 15px 0', color:'#6e45c3', fontSize:'18px', marginBottom: '10px' }}>Billed To</p>
                <b>Backyard Logistics & Solutions</b>
                <p style={{ fontZize: '14px', lineHeight:'20px', margin:'5px 0 0 0' }}>Railway Bazar Behind Jain Mandir Haldwani District <br /> Nanital, <br /> Haldwani,
                <br />Uttarakhand, India</p>
                <p style={{ fontZize: '14px', lineHeight:'20px', marginBottom:'0' }}><b>GST No:</b> 09ABLCS1809C1ZE</p>
            </div>
        </div>

        <div className="invoice-items">
            <table>
                <tr>
                   <th style={{borderRight: '0 !important' }}>&nbsp;</th>
                    <th style={{ textAlign: 'left' }}>Item</th>
                    <th>HSN Code</th>
                    <th>GST Rate</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Discount</th>
                    <th>IGST</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>1.</td>
                    <td style={{ textAlign: 'left' }}>Basic Ocean Freight <br /><small>(Origin:Mundra To Destination:Rotterdam)</small></td>
                    <td>52145</td>
                    <td>18%</td>
                    <td>1</td>
                    <td>₹60,000.00</td>
                    <td>₹60,000.00</td>
                    <td>10%</td>
                    <td>₹10,800.00</td>
                    <td>₹63,720.00</td>
                </tr>
                <tr className="bg">
                    <td>2.</td>
                    <td  style={{ textAlign: 'left' }}>Local Charges</td>
                    <td>52145</td>
                    <td>18%</td>
                    <td>7500</td>
                    <td>₹1.00</td>
                    <td>₹7,500.00</td>
                    <td>10%</td>
                    <td>₹1,350.00</td>
                    <td>₹7,965.00</td>
                </tr>
            </table>
        </div>
        <div className="invoice-bank-details">
           <div className="bank-info" style={{backgroundColor: '#efebf9', padding: '15px', borderRadius: '10px', width: '100%' }}>
            <p style={{ margin: '0 0 15px 0', color:'#6e45c3', fontSize:'18px', marginBottom: '5px' }}>Bank Details</p>
            <table>
                <tr>
                    <td><strong>Account Name </strong></td>
                    <td>Sekyoor Solutions Private Limited</td>
                </tr>
                <tr>
                    <td><strong>Account Number</strong></td>
                    <td>8248213336</td>
                </tr>
                <tr>
                    <td><strong>IFSC</strong></td>
                    <td>KKBK0004605</td>
                </tr>
                <tr>
                    <td><strong>Account Type</strong></td>
                    <td>Current</td>
                </tr>
                <tr>
                    <td><strong>Bank</strong></td>
                    <td>Kotak Mahindra Bank</td>
                </tr>
            </table>
           </div>
           <div className="barcode">
             <h5>UPI - Scan to Pay</h5>
             <figure>
                <img src="https://i.ibb.co/XyhFvWg/scaner.jpg" alt="scaner" />
             </figure>
             <h5 style={{ color: '#363636' }}>sekyoor@kotak</h5>
           </div>
           <div className="total-amount">
            <table>
                <tr>
                    <td>Amount</td>
                    <td>₹67,500.00</td>
                </tr>
                <tr>
                    <td style={{height : '15px'}}></td>
                </tr>
                <tr>
                    <td>Coupon Discount</td>
                    <td>₹1500.00</td>
                </tr>
               
                <tr>
                    <td style={{height : '15px'}}></td>
                </tr>
                <tr>
                    <td>IGST</td>
                    <td>₹12,150.00</td>
                </tr>
                <tr>
                    <td style={{height : '15px'}}></td>
                </tr>
                <tr>
                    <td style={{ fontSize: '16px', lineHeight: '25px', borderTop: '2px solid #363636', borderBottom: '2px solid #363636', fontWeight: '500' }}><strong>Total (INR)</strong></td>
                    <td style={{ fontSize: '16px', lineHeight: '25px', borderTop: '2px solid #363636', borderBottom: '2px solid #363636', fontWeight: '500' }}><strong>₹78,150.00</strong></td>
                </tr>
                <tr>
                    <td style={{height : '15px'}}></td>
                </tr>
                <tr>
                    <td>Amount Paid</td>
                    <td>(₹78,150.00)</td>
                </tr>
            </table>
           </div>
        </div>
        <div className="footer">
            <button onclick="window.print();return false;" style={{backgroundColor: '#7341fb', fontSize: '12px', lineHeight: '14px', color: '#fff', borderRadius: '20px'
        , border: '0', padding: '8px 10px', fontEeight: '600', margin: '10px 0', cursor: 'pointer' }}>Print To PDF</button>
            <p>This is an electronically generated document, no signature is required.</p>
        </div>
    </div>
    </div>
    </>
  )
}
