const canvas = $('canvas')
const ctx = canvas.getContext('2d')
let imageElement
let photos = []
let layout = JSON.parse(localStorage.getItem('frame')).frame

function render() {
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  ctx.drawImage(imageElement, 0, 0);

  photos.forEach(photo => {
    const ratio = Math.max(315 / photo.width, 417 / photo.height);
    const sw = 315 / ratio;
    const sh = 417 / ratio;
    const sx = (photo.width - sw) / 2;
    const sy = (photo.height - sh) / 2;

    ctx.drawImage(photo, sx, sy, sw, sh, 36, 40, 315, 417);
  });
}

function loadImage() {
  photo = new Image()
  photo.src = `./asset/sample_horizontal_01.png`
  photos.push(photo)
  
  imageElement = new Image()
  imageElement.src = `./asset/frame_0${layout}.png`
  imageElement.onload = render
}

loadImage()