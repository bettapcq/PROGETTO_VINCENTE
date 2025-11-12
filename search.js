const searchButton = document.getElementById("button-addon1")
const searchField = document.getElementById("searchField")
const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`
artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

searchButton.addEventListener(
  "click",
  (search = () => {
    console.log(searchURL + `${searchField.value}`)
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
        console.log(artistID)
        
        
        // DA FARE
        // - local storage dei results
        const allTheParameters = new URLSearchParams(location.search)
        console.log(allTheParameters)

        const id = allTheParameters.get(artistURL + artistID)
        console.log(id)
        // - redirect on artists page con i local storage
        // window.open("artist-page.html" + id, '_blank')

      })

      .catch((err) => {
            console.log("error:", err)
      })
  })
)
