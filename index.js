var Download, dl;

import async from 'async';

var series = require('async/series');

Download = require('node-curl-download').Download;

var data = ["hanginglegraise.jpg", "hanginglegraise.mp4"]

var series;
var serie = function(callback) {
  var name = data.shift();
  var dl = new Download('http://cdn.muscleandstrength.com/video/' + name,
    'tmp/' + name);

  dl.on('end', function(code) {
    if (code === 0) {
      console.log("Downloading " + name + " is finished successfully.");
      callback(null, name);
    } else {
      console.log("Downloading " + name + " is finished unsuccessfully.");
    }
    if(data.length == 0) process.exit(code);
  });

  dl.start();
}

for(var i = 0; i < data.length; i++) {
  series.push(serie);
}

async.series(series,
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});
