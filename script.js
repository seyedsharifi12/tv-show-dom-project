//You can edit ALL of the code here
let allEpisodes = [];
async function fetchAllEpisode(id) {
  const url = `https://api.tvmaze.com/shows/${id}/episodes`;
  const response = await fetch(url);
  console.log(response.status);
  const jSon = await response.json();
  console.log(jSon);
  return jSon;
}
//creating DOM elemenst
const header = document.getElementById("header");
const showSelect = document.createElement("select");
showSelect.id = "show-select";
header.appendChild(showSelect);
const select = document.createElement("select");
select.id = "select";
header.appendChild(select);
//selecting shows
function makeShowSelect() {
  const shows = getAllShows();
  shows.map((show) => {
    const id = show.id;
    const name = show.name;
    const options = document.createElement("option");
    options.innerText = name;
    options.value = id;
    showSelect.appendChild(options);
  });
  // eventlistener
  showSelect.addEventListener("change", (event) => {
    const valueOfselect = event.target.value;
    fetchAllEpisode(valueOfselect).then(makePageForEpisodes);
  });
}
function setup() {
  //have to call fetch all episode and chain a .then

  fetchAllEpisode().then((json) => {
    allEpisodes = json;
    makePageForEpisodes(allEpisodes);
  });
  makeShowSelect();
  // makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = "";
  rootElement.textContent = `Got ${episodeList.length} episode(s)`;
  const ul = document.createElement("ul");
  rootElement.appendChild(ul);

  //Creating a list of episode options in a select dropdown
  episodeList.map((episode) => {
    const name = episode.name;
    const season = episode.season;
    const number = episode.number;
    const options = document.createElement("option");
    const formattedSeason = ("" + season).padStart(2, "0");
    const formattedepisodeNumber = ("" + number).padStart(2, "0");
    const seasonCode = `S${formattedSeason}E${formattedepisodeNumber}`;
    const nameAndEpisode = `"${seasonCode} - ${name}"`;
    options.innerText = nameAndEpisode;
    options.value = `#${name}`;
    select.appendChild(options);
  });

  episodeList.map((episode) => {
    //extracting name, season, episode,image and summary
    const name = episode.name;
    const season = episode.season;
    const number = episode.number;
    const image = episode.image.medium;
    const summary = episode.summary;

    // creating seasonCode (season number + episode number)
    const formattedSeason = ("" + season).padStart(2, "0");
    const formattedepisodeNumber = ("" + number).padStart(2, "0");
    const seasonCode = `S${formattedSeason}E${formattedepisodeNumber}`;

    //creating list element for each episode.
    const li = document.createElement("li");
    li.className = "list-of-episodes";
    li.id = `${name}`;
    ul.appendChild(li);
    const h2 = document.createElement("h2");
    h2.innerText = name;
    li.appendChild(h2);
    const h3 = document.createElement("h3");
    h3.innerText = seasonCode;
    li.appendChild(h3);
    const imgOfEpisode = document.createElement("img");
    imgOfEpisode.src = image;
    imgOfEpisode.alt = `episode  '${episode.name}'  of season ${episode.season}`;
    li.appendChild(imgOfEpisode);

    const episodeSummary = document.createElement("div");
    episodeSummary.innerHTML = summary;

    const readMore = document.createElement("button");
    readMore.id = "more-btn";
    readMore.innerHTML = "Click for the episode summary";
    li.appendChild(readMore);

    readMore.addEventListener("click", () => {
      episodeSummary.classList.toggle("showSummary");
    });
    li.appendChild(episodeSummary);
  });
}
//adding an even listener for the select area
const selectArea = document.getElementById("select");

selectArea.addEventListener("change", (event) => {
  const valueOfselect = event.target.value;
  // makePageForEpisodes(valueOfselect);

  window.location = valueOfselect;

  //make something similar to makeepisodefucntion.
  //use filter method.
  // back button to make episode list again to reset it.
  // have a global let variable set to empty chosen episode
  // have an if statemnet
  // if chosen episode is empty show everything
  // else show the selected episode.
});
// Creating a search box function with evenlistener

const searchArea = document.getElementById("episode-search");
searchArea.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();

  console.log(allEpisodes);
  const filteringOutEpisodes = allEpisodes.reduce((acc, episode) => {
    if (
      episode.name.toLowerCase().includes(value) ||
      episode.summary.toLowerCase().includes(value)
    ) {
      acc.push(episode);
    }
    return acc;
  }, []);
  makePageForEpisodes(filteringOutEpisodes);
  // console.log(filteringOutEpisodes);
  fetchAllEpisode(value).then(makePageForEpisodes);
});

window.onload = setup;
