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
                  class="btn btn-success btn-lg px-4 fw-semibold rounded-pill fs-6"
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
      `;
    })
    .catch((err) => {
      alert('Ops! Errore dal server:' + err);
    });
};

getSongDetails();

const albumsArray = [
  '1127912',
  '851331162',
  '324179237',
  '8446705',
  '104188',
  '72704062'
];

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
