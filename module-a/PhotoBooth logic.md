# PhotoBooth 코드 로직 설명

---

## 공통 유틸 — `init.js`

```javascript
// querySelector 단축
const $ = (e) => document.querySelector(e)
// querySelectorAll 단축 (배열로 변환)
const $$ = (e) => [...document.querySelectorAll(e)]
// 요소 생성 + 속성 일괄 할당
const newEl = (e, t) => Object.assign(document.createElement(e), t)

// language: true = 한국어, false = 영어
// localStorage에 저장된 값이 없으면 기본값 true(한국어)
let language = localStorage.getItem("language") ?? true
```

**언어 전환 로직**

`languageRender()`는 `language` 값에 따라 `.kr` / `.en` 클래스 요소의 `display`를 토글한다. 버튼 클릭 시 `language`를 반전하고 `localStorage`에 저장해 페이지 이동 후에도 언어 상태가 유지된다.

```javascript
languageBtn.onclick = () => {
  language = !language        // true ↔ false 전환
  languageRender()
  localStorage.setItem("language", language)
}
```

---

## 1. 시작 화면 — `index.html`

별도 JS 없이 `<a href="./frame.html">` 로 전체 화면을 링크 처리. 클릭하면 프레임 선택 화면으로 이동한다. 한/영 토글 버튼은 링크 바깥에 있어 화면 이동에서 제외된다.

---

## 2. 프레임 선택 화면 — `frame.js`

```javascript
const cards = $$(".card")
const startBtn = $(".start-btn")
let frame  // 선택된 프레임 번호 ('1' | '2' | '3')

cards.forEach(card => {
  card.onclick = (e) => {
    // 기존 선택 해제 후 클릭한 카드만 active
    cards.forEach(c => c.classList.remove("active"))
    card.classList.add("active")
    // data-frame 속성으로 프레임 번호 저장
    frame = e.currentTarget.dataset.frame
  }
})
```

**시작하기 버튼 로직**

프레임 미선택 시 경고, 선택 시 `localStorage`에 프레임 번호를 저장하고 촬영 화면으로 이동한다.

```javascript
startBtn.onclick = () => {
  if (frame === undefined) {
    alert("프레임을 선택해주세요")
    return
  }
  localStorage.setItem("frame", frame)  // 이후 화면에서 공유
  location.href = "./shoot.html"
}
```

---

## 3. 촬영 화면 — `shoot.js`

```javascript
let shootCount = 0   // 현재까지 촬영된 사진 수
let photos = []      // 촬영된 사진 src 배열
let timer = 5        // 카운트다운 초기값

const frame = localStorage.getItem("frame")  // 선택된 프레임 번호
```

**카운트다운 + 자동 촬영**

```javascript
function getPhoto() {
  timer = 5
  $(".timer-content").textContent = timer

  // 1초마다 timer 감소, 0이 되면 자동 촬영
  const interval = setInterval(() => {
    timer--
    if (timer < 1) {
      clearInterval(interval)
      shoot()       // 카운트다운 종료 → 자동 촬영
    }
    $(".timer-content").textContent = timer
  }, 1000)

  // 촬영 버튼 클릭 시 카운트다운 무시하고 즉시 촬영
  shootBtn.onclick = () => {
    clearInterval(interval)
    timer = 0
    $(".timer-content").textContent = ""
    shoot()
  }
}
```

**프레임 타입별 샘플 이미지 선택**

```javascript
function randomImage() {
  let random = Math.floor(Math.random() * 8) + 1   // 1~8 랜덤

  if (frame === 1) return `./asset/sample_square_0${random}.png`
  else if (frame === 2) return `./asset/sample_horizontal_0${random}.png`
  else return `./asset/sample_vertical_0${random}.png`
}
```

**촬영 처리**

```javascript
function shoot() {
  const image = randomImage()
  photos.push(image)

  // 해당 슬롯에 촬영 이미지 삽입
  $$(".shoot")[shootCount].append(newEl("img", { src: image }))

  // 흰색 플래시 효과
  $(".flash").classList.add("on")
  setTimeout(() => $(".flash").classList.remove("on"), 100)

  shootCount++

  if (shootCount >= 4) {
    // 4장 완료 → photos 배열 저장 후 편집 화면 이동
    localStorage.setItem("photos", JSON.stringify(photos))
    location.href = "./edit.html"
  } else {
    getPhoto()   // 다음 장 카운트다운 시작
  }
}
```

---

## 4. 편집 화면 — `edit.js`

### 초기 데이터

```javascript
const canvas = $('canvas')
const ctx = canvas.getContext('2d')

// localStorage에서 촬영 사진 배열과 프레임 번호 복원
const frameCuts = JSON.parse(localStorage.getItem('photos'))
const layout = localStorage.getItem('frame')

let photos = [null, null, null, null]   // 프레임에 배치된 사진 (null = 빈 슬롯)
let filter = 'none'                     // 현재 적용 필터
let step = 1                            // 현재 편집 단계 (1~4)
let selSticker = null                   // 선택된 스티커 src
let stickerSize = 100                   // 배치할 스티커 크기 (px)
```

### 프레임별 슬롯 좌표 정의

각 프레임 이미지의 실제 픽셀 좌표 기준으로 사진이 들어갈 위치와 크기를 지정한다.

```javascript
const FRAME_SLOTS = {
  1: [ // 세로 4컷 — 1열 4행
    { x: 28, y: 40,   w: 362, h: 320 },
    { x: 28, y: 377,  w: 362, h: 320 },
    { x: 28, y: 714,  w: 362, h: 320 },
    { x: 28, y: 1051, w: 362, h: 320 },
  ],
  2: [ // 가로 4컷 — 4열 1행
    { x: 35,  y: 32, w: 312, h: 337 },
    { x: 370, y: 32, w: 312, h: 337 },
    { x: 700, y: 32, w: 312, h: 337 },
    { x: 1035,y: 32, w: 312, h: 337 },
  ],
  3: [ // 2x2컷
    { x: 37,  y: 40,  w: 315, h: 417 },
    { x: 377, y: 40,  w: 315, h: 417 },
    { x: 36,  y: 475, w: 315, h: 435 },
    { x: 377, y: 475, w: 315, h: 435 },
  ],
}

const slots = FRAME_SLOTS[layout]  // 현재 프레임에 해당하는 슬롯 배열
```

---

### Step 1. 사진 배치

**썸네일 클릭 → 슬롯 채우기**

```javascript
$$('.shoot').forEach((shoot, i) => {
  const shootImg = newEl('img', { src: frameCuts[i] })
  shoot.append(shootImg)

  shoot.addEventListener('click', () => {
    const idx = photos.indexOf(null)  // 첫 번째 빈 슬롯(null) 위치 탐색
    if (idx === -1) return            // 모두 채워졌으면 무시

    photos[idx] = frameCuts[i]        // 해당 슬롯에 사진 src 저장
    render()
    checkNext()
  })
})
```

`photos = [null, null, null, null]` 로 시작하므로 `indexOf(null)` 이 항상 정확한 빈 슬롯을 찾는다.

```
클릭 전: [null,    null,    null,    null]
1번 클릭: ['a.jpg', null,    null,    null]
2번 클릭: ['a.jpg', 'b.jpg', null,    null]
...
4번 클릭: ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg'] → indexOf(null) = -1 → 이후 클릭 무시
```

**캔버스 클릭 → 슬롯 제거**

```javascript
canvas.addEventListener('click', e => {
  if (step !== 1) return   // step 1에서만 동작

  const rect   = canvas.getBoundingClientRect()
  // CSS로 캔버스를 줄인 경우 표시 크기 ≠ 내부 해상도 → scale 보정 필요
  const scaleX = canvas.width  / rect.width
  const scaleY = canvas.height / rect.height

  // 마우스 클릭 좌표를 캔버스 내부 좌표로 변환
  const cx = (e.clientX - rect.left) * scaleX
  const cy = (e.clientY - rect.top)  * scaleY

  // 클릭 위치가 슬롯 범위 안이면 해당 사진 제거
  slots.forEach(({ x, y, w, h }, i) => {
    if (cx >= x && cx <= x + w && cy >= y && cy <= y + h && photos[i]) {
      photos[i] = null   // 슬롯 비우기
      render()
      checkNext()
    }
  })
})
```

슬롯 범위 판정 시각화:
```
(x, y) ┌──────────┐
       │  슬롯    │  h
       └──────────┘
            w
                  (x+w, y+h)

cx가 x~x+w 사이 && cy가 y~y+h 사이 → 슬롯 안을 클릭한 것
```

**다음 버튼 활성화 조건**

```javascript
function checkNext() {
  // photos 배열에서 truthy 값(사진 src)이 4개일 때만 활성화
  const filled = photos.filter(Boolean).length === 4
  $(".next-btn").disabled = !filled
}
```

---

### Step 2. 필터 적용

```javascript
function setFilter(f, btn) {
  filter = f   // 'none' 또는 'grayscale(100%)'

  // 버튼 active 상태 교체
  $$('.p2 button').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')

  render()   // 필터 반영하여 즉시 재렌더
}
```

필터는 `render()` 내부에서 `ctx.filter`로 적용한다. `ctx.save()` / `ctx.restore()` 로 감싸서 프레임 배경 이미지에는 필터가 번지지 않게 한다.

---

### 캔버스 렌더 — `render()`

```javascript
function render() {
  // 프레임 이미지 크기에 맞게 캔버스 크기 설정
  canvas.width  = imageElement.width
  canvas.height = imageElement.height

  // 프레임 배경 이미지 먼저 그리기 (필터 없이)
  ctx.drawImage(imageElement, 0, 0)

  photos.forEach((photoSrc, i) => {
    if (!photoSrc) return   // 빈 슬롯은 건너뜀
    const photo = newEl('img', { src: photoSrc })

    photo.onload = () => {
      const { x, y, w, h } = slots[i]

      // cover-fit: 슬롯 비율에 맞게 사진을 확대 후 중앙 크롭
      const ratio = Math.max(w / photo.width, h / photo.height)
      const sw = w / ratio                     // 원본에서 자를 너비
      const sh = h / ratio                     // 원본에서 자를 높이
      const sx = (photo.width  - sw) / 2      // 크롭 x 시작점 (중앙 정렬)
      const sy = (photo.height - sh) / 2      // 크롭 y 시작점 (중앙 정렬)

      ctx.save()
      ctx.filter = filter   // 필터 적용 (사진에만)
      ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h)
      ctx.restore()         // 필터 초기화 (다음 요소에 번지지 않게)
    }
  })
}
```

---

### Step 3. 스티커 적용

**스티커 선택**

```javascript
function selectSticker(img) {
  selSticker = img.src   // 선택된 스티커 src 저장
  $$('.sticker-list img').forEach(i => i.classList.remove('active'))
  img.classList.add('active')
}
```

**크기 사전 설정**

슬라이더로 배치 전 크기를 정한다. 배치 후 크기 변경은 지원하지 않는다.

```javascript
function resizeSticker(size) {
  stickerSize = parseInt(size)   // 다음 배치에 사용할 크기 저장
}
```

**스티커 배치**

```javascript
$('.sticker-layer').addEventListener('click', e => {
  if (step !== 3) return         // step 3에서만 동작
  if (!selSticker) return        // 스티커 미선택 시 무시
  if (e.target.closest('.placed')) return  // 기존 스티커 클릭은 삭제 처리

  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left   // sticker-layer 기준 좌표
  const y = e.clientY - rect.top
  placeSticker(selSticker, x, y, stickerSize)
})

function placeSticker(src, x, y, size) {
  const el = newEl('div', { className: 'placed' })
  el.style.position = 'absolute'
  el.style.left   = (x - size / 2) + 'px'   // 클릭 위치가 스티커 중앙이 되게
  el.style.top    = (y - size / 2) + 'px'
  el.style.width  = size + 'px'
  el.style.height = size + 'px'

  const img = newEl('img', { src })
  img.style.width         = '100%'
  img.style.height        = '100%'
  img.style.objectFit     = 'contain'
  img.style.pointerEvents = 'none'   // img가 클릭 이벤트를 가로채지 않게

  // 배치된 스티커 클릭 → 삭제
  el.addEventListener('click', () => el.remove())

  el.append(img)
  $('.sticker-layer').append(el)
}
```

**sticker-layer 크기 동기화**

CSS로 캔버스를 줄인 경우 sticker-layer도 캔버스 표시 크기와 맞춰야 스티커가 정확한 위치에 놓인다.

```javascript
function stickerLayerRender() {
  const layer = $('.sticker-layer')
  const rect  = canvas.getBoundingClientRect()   // CSS 적용 후 실제 표시 크기
  layer.style.width  = rect.width  + 'px'
  layer.style.height = rect.height + 'px'
}
```

---

### 단계 이동 — `nextStep()`

```javascript
function nextStep() {
  if (step >= 4) return
  step++

  // p1~p4 중 현재 step만 표시
  [1, 2, 3, 4].forEach(i => {
    $('.p' + i).style.display = i === step ? 'flex' : 'none'
  })

  // step 4(결과 화면) 진입 시 다음 버튼 숨기기
  if (step === 4) $('.next-btn').style.display = 'none'

  // sticker-layer는 step 3에서만 클릭 활성화
  $('.sticker-layer').style.pointerEvents = step === 3 ? 'all' : 'none'
}
```

---

### 5. 결과 화면 — 다운로드

스티커는 DOM에 올라가 있어 `canvas.toDataURL()` 에 포함되지 않는다. 다운로드 전 캔버스에 합성해야 한다.

```javascript
function mergeStickers() {
  return new Promise(resolve => {
    const placed = $$('.placed')
    if (!placed.length) { resolve(); return }

    let loaded = 0
    placed.forEach(el => {
      const img    = el.querySelector('img')
      const rect   = el.getBoundingClientRect()
      const lRect  = $('.sticker-layer').getBoundingClientRect()

      // sticker-layer 표시 크기 → 캔버스 내부 좌표로 변환
      const scaleX = canvas.width  / lRect.width
      const scaleY = canvas.height / lRect.height
      const x = (rect.left - lRect.left) * scaleX
      const y = (rect.top  - lRect.top)  * scaleY
      const w = rect.width  * scaleX
      const h = rect.height * scaleY

      const stickerImg = new Image()
      stickerImg.src = img.src
      stickerImg.onload = () => {
        ctx.drawImage(stickerImg, x, y, w, h)
        loaded++
        if (loaded === placed.length) resolve()  // 전부 그리면 완료
      }
    })
  })
}

async function downloadImg(type) {
  await mergeStickers()   // 스티커를 캔버스에 합성한 뒤

  const link = document.createElement('a')
  if (type === 'png') {
    link.href     = canvas.toDataURL('image/png')
    link.download = 'photobooth.png'
  } else {
    link.href     = canvas.toDataURL('image/jpeg', 0.9)  // 0.9 = JPEG 품질
    link.download = 'photobooth.jpg'
  }
  link.click()   // 브라우저 다운로드 트리거
}
```

---

## 전체 데이터 흐름

```
index.html
  └─ 클릭 → frame.html

frame.html
  └─ 프레임 선택 → localStorage: frame = '1'|'2'|'3'
  └─ 시작하기 → shoot.html

shoot.html
  └─ 카운트다운/촬영 × 4
  └─ localStorage: photos = ['url1','url2','url3','url4']
  └─ 자동 이동 → edit.html

edit.html
  ├─ step 1: 사진 배치 (photos 배열 → canvas 렌더)
  ├─ step 2: 필터 적용 (ctx.filter → 재렌더)
  ├─ step 3: 스티커 삽입 (DOM → sticker-layer)
  └─ step 4: 결과 표시 + 다운로드 (mergeStickers → toDataURL)
```