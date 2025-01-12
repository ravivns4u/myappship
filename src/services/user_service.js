import axios from "axios";

const getSourceData = async(url)=>{
    try {
        const response = await axios.get(url ,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
      return response.data;

    } catch (error) {
        return error
    } 
}

const getListData= async(token, url, stateId)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(url+'/'+stateId,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
      return response.data;

    } catch (error) {
        return error
    } 
}


const getUserProfileUpdate= async(url, event, userid)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const payload = {
            name : event.target['name'].value, 
            phone_number :  event.target['mobile_no'].value,  
            alternet_mobile :  event.target['alt_mobile_no'].value,  
            email : event.target['email'].value, 
            language : event.target['languages'].value, 
            ref_country : event.target['country'].value, 
            ref_state : event.target['statename'].value, 
            ref_city : event.target['city'].value, 
            pin_code : event.target['pincode'].value, 
           }
           const data = JSON.stringify(payload);
           const obj = JSON.parse(data);
           const response = await axios.put(url, obj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId' : userid
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}


//get Gst no
const getGst = async(url, gstno)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const payload = {
            gst : gstno, 
           }
           const data = JSON.stringify(payload);
           const obj = JSON.parse(data);
           const response = await axios.post(url, obj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}

// get Document type
const getDocumentType = async(url)=>{
    try {
        const token = localStorage.getItem('accessToken')
           const response = await axios.get(url+'?user_type=standard', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
      return response.data;

    } catch (error) {
        return error
    } 
}

const getUserKfc = async(url,file,event,document_type)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const formData = new FormData()
        formData.append('docfile',  file)
        formData.append('document_type',  document_type)
        formData.append('name', event)
        const response = await axios.post(url, formData, {
                headers: {
                    //'Content-Type': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}


const getUserKycUpdate = async(url, event, userid)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const payload = {
            is_email_verified : true, 
            kyc_verified :  true,  
            gst_number :   event.target['gst_no'].value,  
            company_address : event.target['co_address'].value, 
            billing_address : event.target['register_address'].value, 
            company_name : event.target['legal_name'].value, 
           }
           const data = JSON.stringify(payload);
           const obj = JSON.parse(data);
           const response = await axios.put(url, obj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId' : userid
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}



const getUsercmpProfileUpdate = async(url, event, userid)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const payload = {
            company_name : event.target['company_name'].value, 
            company_pan :  event.target['company_pan'].value,  
            gst_number :  event.target['gst_number'].value,  
            customer_code : event.target['customer_code'].value, 
            website_url : event.target['website_url'].value, 
            ref_country : event.target['country'].value, 
            ref_city : event.target['city'].value, 
           
           }
           const data = JSON.stringify(payload);
           const obj = JSON.parse(data);
           const response = await axios.put(url, obj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId' : userid
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}


const getUserPocUpdate = async(url, event, userid)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const payload = {
            company_name : event.target['company_name'].value, 
            poc_name :  event.target['poc_name'].value,  
            poc_mobile :  event.target['poc_mobile'].value,  
            poc_email : event.target['poc_email'].value,
            ref_country : event.target['country'].value, 
            ref_city : event.target['city'].value, 
            pin_code : event.target['pincode'].value, 
            billing_address :  {
                landmark : event.target['landmark'].value, 
                building : event.target['building'].value, 
                }
           }
           const data = JSON.stringify(payload);
           const obj = JSON.parse(data);
           const response = await axios.put(url, obj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId' : userid
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}


const getPriceData = async(url,payload)=>{
    try {
        const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}


const getProviderList = async(url)=>{
    try {
        const payload = {provider: 'CGM'}
        const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}

//Currency Exchange
const getCurrencyExchange = async(url, cur)=>{
    try {
        const response = await axios.get(url+'?base_currency='+cur+'&convert_currency=INR', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}

//ICD LIst
const getICD = async(url, sourceCountry)=>{
    try {
        const response = await axios.get(url+'/'+sourceCountry ,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}

// Confirm Booking
const confirmBooking = async(url, payload)=>{
    try {
           const token = localStorage.getItem('accessToken')
           const data = JSON.stringify(payload);
           const obj = JSON.parse(data);
           const response = await axios.post(url, obj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
      return response.data;

    } catch (error) {
        return error
    } 
}


//Apply Coupon
const applyCoupon = async(url, couponCode)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(url+'/'+couponCode ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}


//get Additional Charges
const getAdditionalService = async(url, cur, service, size)=>{
    try {
        const response = await axios.get(url+'?country_code='+cur+'&name='+ service+'&container_size='+size, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}

//get Bl Charges
const getBlcharges = async(url, cur, service)=>{
    try {
        const response = await axios.get(url+'?country_code='+cur+'&payment_type='+ service, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}


//get Lat Long
const getLatLong = async(url, pincode, cur)=>{
    try {
        const response = await axios.get(url+'?country_code='+cur+'&pincode='+ pincode, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}




const getDistance = async(url, sourceLat, sourceLong, destinationLat, destinationLong)=>{
    try {
        const response = await axios.get(url+'?sourceLat='+sourceLat+'&sourceLong='+ sourceLong+'&destinationLat='+ destinationLat+'&destinationLong='+ destinationLong, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}


//get Transport
const getTransport = async(url, cur, service, type)=>{
    try {
        const response = await axios.get(url+'?country_code='+cur+'&name='+ service+'&transport_type='+type, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;

    } catch (error) {
        return error
    } 
}



const userService = {
    getListData,
    getUserProfileUpdate,
    getGst,
    getUserKfc,
    getDocumentType,
    getUserKycUpdate,
    getUsercmpProfileUpdate,
    getUserPocUpdate,
    getSourceData,
    getPriceData,
    getProviderList,
    getCurrencyExchange,
    getICD,
    confirmBooking,
    applyCoupon,
    getAdditionalService,
    getBlcharges,
    getLatLong,
    getDistance,
    getTransport
    
   
}

export default userService