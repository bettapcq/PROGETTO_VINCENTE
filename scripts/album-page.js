let albumURL = localStorage.getItem("albumURL")
console.log(albumURL)

const albumCover = document.getElementById("album_cover")
const albumCoverPlayer = document.getElementById("albumCoverPlayer")
const albumTitle = document.getElementById("albumTitle")
const smallArtist = document.getElementById("smallArtistImg")
const artistName = document.getElementById("artistName")
const albumYear = document.getElementById("albumYear")
const songsList = document.getElementById("songsList")

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
      albumCover.setAttribute("src", albumDetails.cover_big)
      albumCoverPlayer.setAttribute("src", albumDetails.cover_small)
      smallArtist.setAttribute("src", albumDetails.artist.picture_small)
      artistName.innerText = albumDetails.artist.name
      albumTitle.innerText = albumDetails.title
      albumYear.innerText = parseInt(albumDetails.release_date)

      for (let i = 0; i < albumDetails.tracks.data.length; i++) {
        songsList.innerHTML += `
        <div class="col">
        <h5 class="m-0">${albumDetails.tracks.data[i].title}</h5>
        <p class="m-0 small text-secondary">${albumDetails.tracks.data[i].name}</p>
        </div>
        <div class="col text-end">
        <button class="play_btn btn border-0"><i class="bi bi-play-fill fs-1"></i></button>
        </div>`

        //   funzione small play buttons
        const play_btn = document.getElementsByClassName("play_btn")
        const playerText = document.getElementById("playerText")
        for (let i = 0; i < play_btn.length; i++) {
          play_btn[i].addEventListener(
            "click",
            (play = () => {
              playerText.innerHTML = `<h6>${albumDetails.tracks.data[i].title}</h6>
              <p>di ${albumDetails.tracks.data[i].name}</p>`
            })
          )
        }
      }
    })

    .catch((err) => {
      console.log("error:", err)
    })
}

loadArtist()

/* {
    "id": 119606,
    "title": "Curtain Call: The Hits",
    "upc": "602498878934",
    "link": "https://www.deezer.com/album/119606",
    "share": "https://www.deezer.com/album/119606?utm_source=deezer&utm_content=album-119606&utm_term=0_1762957287&utm_medium=web",
    "cover": "https://api.deezer.com/album/119606/image",
    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
    "genre_id": 116,
    "genres": {
        "data": [
            {
                "id": 116,
                "name": "Rap/Hip Hop",
                "picture": "https://api.deezer.com/genre/116/image",
                "type": "genre"
            }
        ]
    },
    "label": "Eminem Catalog PS",
    "nb_tracks": 17,
    "duration": 4669,
    "fans": 494577,
    "release_date": "2005-01-01",
    "record_type": "album",
    "available": true,
    "tracklist": "https://api.deezer.com/album/119606/tracks",
    "explicit_lyrics": true,
    "explicit_content_lyrics": 4,
    "explicit_content_cover": 0,
    "contributors": [
        {
            "id": 13,
            "name": "Eminem",
            "link": "https://www.deezer.com/artist/13",
            "share": "https://www.deezer.com/artist/13?utm_source=deezer&utm_content=artist-13&utm_term=0_1762957287&utm_medium=web",
            "picture": "https://api.deezer.com/artist/13/image",
            "picture_small": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/56x56-000000-80-0-0.jpg",
            "picture_medium": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/250x250-000000-80-0-0.jpg",
            "picture_big": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/500x500-000000-80-0-0.jpg",
            "picture_xl": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/1000x1000-000000-80-0-0.jpg",
            "radio": true,
            "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
            "type": "artist",
            "role": "Main"
        }
    ],
    "artist": {
        "id": 13,
        "name": "Eminem",
        "picture": "https://api.deezer.com/artist/13/image",
        "picture_small": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/56x56-000000-80-0-0.jpg",
        "picture_medium": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/250x250-000000-80-0-0.jpg",
        "picture_big": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/500x500-000000-80-0-0.jpg",
        "picture_xl": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/1000x1000-000000-80-0-0.jpg",
        "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
        "type": "artist"
    },
    "type": "album",
    "tracks": {
        "data": [
            {
                "id": 1109723,
                "readable": true,
                "title": "Intro",
                "title_short": "Intro",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109723",
                "duration": 34,
                "rank": 349667,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/d/2/6/0/d2678559f758db9e148e429475f14a88.mp3?hdnea=exp=1762958187~acl=/api/1/1/d/2/6/0/d2678559f758db9e148e429475f14a88.mp3*~data=user_id=0,application_id=42~hmac=7ef31dfc53a668209f040f1819d3d7bdfd62b68e4b61d0545c6ac8e5760b58d0",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109725,
                "readable": true,
                "title": "FACK",
                "title_short": "FACK",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109725",
                "duration": 206,
                "rank": 539977,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/c/4/b/0/c4bd0243e091a6a1b109c06543b532b7.mp3?hdnea=exp=1762958187~acl=/api/1/1/c/4/b/0/c4bd0243e091a6a1b109c06543b532b7.mp3*~data=user_id=0,application_id=42~hmac=a802eb1a2d4111051a8ea86465eb8b4b1b0c2f102646be2d679c2dcd838b58dc",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109727,
                "readable": true,
                "title": "The Way I Am",
                "title_short": "The Way I Am",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109727",
                "duration": 291,
                "rank": 727122,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/2/e/2/0/2e22eedde36f592ceed2caa9439ffd86.mp3?hdnea=exp=1762958187~acl=/api/1/1/2/e/2/0/2e22eedde36f592ceed2caa9439ffd86.mp3*~data=user_id=0,application_id=42~hmac=45beae6f74d6a0b8ce09a7a4eedb99011ee43492f91c239b9b502196d27ed16a",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109729,
                "readable": true,
                "title": "My Name Is",
                "title_short": "My Name Is",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109729",
                "duration": 268,
                "rank": 753949,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/b/d/c/0/bdc51623d58600791c11720906bac5b3.mp3?hdnea=exp=1762958187~acl=/api/1/1/b/d/c/0/bdc51623d58600791c11720906bac5b3.mp3*~data=user_id=0,application_id=42~hmac=fc2866d178645af1debd4897be7bb1e7212a94f0ba76a2be8fcb73fc9059288a",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109730,
                "readable": true,
                "title": "Stan",
                "title_short": "Stan",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109730",
                "duration": 403,
                "rank": 908779,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/b/1/2/0/b12a45a11b396586adf4b124aaa192bc.mp3?hdnea=exp=1762958187~acl=/api/1/1/b/1/2/0/b12a45a11b396586adf4b124aaa192bc.mp3*~data=user_id=0,application_id=42~hmac=61afdaaa8dfe6f9f8d1ae2ab9daeee13b5fb58a6cde3210bf309ce9fe17aba68",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109731,
                "readable": true,
                "title": "Lose Yourself",
                "title_short": "Lose Yourself",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109731",
                "duration": 326,
                "rank": 982315,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/2/7/a/0/27a14827ff1e82c5e40e8b6a934a8637.mp3?hdnea=exp=1762958187~acl=/api/1/1/2/7/a/0/27a14827ff1e82c5e40e8b6a934a8637.mp3*~data=user_id=0,application_id=42~hmac=de3b03254b65b5576fc77b7eccba356ccf2aa0b9e7cf47c3e6eec6a063392a62",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109733,
                "readable": true,
                "title": "Shake That",
                "title_short": "Shake That",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109733",
                "duration": 275,
                "rank": 794496,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/5/f/e/0/5fec5acaaf90645e08bd607470c5a8c8.mp3?hdnea=exp=1762958187~acl=/api/1/1/5/f/e/0/5fec5acaaf90645e08bd607470c5a8c8.mp3*~data=user_id=0,application_id=42~hmac=a23f70137428f54ddd6582afe00c5418fba252754e3dca96a6c5df9d1daf900b",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109734,
                "readable": true,
                "title": "Sing For The Moment",
                "title_short": "Sing For The Moment",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109734",
                "duration": 339,
                "rank": 419603,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/3/8/e/0/38e237931c2f8a721ba46b4eb8b3114d.mp3?hdnea=exp=1762958187~acl=/api/1/1/3/8/e/0/38e237931c2f8a721ba46b4eb8b3114d.mp3*~data=user_id=0,application_id=42~hmac=a899d28f8543ce284f92bd4ff974d254ab6d8685cd1b85c8c2619305429c85aa",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109735,
                "readable": true,
                "title": "Without Me",
                "title_short": "Without Me",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109735",
                "duration": 290,
                "rank": 435173,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/3/8/7/0/387643513bf2e2750434a13f923904b8.mp3?hdnea=exp=1762958187~acl=/api/1/1/3/8/7/0/387643513bf2e2750434a13f923904b8.mp3*~data=user_id=0,application_id=42~hmac=190bf9b273e51af0c6b70e129c0672e2e58e865e6f724f9a00f47866f4411836",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109736,
                "readable": true,
                "title": "Like Toy Soldiers",
                "title_short": "Like Toy Soldiers",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109736",
                "duration": 297,
                "rank": 668805,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/6/4/4/0/64439db2532a2accd002443d6567dbd3.mp3?hdnea=exp=1762958187~acl=/api/1/1/6/4/4/0/64439db2532a2accd002443d6567dbd3.mp3*~data=user_id=0,application_id=42~hmac=5fde5661318e390d3301fd947f2b037c1877dcbc26c1cd7b119566bf645df4b1",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109737,
                "readable": true,
                "title": "The Real Slim Shady",
                "title_short": "The Real Slim Shady",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109737",
                "duration": 284,
                "rank": 950971,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/8/8/8/0/8884d70117209dbf5b9df927eda209da.mp3?hdnea=exp=1762958187~acl=/api/1/1/8/8/8/0/8884d70117209dbf5b9df927eda209da.mp3*~data=user_id=0,application_id=42~hmac=8ee7d6a4f814ab32aa22f8afd2ce9b9a4d9ae8e68dbf33b870e8680b72422c6a",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109739,
                "readable": true,
                "title": "Mockingbird",
                "title_short": "Mockingbird",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109739",
                "duration": 251,
                "rank": 974845,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/e/4/5/0/e4589311b7cdd524d1767bc2b7b6e17f.mp3?hdnea=exp=1762958187~acl=/api/1/1/e/4/5/0/e4589311b7cdd524d1767bc2b7b6e17f.mp3*~data=user_id=0,application_id=42~hmac=cb46d4c92ba1785f9592c8afde873dde4f93ffc678d8b1d69305b729deaff8c4",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109740,
                "readable": true,
                "title": "Guilty Conscience",
                "title_short": "Guilty Conscience",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109740",
                "duration": 199,
                "rank": 492915,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/7/6/8/0/768cf81a59e24941a2bda7e37d9ba777.mp3?hdnea=exp=1762958187~acl=/api/1/1/7/6/8/0/768cf81a59e24941a2bda7e37d9ba777.mp3*~data=user_id=0,application_id=42~hmac=a8dd9e3c36e826ee5f13c750a4522e6dbf81261ea1cb5bcd1bb61ab6c6f811d4",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109742,
                "readable": true,
                "title": "Cleanin' Out My Closet",
                "title_short": "Cleanin' Out My Closet",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109742",
                "duration": 297,
                "rank": 459192,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/5/6/1/0/561b807340dbf2254ef2ca98adf15a2e.mp3?hdnea=exp=1762958187~acl=/api/1/1/5/6/1/0/561b807340dbf2254ef2ca98adf15a2e.mp3*~data=user_id=0,application_id=42~hmac=ad8fcbafc4d32dbc38ea162e9b0ecde5310f74fdc8dfea55a993a5f754ac4e2a",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109743,
                "readable": true,
                "title": "Just Lose It",
                "title_short": "Just Lose It",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109743",
                "duration": 249,
                "rank": 686702,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/1/4/a/0/14a97f6e1d03afc7644d4ef599127994.mp3?hdnea=exp=1762958187~acl=/api/1/1/1/4/a/0/14a97f6e1d03afc7644d4ef599127994.mp3*~data=user_id=0,application_id=42~hmac=19c19f13dab01e1b68b1eab59449cc0930f49e60993687f0c6f280b79111519e",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109744,
                "readable": true,
                "title": "When I'm Gone",
                "title_short": "When I'm Gone",
                "title_version": "",
                "link": "https://www.deezer.com/track/1109744",
                "duration": 280,
                "rank": 709925,
                "explicit_lyrics": true,
                "explicit_content_lyrics": 1,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/c/7/2/0/c72dbc40b00bc4ded650d065be249fe2.mp3?hdnea=exp=1762958187~acl=/api/1/1/c/7/2/0/c72dbc40b00bc4ded650d065be249fe2.mp3*~data=user_id=0,application_id=42~hmac=b42b6b7557f5e4044b63ef2820a0139d228439c44d3c220f158e3f4311fdc601",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            },
            {
                "id": 1109745,
                "readable": true,
                "title": "Stan (Live At 43rd Grammy Awards)",
                "title_short": "Stan",
                "title_version": "(Live At 43rd Grammy Awards)",
                "link": "https://www.deezer.com/track/1109745",
                "duration": 380,
                "rank": 486829,
                "explicit_lyrics": false,
                "explicit_content_lyrics": 3,
                "explicit_content_cover": 0,
                "preview": "https://cdnt-preview.dzcdn.net/api/1/1/a/3/5/0/a35fa5c61b7c52fdb01033f3ff498328.mp3?hdnea=exp=1762958187~acl=/api/1/1/a/3/5/0/a35fa5c61b7c52fdb01033f3ff498328.mp3*~data=user_id=0,application_id=42~hmac=2548f011ed57e18a2bf781680ca87018a6bd355cc71c9fdadda6f1678f176854",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "artist": {
                    "id": 13,
                    "name": "Eminem",
                    "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
                    "type": "artist"
                },
                "album": {
                    "id": 119606,
                    "title": "Curtain Call: The Hits",
                    "cover": "https://api.deezer.com/album/119606/image",
                    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                    "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                    "tracklist": "https://api.deezer.com/album/119606/tracks",
                    "type": "album"
                },
                "type": "track"
            }
        ]
    }
} */
