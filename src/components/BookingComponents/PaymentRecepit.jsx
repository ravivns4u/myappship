import React from 'react'
import '../../assets/css_new/payment-recipit.css'
export default function PaymentRecepit() {
  return (
    <>
     <div className="outer-payment-container">
    <div className="payment-container">
    <div className="payment-header">
        <div>
            <h1 style={{ fontSize : '25px', lineHeight : '30px', color: '#363636' , fontWeight:'700'}}>Payment Receipt</h1>
            <table className="payment-number">
            <tr>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#8C989A !important' , fontWeight:'500', width : '150px' }}>Payment Receipt No:</td>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#363636 !important' , fontWeight:'500'}}>A00003</td>
            </tr>
            <tr><td style={{height:'5px'}}></td></tr>
            <tr>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#8C989A !important' , fontWeight:'500', width : '150px' }}>Payment Id:</td>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#363636 !important' , fontWeight:'500'}}>ABCD12345</td>
            </tr>
            <tr><td style={{height:'5px'}}></td></tr>
            <tr>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#8C989A !important' , fontWeight:'500', width : '150px' }}>Transaction Id:</td>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#363636 !important' , fontWeight:'500'}}>TXN123458789</td>
            </tr>
            <tr><td style={{height:'5px'}}></td></tr>
            <tr>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#8C989A !important' , fontWeight:'500', width : '150px' }}>Payment Mode:</td>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#363636 !important' , fontWeight:'500'}}>Online</td>
            </tr>
            <tr><td style={{height:'5px'}}></td></tr>

            <tr>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#8C989A !important' , fontWeight:'500', width : '150px' }}>Receipt Date:</td>
                <td style={{ fontSize : '14px', lineHeight : '18px', color: '#363636 !important' , fontWeight:'500'}}>Jul 02, 2024</td>
            </tr>
           </table> 
           
        </div>
        
    </div>

    <div className="payment-details">
        <div className="issued-by" style={{backgroundColor:'#fbfcfe', padding: '15px', borderRadius: '10px', width: '100%', border: '1px solid #f1f4f6' }}>
            <p style={{margin: '0 0 15px 0', color:'#6e45c3', fontSize:'18px', marginBottom: '10px' }}>Issued by</p>
            <b>Sekyoor Solutions Pvt Ltd</b>
            <p style={{fontSize: '14px', lineHeight:'20px', margin:'5px 0 0 0' }}>A1/B Sector-16, <br /> Noida, <br /> Uttar Pradesh, India - 201301</p>
            <p style={{fontSize: '14px', lineHeight:'20px', marginBottom: '0' }}><b>GST No:</b> 09ABLCS1809C1ZE</p>

        </div>
        <div className="issued-to" style={{backgroundColor:'#fbfcfe', padding: '15px', borderRadius: '10px', width: '100%', border: '1px solid #f1f4f6' }}>
            <p style={{margin: '0 0 15px 0', color:'#6e45c3', fontSize:'18px', marginBottom: '10px' }}>Issued to</p>
            <b>Backyard Logistics & Solutions</b>
            <p style={{fontSize: '14px', lineHeight:'20px', margin:'5px 0 0 0' }}>Railway Bazar Behind Jain Mandir Haldwani District <br /> Nanital, <br /> Haldwani,
            <br />Uttarakhand, India</p>
        </div>
    </div>

<div className="payment-summary">
<h3 style={{margin:'10px 0 15px 0', fontSize:'18px', lineHeight: '20px', color: '#363636', fontEeight: '700' }}>Payment Summary</h3>
<table>
    <tr>
        <th>Payment Method</th>
        <th>Amount Received</th>
    </tr>
    <tr>
        <td>Account Transfer</td>
        <td>₹79,650</td>
    </tr>
    <tr>
        <td><strong>Total</strong></td>
        <td><strong>₹79,650</strong></td>
    </tr>
</table>
</div>

    <h3 style={{margin:'10px 0 15px 0', fontSize:'18px', lineHeight: '20px', color: '#363636', fontEeight: '700' }}>Settled Invoices</h3>
    <div className="settled-invoice">
        <table>
            <tr>
                <th style={{ textAlign: 'left' }}>Invoices #</th>
                <th>Invoice Amount </th>
                <th>Amount Received </th>
                <th>Amount Settled</th>
                <th>Due Amount</th>
            </tr>
            <tr>
                <td>24july02 <span style={{backgroundColor: '#52c41a', fontSize:'12px', fontSize: '14px', color: '#fff', verticalAlign: 'middle', padding:'5px,10px', borderRadius: '5px'}} classNameName="paid">Paid</span></td>
                <td>₹79,650</td>
                <td>₹79,650 </td>
                <td>₹79,650</td>
                <td>₹0</td>
            </tr>
            <tr>
                <td><b>Total</b></td>
                <td><b>₹79,650 </b></td>
                <td><b>₹79,650</b></td>
                <td><b>₹79,650</b></td>
                <td><b>₹0</b></td>
            </tr>
        </table>
    </div>

    <div className="payment-receipt-details">
       <div className="description">
        <p style={{fontSize: '14px', lineHeight:'20px', margin:'5px 0 0 0', color:'#8C989A'}}>Total amount (in words)</p>
        <p style={{fontSize: '14px', lineHeight:'20px', margin:'5px 0 0 0', color:'#8C989A'}}> Seventy Nine Thousand Six Hundred Fifty Rupees Only</p>
       </div>
       
       <div className="total-amount">
        <table>
            <tr>
                <td style={{fontSize: '14px', lineHeight:'20px', color:'#8C989A'}}>Total Amount Received</td>
                <td>₹79,650</td>
            </tr>
            <tr>
                <td style={{height: '15px'}}></td>
            </tr>
            <tr>
                <td style={{fontSize: '14px', lineHeight:'20px', color:'#8C989A'}}>Settled Against Invoices</td>
                <td>₹79,650</td>
            </tr>
           
            <tr>
                <td style={{height: '15px'}}></td>
            </tr>

            <tr>
                <td style={{fontSize: '18px', lineHeight: '30px',  borderTop: '2px solid #363636', borderBottom: '2px solid #363636', fontWeight: '500'}}><strong>Total Amount</strong></td>
                <td style={{fontSize: '18px', lineHeight: '30px',  borderTop: '2px solid #363636', borderBottom: '2px solid #363636', fontWeight: '500'}}><strong>₹79,650</strong></td>
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
