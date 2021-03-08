export const router = {
  storePage: '/store', // 매장 선택 페이지
  paymentPage: '/payment',
  servicePlanPage: '/serviceplan',
  paymentMethodPage: '/method',
  paymentHistoryPage: '/history',
  couponPage: '/coupon',
  paymentComplete: '/complete',
  receptPage: '/receipt',
  stroePage: '/store',
  checklistPage: '/checklist',
  checklistWritePage: '/checklist/write',
  noticePage: '/notice',
  workerPage: '/worker',
  reportPage: '/report',

  // Admin
  adminPage: '/admin',
  brandPage: '/brand',
  franchisePage: '/franchise',
};

export const apiUrl = {};

// GET /userweb/v1/{userId} 카드 등록을 위한 사용자 정보 조회 O
// GET /userweb/v1/auth 카드 등록을 위한 인증 정보 조회 O
// GET /userweb/v1/{userId}/card 등록 카드 조회 O
// POST /userweb/v1/card 결제 카드 등록 O
// PATCH /userweb/v1/{userId}/card 카드를 결제 수단으로 변경 (기본 카드) X
// DELETE /userweb/v1/{userId}/card 등록된 카드 삭제 O
// POST /userweb/v1/ 정기 결제 O
// GET /userweb/v1/{userId} 결제 내역 X
// GET /userweb/v1/{userId}/bill 결제 내역 영수증 X
// POST /userweb/v1/{userId}/bill 결제 내역 영수증 이메일 보내기 X

// ## 서비스 플랜

// GET /userweb/v1/service-plan 서비스 플랜 가격표 O
// GET /userweb/v1/service-plan/{userId} 서비스 플랜 리스트 O
// PATCH 내용 파악 중 결제 주기 변경 X
// DELETE /userweb/v1/service-plan/{userId} 서비스 플랜 약정 취소 X

// ## 설문 조사

// GET /survey/terminate 서비스 플랜 약정 취소 설문 조사 목록 O
// POST /survey/terminate 서비스 플랜 약정 취소 설문 조사 등록 O
