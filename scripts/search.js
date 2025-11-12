const searchButton = document.getElementById("button-addon1")
const searchField = document.getElementById("searchField")
const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

searchButton.addEventListener(
  "click",
  (searchArtist = () => {

    fetch(searchURL + `${searchField.value}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(`${res.status}`)
        }
      })

      .then((artistDetails) => {
        console.log(artistDetails)
        let artistID = artistDetails.data[0].artist.id        
        
        // DA FARE
        // - local storage
        const artistDetailsURL = artistUrl + `${artistID}`

        localStorage.setItem("artistURL", artistDetailsURL)

        // - redirect on artists page con i local storage
        window.open("artist-page.html", '_blank')

      })

      .catch((err) => {
            console.log("error:", err)
      })
  })
)
