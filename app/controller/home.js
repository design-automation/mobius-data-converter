'use strict';
const fs = require('fs');
const AWS = require('aws-sdk');
const AdmZip = require('adm-zip');
const request = require('superagent');
const shp = require('gtran-shapefile');
const Controller = require('egg').Controller;
const simplify = require('@turf/simplify');

class HomeController extends Controller {
  async index() {
    AWS.config.update({
      accessKeyId: 'AKIAIWV22ZQDRTWB257Q',
      secretAccessKey: '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'
    });
    const { ctx } = this;
    const result = await ctx.curl('https://data.gov.sg/api/action/resource_show?id=b0bc607c-11dd-4a5b-9890-5b9836b54900', {
    // 必须指定 method
      method: 'GET',
      dataType: 'json',
    });
    // console.log()
    if (result.status === 200) {
      const fileURL = result.data.result.url;
      const PUBLIC_PATH = __dirname + '/../public/';
      // download file
      request
        .get(fileURL)
        .on('error', function(error) {
          console.log(error);
        }).pipe(fs.createWriteStream(PUBLIC_PATH + 'data.zip'))
        .on('finish', function() {
          const zip = new AdmZip(PUBLIC_PATH + 'data.zip');
          zip.extractAllTo(PUBLIC_PATH, true);

          // convert to geojson
          shp.toGeoJson(PUBLIC_PATH + 'SUBZONE_DWELLING_TYPE_2016.shp')
            .then(function(geojson) {
              const options = { tolerance: 0.01, highQuality: false };
              const simplified = simplify(geojson, options);
              console.log(JSON.stringify(geojson).length);
              console.log(JSON.stringify(simplified).length);
              // fs.writeFile(PUBLIC_PATH + 'simplified.json', JSON.stringify(simplified), 'utf8', () => {}); // save to local
              const data_body = JSON.stringify(simplified);
              const s3 = new AWS.S3();
              var params = {Bucket: 'mobiusdataconverter', Key: 'simplified.json', Body: data_body};
              s3.upload(params, function(err, data) {
                console.log(err, data);
              });
            });
        });

      ctx.body = 'Success';
    }

  }
}

module.exports = HomeController;
