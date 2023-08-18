let podcastContents = document.querySelector('.second-div');
const urlJollof = "https://www.jollofradio.com/api/podcasts";
let themeIcon = document.querySelector('.fa-icon');
let podcastLogo, podcastName, podcastAudio;

//Fetch Api
async function getApi(url) {
    const data = await fetch(url, {
        method: 'GET',
        // mode: 'no-cors',
        // credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/'
        }
    });
    response = await data.json()
    console.log(response);
    podcastImplement();

}
getApi(urlJollof);

//Add html element through DOM traversal
async function podcastImplement() {
    for (i = 45; i < response.data.length; i++) {
        let mainDiv = document.createElement("div");
        mainDiv.innerHTML = `<div class="pic-div" style ="background-image:url(${response.data[i].logo})" title="${i} ${response.data[i].name}"></div>
        <audio controls>
            <source src="${response.data[i].link}" type="audio/mpeg">
            Your device is unable to play this audio, please check your network settings.
        </audio>
        <p id="podcast-name">${response.data[i].name}</p>`
        mainDiv.classList.add("main-div");
        podcastContents.append(mainDiv);
    }

}

//Change theme of page
themeIcon.addEventListener("click", function () {
    if (this.classList.contains('fa-sun')) {
        if (this.classList.contains('fas')) {
            // change to light mode

            this.classList.remove('fas');
            this.classList.remove('fa-sun');
            this.classList.add('fa-moon');
            this.classList.add('fa-solid');

            document.body.style.backgroundColor = "white";
            podcastName = document.querySelectorAll("#podcast-name");
            podcastName.forEach((title) => {
                title.style.color = "black";
            });
            document.querySelector('.first-div').style.backgroundColor = "rgba(255, 255, 255, 0.4)"

        }
    } else {
        // Change to dark mode
        this.classList.remove('fa-moon');
        this.classList.remove('fa-solid');
        this.classList.add('fas');
        this.classList.add('fa-sun');

        document.body.style.backgroundColor = "#121212";
        podcastName = document.querySelectorAll("#podcast-name");
        podcastName.forEach((title) => {
            title.style.color = "whitesmoke";
        });
        document.querySelector('.first-div').style.backgroundColor = "rgba(18, 18, 18, 0.4)"
    }
});

//Play only one audio at a time
let audioElements = document.querySelectorAll('audio');

audioElements.addEventListener("click", function () {
    this.forEach((audioItem) => {
        if (audioItem.play()) {
            audioItem.pause();
        }
        audioItem.play();
    });
});