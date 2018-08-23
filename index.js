const util = require('./utils');
const request = require('request');

// get from OLMIS
const lmisLocation = util.getOpenLmisUrl('api/Location');
console.log(lmisLocation);

request.get( lmisLocation, function(err, res, body){
	if(!err){
		var locations = JSON.parse(body);
		for(var i = 0; i < locations.length; i++){
			var bundle = {
				"type": "document",
				"entry":[]
			};
			var loc = locations[i];

			var theId = loc.id;
			//var existingLocation = util.queryFhirLocation(theId);	
			
			// if(existingLocation){
			// 	loc.id = existingLocation.id;
			// 	bundle.entry.push({
			// 		resource: loc
			// 	});
			// 	util.sendBundleToFhir('POST', bundle);
			// }else
			//{
				delete loc.id;
				bundle.entry.push({
					resource: loc
				});
				loc.identifier.push({
					"system": "http://test.openlmis.org",
					"value": theId
				});
				util.sendBundleToFhir('POST', bundle);
			//}
	}
	}else{
		console.error(err);
	}
});


