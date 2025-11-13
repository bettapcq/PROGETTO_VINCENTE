// const allTheParameters = new URLSearchParams(location.search);
// const id = allTheParameters.get(id);

const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/"

const deepPurpleID = 5953987

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const eminemId = 13
const eminemAlbumId = 119606

const albumURL = albumUrl + eminemAlbumId

localStorage.setItem("albumURL", albumURL)

const songSection = document.getElementById("songCard")

const getSongDetails = () => {
  fetch(albumUrl + eminemAlbumId)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Ops! Errore dalla risposta:", res.status)
      }
    })
    .then((songDetails) => {
      console.log(songDetails)
      const albumTrack = songDetails.tracks.data[5]
      console.log(albumTrack)

      const artistID = albumTrack.artist.id
      const artistDetailsURL = artistUrl + artistID
      localStorage.setItem("artistURL", artistDetailsURL)
      console.log(artistDetailsURL)
      const songDiv = document.getElementById("songCard")
      songDiv.innerHTML = `
  <div class="col">
  <div class="container-fluid">
    <div class="row w-100 mx-1">
      <div class="card bg-gradient border-0 rounded-3 mb-5">
        <div class="row m-3">
          <div class="col">
            <img
              id="song-img"
              src="${albumTrack.album.cover_medium}"
              class="img-fluid shadow-lg"
              alt="preview"
              style="min-width: 45px; min-height: 45px"
            />
          </div>
          <div class="col me-0">
            <div class="card-body px-0">
              <a
                href="./album-details.html"
                role="button"
                aria-expanded="false"
                class="text-decoration-none text-light"
                >${songDetails.title}</a
              >
              <h1 id="songTitle" class="card-title py-0">
                ${albumTrack.title}
              </h1>
              <a
                href="./artist-page.html"
                role="button"
                aria-expanded="false"
                id="artist"
                class="small text-secondary text-decoration-none"
              >
                ${albumTrack.artist.name}</a
              >
              <div class="text-start">
                <button
                  class="btn btn-success btn-lg px-4 fw-semibold rounded-pill fs-6" id="play_btn"
                >
                  Play
                </button>
                <button
                  class="btn btn-outline-light btn-lg px-4 fw-semibold rounded-pill bg-dark text-white border-white fs-6"
                >
                  Salva
                </button>
                <a href="#" role="button" aria-expanded="false"
                  ><i class="bi bi-three-dots text-light"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      `

      const play_btn = document.getElementById("play_btn")
      const playerText = document.getElementById("playerText")
      let audio = new Audio(albumTrack.preview)
        play_btn.addEventListener(
          "click",
          (togglePlay = () => {
            play_btn.innerHTML = `<i class="bi bi-pause-fill fs-1 pause_btn"></i>`
            playerText.innerHTML = `
              <h6>${albumTrack.title}</h6>
              <p>di ${albumTrack.artist.name}</p>`
            if (audio.paused) {
              audio.play()
            } else {
              audio.pause()
              play_btn.innerHTML = `<i class="bi bi-play-fill fs-1"></i>`
            }
          })
        )
      
    })
    .catch((err) => {
      alert("Ops! Errore dal server:" + err)
    })
}

getSongDetails()

const albumsArray = [
  "1127912",
  "851331162",
  "324179237",
  "8446705",
  "104188",
  "72704062",
]

// const loadAlbums = () => {
//   albumsArray.forEach((albumID) => {
//     fetch(albumUrl + albumID)
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error('Ops! Errore dalla risposta:', res.status);
//         }
//       })
//       .then((albumDetails) => {
//         console.log(albumDetails);
//         const smallCards = document.querySelectorAll('.small-cards card');
//         const imagesToChange = document.querySelectorAll('.card img');
//         const titleToChange = document.querySelectorAll('.card card-title');
//         for (let i = 0; i < smallCards.length; i++) {
//           imagesToChange[i].src = albumDetails.cover - small;
//           titleToChange[i].innerText = albumDetails.title;
//         }
//       })
//       .catch((err) => {
//         alert('Ops! Errore dal server:' + err);
//       });
//   });
// };
