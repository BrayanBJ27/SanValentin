document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('PlayPause');
    const playPauseIcon = playPauseBtn.querySelector('img');
    const plus10 = document.getElementById('Plus10');
    const back10 = document.getElementById('Back10');
    const songLength = document.getElementById('SongLength');
    const currentTime = document.getElementById('CurrentSongTime');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const updateProgress = () => {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percentage}%`;
        currentTime.textContent = calculateTime(audio.currentTime);
    };

    // Inicialización
    audio.addEventListener('loadedmetadata', () => {
        songLength.textContent = calculateTime(audio.duration);
        currentTime.textContent = calculateTime(0);
    });

    // Controles de reproducción
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseIcon.src = 'pause.svg';
        } else {
            audio.pause();
            playPauseIcon.src = 'Play.svg';
        }
    });

    plus10.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    });

    back10.addEventListener('click', () => {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    });

    // Control de progreso
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percentage * audio.duration;
    });

    // Actualización continua
    audio.addEventListener('timeupdate', updateProgress);
    
    // Manejo de finalización
    audio.addEventListener('ended', () => {
        playPauseIcon.src = 'Play.svg';
        audio.currentTime = 0;
    });
});