import bootstrap from 'bootstrap-sass';
import $ from 'jquery';
import addToggle from './toggle';
import initMap from './createLeafletMap'; 

addToggle(); 

var map = initMap("div.mapPanel", "mapContainer");
