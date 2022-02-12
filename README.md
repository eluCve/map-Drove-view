[View Live On GitHub Pages](https://elucve.github.io/map-Drove-view)
<br>

<p style="text-align:center; color:#235D8F; font-weight:700; font-size:3em;">Drone View</p>

---

<br>

<p style="font-size:1.2em; color:#fff; text-align:center;">A Web App that finds and displays <b>YouTube Drone View videos</b> to the users when they select an area on the map</p>

<br>

---

<br>

<p style="font-size:1.5em; color:#235D8F; font-weight:700;">Technologies Used:</p>

<ul style="font-size:1.2em;">
  <li>Google Maps API</li>
  <li>YouTube API</li>
  <li>Git/GitHub</li>
</ul>

<br>

---


<br>

<p style="font-size:1.5em; color:#235D8F; font-weight:700; text-align:center;">How This Works</p>



```html
<script src="./mapInit.js"></script>
```

<p>First we generate the map with Google Maps API and load the Geojson data.</p>
<p>Then we style the map and add Event Listeners for all the polygon geodata such as "mouseover" / "mouseout" / "click".</p>
<p>When the user clicks on a polygon area the <code>searchArea()</code> function is called with the YouTube API URL as a parameter.</p>

```html
<script src="./videoResults.js"></script>
```
<p>We now fetch the data from the URL we passed and we wait 1s for the json data to load.</p>
<p>From the json data we get the YouTube video URLs / video titles / thumbnail links and show them on the results area.</p>
<p>Finally we get set onClick events for every result and create an iframe for every video URL we got.</p>

<br>

---

<br>

<p align="center" style="font-size:1.2em">Special credits to <i><a href="https://github.com/codeforgermany/click_that_hood/tree/main/public/data">CodeForGermany</a></i> for sharing geojson data</p>

<br>

---

