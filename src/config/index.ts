import { router } from '@utils/urlMap';

export type MenuName = 'store' | 'bell' | 'payment' | 'cs' | '';

export interface MenuType {
  name: string;
  label: string;
  baseUrl: string;
  status?: 'prepare' | 'active';
  className: string;
  subMenu: {
    label: string;
    code: string;
    to: string;
  }[];
}

/**
 * @description 로그인시 초기페이지
 */
export const mainUrl = router.checklistPage;

// TODO: 정규식으로 바꾸기
export const OwnerMenuList: MenuType[] = [
  {
    name: 'store',
    label: '매장',
    baseUrl: '/store',
    className: 'store',
    // status: 'prepare',
    subMenu: [
      { label: '업무', code: 'task', to: router.checklistPage },
      // { label: '근무자', code: 'woker', to: router.workerPage },
      // { label: '전달사항', code: 'noti', to: router.notiPage },
      // { label: '리포트', code: 'report', to: router.reportPage },
    ],
  },

  {
    name: 'payment', // 결제관리
    label: '결제',
    baseUrl: '/payment',
    className: 'payment',
    subMenu: [
      { label: '서비스플랜', code: 'serviceplan', to: router.servicePlanPage },
      { label: '결제내역', code: 'history', to: router.paymentHistoryPage },
      { label: '결제수단', code: 'method', to: router.paymentMethodPage },
      { label: '쿠폰', code: 'coupon', to: router.couponPage },
    ],
  },
  // {
  //   name: "bell",
  //   className: "bell",
  //   subMenu: [],
  // },
  // {
  //   name: "cs", // Customer Service
  //   className: "cs",
  //   subMenu: [],
  // },
];

export const AdminMenuList = [
  {
    name: 'admin', // 결제관리
    label: '',
    baseUrl: '/admin',
    className: 'admin',
    subMenu: [
      { label: '브랜드 분석', code: 'brand', to: router.brandPage },
      {
        label: '가맹점 현황',
        code: 'franchise',
        to: router.franchisePage,
      },
    ],
  },
];

export const ROLE_MANU = {
  OWNER: OwnerMenuList,
  ADMIN: AdminMenuList,
  GUEST: [],
};

// export const getMenu = (role: string) => {
//   switch (role) {
//     case 'OWNER':
//       return OwnerMenuList;
//     case 'ADMIN':
//       return AdminMenuList;
//     default:
//       return [];
//   }
// };

export const serviceList = [
  {
    title: '일일체크 기능',
    text:
      '업무 추가, ‘인증샷’ 업무체크, 카테고리 설정, 반복 설정, 담당자 설정, 마감시간 설정, 사진자료 등록 등 일일체크와 관련한 핵심 기능을 사용할 수 있습니다.',
    type: 'checkList',
  },
  {
    title: '전달사항 기능',
    text:
      '공지사항, 매장 매뉴얼, 특이사항 등 매장에서 업무를 할 때 꼭 알아둬야 할 내용을 함께 공유할 수 있도록 기록을 폴더로 관리할 수 있습니다.',
    type: 'notice',
  },
  {
    title: '근무자초대 기능',
    text:
      '동업자 또는 공동 사장님, 매니저, 알바 등 다수의 직급별 근무자를 카카오톡, 문자 메시지 등을 활용해 동시에 매장으로 초대할 수 있습니다.',
    type: 'worker',
  },
  {
    title: '다매장관리 기능',
    text:
      '하나의 계정으로 여러 매장을 관리할 수 있도록 매장을 구분하여 등록하고 업무와 근무자를 매장별로 관리 할 수 있습니다.',
    type: 'store',
  },
  {
    title: '데이터 매장관리 기능',
    text:
      '근무자의 업무 수행도를 그래프로 확인 할 수 있습니다. 매장별 매일, 주간, 월간 데이터로 관리할 수 있습니다.',
    type: 'report',
  },
  {
    title: 'PC 관리자 기능',
    text:
      'PC에서 매장 현황을 대시보드 형태로 확인 할 수 있고 업무 추가, 전달사항 작성, 결제 기능을 사용할 수 있습니다.',
    type: 'admin',
  },
];

// configs 변수
export default {
  RUN_ENV: process.env.NODE_ENV || 'develop',
  baseUrl: process.env.BASE_URL || '',
  isProduct: process.env.NODE_ENV === 'production',
  testId: process.env.TEST_ID,
  testPw: process.env.TEST_PW,
  tokenRequestCycle: 1000 * 60 * 30,
  notificationDelay: 3000,
  papleUrl: process.env.PAYPLE_URL,
};
