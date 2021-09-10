//You can edit ALL of the code here
let allEpisodes = [];
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const header = document.getElementById("header");
const select = document.createElement("select");
select.id = "select";
header.appendChild(select);

function makePageForEpisodes(episodeList) {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = "";
  // rootElement.textContent = `Got ${episodeList.length} episode(s)`;
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
    ul.appendChild(li);
    const h2 = document.createElement("h2");
    h2.innerText = name;
    li.appendChild(h2);
    const h3 = document.createElement("h3");
    h3.innerText = seasonCode;
    li.appendChild(h3);
    const imgOfEpisode = document.createElement("img");
    imgOfEpisode.src = image;
    imgOfEpisode.alt = "image displaying an episode of GOT";
    li.appendChild(imgOfEpisode);
    const summaryOfEpisode = document.createElement("p");
    summaryOfEpisode.innerHTML = summary;
    li.appendChild(summaryOfEpisode);
  });
}
// adding an even listener for the select area
const selectArea = document.getElementById("select");
selectArea.addEventListener("change", (event) => {
  const valueOfelect = event.target.value;
  if (nameAndEpisode.includes(value)) {
    value.scrollToView();
  }
});
// Creating a search box function with evenlistener
const searchArea = document.getElementById("episode-search");
searchArea.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();

  const filteringOutEpisodes = allEpisodes.reduce((acc, episode) => {
    if (
      episode.name.toLowerCase().includes(value) ||
      episode.summary.toLowerCase().includes(value)
    ) {
      acc.push(episode);
    }
    return acc;
  }, []);
  // console.log(filteringOutEpisodes);
  makePageForEpisodes(filteringOutEpisodes);
});

window.onload = setup;
