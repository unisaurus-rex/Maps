import bootstrap from 'bootstrap-sass';
import $ from 'jquery';
import addToggle from './toggle';
import initMap from './createLeafletMap'; 
import {us} from './json/variable-us'; 
import drawRegions from './drawMapRegions';
import {getD3ClassFunction} from './countySalesStyle';
import {initTooltip, positionTooltip, hideTooltip, addTooltipHTML} from './tooltip.js';

addToggle(); 

var mapCenter = [39.7, -104.99];
var initialMapZoom = 7;
var salesData = {
  keys: ["18-34", "35-54", "55+"],
  data: [
    {region: "Grand",
     sales: [550231.17, 679841.28, 457982.84]
    },
    {region: "Jefferson",
     sales: [1872438.19, 3484952.76, 2743956.11]
    },
    {region: "Summit",
     sales: [2743928.14, 5940812.61, 3951408.16]
    }
  ]
};

var map1 = initMap("div.mapPanel", "mapContainer", mapCenter, initialMapZoom);


$.getJSON('src/scripts/json/counties.json', function(data){
  var sales = salesData.data;
  var regions = data.features;
  
  // merge sales data with geojson data
  for(var i = 0; i < salesData.data.length; i++){
    var region = sales[i].region;
    var salesFigures = sales[i].sales;
    for(var j = 0; j < regions.length; j++){
      if(regions[j].properties.NAME == region){
        regions[j].saleKeys = salesData.keys;
        regions[j].sales = salesFigures;
      }
    } 
  }

  drawRegions(map1, regions, "countypath");

  // color the regions by total sales amounts 
  // TODO: need a function that figures that takes demographics to view and styles regions
  // so it can be called from outside module
  var d3func = getD3ClassFunction(["18-34","35-54", "55+"]);
  var counties = d3.selectAll("path.countypath").attr("class", d3func);
  
  // add hidden tooltip
  initTooltip();

  // style regions
  counties.attr("class", d3func);
  // show/hide tooltip on hover
  counties.on("mouseover", function(d) {
    var tooltipBody = `
         <table>
         <thead><tr><th>Group</th><th>Sales</th></tr></thead>
         <tbody>
         <tr><td>18-34</td><td>$ ${d.sales[0]}</td></tr>
         <tr><td>35-54</td><td>$ ${d.sales[1]}</td></tr>
         <tr><td>55+</td><td>$ ${d.sales[2]}</td></tr>
         </tbody>
         </table>`

    positionTooltip(d3.mouse(this));
    addTooltipHTML(tooltipBody);
  });
  counties.on("mouseout", hideTooltip);
  
});




