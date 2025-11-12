// const allTheParameters = new URLSearchParams(location.search);
// const id = allTheParameters.get(id);

const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/';

const deepPurpleID = 5953987;

const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';
const eminemId = 13;
const eminemAlbumId = 119606;

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
    .then((albumDetails) => {
      console.log(albumDetails);
      const albumTrack = albumDetails.tracks.data[5];
      console.log(albumTrack);
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
                >${albumDetails.title}</a
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




// const getAlbumsDetails = () => {
//   fetch(albumUrl + eminemAlbumId)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error('Ops! Errore dalla risposta:', res.status);
//       }
//     })
//     .then((albumDetails) => {
//       console.log(albumDetails);
//       const albumTrack = albumDetails.tracks.data[5];
//       console.log(albumTrack);
//       const songDiv = document.getElementById('songCard');
//       songDiv.innerHTML = `
// //  inserire card della paina album
//       `;
//     })
//     .catch((err) => {
//       alert('Ops! Errore dal server:' + err);
//     });
// };
