//INITIALIZE MAP
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: {
      lat: 39.05682453679058,
      lng: 22.12256750126291,
    },
    mapId: "6577b84bab099eeb",
  });

  // LOAD ALL JSON DATA FOR MAP POLYGON AREAS FROM OTHER GITHUB PROJECT
  map.data.loadGeoJson(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/switzerland.geojson"
  );
  map.data.loadGeoJson(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/the-netherlands.geojson"
  );
  map.data.loadGeoJson(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/italy-provinces.geojson"
  );
  map.data.loadGeoJson(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/germany.geojson"
  );
  map.data.loadGeoJson(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/greece-prefectures.geojson"
  );
  map.data.loadGeoJson(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/france-departments.geojson"
  );
  map.data.loadGeoJson(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/belgium-arrondissements.geojson"
  );

  //SET ALL THE MAP STYLING
  map.data.setStyle({
    fillColor: "#9F9F9F",
    strokeWeight: 1,
    fillOpacity: 0.2,
  });

  //AND ADD ALL MOUSE EVENTS FOR THE MAP + THEIR STYLING
  map.data.addListener("mouseover", function (event) {
    map.data.overrideStyle(event.feature, {
      fillColor: "#BB86FC",
      fillOpacity: 0.5,
      strokeWeight: 2,
    });
  });
  map.data.addListener("mouseout", function (event) {
    map.data.overrideStyle(event.feature, {
      fillColor: "#9F9F9F",
      fillOpacity: 0.2,
      strokeWeight: 1,
    });
  });
  map.data.addListener("click", function (event) {
    let areaName = event.feature.j.name;
    let areaURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${areaName}+drone+view&key=AIzaSyA6rzjl-3cK8KV14fptjNOYffwr1tLqs-A`;
    searchArea(areaURL, areaName);
  });
}
