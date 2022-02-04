let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: {
      lat: 39.05682453679058,
      lng: 22.12256750126291
    },
  });
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
  map.data.setStyle({
    fillColor: "green",
    strokeWeight: 1,
    fillOpacity: 0.2,
  });
  map.data.addListener("mouseover", function (event) {
    map.data.overrideStyle(event.feature, {
      fillColor: "red",
      fillOpacity: 0.5,
      strokeWeight: 2,
    });
  });
  map.data.addListener("mouseout", function (event) {
    map.data.overrideStyle(event.feature, {
      fillColor: "green",
      fillOpacity: 0.2,
      strokeWeight: 1,
    });
  });
  map.data.addListener("click", function (event) {
    console.log(event.feature.h.name);
    let areaName = event.feature.h.name;
    let areaURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${areaName}+drone+view&key=AIzaSyAQ3p-dKey7vcIybsEf2ljqgGJ6b3_FWbA`;
    searchArea(areaURL)
  });
}

function searchArea(area) {
  let resultArea = document.getElementById("results");
  resultArea.innerHTML = "";
  fetch(area)
    .then(result => {
      return result.json();
    }).then(data => {
      let videos = data.items;
      console.log(videos);
      for (video of videos) {
        let newVideo = document.createElement("iframe");
        newVideo.setAttribute('allowFullScreen', '');
        newVideo.src = `https://www.youtube.com/embed/${video.id.videoId}`;
        console.log(video.id.videoId);
        resultArea.appendChild(newVideo);
      }
    })
}