
document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".soundbox > div");

    boxes.forEach((box) => {
        const slider = box.querySelector(".volume-slider");
        const playIcon = box.querySelector(".play-icon");
        const volumeIcon = box.querySelector(".controls i");

        if (!slider || !playIcon || !volumeIcon) return;

        const audioId = slider.dataset.audio;
        const audio = document.getElementById(audioId);
        if (!audio) return;

        audio.volume = parseFloat(slider.value);

        slider.addEventListener("input", (e) => {
            const newVolume = parseFloat(e.target.value);
            audio.volume = newVolume;

            if (newVolume === 0) {
                audio.muted = true;
                volumeIcon.classList.remove("fa-volume-high");
                volumeIcon.classList.add("fa-volume-xmark");
            } else {
                audio.muted = false;
                volumeIcon.classList.remove("fa-volume-xmark");
                volumeIcon.classList.add("fa-volume-high");
            }
        });

        volumeIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            audio.muted = !audio.muted;

            if (audio.muted) {
                volumeIcon.classList.remove("fa-volume-high");
                volumeIcon.classList.add("fa-volume-xmark");
            } else {
                volumeIcon.classList.remove("fa-volume-xmark");
                volumeIcon.classList.add("fa-volume-high");
            }
        });

        box.addEventListener("click", (e) => {
            if (e.target.classList.contains("volume-slider")) return;

            if (audio.paused) {
                audio.currentTime = 0;
                audio.play();
                playIcon.classList.remove("fa-play");
                playIcon.classList.add("fa-pause");
            } else {
                audio.pause();
                audio.currentTime = 0;
                playIcon.classList.remove("fa-pause");
                playIcon.classList.add("fa-play");
            }
        });

        audio.addEventListener("ended", () => {
            playIcon.classList.remove("fa-pause");
            playIcon.classList.add("fa-play");
        });
    });
});
