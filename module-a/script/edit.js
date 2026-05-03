const canvas = $('canvas')
const ctx = canvas.getContext('2d')
const frameCuts = JSON.parse(localStorage.getItem('photos'))
const layout = localStorage.getItem('frame')

let selSticker = null
let stickerSize = 100  // 슬라이더로 조절
let imageElement
let photos = [null, null, null, null]
let filter = 'none'
let step = 1

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
    { x: 36, y: 475, w: 315, h: 435 },
    { x: 377, y: 475, w: 315, h: 435 },
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

function nextStep() {
  if (step >= 4) return
  step++
  [1, 2, 3, 4].forEach(i => {
    $('.p' + i).style.display = i === step ? 'flex' : 'none'
  })
  if(step === 4) $('.next-btn').style.display = 'none'
  $('.sticker-layer').style.pointerEvents = step === 3 ? 'all' : 'none'
}

function setFilter(f, btn) {
  filter = f
  $$('.p2 button').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  render()
}

function selectSticker(img) {
  selSticker = img.src
  $$('.sticker-list img').forEach(i => i.classList.remove('active'))
  img.classList.add('active')
}

function resizeSticker(size) {
  stickerSize = parseInt(size)  // 배치 전 크기만 저장
}

$('.sticker-layer').addEventListener('click', e => {
  if (step !== 3) return
  if (!selSticker) return
  if (e.target.closest('.placed')) return

  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  placeSticker(selSticker, x, y, stickerSize)
})

function placeSticker(src, x, y, size) {
  const el = newEl('div', { className: 'placed' })
  el.style.position = 'absolute'
  el.style.left     = (x - size / 2) + 'px'
  el.style.top      = (y - size / 2) + 'px'
  el.style.width    = size + 'px'
  el.style.height   = size + 'px'

  const img = newEl('img', { src })
  img.style.width        = '100%'
  img.style.height       = '100%'
  img.style.objectFit    = 'contain'
  img.style.pointerEvents = 'none'

  el.addEventListener('click', () => el.remove())

  el.append(img)
  $('.sticker-layer').append(el)
}

function stickerLayerRender() {
  const layer = $('.sticker-layer')
  const rect  = canvas.getBoundingClientRect()
  layer.style.width  = rect.width  + 'px'
  layer.style.height = rect.height + 'px'
}

function mergeStickers() {
  return new Promise(resolve => {
    const placed = $$('.placed')
    if (!placed.length) { resolve(); return }

    let loaded = 0
    placed.forEach(el => {
      const img     = el.querySelector('img')
      const rect    = el.getBoundingClientRect()
      const lRect   = $('.sticker-layer').getBoundingClientRect()
      const scaleX  = canvas.width  / lRect.width
      const scaleY  = canvas.height / lRect.height

      const x = (rect.left - lRect.left) * scaleX
      const y = (rect.top  - lRect.top)  * scaleY
      const w = rect.width  * scaleX
      const h = rect.height * scaleY

      const stickerImg = new Image()
      stickerImg.src = img.src
      stickerImg.onload = () => {
        ctx.drawImage(stickerImg, x, y, w, h)
        loaded++
        if (loaded === placed.length) resolve()
      }
    })
  })
}

async function downloadImg(type) {
  await mergeStickers()  // 스티커 캔버스에 합성

  const link = document.createElement('a')
  if (type === 'png') {
    link.href     = canvas.toDataURL('image/png')
    link.download = 'photobooth.png'
  } else {
    link.href     = canvas.toDataURL('image/jpeg', 0.9)
    link.download = 'photobooth.jpg'
  }
  link.click()
}

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

      ctx.save()
      ctx.filter = filter
      ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h)
      ctx.restore()
    }
  })
}
canvas.addEventListener('click', e => {
  if (step !== 1) return

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
  imageElement = newEl('img', { src: `./asset/frame_0${layout}.png` })
  imageElement.onload = () => {
    render()
    stickerLayerRender()
  }
}

loadImage()