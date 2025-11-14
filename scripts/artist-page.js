let artistURL = localStorage.getItem('artistURL');
const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
console.log(artistURL);

// recuperare il contenuto del player
const songTitle = localStorage.getItem('songTitle');
const songAuthor = localStorage.getItem('songAuthor');
const songCover = localStorage.getItem('songCover');
const trackAudio = localStorage.getItem('trackAudio');
const isPaused = localStorage.getItem('isPaused');
console.log(isPaused);
const boolean = isPaused === 'true';

const savedAudio = new Audio(trackAudio);

let initialPaused;

if (isPaused === null) {
  initialPaused = true; // se non c’è nulla in localStorage, parte in pausa
} else if (isPaused === 'true') {
  initialPaused = true; // se è true inizia con pausa
} else {
  initialPaused = false; // se è false inizia con play
}

const fillPlayer = function (title, author, cover, audio) {
  const playerText = document.getElementById('playerText');
  const albumCoverPlayer = document.getElementById('album_small_cover');
  const play_btns = document.getElementsByClassName('play_btns');
  albumCoverPlayer.setAttribute('src', cover);
  if (!initialPaused) {
    savedAudio.play();
  } else {
    savedAudio.pause();
  }

  playerText.innerHTML = `
                <h6>${title}</h6>
                <p>di ${author}</p>
                <i
                    class="cuore bi bi-heart d-none d-md-inline-block position-absolute"
                  ></i>`;

  for (let i = 0; i < play_btns.length; i++) {
    play_btns[i].addEventListener(
      'click',
      (togglePlay = () => {
        if (audio.paused) {
          audio.pause();
          localStorage.setItem('isPaused', true);

          for (let i = 0; i < play_btns.length; i++) {
            play_btns[
              i
            ].innerHTML = `<i class="bi bi-play-fill play_btns fs-5 m-0"></i>`;
          }
        } else {
          audio.play();
          for (let i = 0; i < play_btns.length; i++) {
            play_btns[
              i
            ].innerHTML = `<i class="bi bi-pause-fill fs-5 m-0"></i>`;
          }
          localStorage.setItem('isPaused', false);
        }
      })
    );
  }

  for (let i = 0; i < play_btns.length; i++) {
    play_btns[i].innerHTML = `<i class="bi bi-pause-fill fs-5 m-0"></i>`;
  }
};

fillPlayer(songTitle, songAuthor, songCover, savedAudio);

// riempire sezione header dell'artista:

const loadArtist = function () {
  fetch(artistURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })

    .then((artistDetails) => {
      console.log(artistDetails);
      const artistFullName = artistDetails.name;
      const artistImg = artistDetails.picture_xl;
      const artistFans = artistDetails.nb_fan;
      const artistNameToChange = document.getElementById('artist-name');
      const artistImgToChange = document.getElementById('artist-img');
      const artistHeader = document.getElementById('artist_header');
      const fansNumber = document.getElementById('fansNumber');
      const txtToChange = document.getElementById('txt-to-change');

      artistNameToChange.innerText = artistFullName;
      txtToChange.innerText = `8 brani di ${artistFullName}`;
      artistImgToChange.src = artistImg;
      artistHeader.style.backgroundImage = `url(${artistImg})`;
      fansNumber.innerText = artistFans;
      let artistName = artistFullName.trim();
      console.log(artistName);

      // riempire sezione albums popolari:
      let searchArtistURL = searchURL + artistName;
      console.log(searchArtistURL);

      fetch(searchArtistURL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Ops! Errore dalla risposta:', res.status);
          }
        })
        .then((songsArray) => {
          console.log('songsArray', songsArray);
          console.log('songAlbum', songsArray.data[0].album);

          for (let i = 0; i < 5; i++) {
            const popularAlbums = document.getElementById('popular-albums');
            const currentAlbumID = songsArray.data[i].album.id;

            const li = document.createElement('li');

            li.innerHTML = `<a class="albumAncor" href="./album-details.html">
          <div class="row align-items-center mb-4">
          <div class="col col-2">
          <img id="pop-alb-img"
          src= ${songsArray.data[i].album.cover_small}
          class="w-100 ms-2"
          />
          </div>
         <div class="col">
          <h5 id="pop-alb-title" class="m-0">${songsArray.data[i].album.title}</h5>
          <p id="pop-alb-ascolti" class="m-0 small text-secondary">${songsArray.data[i].rank} ascolti</p>
          </div>
          <div class="col d-flex justify-content-end">
          <i class="bi bi-three-dots-vertical"></i>
          </div>
          </div></a>
          
          `;

            const albumAncor = li.querySelector('.albumAncor');

            albumAncor.addEventListener('click', () => {
              const albumURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${currentAlbumID}`;
              localStorage.setItem('albumURL', albumURL);
            });

            popularAlbums.appendChild(li);
          }
        })
        .catch((err) => {
          console.log('error:', err);
        });
    })

    .catch((err) => {
      console.log('error:', err);
    });
};

loadArtist();

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
