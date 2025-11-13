const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
let albumURL = localStorage.getItem('albumURL');
console.log(albumURL);

const albumCover = document.getElementById('album_cover');
const albumCoverPlayer = document.getElementById('albumCoverPlayer');
const albumTitle = document.getElementById('albumTitle');
const smallArtist = document.getElementById('smallArtistImg');
const artistName = document.getElementById('artistName');
const albumYear = document.getElementById('albumYear');
const songsList = document.getElementById('songsList');
const card = document.getElementById('album_card');

const loadArtist = function () {
  fetch(albumURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })

    .then((albumDetails) => {
      console.log(albumDetails);
      albumCover.setAttribute('src', albumDetails.cover_big);
      albumCoverPlayer.setAttribute('src', albumDetails.cover_small);
      smallArtist.setAttribute('src', albumDetails.artist.picture_small);
      artistName.innerText = albumDetails.artist.name;
      albumTitle.innerText = albumDetails.title;
      albumYear.innerText = parseInt(albumDetails.release_date);

      const artistID = albumDetails.artist.id;
      const artistAncor = document.querySelector('.artistAncor');

      artistAncor.addEventListener('click', () => {
        const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;
        localStorage.setItem('artistURL', artistURL);
      });
      // sfumatura colore ------------------------------------------------------------------------------------------
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = albumDetails.cover_big;

      const colorThief = new ColorThief();
      if (img.complete) {
        const dominantColor = colorThief.getColor(img);
        console.log(dominantColor);
        card.style.background = `linear-gradient(0deg, #212529 50%, rgb(${dominantColor.join(
          ','
        )}) 100%)`;
      } else {
        img.addEventListener('load', function () {
          const dominantColor = colorThief.getColor(img);
          console.log('Dominant color:', dominantColor);
          card.style.background = `linear-gradient(0deg, #212529 50%, rgb(${dominantColor.join(
            ','
          )}) 100%)`;
          // Cambia lo sfondo della card in base al colore dominante
        });
      }

      for (let i = 0; i < albumDetails.tracks.data.length; i++) {
        songsList.innerHTML += `
        <div class="col">
        <h5 class="m-0">${albumDetails.tracks.data[i].title}</h5>
        <p class="m-0 small text-secondary">${albumDetails.tracks.data[i].rank}</p>
        </div>
        <div class="col text-end">
        <button class="play_btn btn border-0"><i class="bi bi-play-fill fs-1"></i></button>
        </div>`;

        //   funzione small play buttons
        const play_btn = document.getElementsByClassName('play_btn');
        const playerText = document.getElementById('playerText');
        let audio = new Audio(albumDetails.tracks.data[i].preview);
        for (let i = 0; i < play_btn.length; i++) {
          play_btn[i].addEventListener(
            'click',
            (togglePlay = () => {
              play_btn[
                i
              ].innerHTML = `<i class="bi bi-pause-fill fs-1 pause_btn"></i>`;
              playerText.innerHTML = `
              <h6>${albumDetails.tracks.data[i].title}</h6>
              <p>di ${albumDetails.tracks.data[i].name}</p>`;
              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
                play_btn[i].innerHTML = `<i class="bi bi-play-fill fs-1"></i>`;
              }
            })
          );
        }
      }
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
