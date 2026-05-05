<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>예매 내역 - TicketBox</title>
  <link href="./bootstrap.min.css" rel="stylesheet">
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
          <a class="nav-link active" href="bookings.html">예매 내역</a>
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
    <h4 class="fw-bold mb-4">예매 내역</h4>
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>공연명</th>
            <th>날짜/시간</th>
            <th>장소</th>
            <th>예매 좌석 수</th>
            <th>결제 금액</th>
            <th>예매 일시</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- 예매 내역 반복 -->

          <!-- 예매 완료 후 하이라이트 row -->
          <tr class="table-warning" style="cursor:pointer;" onclick="location.href='booking-detail.html'">
            <td>뮤지컬 레미제라블</td>
            <td>2026-06-01 19:00</td>
            <td>서울 올림픽홀</td>
            <td>2석</td>
            <td>10,000원</td>
            <td>2026-05-10 14:23</td>
            <td>
              <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation()">취소</button>
            </td>
          </tr>

          <!-- 일반 row -->
          <tr style="cursor:pointer;" onclick="location.href='booking-detail.html'">
            <td>홍길동 콘서트</td>
            <td>2026-05-15 18:00</td>
            <td>부산 벡스코</td>
            <td>1석</td>
            <td>5,000원</td>
            <td>2026-04-20 09:10</td>
            <td>
              <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation()">취소</button>
            </td>
          </tr>

          <!-- 공연 날짜 지난 row (취소 버튼 없음) -->
          <tr style="cursor:pointer;" onclick="location.href='booking-detail.html'">
            <td>재즈 페스티벌</td>
            <td>2026-03-01 20:00</td>
            <td>대구 엑스코</td>
            <td>3석</td>
            <td>15,000원</td>
            <td>2026-02-15 11:00</td>
            <td></td>
          </tr>

          <!-- // 예매 내역 반복 -->
        </tbody>
      </table>
    </div>
  </div>

  <script src="./bootstrap.bundle.min.js"></script>
</body>
</html>
