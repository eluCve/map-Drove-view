function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: {
      lat: 39.05682453679058,
      lng: 22.12256750126291
    },
    mapId: '6577b84bab099eeb',
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
    fillColor: "#9F9F9F",
    strokeWeight: 1,
    fillOpacity: 0.2,
  });
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
    console.log(event.feature.h.name);
    let areaName = event.feature.h.name;
    let areaURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${areaName}+drone+view&key=AIzaSyA6rzjl-3cK8KV14fptjNOYffwr1tLqs-A`;
    searchArea(areaURL)
  });
}

function searchArea(area) {
  let resultArea = document.getElementById("results");
  let arrayOfVids = [];
  resetElements("backdrop");
  resultArea.innerHTML = "";
  fetch(area)
    .then(result => {
      return result.json();
    }).then(data => {
      let videos = data.items;
      for (video of videos) {
        arrayOfVids.push(video.id.videoId);
        let newDiv = document.createElement("div");
        newDiv.className = "video-wrapper";
        newDiv.id = `${video.id.videoId}`;
        resultArea.appendChild(newDiv);

        let newThumbnail = document.createElement("img");
        newThumbnail.className = "thumbnail";
        newThumbnail.src = video.snippet.thumbnails.high.url;
        newDiv.appendChild(newThumbnail);
        let newTitle = document.createElement("p");
        newTitle.className = "video-title";
        newTitle.innerText = `${video.snippet.title}`
        newDiv.appendChild(newTitle);

        onclickBackdrop(video.id.videoId);
        console.log(arrayOfVids);

        function onclickBackdrop(id) {
          let backdrop = document.createElement("div");
          backdrop.className = "backdrop";
          backdrop.id = `backdrop${id}`;
          let container = document.getElementById("capture");
          container.appendChild(backdrop);
          let backdropVid = document.createElement("iframe");
          backdropVid.className = "backdropVid";
          backdropVid.setAttribute('allowFullScreen', '');
          backdropVid.src = `https://www.youtube.com/embed/${id}`;
          backdrop.appendChild(backdropVid);
          backdrop.style.display = "none";
        }
      }
      for (j = 0; j <= arrayOfVids.length - 1; j++) {
        let index = arrayOfVids[j];
        document.getElementById(`${index}`).addEventListener("click", () => {
          document.getElementById(`backdrop${index}`).style.display = "block";
        });
        document.getElementById(`backdrop${index}`).addEventListener("click", () => {
          document.getElementById(`backdrop${index}`).style.display = "none";
        });
      }
    })
    .catch((error) => {
      alert('API request Quotas limit reached. Contact the Admin or try again tomorrow!');
      console.log(error);
    });

}

function resetElements(elements) {
  let reset_elements = document.getElementsByClassName(elements);
  while (reset_elements.length > 0) {
    reset_elements[0].parentNode.removeChild(reset_elements[0]);
  }
}