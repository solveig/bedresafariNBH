function GEODAO() {
    "use strict";
    //debugger;
    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof GEODAO)) {
        console.log('Warning: GEDAO constructor called without "new" operator');
        return new GEODAO();
    }

//flyttet < xscript src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzbz8uIT-CSJbohCxL-PiXApncTBAy-TA"></ xscript>
// var myPos={ lat: 59.07951, lng: 11.46435}; // kommer fra databasen ..
//  var lat, lng, zip, address, street_number, state, region,country,city;


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

 }


function geo_error() {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

function handleNoGeolocation(errorFlag) {
	var content;
  if (errorFlag) {
    content = 'Error: The Geolocation service failed.';
  } else {
    content = 'Error: Your browser doesn\'t support geolocation.';
  }
}  

function doGeocode(doing) {
	
	var lat = 0, 
	    lng = 0,
	    address = "",
	    geo = {};
	var geocoder = new google.maps.Geocoder(); 
  geocoder.geocode(doing, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var comp = results[0].address_components;
      lat =results[0].geometry.location.lat();
      lng=results[0].geometry.location.lng();
      console.log('lat='+lat);
       for (var i=0; i<comp.length; i++){
       	 alert('a '+comp[i].long_name);
            switch(comp[i].types[0]){
                case "postal_code":
                    geo.zip = comp[i].long_name;
                    break;
                case "route":
                    address = comp[i].long_name;
                    if (address != doing.address) {
                      alert("address is different("+doing.address+") og nye :"+address); 
                    }	
                    break;
                 case "street_number":
                    geo.street_number = comp[i].long_name;
                    break;
                 case "administrative_area_level_1":
                    geo.state = comp[i].long_name;
                    break;
                case "administrative_area_level_2":
                    geo.region = comp[i].long_name;
                    break;
                case "postal_town":
                    geo.city = comp[i].long_name;
                    break;                  
                case "country":
                    geo.country = comp[i].long_name;
                    break;  
                default : 
                    alert('NewCrmClient:Error in doGeocoding '+comp[i].types[0]+ 'b '+comp[i].long_name);  
                    break;                                     
            }
        };      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
    alert('lat='+lat+' lng='+lng+ ' +zip='+ zip+' city='+city+' country='+country);
    //alert(' address='+address+'  street_number='+street_number+' state='+state+' region='+region);
    return geo;
  });
}

function initGeoLocation() {

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     var latlng = {'lat': position.coords.latitude, 'lng' :+position.coords.longitude}; 
      alert('lat='+position.coords.latitude);
      var doing = {'location': latlng};
      doGeocode(doing);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    //'Browser does not support Geolocation');
    handleNoGeolocation(false);
  }
}       
 

this.geoWork =function ( thisChoise, thisAddress) {
"use strict";
  //var infowindow; // = new google.maps.InfoWindow; 
  var doing = {'address': thisAddress};
  var resGeo;
	console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
  if (thisChoise === "useAddress") {  	  
  	
   resGeo= doGeocode(doing);
  }
 	else {
    initGeoLocation();
 	}		 
 	return resGeo;
  //geocodeLatLng(geocoder, map, infowindow);  har lat og lng
}


  //var id_ind            = -1;
  //var valg              = "begin";
       
    function init() {      
        flystriper = document.querySelector("#flystriper");
        kjemikaler = document.querySelector("#kjemikaler");
        ph         = document.querySelector("#ph");
        kommentar  = document.querySelector("#kommentar");
        //form.reset(); det er ved piltast tilbake id står
        
    }
         
   
 
     
    //form.reset(); det er ved piltast tilbake id
    // init geolocation
    //google.maps.event.addDomListener(window, 'load', initialize);    
    
 

   
  
    // filer
      function setSelectedFile() {
        var selectedFile = document.getElementById('pictures').files;
        
        for (i=0; i<selectedFile.length; i++) {
         //console.log('name='+selectedFile[i].name+' size='+ selectedFile[i].size +' type='+selectedFile[i].type);
         //console.log('antall='+selectedFile.length);
         //console.log('<input type=hidden name=\"name\" value=\"'+selectedFile[i].name+'\">');
         document.querySelector('#bilder').innerHTML = '<input type=hidden name=\"bimgTotal\" value='+selectedFile.length+'>';
          document.querySelector('#bilder').innerHTML ='<input  name=\"bname\" value=\"'+selectedFile[i].name+'\">';
          document.querySelector('#bilder').innerHTML ='<input type=hidden name=\"bsize\" value='+selectedFile[i].size+'>';
          document.querySelector('#bilder').innerHTML ='<input type=hidden name=\"btype\" value='+selectedFile[i].type+'>';
             }
      }        
      //document.querySelector("#singleName").innerHTML = selectedFile.name;
      //document.querySelector("#singleSize").innerHTML = selectedFile.size + "  bytes";
      //document.querySelector("#singleType").innerHTML = selectedFile.type;
      //  <ul><li>name: <span id="singleName"></span></li><li>size: <span id="singleSize"></span></li><li>type: <span id="singleType"></span></li></ul>
 //onload="initMap()"   
 
   // <script src="https://maps.googleapis.com/maps/api/js?signed_in=true&callback=initMap"
     //   async defer></script>
   }
module.exports.GEODAO = GEODAO;


 	