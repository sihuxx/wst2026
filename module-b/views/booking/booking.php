<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>티켓 예매 - TicketBox</title>
  <link href="./bootstrap.min.css" rel="stylesheet">
  <style>
    .seat { width: 36px; height: 36px; border: 1px solid #adb5bd; background: #fff; cursor: pointer; font-size: 11px; border-radius: 4px; }
    .seat.selected { background: #212529; color: #fff; border-color: #212529; }
    .seat.booked { background: #dee2e6; color: #adb5bd; cursor: not-allowed; }
  </style>
</head>
<body class="bg-light">

  <!-- NAV : include nav.php -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand fw-bold" href="index.html">TicketBox</a>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="index.html">공연 목록</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="bookings.html">예매 내역</a>
        </li>
      </ul>
      <div class="d-flex gap-2">
        <span class="navbar-text text-white me-2">홍길동</span>
        <button class="btn btn-outline-light btn-sm">로그아웃</button>
      </div>
    </div>
  </nav>
  <!-- END NAV -->

  <div class="container py-5">
    <h4 class="fw-bold mb-1">뮤지컬 레미제라블</h4>
    <p class="text-muted mb-4">2026-06-01 19:00 · 서울 올림픽홀 · 좌석당 5,000원</p>

    <div class="row g-4">
      <!-- 좌석 배치도 -->
      <div class="col-md-8">
        <div class="card p-4">
          <p class="text-center text-muted small mb-3">— 무대 —</p>

          <!-- 좌석 행 반복 -->
          <div class="d-flex align-items-center gap-1 mb-1">
            <span class="text-muted small me-1" style="width:16px;">A</span>
            <button class="seat">1</button>
            <button class="seat">2</button>
            <button class="seat selected">3</button>
            <button class="seat">4</button>
            <button class="seat">5</button>
            <button class="seat">6</button>
            <button class="seat">7</button>
            <button class="seat booked">8</button>
            <button class="seat booked">9</button>
            <button class="seat">10</button>
          </div>
          <div class="d-flex align-items-center gap-1 mb-1">
            <span class="text-muted small me-1" style="width:16px;">B</span>
            <button class="seat booked">1</button>
            <button class="seat booked">2</button>
            <button class="seat">3</button>
            <button class="seat">4</button>
            <button class="seat">5</button>
            <button class="seat">6</button>
            <button class="seat booked">7</button>
            <button class="seat booked">8</button>
            <button class="seat">9</button>
            <button class="seat">10</button>
          </div>
          <div class="d-flex align-items-center gap-1 mb-1">
            <span class="text-muted small me-1" style="width:16px;">C</span>
            <button class="seat">1</button>
            <button class="seat">2</button>
            <button class="seat">3</button>
            <button class="seat booked">4</button>
            <button class="seat">5</button>
            <button class="seat">6</button>
            <button class="seat">7</button>
            <button class="seat">8</button>
            <button class="seat">9</button>
            <button class="seat booked">10</button>
          </div>
          <div class="d-flex align-items-center gap-1 mb-1">
            <span class="text-muted small me-1" style="width:16px;">D</span>
            <button class="seat">1</button>
            <button class="seat">2</button>
            <button class="seat">3</button>
            <button class="seat">4</button>
            <button class="seat booked">5</button>
            <button class="seat">6</button>
            <button class="seat">7</button>
            <button class="seat booked">8</button>
            <button class="seat">9</button>
            <button class="seat">10</button>
          </div>
          <!-- // 좌석 행 반복 -->

          <!-- 범례 -->
          <div class="d-flex gap-3 mt-3 small text-muted">
            <span><span class="seat d-inline-block" style="width:16px;height:16px;vertical-align:middle;"></span> 선택 가능</span>
            <span><span class="seat selected d-inline-block" style="width:16px;height:16px;vertical-align:middle;"></span> 선택됨</span>
            <span><span class="seat booked d-inline-block" style="width:16px;height:16px;vertical-align:middle;"></span> 예매됨</span>
          </div>
        </div>
      </div>

      <!-- 예매 확인 -->
      <div class="col-md-4">
        <div class="card p-4">
          <h6 class="fw-bold mb-3">예매 확인</h6>
          <p class="small text-muted mb-1">선택한 좌석</p>
          <div class="mb-3 small">A3</div>
          <hr>
          <div class="d-flex justify-content-between mb-3">
            <span class="small">총 금액</span>
            <span class="fw-bold">5,000원</span>
          </div>
          <button class="btn btn-dark w-100">예매 확정</button>
          <!-- 좌석 미선택 시
          <button class="btn btn-dark w-100" disabled>예매 확정</button>
          -->
        </div>
      </div>
    </div>
  </div>

  <script src="./bootstrap.bundle.min.js"></script>
</body>
</html>
