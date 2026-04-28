let shootCount = 0
let photos
let timer = 5
const frameSet = JSON.parse(localStorage.getItem("frame"))
const frame = frameSet.frame

while (shootCount <= 4) {
    shoot()
}

function getPhoto() {
    timer = 5

    const interval = setInterval(() => {
        timer--
        $(".timer-content").textContent = timer
        if(timer < 1) {
            shoot() 
            clearInterval(interval)
        }
    }, 1000)
}

function randomImage() {
    let random = Math.floor(Math.random() * 8) + 1

    if(frame === 1) return `../asset/sample_square_0${random}.png`
    else if(frame === 2) return `../asset/sample_horizontal_0${random}.png`
    else return `../asset/sample_vertical_0${random}.png`
}

function shoot() {
    photos.push(randomImage())
    $$(".shoot")[shootCount].src = randomImage()
    shootCount++

    if(shootCount < 4) {
        localStorage.setItem("photos", JSON.stringify(photos))
        location.href = "./edit.html"
    } else {
        getPhoto()
    }
}

getPhoto()