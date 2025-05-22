const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const albumArt = document.getElementById('album-art');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');

let isPlaying = false;
let currentTrack = 0;


const songs = [
  {
    name: 'Tum hi ho',
    artist: 'Arijit singh',
    src: '128-Tum Hi Ho - Aashiqui 2 128 Kbps.mp3',
    img: 'tum hi ho.jpg'
  },
  {
    name: 'pachtaoge',
    artist: 'Arijit Singh',
    src: '128-Pachtaoge - Arijit Singh 128 Kbps.mp3',
    img: 'pachtaoge.jpg'
  },
  {
    name: 'Soni soni',
    artist: 'Dharshan',
    src: '128-Soni Soni - Ishq Vishk Rebound 128 Kbps.mp3',
    img: 'Soni soni.jpg'
  }
];

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.name;
  artist.textContent = song.artist;
  albumArt.src = song.img;
  audio.src = song.src;
  highlightPlaylist(index);
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸';
  isPlaying = true;
  albumArt.classList.add('rotate');
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶';
  isPlaying = false;
  albumArt.classList.remove('rotate');
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  loadSong(currentTrack);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % songs.length;
  loadSong(currentTrack);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  updateTime();
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

audio.addEventListener('ended', () => {
  nextBtn.click(); // Auto-play next
});

function updateTime() {
  const current = formatTime(audio.currentTime);
  const total = formatTime(audio.duration);
  currentTimeEl.textContent = current;
  durationEl.textContent = total;
}

function formatTime(time) {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function buildPlaylist() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.name} - ${song.artist}`;
    li.addEventListener('click', () => {
      currentTrack = index;
      loadSong(index);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function highlightPlaylist(index) {
  [...playlistEl.children].forEach((li, i) => {
    li.classList.toggle('active', i === index);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playBtn.click();
  } else if (e.code === 'ArrowRight') {
    nextBtn.click();
  } else if (e.code === 'ArrowLeft') {
    prevBtn.click();
  }
});

// Initialize
loadSong(currentTrack);
buildPlaylist();
