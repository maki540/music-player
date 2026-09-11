// Music Playlist with Online Sources
const songs = [
    {
        id: 1,
        title: "Finesse",
        artist: "Lil Durk ft. Lil Baby",
        album: "Just Cause Y'all Waited 2",
        duration: 180,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://via.placeholder.com/250?text=Lil+Durk"
    },
    {
        id: 2,
        title: "Back Again",
        artist: "Lil Baby",
        album: "My Turn",
        duration: 195,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://via.placeholder.com/250?text=Lil+Baby"
    },
    {
        id: 3,
        title: "Kick In The Door",
        artist: "NBA YoungBoy",
        album: "Sincerely, Kentrell",
        duration: 210,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        image: "https://via.placeholder.com/250?text=NBA+YoungBoy"
    },
    {
        id: 4,
        title: "The Code",
        artist: "Lil Durk",
        album: "7220",
        duration: 188,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        image: "https://via.placeholder.com/250?text=Lil+Durk+7220"
    },
    {
        id: 5,
        title: "Drip Too Hard",
        artist: "Lil Baby & Gunna",
        album: "Drip Season 3",
        duration: 175,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        image: "https://via.placeholder.com/250?text=Drip+Too+Hard"
    },
    {
        id: 6,
        title: "Outside Today",
        artist: "NBA YoungBoy",
        album: "Ai YoungBoy 2",
        duration: 202,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        image: "https://via.placeholder.com/250?text=Outside+Today"
    },
    {
        id: 7,
        title: "Cash",
        artist: "Lil Durk ft. Lil Baby",
        album: "Laugh Now, Cry Later",
        duration: 185,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        image: "https://via.placeholder.com/250?text=Cash"
    },
    {
        id: 8,
        title: "Top",
        artist: "NBA YoungBoy",
        album: "Emo Passion",
        duration: 198,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://via.placeholder.com/250?text=NBA+YoungBoy+Top"
    }
];

// DOM Elements
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressSlider = document.getElementById('progressSlider');
const volumeSlider = document.getElementById('volumeSlider');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumName = document.getElementById('albumName');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const albumArt = document.getElementById('albumArt');
const playlistEl = document.getElementById('playlist');
const progressFill = document.querySelector('.progress-fill');

// Player State
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
let shuffledIndices = [];

// Initialize
init();

function init() {
    renderPlaylist();
    loadSong(currentSongIndex);
    volumeSlider.value = audio.volume * 100;
}

// Load Song
function loadSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumName.textContent = song.album;
    albumArt.src = song.image;
    audio.src = song.url;
    
    durationEl.textContent = formatTime(song.duration);
    progressSlider.max = song.duration;
    
    updatePlaylistUI();
}

// Play Song
function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.classList.add('active');
}

// Pause Song
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.remove('active');
}

// Toggle Play/Pause
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Next Song
function nextSong() {
    if (isShuffle) {
        currentSongIndex = shuffledIndices[Math.floor(Math.random() * shuffledIndices.length)];
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(currentSongIndex);
    playSong();
}

// Previous Song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Toggle Shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    
    if (isShuffle) {
        shuffledIndices = Array.from({length: songs.length}, (_, i) => i);
        shuffledIndices = shuffledIndices.sort(() => Math.random() - 0.5);
    }
}

// Toggle Repeat
function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    repeatBtn.classList.toggle('active', repeatMode > 0);
    
    if (repeatMode === 2) {
        repeatBtn.style.opacity = '1';
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i> <span style="font-size: 10px; margin-left: 2px;">1</span>';
    } else if (repeatMode === 1) {
        repeatBtn.style.opacity = '0.7';
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    } else {
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    }
}

// Format Time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update Progress Bar
function updateProgress() {
    progressSlider.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    progressFill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
}

// Update Playlist UI
function updatePlaylistUI() {
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

// Render Playlist
function renderPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        if (index === currentSongIndex) playlistItem.classList.add('active');
        
        playlistItem.innerHTML = `
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div class="playlist-item-duration">${formatTime(song.duration)}</div>
        `;
        
        playlistItem.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });
        
        playlistEl.appendChild(playlistItem);
    });
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);

// Progress Slider
progressSlider.addEventListener('input', (e) => {
    audio.currentTime = e.target.value;
});

// Volume Slider
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Audio Events
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
    progressSlider.max = audio.duration;
});

audio.addEventListener('ended', () => {
    if (repeatMode === 2) {
        // Repeat one song
        audio.currentTime = 0;
        playSong();
    } else {
        // Move to next song
        nextSong();
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight') {
        nextSong();
    } else if (e.code === 'ArrowLeft') {
        prevSong();
    }
});
