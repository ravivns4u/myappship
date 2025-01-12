import React, { useState, useEffect } from 'react'
//import { Audio } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import UserHeader from '../CommonComponents/UserHeader'
import '../../assets/css_new/shipments.css'
import '../../assets/css_new/track_trace.css'
import imgService from '../../helper/dataManipulation/globalUtlities'
import {getCurentTime, selectSourcevalue, selectDestinationvalue, handleSource, handleDestination, getContainerDetails, allprice, cancelContainerDetails,brickupDetails} from "../../helper/dataManipulation/shipkart_hepler.js"
import userService from '../../services/user_service'
import UserProfileShimmer from './UserProfileShimmer'
import {useUserData} from '../../helper/custom_hooks/user_hooks'


export default function UserDeshboards() {
    const navigate = useNavigate();
    const [searchData, setsearchData] = useState({ display: 'none' });
    const [loctabs, setlocTabs] = useState({ display: 'none' });
    const [ocntabs, setocnTabs] = useState({ display: 'block' });
    const [showAllRates,setAllRates] = useState('allRates');
    const [showRateUp,setRateUp] = useState('tab_content');
    const [showRateDown,setRateDown] = useState('tab_content');
    const [showtracktrace,settracktrace] = useState('tab_content');
    const [showAll,setAll] = useState('allRates');
    const [showOngoing,setOngoing] = useState('tab_content');
    const [showCompleted,setCompleted] = useState('tab_content');
    const [showActive,setActive] = useState('active');
    const [upActive,setupActive] = useState('');
    const [downActive,setdownActive] = useState('');
    const [trackActive,settrackActive] = useState('');
    const [allActive,setAllActive] = useState('active');
    const [ocnActive,setocnActive] = useState('active');
    const [locActive,setlocActive] = useState('');
    const [OngoingActive,setOngoingActive] = useState('');
    const [completedActive,setCompletedActive] = useState('');
    const [style, setStyle] = useState({ opacity: 1 })
    const [styleup, setupStyle] = useState({ opacity: 0 })
    const [styledown, setdownStyle] = useState({ opacity: 0 })
    const [styletrack, settrackStyle] = useState({ opacity: 0 })
    const [styleall, setStyleall] = useState({ opacity: 1 })
    const [styleongoing, setongoingStyle] = useState({ opacity: 0 })
    const [stylecompleted, setcompletedStyle] = useState({ opacity: 0 })
    const [sourcelist, setSourcelist] = useState([]);
    const [pricelistnew, setPriceList] = useState([]);
    const [providerlist, setProviderlist] = useState([]);
    const user_obj = JSON.parse(localStorage.getItem('user'));
    const user_kyc = JSON.parse(localStorage.getItem('user_kyc'));
    const user_token = localStorage.getItem('accessToken');

    const { data, loading, error } = useUserData(process.env.REACT_APP_NEW_GETUSERDATA,user_token,user_obj._id);
    console.log(data);
    const selectSource = async (event) => {
      var des = document.getElementById('destinationeopen');
      des.classList.remove('open');
      var elm = document.getElementById('sourceopen');
       elm.classList.add('open');
      const result  =  await userService.getSourceData(process.env.REACT_APP_LOCATION_URL)
      setSourcelist(result.data);
     }

     const selectDestination = async (event) => {
      var sou = document.getElementById('sourceopen');
      sou.classList.remove('open');
      var elm = document.getElementById('destinationeopen');
       elm.classList.add('open');
      const result  =  await userService.getSourceData(process.env.REACT_APP_LOCATION_URL)
      setSourcelist(result.data);
     
     }

    const selectContainer = async (event) => { 
      var sou = document.getElementById('sourceopen');
      sou.classList.remove('open');
      var elm = document.getElementById('destinationeopen');
       elm.classList.remove('open');
       var cnt = document.getElementById('containeropen');
       cnt.classList.add('open');
     
    }

      // get Provider List
      useEffect(() => {   
      const getProvider = async (event) => {  
         const result  =  await userService.getProviderList(process.env.REACT_APP_GETDETENTION_URL)
         setProviderlist(result.data);
      }
      getProvider()
      }, []);

    const getPriceListData = async (event) => { 
      var source = document.getElementById("source").value;
      var distenation = document.getElementById("destination").value;
      if(source != '' && distenation != ''){
      var todayDate = new Date().toISOString().slice(0, 10);
      var todayTime =new Date().toLocaleTimeString();
      source =  source.split('/');
      distenation =  distenation.split('/');
      var st = document.getElementById("containercount").value;
      if(st !== ''){
         st = document.getElementById("containerdata").value= st;
      }else{
         st = document.getElementById("containerdata").value= "1";
      }
      var cargoweight = document.getElementById("cargoweight").value;
      if(cargoweight !== ''){
         cargoweight = document.getElementById("containerdata").value= cargoweight;
      }else{
         cargoweight = document.getElementById("containerdata").value= "100";
      }
      var containersizedata = document.getElementById("containersizedata").innerHTML.replace(',', '');
      containersizedata = containersizedata.replace(' ','');
      var containertypedata = document.getElementById("containertypedata").innerHTML.replace(',', '');
      var commoditydata = document.getElementById("commoditydata").innerHTML.replace(',', '');
      document.getElementById("details_of_cont").innerHTML = st+' Container, '+containersizedata+', '+containertypedata+', '+commoditydata+', '+cargoweight;
      const payload = {
         locationCodificationType: 'UNLOCODE',
         portOfLoading:  source[1],
         portOfDischarge: distenation[1],
         equipmentGroupIsoCode: containersizedata,
         numberOfContainer: st,
         weightPerContainer: cargoweight,
         currenteDate: todayDate+' '+todayTime,
       }
       const test = JSON.stringify(payload)
       const obj = JSON.parse(test);
       const result  =  await userService.getPriceData(process.env.REACT_APP_GETPRICE_URL, obj,)
       setPriceList(result.data);
       setsearchData({ display : 'block'})
       setupStyle({ display : 'none'})
      }
    }

    const ConfirmBooking = (arrival_date, departure_date, timeduration,souceCountryCode, destinationCountyCode, currency1, currency2, currency3, currency4, currency5, currency6, currency7, legFrom,legcountry, legPlace, legto, legtocountry, legPlaceto, basicAmount, Allamount, basicname1, basicchange1, basicname2, basicchange2,basicname3, basicchange3,basicname4, basicchange4,basicname5, basicchange5,basicname6, basicchange6,basicname7, basicchange7 ) => {
       var contener = document.getElementById("details_of_cont").innerHTML;
       var origin_detention = document.getElementById("timeduration0").innerText;
       var origin_demmurage = document.getElementById("timeduration1").innerText;
       var destination_demmurage = document.getElementById("timeduration2").innerText;
       var destination_detention = document.getElementById("timeduration3").innerText;
       contener = contener.split(',');
       const objArray = {
            'arrival_date': arrival_date,
            'departure_date': departure_date,
            'origin_detention' : origin_detention,
            'origin_demmurage' : origin_demmurage,
            'destination_demmurage' : destination_demmurage,
            'destination_detention' : destination_detention,
            'transit_time': timeduration,
            'travelmode': 'direct',
            'quantity' : contener[0],
            'size' : contener[1],
            'type' : contener[2],
            'commodity' : contener[3],
            'weight' : contener[4],
            'legFrom' : legFrom,
            'legcountry': legcountry,
            'legPlace': legPlace,
            'legto' : legto,
            'legtocountry' : legtocountry,
            'legPlaceto' : legPlaceto,
            'basicAmount' : basicAmount,
            'Allamount' : Allamount,
            'basicname1' : basicname1,
            'basicchange1' : basicchange1,
            'basicname2' : basicname2,
            'basicchange2' : basicchange2,
            'basicname3' : basicname3,
            'basicchange3' : basicchange3,
            'basicname4' : basicname4,
            'basicchange4' : basicchange4,
            'basicname5' : basicname5,
            'basicchange5' : basicchange5,
            'basicname6' : basicname6,
            'basicchange6' : basicchange6,
            'basicname7' : basicname7,
            'basicchange7' : basicchange7,
            'currency1' : currency1,
            'currency2' : currency2,
            'currency3' : currency3,
            'currency4' : currency4,
            'currency5' : currency5,
            'currency6' : currency6,
            'currency7' : currency7,
            'souceCountryCode': souceCountryCode,
            'destinationCountyCode': destinationCountyCode,

       }
     
       localStorage.setItem('bookingData', JSON.stringify(objArray));
       navigate('/confirm-booking',{replace:true});
    }
   

    if(pricelistnew.length == 0){
      <UserProfileShimmer />
    }

    //get Edit Data
    const getEditData = async (event) => {  
      setsearchData({ display : 'none'})
      setupStyle({ display : 'block'})
    }

    //tab
    const ocanTab = async (event) => {  
      setlocActive('')
      setocnActive('active')
      setlocTabs({ display : 'none'})
      setocnTabs({ display : 'block'})
    }

    //tab
    const localTab = async (event) => {  
      setlocActive('active')
      setocnActive('')
      setlocTabs({ display : 'block'})
      setocnTabs({ display : 'none'})
    }

    


   
    function deshboard(){
      setStyle({ opacity: 1 });
      setupStyle({ opacity: 0 });
      setdownStyle({ opacity: 0 });
      settrackStyle({ opacity: 0 });
      setsearchData({display : 'none'})
      setTimeout(() => {
          showAllRates ? setAllRates('allRates') : setAllRates('tab_content');
          showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
          showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
          showtracktrace ? settracktrace('tab_content') : settracktrace('allRates');
          showActive ? setActive('') : setActive('active');
          upActive ? setupActive('') : setupActive('');
          downActive ? setdownActive('') : setdownActive('');
          trackActive ? settrackActive('') : settrackActive('');
      }, 0.1999999880); 
   }
   function discover_rate(){
      setStyle({ opacity: 0 });
      setupStyle({ opacity: 1 });
      setdownStyle({ opacity: 0 });
      settrackStyle({ opacity: 0 });
      setsearchData({display : 'none'})
      setTimeout(() => {
          showRateUp ? setRateUp('allRates') : setRateUp('tab_content');
          showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
          showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
          showtracktrace ? settracktrace('tab_content') : settracktrace('allRates');
          showActive ? setActive('') : setActive('');
          upActive ? setupActive('') : setupActive('active');
          downActive ? setdownActive('') : setdownActive('');
          trackActive ? settrackActive('') : settrackActive('');
      }, 0.1999999880);

  }


  function shipment(){
      setStyle({ opacity: 0 });
      setupStyle({ opacity: 0 });
      setdownStyle({ opacity: 1 });
      settrackStyle({ opacity: 0 });
      setsearchData({display : 'none'})
      setTimeout(() => {
          showRateDown ? setRateDown('allRates') : setRateDown('tab_content');
          showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
          showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
          showtracktrace ? settracktrace('tab_content') : settracktrace('allRates');
          showActive ? setActive('active') : setActive('');
          upActive ? setupActive('') : setupActive('');
          downActive ? setdownActive('') : setdownActive('active');
          trackActive ? settrackActive('') : settrackActive('');
      }, 0.1999999880);
  }

  function track_trace(){
   setStyle({ opacity: 0 });
   setupStyle({ opacity: 0 });
   setdownStyle({ opacity: 0 });
   settrackStyle({ opacity: 1 });
   setsearchData({display : 'none'})
   setTimeout(() => {
       showRateDown ? setRateDown('tab_content') : setRateDown('allRates');
       showAllRates ? setAllRates('tab_content') : setAllRates('allRates');
       showRateUp ? setRateUp('tab_content') : setRateUp('allRates');
       showtracktrace ? settracktrace('allRates') : settracktrace('tab_content');
       showActive ? setActive('active') : setActive('');
       upActive ? setupActive('') : setupActive('');
       downActive ? setdownActive('') : setdownActive('');
       trackActive ? settrackActive('') : settrackActive('active');
   }, 0.1999999880);
}

function getAll(){
   setStyleall({ opacity: 1 });
   setongoingStyle({ opacity: 0 });
   setcompletedStyle({ opacity: 0 });
   setsearchData({display : 'none'})
   setTimeout(() => {
       showAll ? setAll('allRates') : setAll('tab_content');
       showOngoing ? setOngoing('tab_content') : setOngoing('allRates');
       showCompleted ? setCompleted('tab_content') : setCompleted('allRates');
       allActive ? setAllActive('') : setAllActive('active');
       OngoingActive ? setOngoingActive('') : setOngoingActive('');
       completedActive ? setCompletedActive('') : setCompletedActive('');
   }, 0.1999999880);
}

function getOngoing(){
   setStyleall({ opacity: 0 });
   setongoingStyle({ opacity: 1 });
   setcompletedStyle({ opacity: 0 });
   setsearchData({display : 'none'})
   setTimeout(() => {
       showAll ? setAll('tab_content') : setAll('allRates');
       showOngoing ? setOngoing('allRates') : setOngoing('tab_content');
       showCompleted ? setCompleted('tab_content') : setCompleted('allRates');
       allActive ? setAllActive('') : setAllActive('');
       OngoingActive ? setOngoingActive('') : setOngoingActive('active');
       completedActive ? setCompletedActive('') : setCompletedActive('');
   }, 0.1999999880);
}

function getCompleted(){
   setStyleall({ opacity: 0 });
   setongoingStyle({ opacity: 0 });
   setcompletedStyle({ opacity: 1 });
   setsearchData({display : 'none'})
   setTimeout(() => {
       showAll ? setAll('tab_content') : setAll('allRates');
       showOngoing ? setOngoing('tab_content') : setOngoing('allRates');
       showCompleted ? setCompleted('allRates') : setCompleted('tab_content');
       allActive ? setAllActive('') : setAllActive('');
       OngoingActive ? setOngoingActive('') : setOngoingActive('');
       completedActive ? setCompletedActive('') : setCompletedActive('active');
   }, 0.1999999880);
}

function userkyc(){
   navigate('/kyc',{replace:true});
}


  return (
    <>
    {localStorage.getItem('user') == null ? 'Page Not Found!':
    <section className="main-container">
    <UserHeader />
     <section className="inner-body">
     <div className="wrapper">
        <div className="sub-header">
         <div className="inner">
           <ul className="sub-header-tabs">
              <li className={`${showActive}`} rel="tab1"><a href="#" onClick={() => deshboard()}>Dashboard</a></li>
              <li rel="tab2" className={`${upActive}`} onClick={() => discover_rate()}>Discover Rates</li>
              <li rel="tab3" className={`${downActive}`} onClick={() => shipment()}>Shipments</li>
              <li rel="tab4" className={`${trackActive}`} onClick={() => track_trace()}>Track & Trace</li>
           </ul>
         </div>
        </div>
        <div className="tab_container">
           <div id="tab1" className={` ${showAllRates}`} >
              <div className="greetings">
                  <h3>{getCurentTime()},  {user_obj.name} !</h3>
                  <span>Completing your KYC takes just a few minutes, and unlocks a host of other benefits too:</span>
                  {data ?.kyc_verified != true ?
                  <button className="common-btn kyc" onClick={userkyc}>Complete KYC</button>
                   : '' }
              </div>
              <div className="card-rows shadow inner-padding">
                 <div className="first-row">
                    <h2>Shipment</h2>
                    <button className="border-btn">Create Shipment</button>
                 </div>
                 <div className="shipment-row">
                    <div className="shipment light-grey">
                       <img src={imgService.ship} alt="icon" />
                       <span>24 <small>Shipment</small></span>
                       <a href="#" className="arrow"> <img src={imgService.arrowblue} alt="icon" /></a>
                    </div>
                    <div className="shipment light-green">
                       <img src={imgService.truck} alt="icon" />
                       <span>06<small>Completed Shipment</small></span>
                       <a href="#" className="arrow"> <img src={imgService.arrowgreen} alt="icon" /></a>
                    </div>
                    <div className="shipment light-pink">
                       <img src={imgService.location} alt="icon" />
                       <span>18<small>On-Track Shipment</small></span>
                       <a href="#" className="arrow"> <img src={imgService.arrowyellow} alt="icon" /></a>
                    </div>
                 </div>

              </div>
              
              <div className="kyc-box-container">
              <div className="left">
              <h4><span>Complete your KYC & Unlock More Benefits</span></h4>
              <div className="kyc-box-group">
              <div className="kyc-box">
                 <img src={imgService.rupey} alt="icon" />
                 <span>Search for Rates</span>
                 <p>Search for rates from FCL, LCL, Air and Haulage in one place</p>
              </div>
              <div className="kyc-box">
                 <img src={imgService.screen} alt="icon" />
                 <span>Book End to End Shipments</span>
                 <p>Book shipments from your warehouse to your customer`s warehouse. All online, in just a few minutes</p>
              </div>
              <div className="kyc-box">
                 <img src={imgService.support} alt="icon" />
                 <span>Operations Support</span>
                 <p>Let our team handle your entire shipment,including coordination between trucker, customs, shipping line etc</p>
              </div>
              </div>
              </div>
              <div className="right">
               <div className="track-order">
                 <h2>Track Order</h2>
                 <img src={imgService.TrackOrder} alt="image" />
               </div>
               <form className="order">
                 <div className="form-row">
                    <select>
                       <option>Select Shipment</option>
                       <option>Shipment-1</option>
                       <option>Shipment-2</option>
                    </select>
                 </div>
                 <div className="form-row">
                    <span>
                       <button className="number">BL Number</button>
                       <button className="number active">Booking Number</button>
                    </span>
                 </div>
                 <div className="form-row">
                    <span className="form-group"><input type="text" placeholder="Enter Booking No." /><button className="small-btn">Track</button></span>
                    
                    
                 </div>

               </form>
              </div>
              </div>

              <div className="card-rows shadow inner-padding">
                 <div className="schedule-demo">
                 <img src={imgService.vectorimg1} alt="image" />
                 <p>Book a personalised one-on-one demo to see how Shipment rack can enhance your logistics business.</p>
                 <button className="small-btn">Schedule a Demo</button>
              </div>
              </div>
           <div className="recent-search">
             <div className="head">
              <span>Recent Search</span>
              <a href="#">View All</a>
             </div>
             <div className="recent-search-row">
                 <figure className="image">FCL</figure>
                 <div className="cols">
               <ul>
                 <li><span>INMUN, India</span><small>Mundra</small></li>
                 <li><img src={imgService.Darrow} alt="icon" /></li>
                 <li><span>GBFXT, Europe</span><small>Felixstowe</small></li>
               </ul>
                 </div>
                 <div className="cols">
                  <ul className="tags">
                    <li>20 ft</li>
                    <li>Container</li>
                    <li>Standard</li>
                    <li>General</li>
                    <li>INCO</li>
                  </ul>
                 </div>
                 <div className="cols">
                    <button className="small-btn mini">Book</button>
                    <button className="border-btn mini">Show Rates</button>
                    
                 </div>
             </div>
             <div className="recent-search-row">
              <figure className="image">FCL</figure>
              <div className="cols">
            <ul>
              <li><span>INMUN, India</span><small>Mundra</small></li>
              <li><img src={imgService.Darrow} alt="icon" /></li>
              <li><span>GBFXT, Europe</span><small>Felixstowe</small></li>
            </ul>
              </div>
              <div className="cols">
               <ul className="tags">
                 <li>20 ft</li>
                 <li>Container</li>
                 <li>Standard</li>
                 <li>General</li>
                 <li>INCO</li>
               </ul>
              </div>
              <div className="cols">
                 <button className="small-btn mini">Book</button>
                 <button className="border-btn mini">Show Rates</button>
                 
              </div>
          </div>
          <div className="recent-search-row">
           <figure className="image">FCL</figure>
           <div className="cols">
         <ul>
           <li><span>INMUN, India</span><small>Mundra</small></li>
           <li><img src={imgService.Darrow} alt="icon" /></li>
           <li><span>GBFXT, Europe</span><small>Felixstowe</small></li>
         </ul>
           </div>
           <div className="cols">
            <ul className="tags">
              <li>20 ft</li>
              <li>Container</li>
              <li>Standard</li>
              <li>General</li>
              <li>INCO</li>
            </ul>
           </div>
           <div className="cols">
              <button className="small-btn mini">Book</button>
              <button className="border-btn mini">Show Rates</button>
              
           </div>
       </div>
           </div>
           </div>

           <div id="tab2" className={`${showRateUp}`} style={styleup}>
              <div className="card-rows shadow">
                 <div className="select-rows">
                   <ul className="flag">
                     <li>FCL</li>
                     <li>CIF</li>
                   </ul>
                    <div className="select-box">
                     <img src={imgService.sourceicon} alt="icon" className="source-icon" /><label> Select Source</label>
                      
                       <div className="info edits" id="sourceopen">
                          <input type="text" placeholder="Enter Port Name/Code" onClick={() => selectSource()} id="source" onChange={selectSourcevalue} />
                             <ul className="option-list" id="soulist">
                             { sourcelist.map((val,index)=>{ 
                           return (  
                                 <li key={index} onClick={() => handleSource(val)}>
                                    <p>{val.portName}({val.portCode}) <small>{val.portCode}, {val.countryCode}</small></p>
                                    <span>{val.countryName}</span>
                                 </li>
                                 )
                              } )}  
                              
                                </ul>
                       </div>
                       
                    </div>
                    <div className="select-box" >
                     <img src={imgService.sourceicon} alt="icon" className="source-icon" />
                      <label >Select Destination</label>
                       <div className="info edits" id="destinationeopen">
                          <input type="text" placeholder="Enter Port Name/Code" onClick={() => selectDestination()} id="destination" onChange={selectDestinationvalue} />
                             <ul className="option-list" id="destinationList">
                             { sourcelist.map((val,index)=>{ 
                           return (  
                                 <li key={index} onClick={() => handleDestination(val)}>
                                    <p>{val.portName}({val.portCode}) <small>{val.portCode}, {val.countryCode}</small></p>
                                    <span>{val.countryName}</span>
                                 </li>
                                 )
                              } )}  
                                </ul>
                       </div>
                      
                    </div>
                    <div className="select-box fix">
                     <img src={imgService.containericon} alt="icon" className="source-icon" />
                      <label id='containerdetails'>Container Details</label>
                       <div className="info edits" id="containeropen">
                         <strong onClick={() => selectContainer()} id="contenor"><span id="containerdata" onClick={() => selectContainer()}>1 Container</span>
                      <span id="containersizedata" onClick={() => selectContainer()}>, 20GP</span>
                      <span id="containertypedata" onClick={() => selectContainer()}>, Standard</span>
                      <span id="commoditydata" onClick={() => selectContainer()}>,General</span></strong>
                             <div className="container-list">
                                <div className="inner">
                                <div className="filter-row">
                                   <label>Container Count</label>
                                   <span><input type="text"  id="containercount" name="container_count" placeholder='1'  /></span>
                                </div>
                                <div className="filter-row">
                                   <label>Container Size</label>
                                   <div className="radio-container">
                                   <input type="radio" id="s1" name="container_size" value="20GP" checked /><label for="radio1">20ft</label> &nbsp; &nbsp; &nbsp;
                                   <input type="radio" id="s2" name="container_size" value="40GP" /><label for="radio2">40ft</label> &nbsp; &nbsp; &nbsp;
                                   <input type="radio" id="s2" name="container_size" value="40HC" /><label for="radio3">40ft (HC)</label>
                               </div>
                                </div>
                                <div className="filter-row">
                                   <label>Container Type</label>
                                   <div className="radio-container col">
                                   <p><input type="radio" id="Standard" name="container_type" value="Standard" checked /><label for="Standard">Standard (Dry)</label> </p>
                                   <p> <input type="radio" id="Refrigerated" name="container_type" value="Refrigerated" /> <label for="Refrigerated">  (Reefer)</label></p>
                                  </div>
                                </div>
                                <div className="filter-row">
                                   <label>Commodity</label>
                                   <span><input type="text" placeholder="Search Commodity" /> <span>
                                      <img src={imgService.search} alt="icon" />
                                      </span></span>
                                      <div className="radio-container col">
                                       <p><input type="radio" id="akf" name="Commodity" value="AKF"  checked /> <label for="akf">AKF</label> </p>
                                       <p> <input type="radio" id="general" name="Commodity" value="General"/> <label for="general">General</label></p>
                                       <p><input type="radio" id="pta" name="Commodity" value="PTA" /> <label for="pta">PTA</label> </p>
                                       <p> <input type="radio" id="cottons" name="Commodity" value="Cottons" /> <label for="cottons">Cottons & yarn</label></p>
                                </div>
                                   
                                </div>
                                <div className="filter-row">
                                   <label>Cargo Weight Per Containers</label>
                                   <span><input type="text" id="cargoweight"  placeholder='100' /></span>
                                </div>

                                {/* <div className="filter-row border-none">
                                   
                                   <div className="toggler">
                                      <label>INCO Terms</label>
                                     <p> <small>Import</small>
                                      <label className="switch">
                                         <input type="checkbox" checked />
                                         <span className="slider round"></span>
                                       </label>
                                      <small className="export active">Export</small></p>
                                   </div>
                                      <div className="radio-container col">
                                        <p><input type="radio" id="cif" name="radio-group" /> <label for="cif">CIF</label> </p>
                                        <p> <input type="radio" id="cfr" name="radio-group" /> <label for="cfr">CFR</label></p>
                                        <p><input type="radio" id="cpt" name="radio-group" /> <label for="cpt">CPT</label> </p>
                                        <p> <input type="radio" id="cip" name="radio-group" /> <label for="cip">CIP</label></p>
                                
                                        <p> <input type="radio" id="dat" name="radio-group" /> <label for="dat">DAT</label></p>
                                        <p><input type="radio" id="dap" name="radio-group" /> <label for="dap">DAP</label> </p>
                                        <p> <input type="radio" id="ddp" name="radio-group" /> <label for="ddp">DDP</label></p>  
                                       </div>

                                   <div className="button-group border-none">
                                      <button className="remove"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 11H17V13H7V11Z" fill="black"></path><path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="black"></path></svg>Remove</button>
                                   </div>
                                </div> */}
                                {/* <div className="filter-row">
                                   <label>Container Count</label>
                                   <span><input type="text" value="1" /></span>
                                </div>
                                <div className="filter-row">
                                   <label>Container Size</label>
                                   <div className="radio-container">
                                      <input type="radio" id="s1" name="radio-group" /> <label for="radio1">20ft</label> &nbsp; &nbsp; &nbsp;
                                      <input type="radio" id="s2" name="radio-group" /> <label for="radio2">40ft</label> &nbsp; &nbsp; &nbsp;
                                      <input type="radio" id="s2" name="radio-group" /> <label for="radio3">40ft (HC)</label>
                                  </div>
                                </div>
                                <div className="filter-row">
                                   <label>Container Type</label>
                                   <div className="radio-container col">
                                    <p><input type="radio" id="Standard" name="radio-group" /> <label for="Standard">Standard (Dry)</label> </p>

                                   <p> <input type="radio" id="Refrigerated" name="radio-group" /> <label for="Refrigerated">Refrigerated (Reefer)</label></p>
                                      
                                  </div>
                                </div> */}
                                {/* <div className="filter-row">
                                   <label>Commodity</label>
                                   <span><input type="text" placeholder="Search Commodity" /> <span>
                                      <img src={imgService.search} alt="icon" />
                                      </span></span>
                                      <div className="radio-container col">
                                        <p><input type="radio" id="akf" name="radio-group" /> <label for="akf">AKF</label> </p>
                                        <p> <input type="radio" id="general" name="radio-group" /> <label for="general">General</label></p>
                                        <p><input type="radio" id="pta" name="radio-group" /> <label for="pta">PTA</label> </p>
                                        <p> <input type="radio" id="cottons" name="radio-group" /> <label for="cottons">Cottons & yarn</label></p>
                                        <p> <input type="radio" id="general" name="radio-group" /> <label for="general">General</label></p>
                                        <p><input type="radio" id="pta" name="radio-group" /> <label for="pta">PTA</label> </p>
                                        <p> <input type="radio" id="cottons" name="radio-group" /> <label for="cottons">Cottons & yarn</label></p>  
                                       </div>
                                   
                                </div>
                                <div className="filter-row">
                                   <label>Cargo Weight Per Containers</label>
                                   <span><input type="text" value="100" /></span>
                                </div>

                                <div className="filter-row border-none">
                                   <div className="toggler">
                                      <label>INCO Terms</label>
                                     <p> <small>Import</small>
                                      <label className="switch">
                                         <input type="checkbox" checked />
                                         <span className="slider round"></span>
                                       </label>
                                      <small className="export active">Export</small></p>
                                   </div>



                                      <div className="radio-container col">
                                        <p><input type="radio" id="cif" name="radio-group" /> <label for="cif">CIF</label> </p>
                                        <p> <input type="radio" id="cfr" name="radio-group" /> <label for="cfr">CFR</label></p>
                                        <p><input type="radio" id="cpt" name="radio-group" /> <label for="cpt">CPT</label> </p>
                                        <p> <input type="radio" id="cip" name="radio-group" /> <label for="cip">CIP</label></p>
                                
                                        <p> <input type="radio" id="dat" name="radio-group" /> <label for="dat">DAT</label></p>
                                        <p><input type="radio" id="dap" name="radio-group" /> <label for="dap">DAP</label> </p>
                                        <p> <input type="radio" id="ddp" name="radio-group" /> <label for="ddp">DDP</label></p>  
                                       </div>

                                   <div className="button-group border-none">
                                      <button className="addmore"><img src={imgService.plus} alt="icon" />Add More Container</button>
                                   </div>
                                </div> */}

                             </div>
                                <div className="user button-group">
                                   <button className="reset" onClick={() => cancelContainerDetails()}>Cancel</button>
                                   <button className="apply" onClick={() => getContainerDetails()}> Apply</button>
                                  </div>
                             </div>     
                       </div>
                      


                    </div>
                    <div className="btn-boxs">
                     <a className="common-btns lets-gos" onClick={() => getPriceListData()}>Let’s go!</a>
                    </div>
                 </div>
              </div> 
              <div className="kyc-box-container">
                 <div className="left">
                 <h4><span>Complete your KYC & Unlock More Benefits</span></h4>
                 <div className="kyc-box-group">
                 <div className="kyc-box">
                    <img src={imgService.rupey} alt="icon" />
                    <span>Search for Rates</span>
                    <p>Search for rates from FCL, LCL, Air and Haulage in one place</p>
                 </div>
                 <div className="kyc-box">
                    <img src={imgService.screen} alt="icon" />
                    <span>Book End to End Shipments</span>
                    <p>Book shipments from your warehouse to your customer`s warehouse. All online, in just a few minutes</p>
                 </div>
                 <div className="kyc-box">
                    <img src={imgService.support} alt="icon" />
                    <span>Operations Support</span>
                    <p>Let our team handle your entire shipment,including coordination between trucker, customs, shipping line etc</p>
                 </div>
                 </div>
                 </div>
                 <div className="right info">
                    <img src={imgService.demoicon} alt="icon" />
                    <p>Book a personalised one-on-one demo to see how Shipment rack can enhance your logistics business.</p>
                    <button className="small-btn">Schedule a Demo</button>
                </div>
                 </div>
           </div>
           <div id="tab3" className={`${showRateDown}`} style={styledown}>
              <ul className="shipment-tabs">
                 <li className={`${allActive}`} rel="all" onClick={() => getAll()}>All</li>
                 <li className={`${OngoingActive}`} rel="ongoing"  onClick={() => getOngoing()}>Ongoing</li>
                 <li className={`${completedActive}`} rel="completed"  onClick={() => getCompleted()}>Completed</li>
              </ul>
              <div className="shipment_container">
                 <div id="all"  className={`ship_tab_content ${showAll}`}>
                    <div className="data-container">
                       <div className="card-rows data ongoing">
                          <div className="top-row">
                          <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                          <span className="tag-ongoing">Ongoing</span>
                          <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                          </div>
                             <div className="booking-rows">
                                <div className="c_one">
                                   <h5>INMUN, India</h5>
                                   <span>Mundra</span>
                                </div>
                                <div className="c_two center">
                                   <h5>30 Days</h5>
                                   <strong className="orange-border"></strong>
                                   <span>Direct</span>
                                </div>
                                <div className="c_three">
                                   <h5>GBFXT, Europe</h5>
                                   <span>Felixstowe</span>
                                </div>
                                <div className="c_four">
                                   <h5 className="rate">Booked Price @ $ 4648</h5>
                                   
                                </div>
                               
                             </div>
                             <div className="days">
                                <ul>
                                   <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 25 Aug 2024</li>
                                   
                                </ul>
                                <ul>
                                   <li><span><img src={imgService.green_tick} alt="icon" /></span>Arrival Date: 25 Aug 2024</li>
                                </ul>
                               
                             </div>
                       </div>
                    </div>
                      <div className="data-container">
                    <div className="card-rows data completed">
                       <div className="top-row">
                          <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                          <span className="tag-completed">Completed</span>
                          <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                          </div>
                          <div className="booking-rows">
                             <div className="c_one">
                                <h5>INMUN, India</h5>
                                <span>Mundra</span>
                             </div>
                             <div className="c_two center">
                                <h5>30 Days</h5>
                                <strong className="green-borders"></strong>
                                <span>Direct</span>
                             </div>
                             <div className="c_three">
                                <h5>GBFXT, Europe</h5>
                                <span>Felixstowe</span>
                             </div>
                             <div className="c_four">
                                <h5 className="rate">Booked Price @ $ 4648</h5>
                                
                             </div>
                            
                          </div>
                          <div className="days">
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                                
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Completion Date: 25 Aug 2024</li>
                             </ul>

                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                             </ul>
                          </div>
                         
                       
                    </div>
                 </div>
                 <div className="data-container">
                    <div className="card-rows data ongoing">
                       <div className="top-row">
                          <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                          <span className="tag-ongoing">Ongoing</span>
                          <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                          </div>
                      
                          <div className="booking-rows">
                             <div className="c_one">
                                <h5>INMUN, India</h5>
                                <span>Mundra</span>
                             </div>
                             <div className="c_two center">
                                <h5>30 Days</h5>
                                <strong className="orange-border"></strong>
                                <span>Direct</span>
                             </div>
                             <div className="c_three">
                                <h5>GBFXT, Europe</h5>
                                <span>Felixstowe</span>
                             </div>
                             <div className="c_four">
                                <h5 className="rate">Booked Price @ $ 4648</h5>
                                
                             </div>
                            
                          </div>
                          <div className="days">
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                                
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>ETA Date: 25 Aug 2024</li>
                             </ul>

                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                             </ul>
                          </div>
                    </div>
                 </div>

                 <div className="data-container">
                    <div className="card-rows data completed">
                       <div className="top-row">
                          <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                          <span className="tag-completed">Completed</span>
                          <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                          </div>
                      
                          <div className="booking-rows">
                             <div className="c_one">
                                <h5>INMUN, India</h5>
                                <span>Mundra</span>
                             </div>
                             <div className="c_two center">
                                <h5>30 Days</h5>
                                <strong className="green-borders"></strong>
                                <span>Direct</span>
                             </div>
                             <div className="c_three">
                                <h5>GBFXT, Europe</h5>
                                <span>Felixstowe</span>
                             </div>
                             <div className="c_four">
                                <h5 className="rate">Booked Price @ $ 4648</h5>
                                
                             </div>
                            
                          </div>
                          <div className="days">
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                                
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Completion Date: 25 Aug 2024</li>
                             </ul>

                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                             </ul>
                          </div>
                         
                       
                    </div>
                 </div>
                 </div>
                 <div id="ongoing" className={`ship_tab_content ${showOngoing}`} >
                    <div className="data-container">
                    <div className="card-rows data ongoing">
                       <div className="top-row">
                       <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                       <span className="tag-ongoing">Ongoing</span>
                       <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                      </div>
                       <div className="booking-rows">
                          <div className="c_one">
                             <h5>INMUN, India</h5>
                             <span>Mundra</span>
                          </div>
                          <div className="c_two center">
                             <h5>30 Days</h5>
                             <strong className="orange-border"></strong>
                             <span>Direct</span>
                          </div>
                          <div className="c_three">
                             <h5>GBFXT, Europe</h5>
                             <span>Felixstowe</span>
                          </div>
                          <div className="c_four">
                             <h5 className="rate">Booked Price @ $ 4648</h5>
                    
                          </div>
                    
                       </div>
                       <div className="days">
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                    
                          </ul>
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                          </ul>
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>ETA Date: 25 Aug 2024</li>
                          </ul>
                    
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                          </ul>
                       </div>
                    </div>
                    </div>

                    <div className="data-container">
                    <div className="card-rows data ongoing">
                       <div className="top-row">
                       <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                       <span className="tag-ongoing">Ongoing</span>
                       <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                    </div>
                       <div className="booking-rows">
                          <div className="c_one">
                             <h5>INMUN, India</h5>
                             <span>Mundra</span>
                          </div>
                          <div className="c_two center">
                             <h5>30 Days</h5>
                             <strong className="orange-border"></strong>
                             <span>Direct</span>
                          </div>
                          <div className="c_three">
                             <h5>GBFXT, Europe</h5>
                             <span>Felixstowe</span>
                          </div>
                          <div className="c_four">
                             <h5 className="rate">Booked Price @ $ 4648</h5>
                    
                          </div>
                    
                       </div>
                       <div className="days">
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                    
                          </ul>
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                          </ul>
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>ETA Date: 25 Aug 2024</li>
                          </ul>
                    
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                          </ul>
                       </div>
                    </div></div>


                    <div className="data-container">
                    <div className="card-rows data ongoing">
                       <div className="top-row">
                       <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                       <span className="tag-ongoing">Ongoing</span>
                       <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                        </div>
                       <div className="booking-rows">
                          <div className="c_one">
                             <h5>INMUN, India</h5>
                             <span>Mundra</span>
                          </div>
                          <div className="c_two center">
                             <h5>30 Days</h5>
                             <strong className="orange-border"></strong>
                             <span>Direct</span>
                          </div>
                          <div className="c_three">
                             <h5>GBFXT, Europe</h5>
                             <span>Felixstowe</span>
                          </div>
                          <div className="c_four">
                             <h5 className="rate">Booked Price @ $ 4648</h5>
                    
                          </div>
                    
                       </div>
                       <div className="days">
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                    
                          </ul>
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                          </ul>
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>ETA Date: 25 Aug 2024</li>
                          </ul>
                    
                          <ul>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                             <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                          </ul>
                       </div>
                    </div>
                    </div>
                 </div>
                 <div id="completed" className={`ship_tab_content ${showCompleted}`} >

                    <div className="data-container">
                    <div className="card-rows data completed">
                       <div className="top-row">
                       <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                       <span className="tag-completed">Completed</span>
                       <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                      </div>
                          <div className="booking-rows">
                             <div className="c_one">
                                <h5>INMUN, India</h5>
                                <span>Mundra</span>
                             </div>
                             <div className="c_two center">
                                <h5>30 Days</h5>
                                <strong className="green-borders"></strong>
                                <span>Direct</span>
                             </div>
                             <div className="c_three">
                                <h5>GBFXT, Europe</h5>
                                <span>Felixstowe</span>
                             </div>
                             <div className="c_four">
                                <h5 className="rate">Booked Price @ $ 4648</h5>
                                
                             </div>
                            
                          </div>
                          <div className="days">
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                                
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Completion Date: 25 Aug 2024</li>
                             </ul>

                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                             </ul>
                          </div>
                    </div>
                    </div>


                    <div className="data-container">
                    <div className="card-rows data completed">
                       <div className="top-row">
                       <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                       <span className="tag-completed">Completed</span>
                       <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                      </div>
                          <div className="booking-rows">
                             <div className="c_one">
                                <h5>INMUN, India</h5>
                                <span>Mundra</span>
                             </div>
                             <div className="c_two center">
                                <h5>30 Days</h5>
                                <strong className="green-borders"></strong>
                                <span>Direct</span>
                             </div>
                             <div className="c_three">
                                <h5>GBFXT, Europe</h5>
                                <span>Felixstowe</span>
                             </div>
                             <div className="c_four">
                                <h5 className="rate">Booked Price @ $ 4648</h5>
                                
                             </div>
                            
                          </div>
                          <div className="days">
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                                
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Completion Date: 25 Aug 2024</li>
                             </ul>

                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                             </ul>
                          </div>
                    </div>
                    </div>


                    <div className="data-container">
                    <div className="card-rows data completed">
                       <div className="top-row">
                       <img src={imgService.MaskGroup} alt="" className="logo-fix" />
                       <span className="tag-completed">Completed</span>
                       <a href="view-booking-details.html" className="view-booking-details" target="_blank">View Booking Detail</a>
                       </div>
                      
                          <div className="booking-rows">
                             <div className="c_one">
                                <h5>INMUN, India</h5>
                                <span>Mundra</span>
                             </div>
                             <div className="c_two center">
                                <h5>30 Days</h5>
                                <strong className="green-borders"></strong>
                                <span>Direct</span>
                             </div>
                             <div className="c_three">
                                <h5>GBFXT, Europe</h5>
                                <span>Felixstowe</span>
                             </div>
                             <div className="c_four">
                                <h5 className="rate">Booked Price @ $ 4648</h5>
                                
                             </div>
                            
                          </div>
                          <div className="days">
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Booking Date: 30 July 2024</li>
                                
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Departure Date: 25 Aug 2024</li>
                             </ul>
                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Completion Date: 25 Aug 2024</li>
                             </ul>

                             <ul>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>20Ft. Container (Standard)</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Quantity :1</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>Commodity :General</li>
                                <li><span><img src={imgService.green_tick} alt="icon" /></span>19MT</li>
                             </ul>
                          </div>
                         
                       
                    </div>
                    </div>
                 </div>
              </div>
           </div>
        
           <div id="tab4" className={`${showtracktrace}`} style={styletrack}>
              
            <div className="track-trace">
             
                 <div className="track-order">
                    <div className="tracking">
                   <h2>Track Order</h2>
                   <form className="order">
                    
                    <div className="form-row">
                       <span>
                          <button className="number">BL Number</button>
                          <button className="number active">Booking Number</button>
                       </span>
                       <select>
                          <option>Select Shipping Line</option>
                          <option>Shipment-1</option>
                          <option>Shipment-2</option>
                       </select>
                    </div>
                 
                    <div className="form-row">
                       <span className="form-group"><input type="text" placeholder="Z06066552" />
                       <button className="small-btn">Track</button></span>
                    </div>
                  </form>
                 </div>
                 <img src={imgService.TrackOrder} alt="image" />
                 </div>
                <div className="data-container">
               <div className="card-rows data bg-pink">
                 <img src={imgService.CMA} alt="" className="logo-fix" />
                 <table>
                    <tr>
                       <th>Bill of Lading:</th>
                       <th>Shipped From</th>
                       <th>Port of Loading</th>
                       <th>Port of Discharge</th>
                       <th>Shipped To</th>
                       <th>Transhipment</th>
                       <th>Booking Date</th>
                       <th>Booking Number</th>
                    </tr>
                    <tr>
                       <td className="height"></td>
                    </tr>
                    <tr>
                       <td>MEDUEU760421 <br />(1 Container )</td>
                       <td>Tughlakabad, IN</td>
                       <td>Mundra, IN</td>
                       <td>Felixstowe, GB</td>
                       <td>Durban, ZA</td>
                       <td>Direct</td>
                       <td>05/07/2024</td>
                       <td>u376289889</td>
                    </tr>
                 </table>
               </div>
              </div>
              </div>

               <div className="accordian-container">
                <div className="accordian-row">
                  <div className="accordian-head">
                   <ul>
                    <li>
                       <span><img src={imgService.nouncontainer} alt="" className="icon" /> Container</span>
                       <strong>MSMU1700197</strong>
                    </li>
                    <li>
                       <span><img src={imgService.types} alt="" className="icon" /> Type</span>
                       <strong>20’ DRY VAN</strong>
                    </li>
                    <li>
                       <span><img src={imgService.sourceiconwhite} alt="" className="icon" /> Latest Move</span>
                       <strong>Felixstowe, GB</strong>
                    </li>
                    <li>
                       <span><img src={imgService.calenderwhite} alt="" className="icon" /> ETA</span>
                       <strong>15/09/2024</strong>
                    </li>
                   </ul>
                   <span className="trigger">
                    <a href="#"><img style={{display: 'none'}} src={imgService.pluswhite} alt="" className="icon" /> <img src="imgService.common/images/minus-white.svg" alt="" className="icon" /></a>
                   </span>
                  </div>


                  <table>
                    <thead>
                        <tr>
                            <th style={{width:'80px'}}>&nbsp;</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Facility Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                          <td style={{width:'80px'}}><span className="icon success"><img src={imgService.whitetick} alt="icon" /></span></td>
                            <td>Nov 08, 2016 <span>02:38 pm</span></td>
                            <td>Durban, ZA</td>
                            <td>Import to consignee</td>
                            <td>LADEN</td>
                            <td>Durban container terminal</td>
                        </tr>
                        <tr>
                          <td style={{width:'80px'}}><span className="icon wait"><img src={imgService.white_ship} alt="icon" /></span></td>
                          <td>Nov 08, 2016 <span>02:38 pm</span></td>
                            <td>Durban, ZA</td>
                            <td>Import Discharged from Vessel</td>
                            <td>MSC MONICA III IB428A</td>
                            <td>Durban container terminal</td>
                        </tr>
                        <tr>
                          <td style={{width:'80px'}}><span className="icon" ><img src={imgService.white_ship} alt="icon" /></span></td>
                          <td>Nov 08, 2016 <span>02:38 pm</span></td>
                            <td>Durban, ZA</td>
                            <td>Import Discharged from Vessel</td>
                            <td>MSC MONICA III IB428A</td>
                            <td>Durban container terminal</td>
                        </tr>
                        <tr>
                          <td style={{width:'80px'}}><span className="icon" ><img src={imgService.white_ship} alt="icon" /></span></td>
                          <td>Nov 08, 2016 <span>02:38 pm</span></td>
                            <td>Durban, ZA</td>
                            <td>Import Discharged from Vessel</td>
                            <td>MSC MONICA III IB428A</td>
                            <td>Durban container terminal</td>
                        </tr>
                        <tr>
                          <td style={{width:'80px'}}><span className="icon" ><img src={imgService.white_ship} alt="icon" /></span></td>
                          <td>Nov 08, 2016 <span>02:38 pm</span></td>
                            <td>Durban, ZA</td>
                            <td>Import Discharged from Vessel</td>
                            <td>MSC MONICA III IB428A</td>
                            <td>Durban container terminal</td>
                        </tr>
                    </tbody>
                </table>
                </div>
               </div>
            </div>

            <div id="tab5"  className='tab-content' style={searchData}>
                     <div className="card-row shadow">
                        <div className="select-rows">
                          <ul className="flag">
                            <li>FCL</li>
                            <li>CIF</li>
                          </ul>
                           <div className="select-box">
                            <img src={imgService.sourceicon} alt="icon" className="source-icon" />
                              <label> Select Source</label>
                              <div className="info readonly">
                                 <strong>{pricelistnew[0] ?.routingLegs[0].legFrom.place.name}</strong>
                                 <span>{pricelistnew[0] ?.routingLegs[0].legFrom.place.internalCode}, {pricelistnew[0] ?.routingLegs[0].legFrom.placeCountry.name}</span>
                              </div>
                           </div>
                           <div className="select-box">
                            <img src={imgService.sourceicon} alt="icon" className="source-icon" />
                                 <label>Select Destination</label>
                              <div className="info readonly">
                                 <strong>{pricelistnew[0] ?.routingLegs[0].legTo.place.name}</strong>
                                 <span>{pricelistnew[0] ?.routingLegs[0].legTo.place.internalCode}, {pricelistnew[0] ?.routingLegs[0].legTo.placeCountry.name}</span>
                              </div>
                           </div>
                           <div className="select-box fix">
                            <img src={imgService.containericon} alt="icon" className="source-icon" />
                               <label>Container Details</label>
                              <div className="info readonly">
                                <strong id="details_of_cont"></strong>
                                  <span></span>
                              </div>
                           </div>
                           <div className="btn-boxs">
                            <a className="common-btns lets-gos" onClick={() => getEditData()}>Edit</a>
                           </div>
                        </div>
                     </div>
                     <div className="filter-row">
                        <ul>
                           <li className="sort"><span>SORT BY: <span className="icons">
                              <img src={imgService.sort} alt="" />
                              </span></span>
                           </li>
                           <li className="filter"><span>FILTER BY: <span className="icons">
                            <img src={imgService.filter} alt="" />
                              </span></span>
                           </li>
                        </ul>
                        <div className="sort-box">
                          <label>Sort By</label>
                          <span className="close-icon" ><img src={imgService.close} alt="icon" /></span>
                          <div className="inner">
                            <ul>
                              <li>Basic Freight: Low - High</li>
                              <li>Basic Freight: High - Low</li>
                              <li>Transit Time: Low - High</li>
                              <li>Basic Freight: Low - High</li>
                              <li>Basic Freight: High - Low</li>
                              <li>Transit Time: Low - High</li>
                            </ul>
                          </div>
                        </div>
                        <div className="filter-box">
                             <label>Filter By</label>
                             <span className="close-icon"><img src={imgService.close} alt="icon" /></span>
                          <div className="inner scrollable-content">
                             <div className="filter-link">
                                <a href="#" className="filter-heading">Shipping Line <span className="icons">
                                <img src={imgService.blackarrow} alt="" />
                                </span></a>  
                                <div className="filter-data">
                                  <div className="form-row">
                                    <span>
                                    <input type="text" value="" placeholder="Search Pin Code" />
                                    <span>
                                    <img src={imgService.search} alt="icon" />
                                    </span>
                                    </span>
                                 </div>
                                 <div className="check-box-container scrollable-content">
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  <label className="chk_box">COGO Line <input type="checkbox" /> <span className="checkmark"></span></label>
                                  

                                 </div>
                               </div>
                             </div>
                             <div className="filter-link">
                                <a href="#" className="filter-heading">Payment Term <span className="icons">
                                  <img src={imgService.blackarrow} alt="" />
                                  </span></a>  
                                <div className="filter-data">
                                  <div className="radio-container">
                                    <input type="radio" id="radio1" name="radio-group" />
                                    <label for="radio1">Prepaid</label>
                                </div>
                                <div className="radio-container">
                                    <input type="radio" id="radio2" name="radio-group" />
                                    <label for="radio2">Collect</label>
                                </div>
                               
                                </div>
                             </div>
                             <div className="filter-link">
                                <a href="#" className="filter-heading">Date <span className="icons">
                                  <img src={imgService.blackarrow} alt="" />
                                  </span></a>  
                                <div className="filter-data">
                                  <div className="form-row">
                                    <span className="half">
                                      <label>Departure</label> 
                                    <span>
                                    <img src={imgService.calendaricon} alt="icon" />
                                    </span>
                                    </span>
                                    <span  className="half">
                                      <label>Arrival</label> 
                                      <span>
                                      <img src={imgService.calendaricon} alt="icon" />
                                      </span>
                                      </span>
                                 </div>
                                </div>
                             </div>
                             <div className="filter-link">
                                <a href="#" className="filter-heading">Shipment Type <span className="icons">
                                  <img src={imgService.blackarrow} alt="" />
                                  </span></a>  
                                <div className="filter-data">
                                  <div className="radio-container">
                                    <input type="radio" id="s1" name="radio-group" />
                                    <label for="radio1">Prepaid</label>
                                </div>
                                <div className="radio-container">
                                    <input type="radio" id="s2" name="radio-group" />
                                    <label for="radio2">Trans-Shipment</label>
                                </div>
                                </div>
                             </div>
                            
                          </div>
                       </div>
                     </div>
                     <div className="two-part-layout">
                        <aside>
                           <div className="side-bar">
                              <h3>Additional Services</h3>
                              <div className="inner">
                                 <div className="service-link">
                                    <a href="#" className="sidebar-service">Origin Transportation <span className="icons">
                                    <img src={imgService.blackarrow} alt="" />
                                    </span></a>  
                                    <div className="service-box" style={{display: 'block'}}>
                                    <div class="form-row">
                                       <div class="group">
                                          <ul>
                                             <li class="active">Factory Stuffing</li>
                                             <li>Dock Stuffing</li>
                                             </ul>
                                       </div>
                                    </div>
                                    <form>
                                          <div class="form-row">
                                             <span>
                                             <input type="text" value="" placeholder="Search Pin Code" />
                                             <span>
                                             <img src={imgService.search} alt="icon" />
                                             </span>
                                             </span>
                                          </div>
                                          <div class="form-row">
                                             <label class="textarea-label">Address</label>
                                             <textarea placeholder="Enter Address"></textarea>
                                          </div>
                                          <div class="form-row">
                                             <select>
                                                <option>Truck Type</option>
                                                <option>option-2</option>
                                             </select>
                                          </div>
                                          <div class="form-row">
                                             <span>
                                             <input type="text" placeholder="Truck Count" />
                                          </span>
                                          </div>
                                          <div class="button-group">
                                             <button class="apply">Save & Proceed</button>
                                             <button class="reset">Cancel</button>
                                          </div>
                                       </form>
                                    </div>
                                 </div>
                                 <div className="service-link">
                                    <a href="#" className="sidebar-service">ICD to Port Haulage <span className="icons">
                                      <img src={imgService.blackarrow} alt="" />
                                      </span></a>  
                                    <div className="service-box">
                                       Text Goes here
                                    </div>
                                 </div>
                                 <div className="service-link">
                                    <a href="#" className="sidebar-service">Origin Custom Clearance <span className="icons">
                                      <img src={imgService.blackarrow} alt="" />
                                      </span></a>  
                                    <div className="service-box">
                                       Text Goes here
                                    </div>
                                 </div>
                                 <div className="service-link">
                                    <a href="#" className="sidebar-service">Origin CFS Clearance <span className="icons">
                                      <img src={imgService.blackarrow} alt="" />
                                      </span></a>  
                                    <div className="service-box">
                                       Text Goes here
                                    </div>
                                 </div>
                                 <div className="service-link">
                                    <a href="#" className="sidebar-service">Other Services <span className="icons">
                                      <img src={imgService.blackarrow} alt="" />
                                      </span></a>  
                                    <div className="service-box">
                                       Text Goes here
                                    </div>
                                 </div>
                              </div>
                             
                           </div>
                        </aside>
                        <div className="main">
                         <div className="data-container">
                              <ul className="date-tabs">
                                 { pricelistnew.map((val,index)=>{ 
                                 return (  
                                 <li className={index == 0 ? 'tablink active' : 'tablink'} id={`${index}-tab`} onClick={(event) => allprice(event, index, 'date_tab_content', 'tablink')}><span>{new Date(val.routingLegs[0].departureDate).toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})} - {new Date(val.routingLegs[0].arrivalDate).toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})}</span><strong>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].currency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].allInRate}</strong></li>
                                 )
                                 } )}  
                              </ul>
                              <div className="card-row data">
                                 <img src={imgService.CMA} alt="" className="logo-fix" />
                                 { pricelistnew.map((val,index)=>{ 
                                   var soucecountryCode = val.routingLegs[0].legFrom.placeCountry.code;
                                   var desticountryCode = val.routingLegs[0].legTo.placeCountry.code;
                                   var currency1 =  val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[1] ?.chargeCurrency.currencyCode;
                                   var currency2 =  val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[2] ?.chargeCurrency.currencyCode;
                                   var currency3 =  val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[3] ?.chargeCurrency.currencyCode
                                   var currency4 =  val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[4] ?.chargeCurrency.currencyCode;
                                   var currency5 =  val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[5] ?.chargeCurrency.currencyCode;
                                   var currency6 =  val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[6] ?.chargeCurrency.currencyCode;
                                   var currency7 =  val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[7] ?.chargeCurrency.currencyCode;

                        return (
                     <div id={index} className="date_tab_content"  style={index == 0 ? {display : 'block'} : {display : 'none'}} >
                        <div className="booking-row">
                           <div className="c_one">
                              <h5>{val.routingLegs[0].legFrom.place.internalCode}, {val.routingLegs[0].legFrom.placeCountry.name}</h5>
                              <span>{val.routingLegs[0].legFrom.place.name}</span>
                           </div>
                           <div className="c_two center">
                              <h5>{val.transitTime} Days</h5>
                              <strong className="green-border"></strong>
                              <span>Direct</span>
                           </div>
                           <div className="c_three">
                              <h5>{val.routingLegs[0].legTo.place.internalCode}, {val.routingLegs[0].legTo.placeCountry.name}</h5>
                              <span>{val.routingLegs[0].legTo.place.name}</span>
                           </div>
                           <div className="c_four">
                              <h5 className="rate">{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].currency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].basicOceanFreightRate}</h5>
                              <span>Freight</span>
                           </div>
                           <div className="c_five">
                              <button className="common-btn"><a href="#" onClick={() => ConfirmBooking(val.routingLegs[0].arrivalDate, val.routingLegs[0].departureDate, val.transitTime,soucecountryCode,desticountryCode,currency1, currency2, currency3, currency4, currency5, currency6, currency7, val.routingLegs[0].legFrom.place.internalCode, val.routingLegs[0].legFrom.placeCountry.name,val.routingLegs[0].legFrom.place.name,val.routingLegs[0].legTo.place.internalCode,val.routingLegs[0].legTo.placeCountry.name, val.routingLegs[0].legTo.place.name, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].basicOceanFreightRate, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].allInRate, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[1].charge.chargeName, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[1].amount, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[2] ?.charge.chargeName, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[2] ?.amount, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[3] ?.charge.chargeName,val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[3] ?.amount, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[4] ?.charge.chargeName, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[4] ?.amount, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[5] ?.charge.chargeName, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[5] ?.amount, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[6] ?.charge.chargeName, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[6] ?.amount, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[7] ?.charge.chargeName, val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[7] ?.amount )}>Book @ {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].currency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].allInRate}</a></button>
                           </div>
                        </div>
                        <div className="days">
                           <ul>
                           { providerlist.map((listdata,index)=>{ 
                              var dec = listdata.description
                              var dec = dec.replace('demmurage day(s)','Days')
                              var dec = dec.replace('detention day(s)','Days')
                        return (
                              <li id={`timeduration${index}`}><span><img src={imgService.green_tick} alt="icon" /></span>{listdata.title}: {dec}</li>
                            )}
                            )}
                           </ul>
               
                        </div>
                        <div className="last-row">
                                     <p>The rate shown includes only ocean freight between seaports, and does not include Haulage between Seaport and ICD</p>
                                     <a href="#/" class="view-datails"   onClick={(event) => brickupDetails(event, `service${index}`, `sidebar${index}`)} id={`sidebar${index}`} >View Breakup Details<img src={imgService.doublearrow} alt="icon" /></a>
                        </div>
                     </div>
                         )
                        } )}  
                               
                              </div>
                           
                           { pricelistnew.map((val,index)=>{ 
                             return (
                           <div className="breakup" id={`service${index}`} style={{display:'none'}}>
                              <ul className="breakup-tabs">
                                <li className={ocnActive} rel="breakup-tab1" onClick={() => ocanTab()}>Ocean Freight</li>
                                <li className={locActive} rel="breakup-tab2" onClick={() => localTab()}>Local charges</li>
                              </ul>
                              <div id="breakup-tab1" className="breakup-tab-content" style={ocntabs}>
                              <div className="list">
                                {/* <h5>20 FT, STANDARD, GENERAL</h5> */}
                                <table>
                                  <tr>
                                    <td>Basic Freight</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].currency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].basicOceanFreightRate}</b></td>
                                  </tr>
                                </table>
                              </div>
                              </div>
                              <div id="breakup-tab2" className="breakup-tab-content" style={loctabs}>
                              <div className="list"> 
                                <table>
                                  <tr>
                                    <td>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[1].charge.chargeName}</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[1].pivotCurrency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[1].amount}</b></td>
                                  </tr>
                                  <tr>
                                    <td>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[2].charge.chargeName}</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[2].chargeCurrency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[2].amount}</b></td>
                                  </tr>
                                  <tr>
                                    <td>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[3] ?.charge.chargeName}</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[3] ?.chargeCurrency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[3] ?.amount}</b></td>
                                  </tr>
                                  {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[4] ?
                                  <tr>
                                    <td>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[4] ?.charge.chargeName}</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[4] ?.chargeCurrency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[4] ?.amount}</b></td>
                                  </tr> : ''}
                                  {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[5] ?
                                  <tr>
                                    <td>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[5] ?.charge.chargeName}</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[5] ?.chargeCurrency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[5] ?.amount}</b></td>
                                  </tr> : '' }
                                  {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[6] ?
                                  <tr>
                                    <td>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[6] ?.charge.chargeName}</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[6] ?.chargeCurrency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[6] ?.amount}</b></td>
                                  </tr> : ''}
                                  {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[7] ?
                                  <tr>
                                    <td>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[7] ?.charge.chargeName}</td>
                                    <td><b>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[7] ?.chargeCurrency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].matchingCargoSurcharges[7] ?.amount}</b></td>
                                  </tr>
                                   : '' }
                                </table>
                                </div>
                                </div>
                            </div>
                             )
                           })}
                        </div>
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
