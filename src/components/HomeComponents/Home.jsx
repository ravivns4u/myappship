import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../../assets/css/home.css'
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import imgSource from '../../helper/dataManipulation/globalHome'
import {selectSourcevalue, selectDestinationvalue, handleSource, handleDestination, getContainerDetails, allprice, cancelContainerDetails} from "../../helper/dataManipulation/shipkart_hepler.js"
import userService from '../../services/user_service'

export default function Home() {
    const [showAllRates,setAllRates] = useState('allRates');
    const [showRateUp,setRateUp] = useState('tab_content');
    const [showRateDown,setRateDown] = useState('tab_content');
    const [showActive,setActive] = useState('active');
    const [upActive,setupActive] = useState('');
    const [downActive,setdownActive] = useState('');
    const [style, setStyle] = useState({ opacity: 1 })
    const [styleup, setupStyle] = useState({ opacity: 0 })
    const [styledown, setdownStyle] = useState({ opacity: 0 })
    const [activateNext,setactivateNext] = useState(false);
    const [compare, setCompare] = useState([]);
    const [upcompare, setupCompare] = useState([]);
    const [downcompare, setdownCompare] = useState([]);
    const [sourcelist, setSourcelist] = useState([]);
    const navigate = useNavigate();


       // getAllPrice API

      useEffect(() => {
         axios
           .get(process.env.REACT_APP_GETCOMPARE_URL)
           .then((res) => setCompare(res.data.data))
           .catch((err) => console.log(err));
       }, []);

       // getAllPriceUp API

       useEffect(() => {
         axios
           .get(process.env.REACT_APP_GETCOMPARE_URL+`?isPriceDown=false`)
           .then((res) => setupCompare(res.data.data))
           .catch((err) => console.log(err));
       }, []);

       // getAllPriceDown API

       useEffect(() => {
         axios
           .get(process.env.REACT_APP_GETCOMPARE_URL+`?isPriceDown=true`)
           .then((res) => setdownCompare(res.data.data))
           .catch((err) => console.log(err));
       }, []);

      useEffect(() => {
        const items = document.querySelectorAll('.item');
        let currentIndex = 0;
        // Function to add 'active' class to the next element
        function setactivateNext() {
            // Remove 'active' class from all items
            items.forEach(item => item.classList.remove('active'));
            items[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % items.length;
        }
        setInterval(setactivateNext, 2000);
        setactivateNext();
      }, [])

   

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

    function allRates(){
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

    function rateUp(){
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


    function rateDown(){
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
         navigate('/search-result?source='+source+'&distenation='+distenation+'&numberOfContainer='+st+'&weightPerContainer='+cargoweight+'&containertypedata='+containertypedata+'&commoditydata='+commoditydata+'&equipmentGroupIsoCode='+containersizedata+'&AST0OJG1AJLVOT6KKPOOKKFZOZIQL',{replace:true})
     }else{
        alert('please Select Source & Destinmation!')
     }

   }
   
    
  
    
   
  return (
    <>
   <section className="main">
    <Header />
    <section className="home-hero">
    <div className="container">
       <div className="row">
          <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12">
            <h1>Get the Global Lowest Freight <span>Rates</span></h1>
            <h6>Known for its extensive network and competitive rates.</h6>
          </div>
       </div>
       <div className="row">
          <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12">
            <htmlFor>
             <div className="select-row">
                 <div className="select-box">
                    <div className='info edit' id="sourceopen">
                      <div className="icon-label">
                         <img src={imgSource.sourceicon} alt="icon" className="source-icon" />
                           {/* <label> Select Source</label> */}
                           <input type="text" className='source' onClick={() => selectSource()} id="source" onChange={selectSourcevalue}  name="source"  placeholder='Select Source'  />
                           </div>
                            <ul id="soulist" className="option-list" >
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
                         <img src={imgSource.sourceicon} alt="icon" className="source-icon" />
                         <input type="text" className='source' onClick={() => selectDestination()} id="destination" onChange={selectDestinationvalue}  placeholder='Select Destination'  />
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
                      <img src={imgSource.containericon} alt="icon" className="source-icon" />
                      <label id='containerdetails' style={{ display: 'block'}} onClick={() => selectContainer()}>Container Details</label>
                      <div id="containerdata" onClick={() => selectContainer()}></div>
                      <div id="containersizedata" onClick={() => selectContainer()}></div>
                      <div id="containertypedata" onClick={() => selectContainer()}></div>
                      <div id="commoditydata" onClick={() => selectContainer()}></div>
                      </div>
                          <div className="container-list" >
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
                             
                                     {/* <p> <input type="radio" id="general" name="Commodity" value="General" /> <label for="general">General</label></p>
                                     <p><input type="radio" id="pta" name="Commodity" value="PTA" /> <label for="pta">PTA</label> </p>
                                     <p> <input type="radio" id="cottons" name="Commodity" value="Cottons" /> <label for="cottons">Cottons & yarn</label></p>   */}
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
          </div>
       </div>
 
       <div className="row">
       <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12">
       <div className="bottom-row">
       <ul>
          <li><img src={imgSource.greensearch} alt="icon" /> Search Best Rates</li>
          <li><img src={imgSource.Dollar} alt="icon" /> Compare Freight Rates</li>
          <li><img src={imgSource.booking} alt="icon" /> Hassle Free Booking</li>
       </ul>
       </div>
       </div>
       </div>
    </div>
    </section>
 
    <section className="freight-rates-container">
     <div className="container">
       <div className="row">
          <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12 text-center">
             <h2>Ocean Freight Rates Index</h2>
          </div>
       </div>
      <div className="row inner">
      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
       <ul className="sub-header-tabs">
          <li className={`${showActive}`} rel="tab1" onClick={() => allRates()}>All Rates</li>
          <li rel="tab2" className={`${upActive}`} onClick={() => rateUp()}>Rates Going Up</li>
          <li rel="tab3" className={`${downActive}`} onClick={() => rateDown()}>Rates Going Down</li>
       </ul>
       <div className="tab_container">
          <div id="tab1" className={` ${showAllRates}`} style={style}>
             <div className="table-responsive">
           <table>
           { compare.map((alldata, index) => { //console.log(alldata.portOfLoading)
		   	  
              return ( 
               <>
               <tr>
               <td><span className="icon"><img src={imgSource.blueship} alt="icon" /></span>{alldata.portOfLoading} <span className="icon arrow"><img src={imgSource.arrowblack} alt="icon" /></span> <span className="icon"><img src={imgSource.blueship} alt="icon" /></span>{alldata.portOfDischarge}</td>
               <td> <del>${alldata.pastPrice} </del> {alldata.currentPrice == alldata.pastPrice ?<b>${alldata.currentPrice}</b>  :  <b className="green">${alldata.currentPrice}</b> } </td>
               <td><strong>{alldata.equipmentGroupIsoCode}</strong></td>
               <td className="d-flex"><span className="percent">{Math.round(alldata.diffPriceInPercentage)}%</span>  {alldata. isPriceDown === false ? <img src={imgSource.arrowred} alt="icon" className="red-icon" /> : <img src={imgSource.arrowgreen} alt="icon" className="green-icon" />} </td>
             </tr>
             <tr>
             <td colspan="4" className="seprator"></td>
             </tr>
             </>
                )
        })}
               
           </table>
             </div>
          </div>
          <div id="tab2" className={`${showRateUp}`} style={styleup}>
             <div className="table-responsive">
                <table>
                { upcompare.map((alldata, index) => { //console.log(alldata.portOfLoading)
		   	  
              return ( 
               <tr>
               <td><span className="icon"><img src={imgSource.blueship} alt="icon" /></span>{alldata.portOfLoading} <span className="icon arrow"><img src={imgSource.arrowblack} alt="icon" /></span> <span className="icon"><img src={imgSource.blueship} alt="icon" /></span>{alldata.portOfDischarge}</td>
               <td> <del>${alldata.pastPrice} </del> {alldata.currentPrice == alldata.pastPrice ?<b>${alldata.currentPrice}</b>  :  <b className="green">${alldata.currentPrice}</b> } </td>
               <td><strong>{alldata.equipmentGroupIsoCode}</strong></td>
               <td className="d-flex"><span className="percent">{Math.round(alldata.diffPriceInPercentage)}%</span>  {alldata. isPriceDown === false ? <img src={imgSource.arrowred} alt="icon" className="red-icon" /> : <img src={imgSource.arrowgreen} alt="icon" className="green-icon" />} </td>
             </tr>
                )
        })}
                    
                    <tr>
                      <td colspan="4" className="seprator"></td>
                    </tr>
                 </table>
                  </div>
          </div>
          <div id="tab3" className={`${showRateDown}`} style={styledown}>
             <div className="table-responsive">
                <table>
                { downcompare.map((alldata, index) => { //console.log(alldata.portOfLoading)
		   	  
                        return ( 
                           <tr>
               <td><span className="icon"><img src={imgSource.blueship} alt="icon" /></span>{alldata.portOfLoading} <span className="icon arrow"><img src={imgSource.arrowblack} alt="icon" /></span> <span className="icon"><img src={imgSource.blueship} alt="icon" /></span>{alldata.portOfDischarge}</td>
               <td> <del>${alldata.pastPrice} </del> {alldata.currentPrice == alldata.pastPrice ?<b>${alldata.currentPrice}</b>  :  <b className="green">${alldata.currentPrice}</b> } </td>
               <td><strong>{alldata.equipmentGroupIsoCode}</strong></td>
               <td className="d-flex"><span className="percent">{Math.round(alldata.diffPriceInPercentage)}%</span>  {alldata. isPriceDown === false ? <img src={imgSource.arrowred} alt="icon" className="red-icon" /> : <img src={imgSource.arrowgreen} alt="icon" className="green-icon" />} </td>
             </tr>
                           )
                  })}
                    <tr>
                      <td colspan="4" className="seprator"></td>
                    </tr>
                 </table>
                  </div>
          </div>
       </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
       <div id="threejs-container"></div>
      </div>
      </div>
     </div>
    </section>
 
    <section className="services">
       <div className="container">
         <div className="row">
          <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12 text-center">
             <h2>Services we Provide</h2>
             <ul>
                <li><a href="#"><img src={imgSource.ocean} alt="icon" /><span>Ocean FCL</span></a></li>
                <li><a href="#"><img src={imgSource.FTL} alt="icon" /><span>FTL</span></a></li>
                <li><a href="#"><img src={imgSource.rail} alt="icon" /><span>Rail Haulage</span></a></li>
                <li><a href="#"><img src={imgSource.trailer} alt="icon" /><span>Trailer Transport</span></a></li>
                <li className="non-active"><a href="#"><img src={imgSource.ocean} alt="icon" /><span>Ocean LCL</span></a></li>
                <li className="non-active"><a href="#"><img src={imgSource.loadpackage} alt="icon" /><span>PTL</span></a></li>
                <li className="non-active"><a href="#"><img src={imgSource.Custom} alt="icon" /><span>Custom Handling</span></a></li>
                <li className="non-active"><a href="#"><img src={imgSource.local} alt="icon" /><span>Local Handling</span></a></li>
             </ul>
          </div>
       </div>
    </div>
 </section>
 
 
    <section className="works">
       <div className="container">
         <div className="row">
          <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12 text-center">
             <h2>How it Works</h2>
             <div className="inner">
            
                <div className="center-screen">
                    <img src={imgSource.monitor} alt="Monitor" />
                </div>
            
          
                <div className={`info-box explore item ${activateNext}`}>
                    <div className="text-box"><p>Search Ocean Freight Rates</p><p>Obtain all available shipping line rates with ease.</p></div>
                    <h5>Explore</h5>
                    <span className="center-icon search"><img src={imgSource.searchblack} alt="icon" /></span>
                </div>
            
          
                <div className={`info-box compare item ${activateNext}`}>
                    <div className="text-box"><p>Compare rates for best savings</p><p>Select the fastest transit time for your convenience</p></div>
                    <h5>Compare</h5>
                    <span className="center-icon double-arrow"><img src={imgSource.compareicon} alt="icon" /></span>
                </div>
 
              
                <div className={`info-box finance item ${activateNext}`}>
                   <div className="text-box"><p>Dashboard shows real-time insights.</p><p>Monitor Invoice & Transactions.</p></div>
                   <h5>Finance</h5>
                   <span className="center-icon doc"><img src={imgSource.finance} alt="icon" /></span>
               </div>
 
          
               <div className={`info-box execute item ${activateNext}`}>
                <div className="text-box"><p>Easy Cargo Tracking.</p><p>Smooth Documentation & fillings.</p></div>
                <h5>Execute</h5>
                <span className="center-icon send"><img src={imgSource.arrowexecute} alt="icon" /></span>
            </div>
            
               
                <div className={`info-box booking item ${activateNext}`}>
                    <div className="text-box"><p>Fast & Simple Booking Steps.</p><p>Effortless procedures guarantee swift bookings.</p></div>
                    <h5>Booking</h5>
                    <span className="center-icon calender"><img src={imgSource.calendar} alt="icon" /></span>
                </div>
            </div>
            
          </div>
       </div>
    </div>
   </section>
 
   <section className="add-banner">
    <div className="container">
      <div className="row">
       <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12">
        <img src={imgSource.addbanner} alt="image"  />
       </div>
    </div>
 </div>
 </section>
 
 <section className="our-solution">
    <div className="container">
      <div className="row">
       <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12 text-center">
        <h2>Our Solutions</h2>
        <div className="inner">
        <ul className="box-group">
          <li>
             <div className="text-box color-1">
               <img src={imgSource.discovericon} alt="icon" />
               <p>Discover ,Compare & Book Shipment in Hassle Free Environment!</p>
             </div>
          </li>
          <li>
             <div className="text-box color-2">
               <img src={imgSource.pricetrend} alt="icon" />
               <p>Make Your Personalised Price Trends</p>
             </div>
          </li>
          <li>
             <div className="text-box color-3">
               <img src={imgSource.calculatoricon} alt="icon" />
               <p>Effortlessly View & Track Your Shipment Cost with Ease.</p>
             </div>
          </li>
          <li>
             <div className="text-box color-4">
               <img src={imgSource.globeicon} alt="icon" />
               <p>Extensive Cargo Tracking System</p>
             </div>
          </li>
        </ul>
        <ul className="direction">
          <li>
             <div className="arrow-box">
               <img src={imgSource.Larrow} alt="icon" className="customer" />
               <h5>Customer</h5>
             </div>
          </li>
          <li>
             <div className="arrow-box">
                <img src={imgSource.Rarrow} alt="icon" className="partner" />
                <h5>Partner</h5>
              </div>
          </li>
       </ul>
        <ul className="box-group">
          <li>
             <div className="text-box color-5">
               <img src={imgSource.giftbox} alt="icon" />
               <p>Receive your exclusive, tailored rates just for you.</p>
             </div>
          </li>
          <li>
             <div className="text-box color-6">
               <img src={imgSource.meter} alt="icon" />
               <p>100 % shipment visibility & traceability</p>
             </div>
          </li>
          <li>
             <div className="text-box color-7">
               <img src={imgSource.bulb} alt="icon" />
               <p>Empower your business journey with our innovative strategies.</p>
             </div>
          </li>
          <li>
             <div className="text-box color-8">
               <img src={imgSource.calendar} alt="icon" />
               <p>Book our specialized services to perfectly suit your customer’s needs</p>
             </div>
          </li>
        </ul>
        </div>
       </div>
    </div>
 </div>
 </section>
 
 <section className="news-blog">
    <div className="container">
      <div className="row">
       <div className="col-md-6 col-lg-6  col-xl-6 col-xxl-6">
        <div className="news">
          <h3>Latest News <a href="#">View All</a></h3>
          <ul>
             <li>
                <div className="card">
                  <figure><img src={imgSource.newsthumbnail} alt="image" /></figure>
                  <div className="text">
                   <h5>Bharti Hexacom Hits Record...</h5>
                   <small>13-09-2024</small>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, similique aliquam eveniet atque?</p>
                  </div>
                </div>
             </li>
             <li>
                <div className="card">
                  <figure><img src={imgSource.newsthumbnail} alt="image" /></figure>
                  <div className="text">
                   <h5>Bharti Hexacom Hits Record...</h5>
                   <small>13-09-2024</small>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, similique aliquam eveniet atque?</p>
                  </div>
                </div>
             </li>
             <li>
                <div className="card">
                  <figure><img src={imgSource.newsthumbnail} alt="image" /></figure>
                  <div className="text">
                   <h5>Bharti Hexacom Hits Record...</h5>
                   <small>13-09-2024</small>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, similique aliquam eveniet atque?</p>
                  </div>
                </div>
             </li>
             <li>
                <div className="card">
                  <figure><img src={imgSource.newsthumbnail} alt="image" /></figure>
                  <div className="text">
                   <h5>Bharti Hexacom Hits Record...</h5>
                   <small>13-09-2024</small>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, similique aliquam eveniet atque?</p>
                  </div>
                </div>
             </li>
          </ul>
 
        </div>
       </div>
 
 
       <div className="col-md-6 col-lg-6  col-xl-6 col-xxl-6">
          <div className="blogs">
             <h3>Latest Blogs <a href="#">View All</a></h3>
             <ul>
                <li>
                   <div className="card">
                     <div className="text">
                      <h5>P N Gadgil Jewellers IPO…</h5>
                      <p>Summary P N Gadgil Jewellers IPO has received a strong response from investors, closing with an impressive</p>
                      <small>13-09-2024</small>
                     </div>
                     <figure><img src={imgSource.blogsthumbnail} alt="image" /></figure>
                   </div>
                </li>
                <li>
                   <div className="card">
                     <div className="text">
                      <h5>P N Gadgil Jewellers IPO…</h5>
                      <p>Summary P N Gadgil Jewellers IPO has received a strong response from investors, closing with an impressive</p>
                      <small>13-09-2024</small>
                     </div>
                     <figure><img src={imgSource.blogsthumbnail} alt="image" /></figure>
                   </div>
                </li>
                <li>
                   <div className="card">
                     <div className="text">
                      <h5>P N Gadgil Jewellers IPO…</h5>
                      <p>Summary P N Gadgil Jewellers IPO has received a strong response from investors, closing with an impressive</p>
                      <small>13-09-2024</small>
                     </div>
                     <figure><img src={imgSource.blogsthumbnail} alt="image" /></figure>
                   </div>
                </li>
                <li>
                   <div className="card">
                     <div className="text">
                      <h5>P N Gadgil Jewellers IPO…</h5>
                      <p>Summary P N Gadgil Jewellers IPO has received a strong response from investors, closing with an impressive</p>
                      <small>13-09-2024</small>
                     </div>
                     <figure><img src={imgSource.blogsthumbnail} alt="image" /></figure>
                   </div>
                </li>
             </ul>
    
           </div>
       </div>
    </div>
 </div>
 </section>
 
 
 <section className="get-start">
    <div className="container">
          <div className="blue-container">
             <div className="row">
             <div className="col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                <p>Begin Your Journey With Us & Uncover Your Freight Rates Today</p>
                <span>One-stop solution to explore, book, and track your shipments.</span>
             </div>
             <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-center">
                <figure className="rocket"><img src={imgSource.rocket} alt="image" /><img src={imgSource.dots} alt="image" className="dot-img" /></figure>
             </div>
             <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex justify-content-end align-items-center">
                <button className="get-btn">Get Started</button>
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
