var date = require('date-and-time') 
, CRMDAO   = require('../crm').CRMDAO
,sanitize = require('validator').sanitize // Helper to sanitize form input 
,CRM_CONST_NO  = require('./href/crm_const_no') 
, CRM_CONST_EN  =require('./href/crm_const_en') 
, CRM_CONST = CRM_CONST_NO;
// TOChange the default language shall be set

/* The ContentHandler must be constructed with a connected db */
/* console.log , see the windows where node app.js is started */
/* psi the very first firm this was made for */
/* client specify what we to collect in database */
/* each user has an unique psi_id for all his clients */

function ContentHandler (db) { 
    'use strict';
  var crmClient = new CRMDAO(db);  
   
  function initCrm(theStatus,theLevel, theDescription, req, res, next) {
    'use strict';    
     var  query;
    var project;
    var hLevel = theLevel;
    if (hLevel == 'check') { 
    	console.log('ffffffffffffffffffffffffffff'+req.body.reqLevel[1]);
      if(req.body.reqLevel[1] === 'fillIn') {
        hLevel = 'fillIn';
         console.log('ii'+req.body.regDate[1]);
      } else {
        hLevel = 'update';
         console.log('uu'+req.body.regDate[1]);
      }
    }
    
   if (!req.username) return res.redirect('/login');
    console.log('-------level'+hLevel+'--------date='+req.body.regDate+' time='+req.body.regTime);
    crmClient.getCrm( hLevel,req.username,req.body.regDate,req.body.regTime, function(err, result) {
      'use strict';
      if (err) return next(err);
      if(!result) return res.redirect('/post_not_found');
      //console.log('clients:'+JSON.stringify(result));
      var id = 0;   
      //console.log('tid='+JSON.stringify(result[0].airstrip.regDate ));
      //console.log('NORMAL===='+result[0].airstrip.normalA);
       //console.log('getcrm airstrip.forcast===='+JSON.stringify(result[0].airstrip.forcast));
       var crm ;
       
        CRM_CONST.choose = result;
      if (hLevel == "fillIn") {
      	crm = {      	 
       errors: null,
        status: theStatus, 
        level:'fillIn', 
        showUp: ['fillIn','update'],                                    
        description: theDescription,
         subAirstrip:null,
        //'clients' :JSON.stringify(result) ,                                 
        'clients' :result,                                 
        username: req.username,                         
        airstrip: {
          changeDate:null,	
          regDate:null ,
          regTime:null,
          durHours:0,
          durMin:0,
          imgToal: 0,
          files:null,
          imgName:null,
          imgSize:null,
          imgType:null,
          blat:0,
          blng:0,
          bpostalcode:null,
          address:null,
          bstreet_number:null,
          bstate:null,
          bregion:null,
          bcity:null, 
          bcountry:null ,      
          normalA:"off",
          shortA:"off",
          longA:"off",
          wideA:"off",
          dissipativeA:"off",
          lastingA:"off",
          cloud:false,
          moreAirNr:null,
          noStripeNr:null,
          forcast:"",
          airtrafic:""
        }       
      };
     } 
     else {
     //console.log('getcrm update forcast='+JSON.stringify(result[0].airstrip.forcast));
     //console.log('addr='+result[0].airstrip.address);
    	crm = {     
    		ind:null, 
        errors: null,
        status: theStatus, 
        level:'update', 
        showUp: ['fillIn','update'],                                    
        description: theDescription,
        'clients' :result ,                                  
        username: req.username,                         
        airstrip: {	
          regDate:result[0].airstrip.regDate,
          regTime:result[0].airstrip.regTime.substr(0,5),
          durHours:result[0].airstrip.durHours,
          durMin:result[0].airstrip.durMin,
          imgToal: result[0].airstrip.imgTotal,
          files: result[0].airstrip.files,
          bname:result[0].airstrip.imgName,
          bsize:result[0].airstrip.imgSize,
          btype:result[0].airstrip.imgType,
          blat:result[0].airstrip.blat,
          blng:result[0].airstrip.blng,
          bpostalcode:result[0].airstrip.bpostalcode,
          address:result[0].airstrip.address,
          bstreet_number:result[0].airstrip.bstreet_number,
          bstate:result[0].airstrip.bstate,
          bregion:result[0].airstrip.bregion,
          bcity:result[0].airstrip.bcity, 
          bcountry:result[0].airstrip.bcountry,      
          airstrips:result[0].airstrip.airstrips,
          normalA:result[0].airstrip.normalA,
          shortA:result[0].airstrip.shortA,
          longA:result[0].airstrip.longA,
          wideA:result[0].airstrip.wideA,
          dissipativeA:result[0].airstrip.dissipativeA,
          lastingA:result[0].airstrip.lastingA,
          cloud:result[0].airstrip.cloud,
          moreAirNr:result[0].airstrip.moreAirNr,
          noStripeNr:result[0].airstrip.noStripeNr,
          forcast:result[0].airstrip.forcast,
          airtrafic:result[0].airstrip.airtrafic
        }       
      };
     } 
    console.log('before res.render crm.level='+crm.level);  
      //console.log('content dirname='+__dirname);   
    //console.log('init normal='+JSON.stringify(result[0].airstrip.normalA ));
      return   res.render( 'airstrip', { crmC: CRM_CONST, crm: crm }); 
      // In index.js app.post('/airstrip', contentHandler.handleCrmClient);
    });
  }  
   this.display= function(req, res, next) {
    'use strict';
    var thisStatus      = CRM_CONST.airstrip_txt;
    var thisDescription = CRM_CONST.descAirstrip_txt; 
    var thisLevel       = 'check';
    console.log('::::::::test='+req.body.vekk);
    //console.log('content.display thisLevel='+thisLevel);
    initCrm(thisStatus, thisLevel,thisDescription, req, res, next);
  }; 
  this.displayAirstrip = function(req, res, next) {
    'use strict';
    var thisStatus      = CRM_CONST.airstrip_txt;
    var thisDescription = CRM_CONST.descAirstrip_txt; 
     var thisLevel       = 'fillIn';
    initCrm(thisStatus,thisLevel, thisDescription, req, res, next);
  }; 
  // End this.displayAirStrip

  this.displayChemicals = function(req, res, next) {
    'use strict';
    var thisStatus      = CRM_CONST.chemicals_txt;
    var thisDescription = CRM_CONST.descChemicals_txt;
    initCrm(thisStatus, thisDescription, req, res, next);
  }; 
  // End this.displayChemicals

this.displayPH = function(req, res, next) {
    'use strict';
    var thisStatus      = CRM_CONST.airstrip_txt;
    var thisDescription = CRM_CONST.descAirstrip_txt;
    initCrm(thisStatus, thisDescription, req, res, next);
    }; 
  // End this.displayPH


this.displayNotes = function(req, res, next) {
    'use strict';
    var thisStatus      = CRM_CONST.airstrip_txt;
    var thisDescription = CRM_CONST.descAirstrip_txt;
    initCrm(thisStatus, thisDescription, req, res, next);
   }; 
  // End this.displayNotes

  this.displayCrmNotFound = function(req, res, next) {
    'use strict';
    return res.send('Sorry, crm not found', 404);
  }; 
  // this.displayCrmNotFound   

  this.displayNewLang = function(req, res, next) {
    'use strict';
    //console.log('req.params.input= '+ req.params.input+ ' CRM_CONST.speak='+CRM_CONST.speak);
   
	  if (req.params.input == 'no') {
       if (CRM_CONST.speak == 'en') {
        CRM_CONST = CRM_CONST_NO;
       }
    }
    else
  	{
       if (CRM_CONST.speak == 'no') {
        CRM_CONST = CRM_CONST_EN;
       }
  	}	   
    res.redirect('/' );
  }; 
  // End this.newLang
  
  
  // Not used sjekke
  function extract_clients(clients) {
    'use strict';  
    var cleaned = [];      
    var clients_array = clients.split(',');
    for (var i = 0; i < clients_array.length; i++) {
      if ((cleaned.indexOf(clients_array[i]) == -1) && clients_array[i] != '') {
        cleaned.push(clients_array[i].replace(/\s/g,''));
      }
    }
    return cleaned
  }
  // End extract_clients    
    
  // called from html submit form 
     // called from content.InitCrm  return   res.render( 'airstrip', { crmC: CRM_CONST, crm: crm }); 
     //called from index.js app.post('/airstrip', contentHandler.handleCrmClient);
  this.handleCrmClient = function(req, res, next) {
    'use strict';
    debugger;
    var status = req.body.status,
      level = req.body.reqLevel,
      username = req.username,
      now = new Date();
  
    //console.log('content.handleCrmClient :level='+level+' status='+status+' username='+username );
    //ToDo finne ut hvordan skal be
    if (!username) return res.redirect('/signup');
   console.log('!!!!!!!!!!!!!!!!! test total='+req.body.imgTotal+' 0='+req.body.imgTotal[0]+' 1='+req.body.imgTotal[1]);
    for (var i=0; i<req.body.imgTotal; i++) {
        console.log('name='+req.body.files[i].name+' size='+ req.body.files[i].size +' type='+req.body.files[i].type);
    }
    var jsonEnt   = {};      
    //var toDay      = date.format(now, 'DD.MM.YYYY HH:mm:ss');  // Norsk,    NS-ISO 8601 = YYYY-MM-DD
    //feil var regDay      = date.format(req.body.regDate, 'DD.MM.YYYY');  // Norsk,    NS-ISO 8601 = YYYY-MM-DD
     var perm = 'trengs denne?';
     //console.log('status='+status);  
    switch (status) {     
        case CRM_CONST.airstrip_txt :
         jsonEnt = {
            regDate:req.body.regDate,
            regTime:req.body.regTime,
            durHours:req.body.durHours,
            durMin:req.body.durMin,
            imgToal: req.body.imgTotal[1],
            files:req.body.files[1],
            bname:req.body.imgName[1],
            bsize:req.body.imgSize[1],
            btype:req.body.imgType[1],
            blat:req.body.blat[1],
            blng:req.body.blng[1],
            bpostalcode:req.body.bpostalcode[1],
            address:req.body.address,            
            bstreet_number:req.body.bstreet_number[1],
            bstate:req.body.bstate[1],
            bregion:req.body.bregion[1],
            bcity:req.body.bcity[1], 
            bcountry:req.body.bcountry[1],      
            airstrips:req.body.airstrips,
            normalA:req.body.normalA,
            shortA:req.body.shortA,
            longA:req.body.longA,
            wideA:req.body.wideA,
            dissipativeA:req.body.dissipativeA,
            lastingA:req.body.lastingA,
            cloud:req.body.cloud,
            moreAirNr:req.body.moreAirNr,
            noStripeNr:req.body.noStripeNr,
            forcast:req.body.forcast,
            airtrafic:req.body.airtrafic,
            subAirstrip:req.body.subAirstrip,
          };          
          break;
        case CRM_CONST.chemicals :
           jsonEnt = {
           	 status       : status
           }
           break;
        case CRM_CONST.ph :
           jsonEnt = {
           	 status       : status
           }
           break;
        case CRM_CONST.notes :
           jsonEnt = {
           	 status       : status,
        	   notesDate    : req.body.notesDate,
             notes        : req.body.notes[2]
           }
           break;
        default:
          console.log(' Feil her  status '+ status+ ' level='+level)
      }; 	    
      //console.log('IND========='+req.body.reqInd);
      crmClient.updateCrm( req.body.reqInd,username,level,jsonEnt, function(err, perm) {
        'use strict';
          console.log('-------------------------------------------');
     	 if (err) return next(err);
        console.log('Input '+perm);
     	  
     	  return res.redirect('/'); 	
     	});
   } // End this.handleCrmClient 
};
// End ContentHandler
module.exports = ContentHandler;


