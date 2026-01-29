
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;
let curr_track = document.createElement("audio");

let track_list = [
  {
    name: "Cold Hearted-7 (Edit)",
    artist: "Paula Abdul",
    image: "https://files.catbox.moe/fbdeu1.jpg",
    path: "https://files.catbox.moe/8zarng.mp3"
  },
  {
    name: "Two of Hearts",
    artist: "Stacey Q",
    image: "https://files.catbox.moe/80r0on.jpg",
    path: "https://files.catbox.moe/us3jja.mp3"
  },
  {
    name: "I Think We're Alone Now",
    artist: "Tiffany",
    image: "https://files.catbox.moe/z6d1p4.jpeg",
    path: "https://files.catbox.moe/f17jk3.mp3"
  },
  {
    name: "So Emotional",
    artist: "Whitney Houston",
    image: "https://files.catbox.moe/fvg3yo.jpg",
    path: "https://files.catbox.moe/6264t5.mp3"
  },
  {
    name: "Upside Down",
    artist: "Diana Ross",
    image: "https://files.catbox.moe/z3gry9.jpg",
    path: "https://files.catbox.moe/4m98s3.mp3"
  }
]

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[index].path;
  curr_track.load();

  track_art.style.backgroundImage = `url(${track_list[index].image})`;
  track_name.textContent = track_list[index].name;
  track_artist.textContent = track_list[index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause fa-lg"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play fa-lg"></i>';
}

function nextTrack() {
  track_index = (track_index + 1) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  track_index = (track_index - 1 + track_list.length) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
}

function seekUpdate() {
  if (!isNaN(curr_track.duration)) {
    let pos = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = pos;

    let cm = Math.floor(curr_track.currentTime / 60);
    let cs = Math.floor(curr_track.currentTime % 60);
    let dm = Math.floor(curr_track.duration / 60);
    let ds = Math.floor(curr_track.duration % 60);

    curr_time.textContent = `${cm.toString().padStart(2,"0")}:${cs.toString().padStart(2,"0")}`;
    total_duration.textContent = `${dm.toString().padStart(2,"0")}:${ds.toString().padStart(2,"0")}`;
  }
}

loadTrack(track_index);