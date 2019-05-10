#!/usr/bin/bash
response=$(curl -s -w "\n%{http_code}" https://data.gov.sg/api/action/resource_show?id=b0bc607c-11dd-4a5b-9890-5b9836b54900)
response=(${response[@]}) # convert to array
code=${response[-1]} # get last element (last line)
body=${response[@]::${#response[@]}-1} # get all elements except last
body=$(echo $body)
shp_url=$(echo $body | grep -Eo 'https://geo.data.gov.sg[^ >]+'|tr -d '",')
curl $shp_url -o 'shp.zip'
unzip shp.zip
node script.js
git checkout master
git remote set-url origin https://${TOKEN}@github.com/design-automation/mobius-data-converter.git
git add simplified.json
git commit -m "Upload Simplified Data..."
git push
