import React, { useState, useEffect } from 'react'
import axios, { formToJSON } from 'axios'
import { useNavigate } from 'react-router-dom';
import  "../../assets/css/search-result.css"
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import imgSource from '../../helper/dataManipulation/globalHome'
import {selectSourcevalue, selectDestinationvalue, handleSource, handleDestination, getContainerDetails, allprice, cancelContainerDetails} from "../../helper/dataManipulation/shipkart_hepler.js"
import userService from '../../services/user_service'




export default function SearchReasult() {
   const [sourcelist, setSourcelist] = useState([]);
    const [pricelist, setPricelist] = useState([]);
    const [pricelistnew, setPricelistnew] = useState([]);
    const [providerlist, setProviderlist] = useState([]);
    const [formShowedit, setformShowedit] = useState({ display: 'none' })
    const [searchData, setSearchData] = useState({  })
    const [containerslist, setContainerslist] = useState()
    const [newSourceData, setnewSourcelist] = useState('')
    const [newDestination, setnewDestinationlist] = useState('')
    const [newCont, setContainerlist] = useState('')
    const navigate = useNavigate();
    const url = window.location.href;
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var todayDate = new Date().toISOString().slice(0, 10);
    var todayTime =new Date().toLocaleTimeString();
    var source = queryString.get('source');
    source =  source.split(',');
    var distenation = queryString.get('distenation');
    distenation =  distenation.split(',');

    useEffect(() => {   
      const getPriceList = async (event) => {  
         const payload = {
            locationCodificationType: 'UNLOCODE',
            portOfLoading:  source[1],
            portOfDischarge: distenation[1],
            equipmentGroupIsoCode: queryString.get('equipmentGroupIsoCode'),
            numberOfContainer: queryString.get('numberOfContainer'),
            weightPerContainer: queryString.get('weightPerContainer'),
            currenteDate: todayDate+' '+todayTime,
          }
          const test = JSON.stringify(payload)
          const obj = JSON.parse(test);
          const result  =  await userService.getPriceData(process.env.REACT_APP_GETPRICE_URL, obj,)
          setPricelistnew(result.data);
      }
      getPriceList()
      const getProvider = async (event) => {  
         const result  =  await userService.getProviderList(process.env.REACT_APP_GETDETENTION_URL)
         setProviderlist(result.data);
      }
      getProvider()
      }, []);
  

      // Search Source data
         const selectSource = async (event) => {
            var des = document.getElementById('destinationeopen');
            des.classList.remove('open');
            var elm = document.getElementById('sourceopen');
               elm.classList.add('open');
            const result  =  await userService.getSourceData(process.env.REACT_APP_LOCATION_URL)
            setSourcelist(result.data);
         }

        // Search Destination data

         const selectDestination = async (event) => {
            var sou = document.getElementById('sourceopen');
            sou.classList.remove('open');
            var elm = document.getElementById('destinationeopen');
            elm.classList.add('open');
            const result  =  await userService.getSourceData(process.env.REACT_APP_LOCATION_URL)
            setSourcelist(result.data);
         
         }

   

    
    
      // get Container list

      const selectContainer = async (event) => { 
         var sou = document.getElementById('sourceopen');
         sou.classList.remove('open');
         var elm = document.getElementById('destinationeopen');
         elm.classList.remove('open');
         var cnt = document.getElementById('containeropen');
         cnt.classList.add('open');
      }

   
      const getPriceListData = (e) => {
         var source = document.getElementById("source").value;
         var distenation = document.getElementById("destination").value;
         if(source != '' && distenation != ''){
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
            setformShowedit({ display: 'none' });
            setSearchData({ });
            setContainerlist(st+' Container, '+ containersizedata+ ','+ containertypedata+','+ commoditydata+','+ cargoweight);
            navigate('/search-result?source='+source+'&distenation='+distenation+'&numberOfContainer='+st+'&weightPerContainer='+cargoweight+'&containertypedata='+containertypedata+'&commoditydata='+commoditydata+'&equipmentGroupIsoCode='+containersizedata+'&AST0OJG1AJLVOT6KKPOOKKFZOZIQL',{replace:true})
            window.location.reload(); 
        }else{
           alert('please Select Source & Destinmation!')
        }
   
      }

      function editSearch(){
         //console.log('ok');
         setformShowedit({ display: 'block' });
         setSearchData({ display: 'none' });
      }

     

      if(newSourceData != '' && newDestination != ''){
        var newSource = newSourceData;
        var newDes = newDestination;
        var cntdtl = newCont;

      }else{
        var newSource = queryString.get('source');
        var newDes = queryString.get('distenation');
        var cntdtl = queryString.get('numberOfContainer')+' Container, '+ queryString.get('equipmentGroupIsoCode')+ ','+ queryString.get('containertypedata')+','+ queryString.get('commoditydata')+','+ queryString.get('weightPerContainer');
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

     
  return (
    <>
     <section className="main">
    <Header />
    <section className="container-info">
   <div className="container">
      <div className="row">
         <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12">
         <htmlFor style={formShowedit}>
             <div className="inner">
                 <div className="select-box">
                    <div className='info edit' id="sourceopen">
                      <div className="icon-label">
                         <img src={imgSource.sourceblue} alt="icon" className="source-icon" />
                           {/* <label> Select Source</label> */}
                           <input type="text" className='source' onClick={() => selectSource()} id="source" onChange={selectSourcevalue}  name="source"  placeholder={newSource}  />
                           </div>
                            <ul id="soulist" className="option-list">
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
                 <div className="select-box">   
                    <div className='info edit' id="destinationeopen">
                      <div className="icon-label">
                         <img src={imgSource.sourceblue} alt="icon" className="source-icon" />
                         <input type="text" className='source' onClick={() => selectDestination()} id="destination" onChange={selectDestinationvalue}   placeholder={newDes}  />
                           </div>
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
                    <div className='info edit' id="containeropen">
                      <div className="icon-label">
                      <img src={imgSource.containericonblue} alt="icon" className="source-icon" />
                      <label id='containerdetails' style={{ display: 'block'}} onClick={() => selectContainer()}>{cntdtl}</label>
                      <div id="containerdata" onClick={() => selectContainer()}></div>
                      <div id="containersizedata" onClick={() => selectContainer()}></div>
                      <div id="containertypedata" onClick={() => selectContainer()}></div>
                      <div id="commoditydata" onClick={() => selectContainer()}></div>
                    
                      </div>
                          <div className="container-list" style={containerslist}>
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
                                   <img src={imgSource.search} alt="icon" />
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
                                <span><input type="text"  id="cargoweight" name="cargo_weight" placeholder='100' /></span>
                             </div>
 
                             <div className="filter-row border-none">
                                <div className="toggler">
                                  
                                  <p> <small>Import</small>
                                   <label className="switch">
                                      <input type="checkbox" checked />
                                      <span className="slider round"></span>
                                    </label>
                                   <small className="export active">Export</small></p>
                                </div>
                             </div>
 
                          </div>
                             <div className="button-group">
                                <button className="reset" onClick={() => cancelContainerDetails()}>Cancel</button>
                                <button className="apply" onClick={() => getContainerDetails()}>Apply</button>
                               </div>
                          </div>     
                    </div>
                 </div>
                 <div className="btn-box">
                  <a className="lets-go-home" href="#" onClick={() => getPriceListData()}>Let’s go! <img src={imgSource.searchwhite} alt="icon" /></a>
                 </div>
              </div>
            </htmlFor>
           <div className="inner search-result" style={searchData}>
            <div className="select-box-data">
               <img src={imgSource.sourceblue} alt="icon"  className="source-icon" />
                 <div className="info">
                    <span>{newSource}</span>
                 </div>
              </div>
              <div className="select-box-data">
               <img src={imgSource.sourceblue} alt="icon"  className="source-icon" />
                 <div className="info">
                    <span>{newDes}</span>
                 </div>
              </div>
              <div className="select-box-data">
               <img src={imgSource.containericonblue} alt="icon" className="source-icon" />
                 <div className="info">
                    <span id="details_of_cont">{cntdtl}</span>
                 </div>
              </div>
              <div className="btn-box">
               {/* <a className="lets-go" href="#">Lets go!  <img src={imgSource.searchicon} alt="icon"  className="search-icon" /></a> */}
               <a className="lets-go edit" href="#" onClick={() => editSearch()}>Edit <img src={imgSource.pencilline} alt="icon" /></a>
              </div>
           </div>
         </div>
      </div>
   </div>
   </section>
   
   <section className="container-result">
      <div className="container">
         <div className="row">
            <div className="left">
               <div className="data-container">
                 <ul className="date-tabs">
                           { pricelistnew.map((val,index)=>{ 
                           return (  
                           <li className={index == 0 ? 'tablink active' : 'tablink'} id={`${index}-tab`} onClick={(event) => allprice(event, index, 'date_tab_content', 'tablink')}><span>{new Date(val.routingLegs[0].departureDate).toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})} - {new Date(val.routingLegs[0].arrivalDate).toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})}</span><strong>{val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].currency.currencyCode} {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].allInRate}</strong></li>
                           )
                           } )}  
                  </ul>
                  <div className="card-row data">
                     <img src={imgSource.cma} alt="" className="logo-fix" />
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
                              <li id={`timeduration${index}`}><span><img src={imgSource.greentick} alt="icon" /></span>{listdata.title}: {dec}</li>
                            )}
                            )}
                           </ul>
               
                        </div>
                        <div className="last-row">
                           <p>The rate shown includes only ocean freight between seaports, and does not include Haulage between Seaport and ICD</p>
                           
                        </div>
                     </div>
                         )
                        } )}  
                  </div>
                 
               </div>
               {/* <div className="data-container">
                  <ul className="date-tabs2">
                     <li className="active" rel="d-tab1"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                     <li rel="d-tab2"><span>24 Jun 24 - 24 Jun 24</span><strong>$3452</strong></li>
                     <li rel="d-tab3"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                  </ul>
                  <div className="card-row data">
                     <img src={imgSource.cma} alt="" className="logo-fix" />
                     <div id="d-tab1" className="date_tab_content2" onClick={() => selectTab2()} style={datatab2}>
                        <div className="booking-row">
                           <div className="c_one">
                              <h5>INMUN, India</h5>
                              <span>Mundra</span>
                           </div>
                           <div className="c_two center">
                              <h5>30 Days</h5>
                              <strong className="green-border"></strong>
                              <span>Direct</span>
                           </div>
                           <div className="c_three">
                              <h5>GBFXT, Europe</h5>
                              <span>Felixstowe</span>
                           </div>
                           <div className="c_four">
                              <h5 className="rate">$ 4102</h5>
                              <span>Freight</span>
                           </div>
                           <div className="c_five">
                              <button className="common-btn"><a href="confirm-booking.html">Book @ $ 4648</a></button>
                           </div>
                        </div>
                        <div className="days">
                           <ul>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Origin Detention: 7 Days</li>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Origin Demurrage : 4 Days</li>
                           </ul>
                           <ul>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Destination Detention : 7 Days</li>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Destination Demurrage : 7 Days</li>
                           </ul>
                        </div>
                        <div className="last-row">
                           <p>The rate shown includes only ocean freight between seaports, and does not include Haulage between Seaport and ICD</p>
                        </div>
                     </div>
                     <div id="d-tab2" className="date_tab_content2">
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate consequatur consectetur laboriosam nostrum sunt earum magni tempore.</p>
                     </div>
                     <div id="d-tab3" className="date_tab_content2">
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate consequatur consectetur laboriosam nostrum sunt earum magni tempore.</p>
                     </div>
                  </div>
              
               </div> */}
               {/* <div className="data-container">
                  <ul className="date-tabs3">
                     <li className="active" rel="dtab1"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                     <li rel="dtab2"><span>24 Jun 24 - 24 Jun 24</span><strong>$3452</strong></li>
                     <li rel="dtab3"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                  </ul>
                  <div className="card-row data">
                     <img src={imgSource.cma} alt="" className="logo-fix" />
                     <div id="dtab1" className="date_tab_content3" onClick={() => selectTab3()} style={datatab3}>
                        <div className="booking-row">
                           <div className="c_one">
                              <h5>INMUN, India</h5>
                              <span>Mundra</span>
                           </div>
                           <div className="c_two center">
                              <h5>30 Days</h5>
                              <strong className="green-border"></strong>
                              <span>Direct</span>
                           </div>
                           <div className="c_three">
                              <h5>GBFXT, Europe</h5>
                              <span>Felixstowe</span>
                           </div>
                           <div className="c_four">
                              <h5 className="rate">$ 4102</h5>
                              <span>Freight</span>
                           </div>
                           <div className="c_five">
                              <button className="common-btn"><a href="confirm-booking.html">Book @ $ 4648</a></button>
                           </div>
                        </div>
                        <div className="days">
                           <ul>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Origin Detention: 7 Days</li>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Origin Demurrage : 4 Days</li>
                           </ul>
                           <ul>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Destination Detention : 7 Days</li>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Destination Demurrage : 7 Days</li>
                           </ul>
                        </div>
                        <div className="last-row">
                           <p>The rate shown includes only ocean freight between seaports, and does not include Haulage between Seaport and ICD</p>
                        </div>
                     </div>
                     <div id="dtab2" className="date_tab_content3">
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate consequatur consectetur laboriosam nostrum sunt earum magni tempore.</p>
                     </div>
                     <div id="dtab3" className="date_tab_content3">
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate consequatur consectetur laboriosam nostrum sunt earum magni tempore.</p>
                     </div>
                  </div>
               </div> */}
               <div className="data-container"  style={{position: 'relative'}}>
                  <div className="lock">
                   <img src={imgSource.lockicon} alt="icon" />
                   <button className="common-btn">Login to view More</button>
                  </div>
                  <div className="blur">
                     <ul className="date-tabs4">
                     <li className="active" rel="dtab1"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                     <li rel="dtab2"><span>24 Jun 24 - 24 Jun 24</span><strong>$3452</strong></li>
                     <li rel="dtab3"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                  </ul>
                  <div className="card-row data">
                     <img src={imgSource.cma} alt="" className="logo-fix" />
                     <div id="dtab1" className="date_tab_content4">
                        <div className="booking-row">
                           <div className="c_one">
                              <h5>INMUN, India</h5>
                              <span>Mundra</span>
                           </div>
                           <div className="c_two center">
                              <h5>30 Days</h5>
                              <strong className="green-border"></strong>
                              <span>Direct</span>
                           </div>
                           <div className="c_three">
                              <h5>GBFXT, Europe</h5>
                              <span>Felixstowe</span>
                           </div>
                           <div className="c_four">
                              <h5 className="rate">$ 4102</h5>
                              <span>Freight</span>
                           </div>
                           <div className="c_five">
                              <button className="common-btn"><a href="confirm-booking.html">Book @ $ 4648</a></button>
                           </div>
                        </div>
                        <div className="days">
                           <ul>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Origin Detention: 7 Days</li>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Origin Demurrage : 4 Days</li>
                           </ul>
                           <ul>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Destination Detention : 7 Days</li>
                              <li><span><img src={imgSource.greentick} alt="icon" /></span>Destination Demurrage : 7 Days</li>
                           </ul>
                        </div>
                        <div className="last-row">
                           <p>The rate shown includes only ocean freight between seaports, and does not include Haulage between Seaport and ICD</p>
                        </div>
                     </div>
                     <div id="dtab2" className="date_tab_content4" style={{display: 'none'}} >
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate consequatur consectetur laboriosam nostrum sunt earum magni tempore.</p>
                     </div>
                     <div id="dtab3" className="date_tab_content4" style={{display: 'none'}}>
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate consequatur consectetur laboriosam nostrum sunt earum magni tempore.</p>
                     </div>
                  </div>
               </div>
               </div>
            </div>
            <div className="right">
            <figure className="add-box">
               <a href="#"><img src={imgSource.add1} alt="image" /></a>
            </figure>
            <figure className="add-box">
               <a href="#"><img src={imgSource.add2} alt="image" /></a>
            </figure>
            </div>
            </div>
         </div>
   </section>
   <Footer />
   </section>
   </>
  )
}
