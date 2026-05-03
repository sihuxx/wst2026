const canvas = $('canvas')
const ctx = canvas.getContext('2d')
const frameCuts = JSON.parse(localStorage.getItem('photos'))
const layout = localStorage.getItem('frame')

let imageElement
let photos = [null, null, null, null]

const FRAME_SLOTS = {
  1: [ // 세로 4컷 (1열 4행)
    { x: 28, y: 40, w: 362, h: 320 },
    { x: 28, y: 377, w: 362, h: 320 },
    { x: 28, y: 714, w: 362, h: 320 },
    { x: 28, y: 1051, w: 362, h: 320 },
  ],
  2: [ // 가로 4컷 (4열 1행)
    { x: 35, y: 32, w: 312, h: 337 },
    { x: 370, y: 32, w: 312, h: 337 },
    { x: 700, y: 32, w: 312, h: 337 },
    { x: 1035, y: 32, w: 312, h: 337 },
  ],
  3: [ // 2x2컷
    { x: 37, y: 40, w: 315, h: 417 },
    { x: 377, y: 40, w: 315, h: 417 },
    { x: 36, y: 475, w: 315, h: 417 },
    { x: 377, y: 475, w: 315, h: 417 },
  ],
}

const slots = FRAME_SLOTS[layout]

$$('.shoot').forEach((shoot, i) => {
  const shootImg = newEl('img', { src: frameCuts[i] })
  shoot.append(shootImg)

  shoot.addEventListener('click', () => {
    const emptyIdx = photos.indexOf(null)
    const nextIdx = photos.length < 4 ? photos.length : -1
    const idx = photos.indexOf(null)
    if (idx === -1) return

    photos[idx] = frameCuts[i]
    render()
    checkNext()
  })
})

function render() {
  canvas.width = imageElement.width
  canvas.height = imageElement.height
  ctx.drawImage(imageElement, 0, 0)

  photos.forEach((photoSrc, i) => {
    if (!photoSrc) return
    const photo = newEl("img", { src: photoSrc })

    photo.onload = () => {
      const { x, y, w, h } = slots[i]
      const ratio = Math.max(w / photo.width, h / photo.height)
      const sw = w / ratio
      const sh = h / ratio
      const sx = (photo.width - sw) / 2
      const sy = (photo.height - sh) / 2
      ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h)
    }
  })
}

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const cx = (e.clientX - rect.left) * scaleX
  const cy = (e.clientY - rect.top) * scaleY

  slots.forEach(({ x, y, w, h }, i) => {
    if (cx >= x && cx <= x + w && cy >= y && cy <= y + h && photos[i]) {
      photos[i] = null
      render()
      checkNext()
    }
  })
})

function checkNext() {
  const filled = photos.filter(Boolean).length === 4
  $(".next-btn").disabled = !filled
}

function loadImage() {
  imageElement = newEl('img', { src: `./asset/frame_0${layout}.png`})
  imageElement.onload = render
}

loadImage()