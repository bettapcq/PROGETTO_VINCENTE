let albumURL = localStorage.getItem("albumURL")
console.log(albumURL)

const loadArtist = function () {
  fetch(albumURL)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })

    .then((albumDetails) => {
      console.log(albumDetails)

      // window.location.assign("artist-page.html")
      // - inserire gli ID nella artists page
    })

    .catch((err) => {
      console.log("error:", err)
    })
}

loadArtist()
