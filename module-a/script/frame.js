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
  if(frame === undefined) {
    alert("프레임을 선택해주세요")
    return
  }
  localStorage.setItem("frame", frame)
  location.href = "./shoot.html"
}
btnRender()