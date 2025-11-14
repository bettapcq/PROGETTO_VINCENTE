const searchButton = document.getElementById("button-addon1")
const searchField = document.getElementById("searchField")
const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

// player function
const songTitle = localStorage.getItem("songTitle")
const songAuthor = localStorage.getItem("songAuthor")
const songCover = localStorage.getItem("songCover")
const trackAudio = localStorage.getItem("trackAudio")
const isPaused = localStorage.getItem("isPaused")
console.log(isPaused)
const boolean = isPaused === "true"

const savedAudio = new Audio(trackAudio)

const fillPlayer = function (title, author, cover, audio, pause) {
  const playerText = document.getElementById("playerText")
  const albumCoverPlayer = document.getElementById("album_small_cover")
  const play_btns = document.getElementsByClassName("play_btns")
  albumCoverPlayer.setAttribute("src", cover)
  playerText.innerHTML = `
                <h6>${title}</h6>
                <p>di ${author}</p>
                <i
                    class="cuore bi bi-heart d-none d-md-inline-block position-absolute"
                  ></i>`

  // stato iniziale del player da local storage
  if (pause === true) {
    audio.pause()
    for (let i = 0; i < play_btns.length; i++) {
      play_btns[i].innerHTML =
        '<i class="bi bi-play-fill play_btns fs-5 m-0"></i>'
    }
  } else {
    audio.play()
    for (let i = 0; i < play_btns.length; i++) {
      play_btns[i].innerHTML = '<i class="bi bi-pause-fill fs-5 m-0"></i>'
    }
  }

  for (let i = 0; i < play_btns.length; i++) {
    play_btns[i].addEventListener(
      "click",
      (togglePlay = () => {
        if (audio.paused) {
          audio.play()
          localStorage.setItem("isPaused", "false")
          for (let j = 0; j < play_btns.length; j++) {
            play_btns[j].innerHTML = '<i class="bi bi-pause-fill fs-5 m-0"></i>'
          }
        } else {
          audio.pause()
          localStorage.setItem("isPaused", "true")
          for (let j = 0; j < play_btns.length; j++) {
            play_btns[j].innerHTML = '<i class="bi bi-play-fill fs-5 m-0"></i>'
          }
        }
      })
    )
  }
}

fillPlayer(songTitle, songAuthor, songCover, savedAudio, boolean)

// search function
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
        window.open("artist-page.html", "_blank")
      })

      .catch((err) => {
        console.log("error:", err)
      })
  })
)

// funzione riempi amici:

const artistArray = ["acdc", "deeppurple", "tupac", "50cent"]

const fillFriendsAside = function () {
  const friends = document.querySelectorAll(".friend") // seleziona i div "amico"

  friends.forEach((friend, index) => {
    const artist = artistArray[index]

    fetch(searchURL + artist)
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.status)
      })
      .then((data) => {
        if (data.data.length > 0) {
          const firstSong = data.data[0]
          const songDiv = friend.querySelector(".song-name")
          songDiv.innerText = firstSong.title
          const artistID = firstSong.artist.id

          songDiv.addEventListener("click", () => {
            const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`
            localStorage.setItem("artistURL", artistURL)
          })
        }
      })
      .catch((err) => console.log("Errore:", err))
  })
}

fillFriendsAside()
