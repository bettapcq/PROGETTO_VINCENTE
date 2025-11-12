let artistURL = localStorage.getItem('artistURL');
const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
console.log(artistURL);

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

      artistNameToChange.innerText = artistFullName;
      artistImgToChange.src = artistImg;
      artistHeader.style.backgroundImage = `url(${artistImg})`;
      fansNumber.innerText = artistFans;
      let artistName = artistFullName.trim(' ');
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
          console.log('songsArrray', songsArray);
          const popularAlbums = document.getElementById('popular-albums');
          //   const albumsApiArray = albumsArray.data;

          songsArray.data.forEach((song) => {
            const song2 = song
            console.log('canzone del for', song2);
            for (let i = 0; i < song2.length ; i++) {
              const albumTitle = song2[i].album.title;
              const albumImg = song2[i].album.cover;
              const albumAscolti = song2[i].rank;
              console.log(albumTitle, albumImg, albumAscolti);

              //       popularAlbums.innerHTML += `
              //    <li>
              //           <div class="row align-items-center">
              //             <div class="col col-2">
              //               <img id="pop-alb-img"
              //                 src= ${albumImg}
              //                 class="w-100 ms-2"
              //               />
              //             </div>
              //             <div class="col">
              //               <h5 id="pop-alb-title" class="m-0">${albumTitle}</h5>
              //               <p id="pop-alb-ascolti" class="m-0 small text-secondary">${albumAscolti} ascolti</p>
              //             </div>
              //             <div class="col d-flex justify-content-end">
              //               <i class="bi bi-three-dots-vertical"></i>
              //             </div>
              //           </div>
              //         </li>
              //         `;
            }
          });
        })

        .catch((err) => {
          console.log('error:', err);
        });
    })

    .catch((err) => {
      console.log('error:', err);
    });

  // window.location.assign("artist-page.html")
  // - inserire gli ID nella artists page
  // .catch((err) => {
  //   console.log('error:', err);
  // });
};

loadArtist();

// // riempire sezione albums popolari:

// const artistName = document.getElementById('artist-name').innerText;
// console.log(artistName);
// const searchArtistURL = searchURL + artistName;
// console.log(searchArtistURL)

// const loadPopularAlbums = () => {
//   fetch(searchArtistURL)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error('Ops! Errore dalla risposta:', res.status);
//       }
//     })
//     .then((albumDetails) => {
//       console.log(albumDetails);
//     });
//   //   .catch((err) => {
//   //             console.log("error:", err);
//   //       });
// };
