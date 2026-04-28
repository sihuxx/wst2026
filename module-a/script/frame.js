const cards = $$(".card")
const startBtn = $(".start-btn")
let frame

cards.forEach(card => {
  card.onclick = (e) => {
    cards.forEach(c => c.classList.remove("active"))
    card.classList.add("active")
    frame = e.currentTarget.dataset.frame
  }
})
function btnRender() {
  startBtn.textContent = language ? "시작하기" : "start"
}
startBtn.onclick = () => {
  localStorage.setItem("frame", JSON.stringify({frame}))
  location.href = "./shoot.html"
}
btnRender()