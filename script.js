'use strict';
const fs = require('fs');
const shp = require('shpjs');
const simplify = require('@turf/simplify');
const express = require('express');
const app = express();

//setting middleware
app.use(express.static('files')); //Serves resources from public folder

var server = app.listen(80, function (){
    
    shp('./stations.zip').then(function(geojson){
        console.log('Converted');
    }).catch(function(error) {
        console.log(error);
    });
    
});
