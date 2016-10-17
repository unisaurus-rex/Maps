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

  // select all county paths
  var counties = d3.selectAll("path.countypath");
  
  // add hidden tooltip
  initTooltip();

  // style regions
  // var d3func = getD3ClassFunction(["18-34","35-54", "55+"]);
  // counties.attr("class", d3func);
  styleCountyBySales(["18-34","35-54", "55+"]);

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
  
  // on checkbox click update the color style for each region
  $("input[name=demographics]").on("click", function(){
    var selectedDemographics = getCheckedValues("demographics");
    styleCountyBySales(selectedDemographics);
  });
  
});

// get checked values as an array
function getCheckedValues(checkboxName){
  var selector = "input[name=" + checkboxName + "]:checked";
  // calling .get() on a jquery object returns a plain array of elements
  return $(selector).get().map(function(el){return el.value;});
}

// given an array of demographics ranges, style region by the combined sales of the demographics
function styleCountyBySales(demographics){
  // build a function that d3 can use to apply a style to an element
  var d3func = getD3ClassFunction(demographics);
  
  var counties = d3.selectAll("path.countypath");
  
  // remove any sales color classes before applying new ones
  counties.classed("lowSales avgSales highSales", false);

  // apply style function to each county region
  d3.selectAll("path.countypath").attr("class", d3func);
}



