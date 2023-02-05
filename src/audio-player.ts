import "./style/audio-player.less";

const zeroPad = (num: number, places: number = 2) => String(num).padStart(places, "0");

export default function audioPlayer() {
    const audioMain = document.querySelector(".audio-player") as HTMLElement
    const audio = audioMain.querySelector("audio") as HTMLAudioElement
    const pgbar = audioMain.querySelector(".progress-bar") as HTMLElement
    const completedPgbar = pgbar.querySelector(".completed-bar") as HTMLElement
    const currentTime = audioMain.querySelector(".current-time") as HTMLElement
    const endTime = audioMain.querySelector(".end-time") as HTMLElement

    audio.addEventListener('loadeddata', () => {
        const duration = audio.duration
        const currentTime = audio.currentTime
        completedPgbar.style.width = `${zeroPad((currentTime / duration) * 100)}%`
        endTime.innerText = `${zeroPad(Math.floor(duration / 60))}:${zeroPad(Math.floor(duration % 60))}`
    })

    audio.addEventListener('timeupdate', () => {
        currentTime.innerText = `${zeroPad(Math.floor(audio.currentTime / 60))}:${zeroPad(Math.floor(audio.currentTime % 60))}`
    })
}