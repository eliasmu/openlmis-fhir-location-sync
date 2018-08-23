const request = require('request');
const sync_request = require('sync-request');

const OLMIS_ACCESS_TOKEN = 'bcf40176-02cd-4795-abd2-40fe64602b14';
const OLMIS_BASE_URL = 'http://localhost/';
const FHIR_BASE_URL = 'http://localhost/fhir';

function getOpenLMISUrl(path) {
  return OLMIS_BASE_URL + path + '?access_token=' + OLMIS_ACCESS_TOKEN;
}

module.exports = {
  getOpenLmisUrl: function (path) {
    return OLMIS_BASE_URL + path + '?access_token=' + OLMIS_ACCESS_TOKEN;
  },

  sendBundleToFhir: function (httpMethod, bundle) {
    console.log('---------');
    console.log(JSON.stringify(bundle, null, 4));
    request({
      method: httpMethod,
      url: FHIR_BASE_URL,
      json: bundle
    }, function (err, res, body) {
      if (err) {
        console.log('This is an error');
        console.log(err);
      } else {
        console.log('Success sending bundle!!!');
        console.log(body);
      }
    });

  },

  queryFhirLocation: function (locId) {
    var res = sync_request('GET', FHIR_BASE_URL + '/Location?identifier=' + locId);
    var obj = JSON.parse(res.getBody());
    if(obj.entry.length > 0){
      console.log('found this')
      return obj.entry[0];
    }
    return null;
  }
}