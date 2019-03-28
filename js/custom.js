


Reveal.addEventListener("slidechanged", (e) => {
    let audio = e.currentSlide.querySelector("audio")
    window.setTimeout(() => {
        if (audio) {

            let player = new Tone.Player(audio.src).toMaster();
            player.autostart = true;

        }
    }, 1200)


})