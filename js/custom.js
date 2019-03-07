


Reveal.addEventListener("slidechanged", (e) => {
    let audio = e.currentSlide.querySelector("audio")
    if (audio) {
        let player = new Tone.Player(audio.src).toMaster();
        player.autostart = true;

    }

})