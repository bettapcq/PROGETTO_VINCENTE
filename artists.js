const artistURL = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
let artistID = localStorage.getItem("artist")

const loadArtist = function(){
    fetch(artistURL + `${artistID}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(`${res.status}`)
        }
      })

      .then((results) => {
        console.log(results)
        
        // window.location.assign("artist-page.html")
        // - inserire gli ID nella artists page
      })

      .catch((err) => {
        console.log("error:", err)
      })
}

loadArtist()