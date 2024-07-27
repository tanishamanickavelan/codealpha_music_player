document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeControl = document.getElementById('volume-control');
    const progressBar = document.getElementById('progress-bar');
    const searchBar = document.getElementById('search-bar');
    const playlistTracks = document.getElementById('playlist-tracks');
    const searchResultsList = document.getElementById('search-results-list');

    let audio = new Audio();
    let isPlaying = false;
    let currentTrackIndex = 0;
    const playlist = []; // List of track objects [{src, title, artist}]

    // Event Listeners
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            if (!audio.src) {
                // Load the first track from the playlist
                loadTrack(currentTrackIndex);
            }
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    });

    volumeControl.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });

    progressBar.addEventListener('input', (e) => {
        audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        searchMusic(query);
    });

    function loadTrack(index) {
        audio.src = playlist[index].src;
        audio.title = playlist[index].title;
        audio.artist = playlist[index].artist;
        document.title = `${audio.title} - ${audio.artist}`;
    }

    function searchMusic(query) {
        // Mock search results for demonstration
        const results = [
            {title: 'Song 1', artist: 'Artist 1', src: 'song1.mp3'},
            {title: 'Song 2', artist: 'Artist 2', src: 'song2.mp3'}
        ].filter(track => track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query));
        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        searchResultsList.innerHTML = '';
        results.forEach(track => {
            const li = document.createElement('li');
            li.textContent = `${track.title} by ${track.artist}`;
            li.addEventListener('click', () => {
                playlist.push(track);
                updatePlaylist();
            });
            searchResultsList.appendChild(li);
        });
    }

    function updatePlaylist() {
        playlistTracks.innerHTML = '';
        playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = `${track.title} by ${track.artist}`;
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                if (isPlaying) audio.play();
            });
            playlistTracks.appendChild(li);
        });
    }
});
