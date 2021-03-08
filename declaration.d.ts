declare module '*.scss';
declare module '*.svg';
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.eot';

/**
 * @description 페이플 고객 인증 요청 함수, 자세한 파라미터는 페이플 Doc참고
 * @param params
 */
declare function PaypleCpayAuthCheck(params: any) {
};

type Re =
  | React.ReactNode
  | React.Component
  | React.ComponentType<any>
  | React.ReactElement;

interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

interface BillRowInfo {
  paymentId: number;
  price: number;
  receipt: string;
  payment_date: string;
  // priceOrg?: string;
}

interface BillInfo {
  total_count: number;
  payments: BillRowInfo[];
  // currentPage: number;
}

type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : 'object';
