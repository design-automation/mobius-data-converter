'use strict';
const fs = require('fs');
const shp = require('shpjs');
const simplify = require('@turf/simplify');
const http = require('http');

const port = 80;

const requestHandler = (request, response) => {
  console.log(request.url)
    shp("files/SUBZONE_DWELLING_TYPE_2016.zip").then(function(geojson){
        console.log('server online');
    }).catch(function(error) {
        console.log(error);
    });
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})



// shp("SUBZONE_DWELLING_TYPE_2016/SUBZONE_DWELLING_TYPE_2016").then(function(geojson){
    
// }).catch(function(error) {
//     console.log(error);
// });
// https://geo.data.gov.sg/subzone-dwelling-type-2016/2016/09/22/shp/subzone-dwelling-type-2016.zip
// shp.toGeoJson('SUBZONE_DWELLING_TYPE_2016.shp').then(function (geojson) {
//     const options = { tolerance: 0.01, highQuality: false };
//     const simplified = simplify(geojson, options);
//     console.log('Before: '+JSON.stringify(geojson).length);
//     console.log('After: '+JSON.stringify(simplified).length);
//     fs.writeFile('simplified.json', JSON.stringify(simplified), 'utf8', (err) => {
//         if(err){
//             return console.log(err)
//         }
//         console.log("Converted Successfully!");
//     });
// });
