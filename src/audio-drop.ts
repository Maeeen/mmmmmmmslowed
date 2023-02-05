const isGoodTransfer = (transfer: DataTransfer | null) => {
    if (!transfer || transfer == null)
        return false;

    if (!transfer.items || transfer.items.length == 0)
        return false

    const item = transfer.items[0]

    return item.kind == 'file' && item.type.startsWith('audio/')
}

export default function audioDrop(dropZone: HTMLElement, targetAudio: HTMLAudioElement): Promise<HTMLAudioElement> {
    dropZone.addEventListener('drop', e => {
        e.preventDefault()

        dropZone.classList.remove('wrong-file', 'good-file')

        if (!isGoodTransfer(e.dataTransfer)) return

        const file = e.dataTransfer!.files[0]

        const reader = new FileReader()

        reader.addEventListener('load', file => {
            if (!file.target || !file.target.result) return
            targetAudio.src = file.target.result as string // cast is OK since .readAsDataURL
        })

        reader.readAsDataURL(file)
    }, false)


    dropZone.addEventListener('dragenter', e => {
        e.preventDefault()

        dropZone.classList.add('wrong-file')

        if (!isGoodTransfer(e.dataTransfer)) return

        // Good
        dropZone.classList.remove('wrong-file')
        dropZone.classList.add('good-file')
    }, false)

    dropZone.addEventListener('dragleave', e => {
        e.preventDefault()

        dropZone.classList.remove('wrong-file', 'good-file')
    }, false)


    dropZone.addEventListener('dragover', e => e.preventDefault(), false)
    return Promise.resolve(null) as any as Promise<HTMLAudioElement>
}