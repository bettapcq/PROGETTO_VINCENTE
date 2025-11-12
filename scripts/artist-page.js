let artistURL = localStorage.getItem('artistURL');
console.log(artistURL);

const loadArtist = function () {
  fetch(artistURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })

    .then((results) => {
      console.log(results);

      // window.location.assign("artist-page.html")
      // - inserire gli ID nella artists page
    })

    .catch((err) => {
      console.log('error:', err);
    });
};

loadArtist();
