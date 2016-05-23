var date = require('date-and-time');
var CRMDAO   = require('../crm').CRMDAO ,sanitize = require('validator').sanitize; // Helper to sanitize form input
var CRM_CONST_NO  = require('./href/crm_const_no'); 
var CRM_CONST_EN  = require('./href/crm_const_en'); 
var CRM_CONST = CRM_CONST_NO; // TOChange the default language shall be set 


/* The ContentHandler must be constructed with a connected db */
/* console.log , see the windows where node app.js is started */
/* psi the very first firm this was made for */
/* client specify what we to collect in database */
/* each user has an unique psi_id for all his clients */

function ContentHandler (db) {
    'use strict';
  var crmClient = new CRMDAO(db);  
   
  function initCrm(theStatus,theDescription, req, res, next) {
    'use strict';    
    // console.log('req='+JSON.stringify(req.body.username));  
    //console.log('r='+JSON.stringify(req.body)); 
    //console.log('initCrm status='+ theStatus );
    if (!req.username) return res.redirect('/login');
    // trenger ikke denne if(typeof  req.body.idNew !== 'undefined'){
    //  console.log('initCrm idnew='+req.body.idNew[1]+'=');
    //};    
    var  query = {"contact":req.username,"airstrip.regDate":req.body.regDate,"airstrip.regTime":req.body.regTime};
     
    //var project = {"airstrip.regDate":1,"airstrip.regTime":1};
    var project = {"contact":1,"airstrip":1};
    //console.log('query='+JSON.stringify(query));
    //console.log('project='+JSON.stringify(project));
    //var  clients = req.clients;  
    //crmClient.getCrm( clients,function(err, x) {
     crmClient.getCrm( query,project, function(err, result) {
      'use strict';
      if (err) return next(err);
      if(!result) return res.redirect('/post_not_found');
      console.log('clients:'+JSON.stringify(result));
      var id = 0;   
      console.log('tid='+result.airstrip.durHours );
      //console.log('_id='+clients._id);
     // console.log('hhhhregDate='+clients.airstrip[0].det viser kun regdate regDate);
     
 //        notes: null,  
//        notesDate:null,  
      //Skulle signature: signature, trenges ,se gammel kode

      var crm ;
      if (req.body.status == "fillIn") {
      	crm = {
      	id: null,
        errors: null,
        status: theStatus, 
        level:'fillIn', 
        showUp: ['fillIn','update'],                                    
        description: theDescription,
         subAirstrip:null,
        'clients' :clients ,                                 
        username: req.username,                         
        airstrip: {
          changeDate:null,	
          regDate:null,
          regTime:null,
          durHours:0,
          durMin:null,
          imgToal: 0,
          bname:null,
          bsize:null,
          btype:null,
          blat:0,
          blng:0,
          bpostalcode:null,
          bzip:null,
          baddress:null,
          bstreet_number:null,
          bstate:null,
          bregion:null,
          bcity:null, 
          bcountry:null ,      
          airstrips:null,
          airA:null,
          airB:null,
          airC:null,
          airD:null,
          airE:null,
          airF:null,
          cloA:null,
          moreAirNo:null,
          noStripeNr:null,
          forcast:null,
          airtrafic:null
        }       
      };
     } 
     else {
     		crm = {
      	id: null,
        errors: null,
        status: theStatus, 
        level:'fillIn', 
        showUp: ['fillIn','update'],                                    
        description: theDescription,
         subAirstrip:null,
        'clients' :result ,                                 
        username: req.username,                         
        airstrip: {	
          regDate:result.airstrip.regDate,
          regTime:null,
          durHours:result.airstrip.durHours,
          durMin:null,
          imgToal: 0,
          bname:null,
          bsize:null,
          btype:null,
          blat:0,
          blng:0,
          bpostalcode:null,
          bzip:null,
          baddress:null,
          bstreet_number:null,
          bstate:null,
          bregion:null,
          bcity:null, 
          bcountry:null ,      
          airstrips:null,
          airA:null,
          airB:null,
          airC:null,
          airD:null,
          airE:null,
          airF:null,
          cloA:null,
          moreAirNo:null,
          noStripeNr:null,
          forcast:null,
          airtrafic:null
        }       
      };
     } 
    console.log('before res.render durHours='+crm.airstrip.durHours);  
      //console.log('content dirname='+__dirname);   
      return   res.render( 'airstrip', { crmC: CRM_CONST, crm: crm });
    });
  }  
   this.display= function(req, res, next) {
    'use strict';
    var thisStatus      = CRM_CONST.airstrip_txt;
    var thisDescription = CRM_CONST.descAirstrip_txt; 
    var thisLevel       = 'update';
    initCrm(thisStatus, thisLevel,thisDescription, req, res, next);
  }; 
  this.displayAirstrip = function(req, res, next) {
    'use strict';
    var thisStatus      = CRM_CONST.airstrip_txt;
    var thisDescription = CRM_CONST.descAirstrip_txt; 
     var thisLevel       = 'fillIn';
    initCrm(thisStatus, thisDescription, req, res, next);
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
    console.log('req.params.input= '+ req.params.input+ ' CRM_CONST.speak='+CRM_CONST.speak);
   
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
  this.handleCrmClient = function(req, res, next) {
    'use strict';
    debugger;
    var status = req.body.status,
      id    = req.body.idNew,
      level = req.body.reqLevel,
      username = req.username,
      now = new Date();
      console.log('!!!!!!!!!!!! idnew='+id);
  
    //console.log('level='+level );
    //ToDo finne ut hvordan skal be
    if (!username) return res.redirect('/signup');
    for (var i=0; i<req.body.imgTotal; i++) {
        console.log('name='+req.body.name[i]+' size='+ req.body.size[i] +' type='+req.body.type[i]);
    }
    var jsonEnt   = {};        
    //var toDay      = date.format(now, 'DD.MM.YYYY HH:mm:ss');  // Norsk,    NS-ISO 8601 = YYYY-MM-DD
    //feil var regDay      = date.format(req.body.regDate, 'DD.MM.YYYY');  // Norsk,    NS-ISO 8601 = YYYY-MM-DD
     var perm = 'trengs denne?';
     console.log('status='+status);  
    switch (status) {     
        case CRM_CONST.airstrip_txt :
         jsonEnt = {
            regDate:req.body.regDate,
            regTime:req.body.regTime,
            durHours:req.body.durHours,
            durMin:req.body.durMin,
            imgToal: req.body.imgTotal,
            bname:req.body.bname,
            bsize:req.body.bsize,
            btype:req.body.btype,
            blat:req.body.blat,
            blng:req.body.blng,
            bpostalcode:req.body.bpostalcode,
            bzip:req.body.bzip,
            baddress:req.body.baddress,
            bstreet_number:req.body.bstreet_number,
            bstate:req.body.bstate,
            bregion:req.body.bregion,
            bcity:req.body.bcity, 
            bcountry:req.body.bcountry,      
            airstrips:req.body.airstrips,
            airA:req.body.airA,
            airB:req.body.airB,
            airC:req.body.airC,
            airD:req.body.airD,
            airE:req.body.airE,
            airF:req.body.airF,
            cloA:req.body.cloA,
            moreAirNo:req.body.moreAirNo,
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
      crmClient.updateCrm( id,username,level,jsonEnt, function(err, perm) {
        'use strict';
        if (err) return next(err);
        //console.log('Tilbake til input');
     	  return res.redirect('/'); 	
     	});
   } // End this.handleCrmClient 
};
// End ContentHandler
module.exports = ContentHandler;


