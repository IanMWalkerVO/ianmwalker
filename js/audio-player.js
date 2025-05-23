document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const volumeBtn = document.querySelector('.volume-btn');
    const volumeIcon = volumeBtn.querySelector('i');
    const volumeControl = document.getElementById('volumeControl');
    const albumCards = document.querySelectorAll('.album-card');
    const trackTitleEl = document.querySelector('.track-title');
    const trackArtistEl = document.querySelector('.track-artist');

    let currentAlbumCard = null;

    // Album card click handling
    albumCards.forEach(card => {
        card.addEventListener('click', function() {
            const audioSrc = this.dataset.audio;
            
            // If clicking the same card that's currently playing
            if (currentAlbumCard === this && !audioPlayer.paused) {
                audioPlayer.pause();
                playPauseIcon.classList.replace('fa-pause', 'fa-play');
                this.classList.remove('active');
                currentAlbumCard = null;
                return;
            }

            // Remove active state from previous card
            if (currentAlbumCard) {
                currentAlbumCard.classList.remove('active');
            }

            // Update audio source and play
            audioPlayer.src = audioSrc;
            audioPlayer.play();
            
            // Update UI
            this.classList.add('active');
            currentAlbumCard = this;
            playPauseIcon.classList.replace('fa-play', 'fa-pause');
            
            // Update track info
            const title = this.querySelector('.card-title').textContent;
            const subtitle = this.querySelector('.card-text').textContent;
            trackTitleEl.textContent = title;
            trackArtistEl.textContent = subtitle;
        });
    });

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', togglePlay);
    
    function togglePlay() {
        if (audioPlayer.paused) {
            if (!currentAlbumCard) {
                // Auto-select first album if none selected
                const firstAlbumCard = albumCards[0];
                if (firstAlbumCard) {
                    const audioSrc = firstAlbumCard.dataset.audio;
                    audioPlayer.src = audioSrc;
                    firstAlbumCard.classList.add('active');
                    currentAlbumCard = firstAlbumCard;
                    
                    // Update track info
                    const title = firstAlbumCard.querySelector('.card-title').textContent;
                    const subtitle = firstAlbumCard.querySelector('.card-text').textContent;
                    trackTitleEl.textContent = title;
                    trackArtistEl.textContent = subtitle;
                }
            }
            audioPlayer.play();
            playPauseIcon.classList.replace('fa-play', 'fa-pause');
            if (currentAlbumCard) {
                currentAlbumCard.classList.add('active');
            }
        } else {
            audioPlayer.pause();
            playPauseIcon.classList.replace('fa-pause', 'fa-play');
            if (currentAlbumCard) {
                currentAlbumCard.classList.remove('active');
            }
        }
    }

    // Update progress bar
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    function updateProgress() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }

    // Click on progress bar to seek
    progress.addEventListener('click', seek);
    
    function seek(e) {
        const progressWidth = progress.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / progressWidth) * duration;
    }

    // Volume control
    volumeControl.addEventListener('input', handleVolumeChange);
    volumeBtn.addEventListener('click', toggleMute);
    
    function handleVolumeChange() {
        const volume = volumeControl.value / 100;
        audioPlayer.volume = volume;
        updateVolumeIcon(volume);
    }
    
    function toggleMute() {
        if (audioPlayer.volume > 0) {
            audioPlayer.dataset.prevVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
            volumeControl.value = 0;
        } else {
            const prevVolume = audioPlayer.dataset.prevVolume || 1;
            audioPlayer.volume = prevVolume;
            volumeControl.value = prevVolume * 100;
        }
        updateVolumeIcon(audioPlayer.volume);
    }
    
    function updateVolumeIcon(volume) {
        volumeIcon.className = 'fas';
        if (volume > 0.5) {
            volumeIcon.classList.add('fa-volume-up');
        } else if (volume > 0) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-mute');
        }
    }

    // Format time in MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update duration when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    // Handle audio end
    audioPlayer.addEventListener('ended', function() {
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        if (currentAlbumCard) {
            currentAlbumCard.classList.remove('active');
        }
        currentAlbumCard = null;
    });
}); 