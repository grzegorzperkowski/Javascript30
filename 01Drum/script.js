function onLoad() {
    window.addEventListener('keydown', (e) => playSound(e.keyCode))
    const keys = document.querySelectorAll(".key")
    keys.forEach(e => e.addEventListener('transitionend', removeTransition))
    keys.forEach(e => e.addEventListener('click', keyClicked))
}

function playSound(audioKey) {
    const audio = document.querySelector(`audio[data-key="${audioKey}"]`)
    if (!audio) return

    audio.currentTime = 0;
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(function () {
            console.log("Automatic playback started!");
        }).catch(function (error) {
            console.error("Automatic playback failed: " + error)
        });
    }

    const key = document.querySelector(`.key[data-key="${audioKey}"]`)
    if (!key) return

    key.classList.add('playing');
}

function removeTransition(element) {
    if (element.propertyName === 'transform') {
        this.classList.remove('playing')
    }
}

function keyClicked() {
    playSound(this.getAttribute("data-key"))
}