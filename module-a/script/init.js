const $ = (e) => document.querySelector(e)
const $$ = (e) => [...document.querySelectorAll(e)]
const newEl = (e, t) => Object.assign(document.createElement(e), t) 

const setting = JSON.parse(localStorage.getItem("language")) ?? {language: true} 
let language = setting.language
const languageBtn = $(".language-btn")

function languageRender() {
  if(language === true) {
    languageBtn.textContent = "Korean/English"
    $$(".en").forEach(en => {en.style.display = 'none'})
    $$(".kr").forEach(kr => {kr.style.display = 'flex'})
  } else {
    languageBtn.textContent = "한/영 전환"
    $$(".en").forEach(en => {en.style.display = 'flex'})
    $$(".kr").forEach(kr => {kr.style.display = 'none'})
  }
}

languageBtn.onclick = () => {
  language = !language
  languageRender()
  localStorage.setItem("language", JSON.stringify({ language }));
  btnRender()
}

languageRender()