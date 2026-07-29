const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const albumCover = document.getElementById('album-cover');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const playlistList = document.getElementById('playlist-list');

const musicLibrary = [
    { title: "Kesariya", artist: "Arijit Singh", cover: "./1.png", source: "./Kesariya Brahmastra 320 Kbps.mp3" },
    { title: "Nayan", artist: "Dhvani Bhanushali,Jubin Nautiyal,Lijo George-Dj Chetas", cover: "./2.png", source: "./Nayan Dhvani Bhanushali 128 Kbps.mp3" },
    { title: "Vaaste", artist: "Nikhil D'souza, Dhvani Bhanushali, Tanishk Bagchi", cover: "./7.png", source: "./Vaaste Nikhil Dsouza 128 Kbps.mp3" },
    { title: "Soulmate", artist: " Arijit Singh, Badshah", cover: "./8.png", source: "./Soulmate Ek Tha Raja 128 Kbps.mp3" },
    { title: "Made In India", artist: "Guru Randhawa", cover: "./9.png", source: "./Made In India Guru Randhawa 128 Kbps.mp3" },
    { title: "Panwadi", artist: "Khesari Lal Yadav, Masoom Sharma, Dev Negi, Pritam, Nikhita Gandhi, Akasa", cover: "./10.png", source: "./Panwadi Sunny Sanskari Ki Tulsi Kumari 128 Kbps.mp3" },
    { title: "Ishq Jalakar", artist: "Shashwat Sachdev, Shahzad Ali, Subhadeep Das Chowdhury, Armaan Khan", cover: "./3.png", source: "./Ishq Jalakar Dhurandhar 128 Kbps.mp3" },
    { title: "Shararat", artist: "Jasmine Sandlas, Shashwat Sachdev, Madhubanti Bagchi", cover: "./4.png", source: "./Shararat Dhurandhar 128 Kbps.mp3" },
    { title: "Ilahi", artist: "Pritam, Arijit Singh", cover: "./5.png", source: "./Ilahi Yeh Jawaani Hai Deewani 128 Kbps.mp3" },
    { title: "Lagdi Lahore Di", artist: "Guru Randhawa, Tulsi Kumar", cover: "./6.png", source: "./Lagdi Lahore Di Street Dancer 3d 128 Kbps.mp3" },
    { title: "Hasina Pagal Deewani", artist: "Mika Singh, Asees Kaur", cover: "./11.png", source: "./Hasina Pagal Deewani 128 Kbps.mp3" },
    { title: "Not Ramaiya Vastavaiya", artist: "Vishal Dadlani, Shilpa Rao", cover: "./12.png", source: "./Not Ramaiya Vastavaiya Jawan 128 Kbps.mp3" }
];

let currentTrackIndex = 0;

// Update Now Playing Info
function updateSongInfo() {
    const currentTrack = musicLibrary[currentTrackIndex];
    songTitle.textContent = currentTrack.title;
    artistName.textContent = currentTrack.artist;

    // Animate cover
    albumCover.style.transform = "scale(0.9)";
    albumCover.src = currentTrack.cover;
    setTimeout(() => albumCover.style.transform = "scale(1)", 100);

    audioPlayer.src = currentTrack.source;
}

// Play / Pause
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = "Pause";
    } else {
        audioPlayer.pause();
        playBtn.textContent = "Play";
    }
});

// Previous / Next
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + musicLibrary.length) % musicLibrary.length;
    updateSongInfo();
    audioPlayer.play();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicLibrary.length;
    updateSongInfo();
    audioPlayer.play();
});

// Progress Bar
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
});

// Volume
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Create Playlist Items
function createPlaylistItems() {
    playlistList.innerHTML = "";
    musicLibrary.forEach((track, index) => {
        const listItem = document.createElement('li');

        const img = document.createElement('img');
        img.src = track.cover;

        const span = document.createElement('span');
        span.textContent = track.title;

        listItem.onclick = () => {
            currentTrackIndex = index;
            updateSongInfo();
            audioPlayer.play();
        };

        listItem.appendChild(img);
        listItem.appendChild(span);
        playlistList.appendChild(listItem);
    });
}

// Run on Load
updateSongInfo();
createPlaylistItems();