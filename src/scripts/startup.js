import bootstrap from 'bootstrap-sass';
import addToggle from './toggle';
import initMap from './createLeafletMap';
import{createCountyWidget} from 'county-widget/countyWidget';

addToggle();

var mapCenter = [39.7, -104.99];
var initialMapZoom = 7;
var map1 = initMap("div.mapPanel", "mapContainer", mapCenter, initialMapZoom);
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
var countyConfig = {
  salesData: salesData,
  countyFilePath: 'src/scripts/json/counties.json',
  leafletMap: map1,
  tooltipId: "mapTooltip1",
  tooltipClass: "mapTooltip"
};

createCountyWidget(countyConfig);
