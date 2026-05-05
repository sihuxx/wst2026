<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>공연 목록 - TicketBox</title>
  <link href="./bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

  <!-- NAV : include nav.php -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand fw-bold" href="index.html">TicketBox</a>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="index.html">공연 목록</a>
        </li>
        <!-- 로그인 상태에서만 표시
        <li class="nav-item">
          <a class="nav-link" href="bookings.html">예매 내역</a>
        </li>
        -->
      </ul>
      <div class="d-flex gap-2">
        <!-- 비로그인 -->
        <a href="login.html" class="btn btn-outline-light btn-sm">로그인</a>
        <a href="register.html" class="btn btn-light btn-sm">회원가입</a>
        <!-- 로그인 상태
        <span class="navbar-text text-white me-2">홍길동</span>
        <button class="btn btn-outline-light btn-sm">로그아웃</button>
        -->
      </div>
    </div>
  </nav>
  <!-- END NAV -->

  <div class="container py-5">
    <!-- 검색/필터/정렬 -->
    <div class="row g-2 mb-4">
      <div class="col-md-4">
        <input type="text" class="form-control" placeholder="공연명 검색">
      </div>
      <div class="col-md-3">
        <select class="form-select">
          <option value="">장소 전체</option>
          <option>서울</option>
          <option>부산</option>
          <option>대구</option>
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-select">
          <option value="desc" selected>날짜 내림차순</option>
          <option value="asc">날짜 오름차순</option>
        </select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-dark w-100">검색</button>
      </div>
    </div>

    <!-- 공연 목록 -->
    <div class="row g-4">

      <!-- 공연 카드 반복 -->
      <div class="col-md-4">
        <a href="detail.html" class="text-decoration-none text-dark">
          <div class="card h-100">
            <div class="card-img-top bg-secondary" style="height:200px;"></div>
            <div class="card-body">
              <h6 class="card-title fw-bold">뮤지컬 레미제라블</h6>
              <p class="card-text small text-muted mb-1">📅 2026-06-01 19:00</p>
              <p class="card-text small text-muted mb-1">📍 서울 올림픽홀</p>
              <p class="card-text small text-muted mb-1">💰 5,000원</p>
              <p class="card-text small text-muted">🎟 잔여석 32 / 40</p>
            </div>
          </div>
        </a>
      </div>

      <!-- 매진 공연 예시 -->
      <div class="col-md-4">
        <a href="detail.html" class="text-decoration-none text-dark">
          <div class="card h-100">
            <div class="card-img-top bg-secondary" style="height:200px;"></div>
            <div class="card-body">
              <h6 class="card-title fw-bold">홍길동 콘서트 <span class="badge bg-danger ms-1 small">매진</span></h6>
              <p class="card-text small text-muted mb-1">📅 2026-05-15 18:00</p>
              <p class="card-text small text-muted mb-1">📍 부산 벡스코</p>
              <p class="card-text small text-muted mb-1">💰 5,000원</p>
              <p class="card-text small text-muted">🎟 잔여석 0 / 50</p>
            </div>
          </div>
        </a>
      </div>

      <div class="col-md-4">
        <a href="detail.html" class="text-decoration-none text-dark">
          <div class="card h-100">
            <div class="card-img-top bg-secondary" style="height:200px;"></div>
            <div class="card-body">
              <h6 class="card-title fw-bold">재즈 페스티벌</h6>
              <p class="card-text small text-muted mb-1">📅 2026-04-20 20:00</p>
              <p class="card-text small text-muted mb-1">📍 대구 엑스코</p>
              <p class="card-text small text-muted mb-1">💰 5,000원</p>
              <p class="card-text small text-muted">🎟 잔여석 10 / 30</p>
            </div>
          </div>
        </a>
      </div>
      <!-- // 공연 카드 반복 -->

    </div>
  </div>

  <script src="./bootstrap.bundle.min.js"></script>
</body>
</html>
