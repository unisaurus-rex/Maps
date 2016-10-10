import bootstrap from 'bootstrap-sass';
import $ from 'jquery';
import addToggle from './toggle';
import initMap from './createLeafletMap'; 
import us from './json/variable-us'; 
import drawRegions from './drawMapRegions';
addToggle(); 

var map1 = initMap("div.mapPanel", "mapContainer");
drawRegions(map1, us.features);


