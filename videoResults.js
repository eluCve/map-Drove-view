// GLOBAL VARIABLES
const resultArea = document.getElementById("results");

function searchArea(areaURL, areaName) {
  let arrayOfVids = [];

  // DISPLAY WHAT AREA WE ARE CURRENTLY VIEWING AT THE RESULTS TITLE
  document.getElementById("display-title").innerHTML = `Select Area on the map to display Results | Currently Viewing: ${areaName}`;

  // RESULTS DISPLAY AREA
  resultArea.innerHTML = ""; // RESET DOM ELEMENTS IN THE RESULTS AREA
  resetElements("backdrop"); // RESET ARRAY OF RESULTS TO SHOW THE NEW ONES

  //CREATE 6 LOADING CONTAINERS UNTILL THE RESULTS LOAD 
  loadingContainers(6);


  //SET TIMOUT TO WAIT FOR ALL THE DATA TO LOAD FROM THE YOUTUBE API
  setTimeout(() => {

    //FETCHING ALL DATA FROM THE YOUTUBE API LINK CALLED areaURL
    fetch(areaURL)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        let videos = data.items;

        //RESET DOM ELEMENTS IN THE RESULTS AREA TO PARSE THE YOUTUBE RESULTS
        resultArea.innerHTML = "";

        for (video of videos) {

          arrayOfVids.push(video.id.videoId);

          //CREATING CONTAINER FOR EACH RESULT
          let newDiv = document.createElement("div");
          newDiv.className = "video-wrapper";
          newDiv.id = `${video.id.videoId}`;
          resultArea.appendChild(newDiv);

          //CREATING THUMBNAIL FOR EACH RESULT
          let newThumbnail = document.createElement("img");
          newThumbnail.className = "thumbnail";
          newThumbnail.src = video.snippet.thumbnails.high.url;
          newDiv.appendChild(newThumbnail);

          //CREATING TITLE FOR EACH RESULT
          let newTitle = document.createElement("p");
          newTitle.className = "video-title";
          newTitle.innerText = `${video.snippet.title}`;
          newDiv.appendChild(newTitle);

          //CREATING EACH IFRAME VIDEO
          iframeVideos(video.id.videoId);
        }

        //ONCLICK FOR IFRAMES
        for (j = 0; j <= arrayOfVids.length - 1; j++) {
          let index = arrayOfVids[j];
          document.getElementById(`${index}`).addEventListener("click", () => {
            document.getElementById(`backdrop${index}`).style.display = "block";
          });
          document.getElementById(`backdrop${index}`).addEventListener("click", () => {
            document.getElementById(`backdrop${index}`).style.display = "none";
            stopAllYouTubeVideos();
          });
        }

      })
      .catch((error) => {
        alert(
          "API request Quotas limit reached. Contact the Admin or try again tomorrow!"
        );
        console.log(error);
      });
  }, 1000);
}


//FUNCTION RESET ARRAY OF RESULTS TO SHOW THE NEW ONES
function resetElements(elements) {
  let reset_elements = document.getElementsByClassName(elements);
  while (reset_elements.length > 0) {
    reset_elements[0].parentNode.removeChild(reset_elements[0]);
  }
}

//FUNCTION TO CREATE 6 LOADING CONTAINERS UNTILL THE RESULTS LOAD 
function loadingContainers(amount) {
  for (k = 0; k < amount; k++) {
    let ico_wrapper = document.createElement("div");
    ico_wrapper.className = "ico-wrapper";
    resultArea.appendChild(ico_wrapper);
    let ico = document.createElement("div");
    ico.className = "ico";
    ico_wrapper.appendChild(ico);
    let ico_text = document.createElement("div");
    ico_text.className = "ico-text";
    ico_wrapper.appendChild(ico_text);
    let text1 = document.createElement("div");
    text1.className = "text1";
    ico_text.appendChild(text1);
    let text2 = document.createElement("div");
    text2.className = "text2";
    ico_text.appendChild(text2);
  }
}

//FUNCTION TO OPEN IFRAME FOR EACH VIDEO WHEN CLICKED
function iframeVideos(videoId) {
  let backdrop = document.createElement("div");
  backdrop.className = "backdrop";
  backdrop.id = `backdrop${videoId}`;
  let container = document.getElementById("capture");
  container.appendChild(backdrop);
  let backdropVid = document.createElement("iframe");
  backdropVid.className = "backdropVid";
  backdropVid.setAttribute("allowFullScreen", "");
  backdropVid.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  backdrop.appendChild(backdropVid);
  backdrop.style.display = "none";
}

//FUNCTION TO STOP ALL YOUTUBE VIDEOS PLAYING ON IFRAMES
var stopAllYouTubeVideos = () => {
  var iframes = document.querySelectorAll("iframe");
  Array.prototype.forEach.call(iframes, (iframe) => {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "stopVideo",
      }),
      "*"
    );
  });
};