import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import sourceicon from '../../assets/images/source-icon.svg'
import containericon from '../../assets/images/container-icon.svg'
import search from '../../assets/images/search.svg'
import searchwhite from '../../assets/images/search-white.svg'
import greensearch from '../../assets/images/green-search.svg'
import Dollar from '../../assets/images/Dollar.svg'
import booking from '../../assets/images/booking.svg'
import blueship from '../../assets/images/blue_ship.svg'
import arrowblack from '../../assets/images/arrow-black.svg'
import arrowgreen from '../../assets/images/arrow-green.svg'
import ocean from '../../assets/images/ocean.svg'
import FTL from '../../assets/images/FTL.svg'
import rail from '../../assets/images/rail.svg'
import trailer from '../../assets/images/trailer.svg'
import loadpackage from '../../assets/images/load-package.svg'
import local from '../../assets/images/local.svg'
import Custom from '../../assets/images/Custom.svg'
import monitor from '../../assets/images/monitor.png'
import searchblack from '../../assets/images/search-black.svg'
import compareicon from '../../assets/images/compare.svg'
import finance from '../../assets/images/finance.svg'
import arrowexecute from '../../assets/images/arrow-execute.svg'
import calendar from '../../assets/images/calendar.svg'
import addbanner from '../../assets/images/add-banner.png'
import discovericon from '../../assets/images/discover-icon.svg'
import pricetrend from '../../assets/images/price-trend.svg'
import calculatoricon from '../../assets/images/calculator-icon.svg'
import globeicon from '../../assets/images/globe-icon.svg'
import Larrow from '../../assets/images/L-arrow.svg'
import Rarrow from '../../assets/images/R-arrow.svg'
import giftbox from '../../assets/images/gift-box.svg'
import meter from '../../assets/images/meter.svg'
import bulb from '../../assets/images/bulb.svg'
import newsthumbnail from '../../assets/images/news-thumbnail.png'
import blogsthumbnail from '../../assets/images/blogs-thumbnail.png'
import rocket from '../../assets/images/rocket.png'
import dots from '../../assets/images/dots.png'
import arrowred from '../../assets/images/arrow-red.svg'
import axios from 'axios'
import '../../assets/css/home.css'


export default function Home() {
    const [showData,setShowData] = useState(false);
    const [showDestination,setDestination] = useState(false);
    const [showContainer,setContainer] = useState(false);
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
    const [pricelist, setPricelist] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selecteddesOption, setSelecteddesOption] = useState(null);
    const [compare, setCompare] = useState([]);
    const [upcompare, setupCompare] = useState([]);
    const [downcompare, setdownCompare] = useState([]);
    const [containers, setContainers] = useState({ display: 'block' })
    const [containerslist, setContainerslist] = useState()
    const [formData, setFormData] = useState({});
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//     event.preventDefault(); // Prevents default form submission behavior
//     const dataToSubmit = {
//       ...formData // Any additional form data object here
//     };

//     console.log(dataToSubmit)
//     navigate('/search-result',{replace:true})
//   }

    
   // getlocation API
    useEffect(() => {
        axios
          .get(process.env.REACT_APP_LOCATION_URL)
          .then((res) => setPricelist(res.data.data))
          .catch((err) => console.log(err));
      }, []);

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

      // get Source data

      const listItems = document.querySelectorAll("#mylist li");
      listItems.forEach(function(item) {
        item.onclick = function(e) {
          document.getElementById('source').value = this.innerText;
          setShowData('')
        }
      });  
      
       // get Destenation data
      const deslistItems = document.querySelectorAll("#distenationlist li");
      deslistItems.forEach(function(item) {
        item.onclick = function(e) {
          document.getElementById('distenation').value = this.innerText;
          setDestination('')
        }
      });   

      // Search Source data
    const selectSource = (e) => {
      // console.log(e.target.value)
      // setSearch(e.target.value);
      // if(showData === 'open')
      //    setShowData('')
      // else
         setShowData('open')
         var input, filter, ul, li, a, i;
         input = document.getElementById("source");
         filter = input.value.toUpperCase();
         console.log(filter)
         ul = document.getElementById("mylist");
         li = ul.getElementsByTagName("li");
          for (i = 0; i < li.length; i++) {
           a = li[i].getElementsByTagName("p")[0];
           if(a != null){
               if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                     li[i].style.display = "";
               } else {
                     li[i].style.display = "none";
               }
            }
       
          }
     
    }

   // Search Destination data

    const selectDestination = (e) => {
       setDestination('open')
         var input, filter, ul, li, a, i;
         input = document.getElementById("distenation");
         filter = input.value.toUpperCase();
         //console.log(filter)
         ul = document.getElementById("distenationlist");
         li = ul.getElementsByTagName("li");
          for (i = 0; i < li.length; i++) {
           a = li[i].getElementsByTagName("p")[0];
           if(a != null){
               if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                     li[i].style.display = "";
               } else {
                     li[i].style.display = "none";
               }
            }
          }
    }

    function selectDes(){
      setShowData('')
        if(showDestination === 'open')
           setDestination('')
        else
           setDestination('open')
    }

   function selectSou(){
      setDestination('')
      if(showData === 'open')
         setShowData('')
      else
        setShowData('open')
    }

    
    
  // get Container list

    function selectContainer(){
      setContainerslist({ display: 'block' });
        if(showContainer === 'open')
            setContainer('')
        else
            setContainer('open')
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

    
    function getContainerDetails() {
      setContainers({ display: 'none' });
      setContainerslist({ display: 'none' });
      var st;
      st = document.getElementById("containercount").value;
      var cargoweight = document.getElementById("cargoweight").value;
      //alert(cargoweight)
      document.getElementById("containerdata").innerHTML= st+'Container, '+cargoweight;
      var ele = document.getElementsByName('container_size');
      var cntype = document.getElementsByName('container_type');
      var commodity = document.getElementsByName('Commodity');
      
            for (var i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    document.getElementById("containersizedata").innerHTML
                        = ele[i].value+',';
            }
            for (var i = 0; i < cntype.length; i++) {
               if (cntype[i].checked)
                   document.getElementById("containertypedata").innerHTML
                       = cntype[i].value+',';
           }
           for (var i = 0; i < commodity.length; i++) {
            if (commodity[i].checked)
                document.getElementById("commoditydata").innerHTML
                    = commodity[i].value+',';
           }
   }
    
  
    
   
  return (
    <>
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
          {/* <form onSubmit={handleSubmit}> */}
          <form >
             <div className="select-row">
                 <div className="select-box">
                    <div className={`info edit ${showData}`}>
                      <div className="icon-label">
                         <img src={sourceicon} alt="icon" className="source-icon" />
                           {/* <label> Select Source</label> */}
                           <input type="text" className='source' onClick={() => selectSou()} id="source" onChange={selectSource}  name="source"  placeholder='Select Source' />
                           </div>
                            <ul className="option-list" id="mylist">
                           { pricelist.map((val,index)=>{ 
                           return (  
                                 <li>
                                    <p>{val.portName}({val.portCode}) <small>{val.portCode}, {val.countryCode}</small></p>
                                    <span>{val.countryName}</span>
                                 </li>
                                 )
                              } )}  
                             </ul>
                      </div>     
                 </div>
                 <div className="select-box">   
                    <div className={`info edit ${showDestination}`}>
                      <div className="icon-label">
                         <img src={sourceicon} alt="icon" className="source-icon" />
                         <input type="text" className='source' onClick={() => selectDes()} id="distenation" onChange={selectDestination}  name="distenation"  placeholder='Select Destination' />
                           </div>
                            <ul className="option-list" id="distenationlist">
                           { pricelist.map((val,index)=>{ 
                           return (  
                                 <li>
                                    <p>{val.portName}({val.portCode}) <small>{val.portCode}, {val.countryCode}</small></p>
                                    <span>{val.countryName}</span>
                                 </li>
                                 )
                              } )}  
                             </ul>
                    </div>
                 </div>
                 <div className="select-box fix">
                    <div className={`info edit ${showContainer}`}>
                      <div className="icon-label">
                      <img src={containericon} alt="icon" className="source-icon" />
                      <label style={containers} onClick={() => selectContainer()}>Container Details</label>
                      <div id="containerdata" onClick={() => selectContainer()}></div>
                      <div id="containersizedata" onClick={() => selectContainer()}></div>
                      <div id="containertypedata" onClick={() => selectContainer()}></div>
                      <div id="commoditydata" onClick={() => selectContainer()}></div>
                    
                      </div>
                          <div className="container-list" style={containerslist}>
                             <div className="inner">
                             <div className="filter-row">
                                <label>Container Count</label>
                                <span><input type="text"  id="containercount" name="container_count" placeholder='1' /></span>
                             </div>
                             <div className="filter-row">
                                <label>Container Size</label>
                                <div className="radio-container">
                                   <input type="radio" id="s1" name="container_size" value="20GP" /><label for="radio1">20ft</label> &nbsp; &nbsp; &nbsp;
                                   <input type="radio" id="s2" name="container_size" value="40GP" /><label for="radio2">40ft</label> &nbsp; &nbsp; &nbsp;
                                   <input type="radio" id="s2" name="container_size" value="40HC" /><label for="radio3">40ft (HC)</label>
                               </div>
                             </div>
                             <div className="filter-row">
                                <label>Container Type</label>
                                <div className="radio-container col">
                                 <p><input type="radio" id="Standard" name="container_type" value="Standard" /><label for="Standard">Standard (Dry)</label> </p>
 
                                <p> <input type="radio" id="Refrigerated" name="container_type" value="Refrigerated" /> <label for="Refrigerated">  (Reefer)</label></p>
                                   
                               </div>
                             </div>
                             <div className="filter-row">
                                <label>Commodity</label>
                                <span><input type="text" placeholder="Search Commodity" /> <span>
                                   <img src={search} alt="icon" />
                                   </span></span>
                                   <div className="radio-container col">
                                     <p><input type="radio" id="akf" name="Commodity" value="AKF" /> <label for="akf">AKF</label> </p>
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
                                <span><input type="text"  id="cargoweight" name="cargo_weight"  /></span>
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
                                <button className="reset">Cancel</button>
                                <button className="apply" onClick={() => getContainerDetails()}>Apply</button>
                               </div>
                          </div>     
                    </div>
                   
 
 
                 </div>
                 <div className="btn-box">
                   <a className="common-btn lets-go" href="#">Let’s go! <img src={searchwhite} alt="icon" /></a>
                  {/* <button  className="common-btn lets-go" type="submit">Let’s go! <img src={searchwhite} alt="icon" /></button> */}
                 </div>
              </div>
            </form>
          </div>
       </div>
 
       <div className="row">
       <div className="col-md-12 col-lg-12  col-xl-12 col-xxl-12">
       <div className="bottom-row">
       <ul>
          <li><img src={greensearch} alt="icon" /> Search Best Rates</li>
          <li><img src={Dollar} alt="icon" /> Compare Freight Rates</li>
          <li><img src={booking} alt="icon" /> Hassle Free Booking</li>
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
               <tr>
               <td><span className="icon"><img src={blueship} alt="icon" /></span>{alldata.portOfLoading} <span className="icon arrow"><img src={arrowblack} alt="icon" /></span> <span className="icon"><img src={blueship} alt="icon" /></span>{alldata.portOfDischarge}</td>
               <td> <del>${alldata.pastPrice} </del> {alldata.currentPrice == alldata.pastPrice ?<b>${alldata.currentPrice}</b>  :  <b className="green">${alldata.currentPrice}</b> } </td>
               <td><strong>{alldata.equipmentGroupIsoCode}</strong></td>
               <td className="d-flex"><span className="percent">{Math.round(alldata.diffPriceInPercentage)}%</span>  {alldata. isPriceDown === false ? <img src={arrowred} alt="icon" className="red-icon" /> : <img src={arrowgreen} alt="icon" className="green-icon" />} </td>
             </tr>
                )
        })}
               <tr>
               <td colspan="4" className="seprator"></td>
               </tr>
           </table>
             </div>
          </div>
          <div id="tab2" className={`${showRateUp}`} style={styleup}>
             <div className="table-responsive">
                <table>
                { upcompare.map((alldata, index) => { //console.log(alldata.portOfLoading)
		   	  
              return ( 
               <tr>
               <td><span className="icon"><img src={blueship} alt="icon" /></span>{alldata.portOfLoading} <span className="icon arrow"><img src={arrowblack} alt="icon" /></span> <span className="icon"><img src={blueship} alt="icon" /></span>{alldata.portOfDischarge}</td>
               <td> <del>${alldata.pastPrice} </del> {alldata.currentPrice == alldata.pastPrice ?<b>${alldata.currentPrice}</b>  :  <b className="green">${alldata.currentPrice}</b> } </td>
               <td><strong>{alldata.equipmentGroupIsoCode}</strong></td>
               <td className="d-flex"><span className="percent">{Math.round(alldata.diffPriceInPercentage)}%</span>  {alldata. isPriceDown === false ? <img src={arrowred} alt="icon" className="red-icon" /> : <img src={arrowgreen} alt="icon" className="green-icon" />} </td>
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
               <td><span className="icon"><img src={blueship} alt="icon" /></span>{alldata.portOfLoading} <span className="icon arrow"><img src={arrowblack} alt="icon" /></span> <span className="icon"><img src={blueship} alt="icon" /></span>{alldata.portOfDischarge}</td>
               <td> <del>${alldata.pastPrice} </del> {alldata.currentPrice == alldata.pastPrice ?<b>${alldata.currentPrice}</b>  :  <b className="green">${alldata.currentPrice}</b> } </td>
               <td><strong>{alldata.equipmentGroupIsoCode}</strong></td>
               <td className="d-flex"><span className="percent">{Math.round(alldata.diffPriceInPercentage)}%</span>  {alldata. isPriceDown === false ? <img src={arrowred} alt="icon" className="red-icon" /> : <img src={arrowgreen} alt="icon" className="green-icon" />} </td>
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
                <li><a href="#"><img src={ocean} alt="icon" /><span>Ocean FCL</span></a></li>
                <li><a href="#"><img src={FTL} alt="icon" /><span>FTL</span></a></li>
                <li><a href="#"><img src={rail} alt="icon" /><span>Rail Haulage</span></a></li>
                <li><a href="#"><img src={trailer} alt="icon" /><span>Trailer Transport</span></a></li>
                <li className="non-active"><a href="#"><img src={ocean} alt="icon" /><span>Ocean LCL</span></a></li>
                <li className="non-active"><a href="#"><img src={loadpackage} alt="icon" /><span>PTL</span></a></li>
                <li className="non-active"><a href="#"><img src={Custom} alt="icon" /><span>Custom Handling</span></a></li>
                <li className="non-active"><a href="#"><img src={local} alt="icon" /><span>Local Handling</span></a></li>
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
                    <img src={monitor} alt="Monitor" />
                </div>
            
          
                <div className={`info-box explore item ${activateNext}`}>
                    <div className="text-box"><p>Search Ocean Freight Rates</p><p>Obtain all available shipping line rates with ease.</p></div>
                    <h5>Explore</h5>
                    <span className="center-icon search"><img src={searchblack} alt="icon" /></span>
                </div>
            
          
                <div className={`info-box compare item ${activateNext}`}>
                    <div className="text-box"><p>Compare rates for best savings</p><p>Select the fastest transit time for your convenience</p></div>
                    <h5>Compare</h5>
                    <span className="center-icon double-arrow"><img src={compareicon} alt="icon" /></span>
                </div>
 
              
                <div className={`info-box finance item ${activateNext}`}>
                   <div className="text-box"><p>Dashboard shows real-time insights.</p><p>Monitor Invoice & Transactions.</p></div>
                   <h5>Finance</h5>
                   <span className="center-icon doc"><img src={finance} alt="icon" /></span>
               </div>
 
          
               <div className={`info-box execute item ${activateNext}`}>
                <div className="text-box"><p>Easy Cargo Tracking.</p><p>Smooth Documentation & fillings.</p></div>
                <h5>Execute</h5>
                <span className="center-icon send"><img src={arrowexecute} alt="icon" /></span>
            </div>
            
               
                <div className={`info-box booking item ${activateNext}`}>
                    <div className="text-box"><p>Fast & Simple Booking Steps.</p><p>Effortless procedures guarantee swift bookings.</p></div>
                    <h5>Booking</h5>
                    <span className="center-icon calender"><img src={calendar} alt="icon" /></span>
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
        <img src={addbanner} alt="image"  />
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
               <img src={discovericon} alt="icon" />
               <p>Discover ,Compare & Book Shipment in Hassle Free Environment!</p>
             </div>
          </li>
          <li>
             <div className="text-box color-2">
               <img src={pricetrend} alt="icon" />
               <p>Make Your Personalised Price Trends</p>
             </div>
          </li>
          <li>
             <div className="text-box color-3">
               <img src={calculatoricon} alt="icon" />
               <p>Effortlessly View & Track Your Shipment Cost with Ease.</p>
             </div>
          </li>
          <li>
             <div className="text-box color-4">
               <img src={globeicon} alt="icon" />
               <p>Extensive Cargo Tracking System</p>
             </div>
          </li>
        </ul>
        <ul className="direction">
          <li>
             <div className="arrow-box">
               <img src={Larrow} alt="icon" className="customer" />
               <h5>Customer</h5>
             </div>
          </li>
          <li>
             <div className="arrow-box">
                <img src={Rarrow} alt="icon" className="partner" />
                <h5>Partner</h5>
              </div>
          </li>
       </ul>
        <ul className="box-group">
          <li>
             <div className="text-box color-5">
               <img src={giftbox} alt="icon" />
               <p>Receive your exclusive, tailored rates just for you.</p>
             </div>
          </li>
          <li>
             <div className="text-box color-6">
               <img src={meter} alt="icon" />
               <p>100 % shipment visibility & traceability</p>
             </div>
          </li>
          <li>
             <div className="text-box color-7">
               <img src={bulb} alt="icon" />
               <p>Empower your business journey with our innovative strategies.</p>
             </div>
          </li>
          <li>
             <div className="text-box color-8">
               <img src={calendar} alt="icon" />
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
                  <figure><img src={newsthumbnail} alt="image" /></figure>
                  <div className="text">
                   <h5>Bharti Hexacom Hits Record...</h5>
                   <small>13-09-2024</small>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, similique aliquam eveniet atque?</p>
                  </div>
                </div>
             </li>
             <li>
                <div className="card">
                  <figure><img src={newsthumbnail} alt="image" /></figure>
                  <div className="text">
                   <h5>Bharti Hexacom Hits Record...</h5>
                   <small>13-09-2024</small>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, similique aliquam eveniet atque?</p>
                  </div>
                </div>
             </li>
             <li>
                <div className="card">
                  <figure><img src={newsthumbnail} alt="image" /></figure>
                  <div className="text">
                   <h5>Bharti Hexacom Hits Record...</h5>
                   <small>13-09-2024</small>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, similique aliquam eveniet atque?</p>
                  </div>
                </div>
             </li>
             <li>
                <div className="card">
                  <figure><img src={newsthumbnail} alt="image" /></figure>
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
                     <figure><img src={blogsthumbnail} alt="image" /></figure>
                   </div>
                </li>
                <li>
                   <div className="card">
                     <div className="text">
                      <h5>P N Gadgil Jewellers IPO…</h5>
                      <p>Summary P N Gadgil Jewellers IPO has received a strong response from investors, closing with an impressive</p>
                      <small>13-09-2024</small>
                     </div>
                     <figure><img src={blogsthumbnail} alt="image" /></figure>
                   </div>
                </li>
                <li>
                   <div className="card">
                     <div className="text">
                      <h5>P N Gadgil Jewellers IPO…</h5>
                      <p>Summary P N Gadgil Jewellers IPO has received a strong response from investors, closing with an impressive</p>
                      <small>13-09-2024</small>
                     </div>
                     <figure><img src={blogsthumbnail} alt="image" /></figure>
                   </div>
                </li>
                <li>
                   <div className="card">
                     <div className="text">
                      <h5>P N Gadgil Jewellers IPO…</h5>
                      <p>Summary P N Gadgil Jewellers IPO has received a strong response from investors, closing with an impressive</p>
                      <small>13-09-2024</small>
                     </div>
                     <figure><img src={blogsthumbnail} alt="image" /></figure>
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
                <figure className="rocket"><img src={rocket} alt="image" /><img src={dots} alt="image" className="dot-img" /></figure>
             </div>
             <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex justify-content-end align-items-center">
                <button className="get-btn">Get Started</button>
             </div>
          </div>
       
    </div>
 </div>
 </section>
 </>
  )
}
