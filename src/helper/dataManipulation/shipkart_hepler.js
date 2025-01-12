export const isNumber = (x) => { 
    return !isNaN(x) && !isNaN(parseInt(x));
}

export const promoCode = (event) => {
   event.preventDefault();
   var el = document.getElementById('promorow');
   el.style.display = 'block';
   
}

export const closepromoCode = (event) => {
   event.preventDefault();
   var el = document.getElementById('promorow');
   el.style.display = 'none';
   
}

export const prePaid = (event) => {
   event.preventDefault();
   var el = document.getElementById('prepaid');
   el.style.display = 'block';
   var els = document.getElementById('collect');
   els.style.display = 'none';
   
}

export const collectPaid = (event) => {
   event.preventDefault();
   var el = document.getElementById('collect');
   el.style.display = 'block';
   var els = document.getElementById('prepaid');
   els.style.display = 'none';
   
}

export const originLocalCharges = (event, id, side, eid) => {
   event.preventDefault();
   var el = document.getElementById(id);
   var eld = document.getElementById(eid);
   if( el && el.style.display === 'none') {  
    if(eld.style.display === 'block'){
      eld.style.display = 'none';
     }else{
      el.style.display = 'block';
     } 
      var elm = document.getElementById(side);
      elm.classList.remove('up');
   }else{
      el.style.display = 'none';
      elm = document.getElementById(side);
      elm.classList.add('up');
   }
}


export const brickupDetails = (event, id, side) => {
   event.preventDefault();
   var el = document.getElementById(id);
   if( el && el.style.display === 'none') {  
      el.style.display = 'block';
      var elm = document.getElementById(side);
      elm.classList.remove('active');
   }else{
      el.style.display = 'none';
      elm = document.getElementById(side);
      elm.classList.add('active');
   }
}


export const handleSource = (event) => { 
   document.getElementById('source').value = event.portName+'/'+event.portCode; 
   var elm = document.getElementById('sourceopen');
   elm.classList.remove('open');   
 }


 export const handleDestination = (event) => { 
   document.getElementById('destination').value = event.portName+'/'+event.portCode; 
   var elm = document.getElementById('destinationeopen');
   elm.classList.remove('open');   
 }


export const handleSourceData = (event) => { 
   document.getElementById('icd_id').value = event._id; 
   document.getElementById('icdsource').innerHTML = event.title;
   document.getElementById('icd').value = event.title;
   var elm = document.getElementById('sourceIcdopen');
   elm.classList.remove('open');   
}


export const handleDesData = (event) => { 
document.getElementById('icddes_id').value = event._id; 
document.getElementById('icddest').innerHTML = event.title;
document.getElementById('icddes_lat').value = event.source_lat; 
document.getElementById('icddes_long').value = event.source_long; 
var elm = document.getElementById('destinationeicdopen');
elm.classList.remove('open');   
}



// get Source list
export const selectSourcevalue = (e) => {
   var input, filter, ul, li, a, i;
   input = document.getElementById("source");
   filter = input.value.toUpperCase();
   ul = document.getElementById("soulist");
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



export function getContainerDetails() {
   var elm = document.getElementById('containeropen');
   elm.classList.remove('open');   
   var st;
   st = document.getElementById("containercount").value;
   if(st !== ''){
      document.getElementById("containerdata").innerHTML= st+' Container,';
   }else{
      document.getElementById("containerdata").innerHTML= '1 Container,';
   }
   var ele = document.getElementsByName('container_size');
   var cntype = document.getElementsByName('container_type');
   var commodity = document.getElementsByName('Commodity');
         for (var i = 0; i < ele.length; i++) {
             if (ele[i].checked)
                 document.getElementById("containersizedata").innerHTML
                     = ele[i].value+', ';
         }
         for (var j = 0; j < cntype.length; j++) {
            if (cntype[j].checked)
                document.getElementById("containertypedata").innerHTML
                    = cntype[j].value+', ';
        }
        for (var k = 0; k < commodity.length; k++) {
         if (commodity[k].checked)
             document.getElementById("commoditydata").innerHTML
                 = commodity[k].value;
        }
        var cnt = document.getElementById('containerdetails');
        cnt.style.display = "none";
}

//cencel container details
export const cancelContainerDetails = (e) => {
   var elm = document.getElementById('containeropen');
   elm.classList.remove('open');  
} 

//get Destination
export const selectDestinationvalue = (e) => {
   var input, filter, ul, li, a, i;
   input = document.getElementById("destination");
   filter = input.value.toUpperCase();
   ul = document.getElementById("destinationList");
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

//
export const allprice = (evt, cityName, lemp, temp) => {
   var i, x, tablinks;
   x = document.getElementsByClassName(lemp);
   if(lemp !== 'breakup'){
   for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
   }
   }
   tablinks = document.getElementsByClassName(temp);
   for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" active", "");
   }
   var styles = getComputedStyle(document.getElementById(cityName));
   var displayed = styles.getPropertyValue('display')
   if(displayed === 'block'){
      document.getElementById(cityName).style.display = "none";
   }else{
      document.getElementById(cityName).style.display = "block";
   }
   var fade = document.getElementById(cityName);
   var opacity = 0; 
   var intervalID = setInterval(function() { 
       if (opacity < 1) { 
           opacity = opacity + 0.5 
           fade.style.opacity = opacity; 
       } else { 
           clearInterval(intervalID); 
       } 
   }, 200); 
   evt.currentTarget.className += " active";
   
 }


 


 

export const getCurentTime = () =>{
   var today = new Date()
   var curHr = today.getHours()
   var time = '';
   if (curHr < 12) {
      time += 'good morning'
   } else if (curHr < 18) {
      time += 'good afternoon'
   } else {
      time += 'good evening'
   }
   return prettyString(time);
}



//first letter in Capital latter
export const Capitalize = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

//word letter in Capital latter
export const prettyString = (str) => {
   var nextCapital = true;
   var newString = "";
   for (var i = 0; i < str.length; i++) {
     var cur = str.charAt(i);
     if (nextCapital) {
       newString += cur.toUpperCase();
     } else {
       newString += cur.toLowerCase();
     }
     if (cur === " ") {
       nextCapital = true;
     } else {
       nextCapital = false;
     }
   }
   return newString;
 };

export const validateForm = (data) => {
    const errors = {};
    if (/^\d*$/.test(data.mobile)) {
       //const regex = /^\d{10}$/;
       if (!data.mobile) {
          errors.mobile = 'Mobile No is required';
       } else if (data.mobile.length < 10) {
          errors.mobile = 'Mobile number must be exactly 10 digits.';
       }
     } else {
       errors.mobile = 'Only digits are allowed.';
     }
     return errors;
 };


 export const validateFormEmail = (data) => {
    const errors = {};
    if (!data.email) {
        errors.email = 'Email is required!';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
       errors.email = 'Email is invalid';
    }
    return errors;
 };

 export const validateFormEmailPass = (data)  => {
    const errors = {};
    if (!data.email) {
        errors.email = 'Email is required!';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
       errors.email = 'Email is invalid';
    }
    if (!data.password) {
       errors.password = 'password is required';
    }
    return errors;
 };
