var http = require ('http');
var request = require('request');
var fs = require('fs');

var HOST = 'http://localhost:3000';


importSample('courses', './courses.json');
importSample('mentors', './mentors.json');
importSample('faq', './faq.json');
importSample('events', './events.json');


// setTimeout(function () {
//
// }, 5000);

function importSample (name, path) {
    var data = readSampleJson(path);
    var url = HOST + '/api/' + name;
    console.log("> Sending request for: " + name);
    doPost(url, data);
}

function readSampleJson (path) {
    return fs.readFileSync(path).toString();
}

function doPost(url, data) {
    request.post({
        headers: {'content-type' : 'application/json'},
        url:     url,
        body:    data
    }, function(error, res, body){
        if (error) {
            console.log("> Error:  " + error);
        }
        if (res.statusCode == 200 || res.statusCode == 201) {
            console.log("> OK");
        } else {
            console.error("> Error (code " + res.statusCode + ")");
            // console.log(body);
        }
    });
}
