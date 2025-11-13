const searchButton = document.getElementById('button-addon1');
const searchField = document.getElementById('searchField');
const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';

searchButton.addEventListener(
  'click',
  (searchArtist = () => {
    fetch(searchURL + `${searchField.value}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`${res.status}`);
        }
      })

      .then((artistDetails) => {
        console.log(artistDetails);
        let artistID = artistDetails.data[0].artist.id;

        // DA FARE
        // - local storage
        const artistDetailsURL = artistUrl + `${artistID}`;

        localStorage.setItem('artistURL', artistDetailsURL);

        // - redirect on artists page con i local storage
        window.open('artist-page.html', '_blank');
      })

      .catch((err) => {
        console.log('error:', err);
      });
  })
);

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
