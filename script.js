'use strict';
const fs = require('fs');
const shp = require('shpjs');
const simplify = require('@turf/simplify');

shp("SUBZONE_DWELLING_TYPE_2016.zip").then(function(geojson){
    const options = { tolerance: 0.01, highQuality: false };
    const simplified = simplify(geojson, options);
    console.log('Before: '+JSON.stringify(geojson).length);
    console.log('After: '+JSON.stringify(simplified).length);
    fs.writeFile('simplified.json', JSON.stringify(simplified), 'utf8', (err) => {
        if(err){
            return console.log(err)
        }
        console.log("Converted Successfully!");
    });
});
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
