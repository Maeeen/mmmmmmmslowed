import "./style/index.less";

import audioPick from "./audio-pick"
import audioDrop from "./audio-drop"
import audioPlayer from "./audio-player"

const onPageLoaded = (() => {
    const dropZone = document.querySelector('.select-song')

    const audio = document.querySelector('audio')

    if (!dropZone) { console.error("Drop zone not found"); return; }

    if (!audio) { console.error("Audio element not found"); return }
 
    audioDrop(dropZone as HTMLElement, audio as HTMLAudioElement);

    audioPlayer();
})

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => onPageLoaded());
} else {
    onPageLoaded();
}