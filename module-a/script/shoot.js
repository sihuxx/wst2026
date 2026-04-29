let shootCount = 0
let photos = []
let timer = 5
const shootBtn = $(".shoot-btn")
const frameSet = JSON.parse(localStorage.getItem("frame"))
const frame = frameSet.frame

function getPhoto() {
    timer = 5
    $(".timer-content").textContent = timer

    const interval = setInterval(() => {
        timer--
        if (timer < 1) {
            clearInterval(interval)
            shoot()
        }
        $(".timer-content").textContent = timer
    }, 1000)
    
    shootBtn.onclick = () => {
        clearInterval(interval)
        timer = 0
        $(".timer-content").textContent = ""
        shoot()
    }
}

function randomImage() {
    let random = Math.floor(Math.random() * 8) + 1

    if (frame === 1) return `./asset/sample_square_0${random}.png`
    else if (frame === 2) return `./asset/sample_horizontal_0${random}.png`
    else return `./asset/sample_vertical_0${random}.png`
}

function shootFlash() {
    $(".flash").classList.add("on")
    setTimeout(() => $(".flash").classList.remove("on"), 100)
}

function shoot() {
    const image = randomImage()
    photos.push(image)
    $$(".shoot > img")[shootCount].src = image
    $$(".shoot > img")[shootCount].style.display = 'block'
    shootFlash()
    shootCount++

    if (shootCount >= 4) {
        localStorage.setItem("photos", JSON.stringify(photos))
        location.href = "./edit.html"
    } else {
        getPhoto()
    }
}

getPhoto()