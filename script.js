'use strict';
const fs = require('fs');
const shp = require('gtran-shapefile');
const simplify = require('@turf/simplify');

shp.toGeoJson('SUBZONE_DWELLING_TYPE_2016.shp').then(function (geojson) {
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
