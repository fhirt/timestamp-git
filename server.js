const express = require('express');
const app = express();
const path = require('path');
const IP = 8080;

var answer = {
    "unix": "unixdate",
    "natural": "naturaldate"
};

var month = [
    'January', 'February', 'March', 
    'April', 'May', 'June', 
    'July', 'August', 'September', 
    'October', 'November', 'December'];

function parseNaturalDate(date) {
    var unixDate = Date.parse(date);
    if (isNaN(unixDate)) {
        answer.unix = null;
        answer.natural = null;
    } else {
        answer.unix = unixDate;
        answer.natural = date;
    }
}

function parseUnixDate(date) {
    if (date < 0) {
        answer.unix = null;
        answer.natural = null;
    } else {
        var tmp = new Date(date);
        answer.unix = date;
        answer.natural = `${month[tmp.getMonth()]} ${tmp.getDate()}, ${tmp.getFullYear()}`;
    }
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/:date', function(req, res) {
    var date = req.params.date;
    
    if ( isNaN( parseInt(date, 10))) parseNaturalDate(date);
    else parseUnixDate(parseInt(date, 10));
    
    res.send(answer);
});

app.listen(IP, function () {
    console.log('Example app listening on port ' + IP);
});
