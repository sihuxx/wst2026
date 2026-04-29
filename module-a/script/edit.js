const canvas = $('canvas')
const ctx = canvas.getContext('2d')
const frameCuts = JSON.parse(localStorage.getItem("photos"))
let imageElement
let photos = []
let layout = JSON.parse(localStorage.getItem('frame')).frame

const positions = [
  { x: 37,  y: 40  },
  { x: 377, y: 40  },
  { x: 36,  y: 475 },
  { x: 377, y: 475 } 
];

$$(".shoot").forEach((shoot, i) => {
  const shootImg = newEl("img", {
    src: frameCuts[i],
  })
  shoot.append(shootImg)
})

function render() {
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  ctx.drawImage(imageElement, 0, 0);

  photos.forEach((photoSrc, i) => {
    const photo = new Image()
    photo.src = photoSrc

    photo.onload = () => {
      const pos = positions[i] 

      const ratio = Math.max(315 / photo.width, 417 / photo.height);
      const sw = 315 / ratio;
      const sh = 417 / ratio;
      const sx = (photo.width - sw) / 2;
      const sy = (photo.height - sh) / 2;

      ctx.drawImage(photo, sx, sy, sw, sh, pos.x, pos.y, 315, 417);
    }
  });
}

function loadImage() {
  imageElement = new Image()
  imageElement.src = `./asset/frame_0${layout}.png`
  imageElement.onload = render
}

loadImage()