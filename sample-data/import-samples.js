var request = require('request');
var fs = require('fs');

var HOST = 'http://localhost:3000';

importSamples('faq', './faq.json');
importSamples('events', './events.json');
importSamplesWithImgs('courses', './courses.json');
importSamplesWithImgs('mentors', './mentors.json');

function importSamples(name, path) {
    var data = JSON.parse(fs.readFileSync(path, 'utf8'));
    var url = HOST + '/api/' + name;

    if (data !== undefined) {
        console.log(">  Sending request for: " + name);
        doPost(url, data);
    } else {
        console.error("ERR no data provided for " + name);
    }
}


function importSamplesWithImgs(name, path) {
    var data = readSampleWithImgs(path);
    var url = HOST + '/api/' + name;

    if (data !== undefined) {
        console.log(">   Sending requests for: " + name);
        for (var i = 0; i < data.length; i++) {
            doFormPost(url, data[i]);
        }
    } else {
        console.error("ERR No data provided for " + name + " in path " + path);
    }
}


function readSampleWithImgs (path) {
    var json = JSON.parse(fs.readFileSync(path, 'utf8'));
    if (json !== undefined) {

        for (var i = 0; i < json.length; i++) {
            var img_path = json[i].img;
            try {
                var img = fs.createReadStream(img_path);
                json[i].img = img;

            } catch (e) {
                console.log("ERR Error opening image in path " + img_path);
                return undefined;
            }
        }
    } else {
        console.error("ERR Error reading " + path);
        return undefined;
    }
    return json;
}

function doPost(url, data) {

    request.post({
        url:     url,
        json: true,
        body:    data
    }, requestsErrorCallback);
}

function doFormPost(url, data) {

    request.post({
        url:     url,
        formData:    data
    }, requestsErrorCallback);
}


function requestsErrorCallback(error, res, body) {
    if (error) {
        console.log("ERR Error:  " + error);
    }
    if (res !== undefined && body !== undefined) {

        if (res.statusCode == 200 || res.statusCode == 201) {
            console.log(">   OK");
        } else {
            console.error("ERR Error (code " + res.statusCode + ")");
            console.log(JSON.parse(body));
        }
    }
}
