// const allTheParameters = new URLSearchParams(location.search);
// const id = allTheParameters.get(id);

const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/';
const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';

const deepPurpleID = 5953987;
const eminemId = 13;
const eminemAlbumId = 119606;

const albumURL = albumUrl + eminemAlbumId;

localStorage.setItem('albumURL', albumURL);

const songSection = document.getElementById('songCard');

const getSongDetails = () => {
  fetch(albumUrl + eminemAlbumId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Ops! Errore dalla risposta:', res.status);
      }
    })
    .then((songDetails) => {
      console.log(songDetails);
      const albumTrack = songDetails.tracks.data[5];
      console.log(albumTrack);

      const artistID = albumTrack.artist.id;
      const artistDetailsURL = artistUrl + artistID;
      localStorage.setItem('artistURL', artistDetailsURL);
      console.log(artistDetailsURL);
      const songDiv = document.getElementById('songCard');
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
      alert('Ops! Errore dal server:' + err);
    });
};

getSongDetails();

// funzione riempi albums
const albumsArray1 = ['1127912', '851331162', '324179237', '8446705', '104188'];

const albumsArray2 = ['13433823', '552945182', '8446705'];

const loadAlbumsSmallCards = function () {
  for (let i = 0; i < albumsArray1.length; i++) {
    const albumID = albumsArray1[i];
    fetch(albumUrl + albumID)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Ops! Errore dalla risposta: ' + res.status);
        }
      })
      .then((albumData) => {
        const artistAlbums = document.getElementById('small-cards');
        const cover = albumData.cover_medium;
        const title = albumData.title;

        artistAlbums.innerHTML += `
              <div class="card mb-3 border-0">
              <div class="row g-0">
                <div class="col col-4">
                  <img
                    src="${cover}"
                    class="img-fluid rounded-start-1"
                    alt="preview"
                    style="min-width: 40px; min-height: 40px"
                  />
                </div>
                <div class="col col-8">
                  <div class="card-body">
                    <h6 class="card-title">${title}</h6>
                  </div>
                </div>
              </div>
            </div>
        `;
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }
};

loadAlbumsSmallCards();

const loadAlbumsBigCards = function () {
  for (let i = 0; i < albumsArray2.length; i++) {
    const currentAlbumID = albumsArray2[i];
    fetch(albumUrl + currentAlbumID)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Ops! Errore dalla risposta: ' + res.status);
        }
      })
      .then((albumData) => {
        console.log('album data', albumData);
        const artistAlbums = document.getElementById('big-cards');
        const cover = albumData.cover_medium;
        const title = albumData.title;
        const artist = albumData.artist.name;
        const nTracks = albumData.nb_tracks;

        artistAlbums.innerHTML += `
           <div class="card bg-gradient border-0 rounded-3 mb-5">
                    <div class="row m-3">
                      <div class="col">
                        <img
                          src="${cover}"
                          class="img-fluid shadow-lg"
                          alt="preview"
                          style="min-width: 45px; min-height: 45px"
                        />
                      </div>
                      <div class="col">
                        <div class="card-body">
                           <a class="artistAncor" href="./artist-page.html"><p class="small text-secondary my-0">${artist}</p></a>
                          <a class="albumAncor" href="./album-details.html"><h6 class="card-title my-0">${title}</h6></a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <a class="link-success">
                          <i class="bi bi-heart-fill"></i
                        ></a>
                        <i class="bi bi-three-dots-vertical"></i>
                      </div>
                      <div
                        class="col d-flex align-items-center justify-content-end"
                      >
                        <p class="small text-secondary me-2 my-0">${nTracks} brani</p>

                        <i
                          class="btn btn-dark rounded-circle bi bi-play-fill fs-5 px-1 py-0"
                        ></i>
                      </div>
                    </div>
                  </div>
        `;
        const artistAncor = artistAlbums.querySelector('.artistAncor');
        const artistID = albumData.artist.id;
        const albumAncor = artistAlbums.querySelector('.albumAncor');
        artistAncor.addEventListener('click', () => {
          const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;
          localStorage.setItem('artistURL', artistURL);
        });
        albumAncor.addEventListener('click', () => {
          const albumURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${currentAlbumID}`;
          localStorage.setItem('albumURL', albumURL);
        });
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }
};

loadAlbumsBigCards();

// funzione riempi amici:
const artistArray = ['acdc', 'deeppurple', 'tupac', '50cent'];

const fillFriendsAside = function () {
  const friends = document.querySelectorAll('.friend'); // seleziona i div "amico"

  friends.forEach((friend, index) => {
    const artist = artistArray[index];

    fetch(searchURL + artist)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(res.status);
      })
      .then((data) => {
        if (data.data.length > 0) {
          const firstSong = data.data[0];
          const songDiv = friend.querySelector('.song-name');
          songDiv.innerText = firstSong.title;
          const artistID = firstSong.artist.id;

          songDiv.addEventListener('click', () => {
            const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;
            localStorage.setItem('artistURL', artistURL);
          });
        }
      })
      .catch((err) => console.log('Errore:', err));
  });
};

fillFriendsAside();
