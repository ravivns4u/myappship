import React, { useState, useEffect } from 'react'
import axios, { formToJSON } from 'axios'
import { useNavigate } from 'react-router-dom';
import sourceblue from '../../assets/images/source-blue.svg'
import containericonblue from '../../assets/images/container-icon-blue.svg'
import searchicon from '../../assets/images/search-icon.svg'
import cma from '../../assets/images/CMA-CGM.svg'
import greentick from '../../assets/images/green_tick.svg'
import lockicon from '../../assets/images/lock-icon.svg'
import add1 from '../../assets/images/add-1.png'
import add2 from '../../assets/images/add-2.png'
import sourceicon from '../../assets/images/source-icon.svg'
import containericon from '../../assets/images/container-icon.svg'
import search from '../../assets/images/search.svg'
import searchwhite from '../../assets/images/search-white.svg'
import  "../../assets/css/search-result.css"
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';





export default function SearchReasult() {

    const [datatab1, setDatatab1] = useState({ display: 'block' })
    const [datasection0, setSection0] = useState({ display: 'block', opacity: 9999999 })
    const [datasection1, setSection1] = useState({ display: 'none', opacity: 0 })
    const [datasection2, setSection2] = useState({ display: 'none', opacity: 0 })
    const [datasection3, setSection3] = useState({ display: 'none', opacity: 0 })
    const [datasection4, setSection4] = useState({ display: 'none', opacity: 0 })
    const [active0, setActive0] = useState('active')
    const [active1, setActive1] = useState('')
    const [active2, setActive2] = useState('')
    const [active3, setActive3] = useState('')
    const [active4, setActive4] = useState('')
    const [datatab2, setDatatab2] = useState({ display: 'block' })
    const [datatab3, setDatatab3] = useState({ display: 'block' })
    const [pricelist, setPricelist] = useState([]);
    const [pricelistnew, setPricelistnew] = useState([]);
    const [providerlist, setProviderlist] = useState([]);
    const [showData,setShowData] = useState(false);
    const [showDestination,setDestination] = useState(false);
    const [showContainer,setContainer] = useState(false);
    const [containers, setContainers] = useState({ display: 'block' })
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
    const payload = {
        locationCodificationType: 'UNLOCODE',
        portOfLoading:  queryString.get('source'),
        portOfDischarge: queryString.get('distenation'),
        equipmentGroupIsoCode: queryString.get('equipmentGroupIsoCode'),
        numberOfContainer: queryString.get('numberOfContainer'),
        weightPerContainer: queryString.get('weightPerContainer'),
        currenteDate: todayDate+' '+todayTime,
      }
      const test = JSON.stringify(payload)
      const obj = JSON.parse(test);
      const payloadnew = {
         provider: 'CGM',
       
       }
       const testnew = JSON.stringify(payloadnew)
       const objnew = JSON.parse(testnew);
      const config = { headers: { "Content-Type": "application/json" } };
    // getPrice list API
    useEffect(() => {
        axios
          .post(process.env.REACT_APP_GETPRICE_URL, obj, config)
          .then((res) => setPricelistnew(res.data.data))
          .catch((err) => console.log(err));
            
        }, [pricelistnew]);


        useEffect(() => {
         axios
           .post(process.env.REACT_APP_GETDETENTION_URL, objnew, config)
           .then((res) => setProviderlist(res.data.data))
           .catch((err) => console.log(err));
             
         }, []);



       
   // console.log(providerlist)
  
       function allprice(e){
         //alert(e)
         if(e == 0){
            setSection0({ opacity: 1 });
            setSection1({ opacity: 0 });
            setSection2({ opacity: 0 });
            setSection3({ opacity: 0 });
            setSection4({ opacity: 0 });
            setTimeout(() => {
            setSection0({ display: 'block'});
            setSection1({ display: 'none' });
            setSection2({ display: 'none' });
            setSection3({ display: 'none'});
            setSection4({ display: 'none' });
            setActive0('active')
            setActive1('')
            setActive2('')
            setActive3('')
            setActive4('')
         }, 0.1999999880);
         
         }else if(e ==1){
            setSection0({ opacity: 0 });
            setSection1({ opacity: 1 });
            setSection2({ opacity: 0 });
            setSection3({ opacity: 0 });
            setSection4({ opacity: 0 });
            setTimeout(() => {
            setSection0({ display: 'none' });
            setSection1({ display: 'block'});
            setSection2({ display: 'none' });
            setSection3({ display: 'none' });
            setSection4({ display: 'none' });
            setActive0('')
            setActive1('active')
            setActive2('')
            setActive3('')
            setActive4('')
         }, 0.1999999880);
         }else if(e ==2){
            setSection0({ opacity: 0 });
            setSection1({ opacity: 0 });
            setSection2({ opacity: 1 });
            setSection3({ opacity: 0 });
            setSection4({ opacity: 0 });
            setTimeout(() => {
            setSection0({ display: 'none' });
            setSection1({ display: 'none' });
            setSection2({ display: 'block' });
            setSection3({ display: 'none' });
            setSection4({ display: 'none' });
            setActive0('')
            setActive1('')
            setActive2('active')
            setActive3('')
            setActive4('')
         }, 0.1999999880);
         }else if(e ==3){
            setSection0({ opacity: 0 });
            setSection1({ opacity: 0 });
            setSection2({ opacity: 0 });
            setSection3({ opacity: 1 });
            setSection4({ opacity: 0 });
            setTimeout(() => {
            setSection0({ display: 'none'});
            setSection1({ display: 'none'});
            setSection2({ display: 'none'});
            setSection3({ display: 'block'});
            setSection4({ display: 'none'});
            setActive0('')
            setActive1('')
            setActive2('')
            setActive3('active')
            setActive4('')
         }, 0.1999999880);
         }else if(e ==4){
            setSection0({ opacity: 0 });
            setSection1({ opacity: 0 });
            setSection2({ opacity: 0 });
            setSection3({ opacity: 0 });
            setSection4({ opacity: 1 });
            setTimeout(() => {
            setSection0({ display: 'none'});
            setSection1({ display: 'none'});
            setSection2({ display: 'none'});
            setSection3({ display: 'none'});
            setSection4({ display: 'block'});
            setActive0('')
            setActive1('')
            setActive2('')
            setActive3('')
            setActive4('active')
         }, 0.1999999880);
         }

      }
    
      function selectTab2(){
        setDatatab2({ display: 'none' });
      } 

      function selectTab3(){
        setDatatab3({ display: 'none' });
      }  
      
         // getlocation API
         useEffect(() => {
            axios
            .get(process.env.REACT_APP_LOCATION_URL)
            .then((res) => setPricelist(res.data.data))
            .catch((err) => console.log(err));
         }, []);


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
         setShowData('open')
         var input, filter, ul, li, a, i;
         input = document.getElementById("source");
         filter = input.value.toUpperCase();
         //console.log(filter)
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
   
      const getPriceListData = (e) => {
         var source = document.getElementById("source").value;
         var distenation = document.getElementById("distenation").value;
         if(source != '' && distenation != ''){
         source =  source.split(/[()]/);
         var placename = source[0];
         source =  source[1];
         distenation =  distenation.split(/[()]/);
         var desname = distenation[0];
         distenation =  distenation[1];
         var st = document.getElementById("containercount").value;
         var cargoweight = document.getElementById("cargoweight").value;
         var containersizedata = document.getElementById("containersizedata").innerHTML.replace(',', '');
         var containertypedata = document.getElementById("containertypedata").innerHTML.replace(',', '');
         var commoditydata = document.getElementById("commoditydata").innerHTML.replace(',', '');
         // const payload = {
         //    locationCodificationType: 'UNLOCODE',
         //    portOfLoading:  source,
         //    portOfDischarge: distenation,
         //    equipmentGroupIsoCode: containersizedata,
         //    numberOfContainer: st,
         //    weightPerContainer: cargoweight,
         //    currenteDate: todayDate+' '+todayTime,
         //  }
         //  const test = JSON.stringify(payload)
         //  const obj = JSON.parse(test);
        
         //    axios
         //    .post(process.env.REACT_APP_GETPRICE_URL, obj, config)
         //    .then((res) => setPricelistnew(res.data.data))
         //    .catch((err) => console.log(err));
        
          setformShowedit({ display: 'none' });
          setSearchData({ });
          setnewSourcelist(source+'/'+placename);
          setnewDestinationlist(distenation+'/'+desname);
          setContainerlist(st+' Container, '+ containersizedata+ ','+ containertypedata+','+ commoditydata+','+ cargoweight);
         navigate('/search-result?source='+source+'&placename='+placename+'&distenation='+distenation+'&destname='+desname+'&numberOfContainer='+st+'&weightPerContainer='+cargoweight+'&containertypedata='+containertypedata+'&commoditydata='+commoditydata+'&equipmentGroupIsoCode='+containersizedata+'&AST0OJG1AJLVOT6KKPOOKKFZOZIQL',{replace:true})
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
        var newSource = queryString.get('source')+','+ queryString.get('placename');
        var newDes = queryString.get('distenation')+','+ queryString.get('destname');
        var cntdtl = queryString.get('numberOfContainer')+' Container, '+ queryString.get('equipmentGroupIsoCode')+ ','+ queryString.get('containertypedata')+','+ queryString.get('commoditydata')+','+ queryString.get('weightPerContainer');
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
             <div className="select-row">
                 <div className="select-box">
                    <div className={`info edit ${showData}`}>
                      <div className="icon-label">
                         <img src={sourceicon} alt="icon" className="source-icon" />
                           {/* <label> Select Source</label> */}
                           <input type="text" className='source' onClick={() => selectSou()} id="source" onChange={selectSource}  name="source"  placeholder={newSource}  />
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
                         <input type="text" className='source' onClick={() => selectDes()} id="distenation" onChange={selectDestination}  name="distenation"   placeholder={newDes}  />
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
                      <label style={containers} onClick={() => selectContainer()}>{cntdtl}</label>
                      <div id="containerdata" onClick={() => selectContainer()}></div>
                      <div id="containersizedata" onClick={() => selectContainer()}></div>
                      <div id="containertypedata" onClick={() => selectContainer()}></div>
                      <div id="commoditydata" onClick={() => selectContainer()}></div>
                    
                      </div>
                          <div className="container-list" style={containerslist}>
                             <div className="inner">
                             <div className="filter-row">
                                <label>Container Count</label>
                                <span><input type="text"  id="containercount" name="container_count" placeholder='1' value="1" /></span>
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
                                   <img src={search} alt="icon" />
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
                                <span><input type="text"  id="cargoweight" name="cargo_weight" value="400" /></span>
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
                  <a className="lets-go-home" href="#" onClick={() => getPriceListData()}>Let’s go! <img src={searchwhite} alt="icon" /></a>
                 </div>
              </div>
            </htmlFor>
           <div className="inner" style={searchData}>
            <div className="select-box-data">
               <img src={sourceblue} alt="icon"  className="source-icon" />
                 <div className="info">
                    <span>{newSource}</span>
                 </div>
              </div>
              <div className="select-box-data">
               <img src={sourceblue} alt="icon"  className="source-icon" />
                 <div className="info">
                    <span>{newDes}</span>
                 </div>
              </div>
              <div className="select-box-data">
               <img src={containericonblue} alt="icon" className="source-icon" />
                 <div className="info">
                    <span>{cntdtl}</span>
                 </div>
              </div>
              <div className="btn-box">
               {/* <a className="lets-go" href="#">Lets go!  <img src={searchicon} alt="icon"  className="search-icon" /></a> */}
               <a className="lets-go" href="#" onClick={() => editSearch()}>Edit</a>
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
                            <li className={index == 0 ? active0: index == 1 ? active1 : index == 2 ? active2 : index == 3 ? active3 : active4} rel={`date-tab${index}`}  onClick={() => allprice(index)}><span>{new Date(val.routingLegs[0].departureDate).toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})} - {new Date(val.routingLegs[0].arrivalDate).toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})}</span><strong>${val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].allInRate}</strong></li>
                           
                          )
                     } )}  
                  
                     </ul>
                  <div className="card-row data">
                     <img src={cma} alt="" className="logo-fix" />
                     { pricelistnew.map((val,index)=>{ 
                        return (
                     <div id={`date-tab${index}`} className="date_tab_content"  style={index == 0 ? datasection0: index == 1 ? datasection1 : index == 2 ? datasection2 : index == 3 ? datasection3 : datasection4} >
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
                              <h5 className="rate">$ {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].basicOceanFreightRate}</h5>
                              <span>Freight</span>
                           </div>
                           <div className="c_five">
                              <button className="common-btn"><a href="confirm-booking.html">Book @ $ {val.quoteLines[0].surcharges.matchingSurchargesPerEquipmentTypes[0].allInRate}</a></button>
                           </div>
                        </div>
                        <div className="days">
                           <ul>
                           { providerlist.map((listdata,index)=>{ 
                              var dec = listdata.description
                              var dec = dec.replace('demmurage day(s)','Days')
                              var dec = dec.replace('detention day(s)','Days')
                        return (
                              <li><span><img src={greentick} alt="icon" /></span>{listdata.title}: {dec}</li>
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
                     <img src={cma} alt="" className="logo-fix" />
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
                              <li><span><img src={greentick} alt="icon" /></span>Origin Detention: 7 Days</li>
                              <li><span><img src={greentick} alt="icon" /></span>Origin Demurrage : 4 Days</li>
                           </ul>
                           <ul>
                              <li><span><img src={greentick} alt="icon" /></span>Destination Detention : 7 Days</li>
                              <li><span><img src={greentick} alt="icon" /></span>Destination Demurrage : 7 Days</li>
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
                     <img src={cma} alt="" className="logo-fix" />
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
                              <li><span><img src={greentick} alt="icon" /></span>Origin Detention: 7 Days</li>
                              <li><span><img src={greentick} alt="icon" /></span>Origin Demurrage : 4 Days</li>
                           </ul>
                           <ul>
                              <li><span><img src={greentick} alt="icon" /></span>Destination Detention : 7 Days</li>
                              <li><span><img src={greentick} alt="icon" /></span>Destination Demurrage : 7 Days</li>
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
                   <img src={lockicon} alt="icon" />
                   <button className="common-btn">Login to view More</button>
                  </div>
                  <div className="blur">
                     <ul className="date-tabs4">
                     <li className="active" rel="dtab1"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                     <li rel="dtab2"><span>24 Jun 24 - 24 Jun 24</span><strong>$3452</strong></li>
                     <li rel="dtab3"><span>24 Jun 24 - 24 Jun 24</span><strong>$2484</strong></li>
                  </ul>
                  <div className="card-row data">
                     <img src={cma} alt="" className="logo-fix" />
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
                              <li><span><img src={greentick} alt="icon" /></span>Origin Detention: 7 Days</li>
                              <li><span><img src={greentick} alt="icon" /></span>Origin Demurrage : 4 Days</li>
                           </ul>
                           <ul>
                              <li><span><img src={greentick} alt="icon" /></span>Destination Detention : 7 Days</li>
                              <li><span><img src={greentick} alt="icon" /></span>Destination Demurrage : 7 Days</li>
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
               <a href="#"><img src={add1} alt="image" /></a>
            </figure>
            <figure className="add-box">
               <a href="#"><img src={add2} alt="image" /></a>
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
