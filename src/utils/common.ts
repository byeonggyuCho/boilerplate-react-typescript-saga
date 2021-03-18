import qs from 'qs';
import { AxiosResponse } from 'axios';
import config from '@config';
// import moment, { Moment as MomentTypes } from 'moment';
import { lazy } from 'react';

type TempFunction = (...agrs: any) => void;

export function throttle(fn: TempFunction, delay: number): TempFunction {
  let timer: any = null;
  return function delayedFunction(...args: any) {
    if (!timer) {
      // console.log('[throttle] start');
      timer = setTimeout(function () {
        fn(...args);
        // console.log('[throttle] end');
        timer = null;
      }, delay);
    }

    // console.log('[throttle] pending');
  };
}

/**
 * @description 배열을 병합합니다.
 * @param baseArray 베이스 배열
 * @param targetArrary 타겟배열
 * @param dataKey 매칭할 컬럼명
 */
export const joinArray = (
  baseArray: any[],
  targetArrary: any[],
  dataKey: string,
  otp?: {
    force?: boolean;
    defaultColumn?: any;
  }
): any[] => {
  const re = baseArray.reduce<any[]>((prev, baseItem) => {
    const joinItem =
      targetArrary.find(
        (targetItem) => baseItem[dataKey] === targetItem[dataKey]
      ) || {};

    const hasJoinColumn = baseItem[dataKey] && joinItem;

    if (otp?.force || hasJoinColumn) {
      const defaultColumn = otp?.defaultColumn || {};
      prev.push({
        ...defaultColumn,
        ...baseItem,
        ...joinItem,
      });
    }

    return prev;
  }, []);

  return re;
};

/**
 * @description 키워드를 찾아서 배열형태로 반환하고 해당 위치를 알려준다.
 * @param keyword
 * @param match
 * @returns {
 *  list: [],
 *  index:1,
 *  match:'',
 *  keyword:''
 * }
 */
export const findMatchedString = (keyword: string, match: string) => {
  let sumStr = '';
  // 해당 키워드의 인댁스
  const matches: number[] = [];

  return {
    list: keyword.split('').reduce<string[]>((prev, cur, idx, arr) => {
      sumStr += cur;

      const end = arr.length === idx + 1;

      if (sumStr.includes(match)) {
        prev.push(sumStr.replace(match, ''));
        prev.push(match);
        matches.push(prev.length - 1);
        sumStr = '';
      }

      if (end) {
        prev.push(sumStr);
      }

      return prev;
    }, []),
    matches,
    match,
    keyword,
  };
};

/**
 * @description svg text의 최대 너비를 구하는 함수 입니다. Svg를 활용하는 gragh라이브러리에 이용됩니다.
 * @param arr
 * @param key
 * @param formatter
 */
export const getMaxTextWidth = <
  T extends {
    [props: string]: any;
  }
>(
  arr: T[],
  key: keyof T,
  formatter?: (value: any) => any
): number => {
  if (!arr) {
    return 0;
  } else {
    const max = arr.reduce<number>((prev, cur) => {
      const value = formatter ? formatter(cur[key]) : cur[key];
      const strValue = toString(value);
      const width = measureTextWidth(strValue, 12, 'Spoqa Han Sans') || 0;

      if (width > prev) {
        return width;
      }
      return prev;
    }, 0);

    return max;
  }
};

/**
 * @description 텍스트의 너비를 계산합니다.
 * @param text 너비를 계산할 택스트
 * @param fontSize 해당 텍스트의 폰트사이즈
 * @param fontFamily 정확한 글꼴 산정을 위해 폰트 페밀리를 입력한다.
 * @param multiple 글꼴 당 한 텍스트의 너비를 계산하기 위한 비율.
 */
export const measureTextWidth = (
  text: string,
  fontSize = 12,
  fontFamily = 'Spoqa Han Sans',
  multiple?: number
): number => {
  const context: CanvasRenderingContext2D | null = document
    .createElement('canvas')
    .getContext('2d');
  context!.font = `${fontSize}px ${fontFamily}`;

  return context?.measureText(text).width || 0;
};

/**
 * @description undefined || null인 경우에 '' 반환한다.
 */
const toString = (value: any) => {
  return typeof value === 'number'
    ? value.toLocaleString()
    : typeof value === 'string'
    ? value
    : typeof value === 'boolean'
    ? `${value}`
    : typeof value === 'undefined'
    ? ''
    : typeof value === 'object'
    ? ''
    : typeof value === 'symbol'
    ? ''
    : '';
};

/**
 * @description -를 붙여준다.
 * @example
 *      phoneFormatter('01033337777')
 *      // 010-3333-7777
 * @param {string} phoneNumber
 */
export const phoneFormatter = (param: string) => {
  const phoneNumber = param.replace(/[^0-9]/g, '');
  const phone = [];
  if (phoneNumber.length < 4) {
    return phoneNumber || '-';
  } else if (phoneNumber.length < 7) {
    phone.push(phoneNumber.substr(0, 3));
    phone.push(phoneNumber.substr(3));
  } else if (phoneNumber.length < 11) {
    phone.push(phoneNumber.substr(0, 3));
    phone.push(phoneNumber.substr(3, 3));
    phone.push(phoneNumber.substr(6));
  } else {
    phone.push(phoneNumber.substr(0, 3));
    phone.push(phoneNumber.substr(3, 4));
    phone.push(phoneNumber.substr(7));
  }

  return phone.join('-');
};

/**
 * @description 컴포넌트 프리로드
 * @param importFunction
 */
export const lazyWidthPreload = function lazyWidthPreload(
  importFunction: () => Promise<any>
): {
  preload: () => Promise<any>;
} {
  const Component: React.LazyExoticComponent<React.ComponentType<any>> = lazy(
    importFunction
  );

  return {
    preload: importFunction,
  };
};

/**
 * @description 이미지 프리로드
 * @param src 이미지 경로
 */
export const imagePreload = function imagePreload(src: string) {
  const img = new Image();
  img.src = src;
};

export type Period = {
  startDate: string;
  endDate: string;
};

/**
 * @description 2021.02.18형태를 서버 날짜기준인 2021-02-18로 바꾼다.
 * @param  {string} date
 */
export const periodToBar = (date: string) => {
  return date.replace(/[.]/g, '-');
};

export const barToPeriod = (date: string) => {
  return date.replace(/[-]/g, '.');
};

type GetDateArg = {
  date?: Date;
  format?: string;
};

/**
 * @description 반복설정에서 oneDay
 *  @deprecated 삭제 예정
 * @param param0
 */
export const getOnedayToString = ([year, m, d]: any[]) =>
  [year, fillZero(m, 2), fillZero(d, 2)].join('-');

/**
 * @deprecated 삭제 예정
 */
export const getDateToString = (
  data: Date,
  option?: {
    delimiter?: any;
  }
): string => {
  const y = data.getFullYear();
  const m = fillZero(data.getMonth() + 1, 2);
  const date = fillZero(data.getDate(), 2);

  return [y, m, date].join(option?.delimiter || '.');
};

/**
 * @description 로컬 개발환경을 구분하기 위한 함수
 */
export const isLocal = (): boolean => config.RUN_ENV === 'local';

export const isProduct = (): boolean => config.isProduct;

export const getSum = (arr: number[]): number =>
  arr.reduce<number>((sum, cur) => (sum += cur), 0);

type _ObjectMapType = {
  [props: string]: any;
};

/**
 * @description
 * @param arr
 * @param otp
 */
export const getAvg = (
  arr: number[] | _ObjectMapType[],
  otp?: { decimal?: number; dataKey?: string }
): number | undefined => {
  // TODO: 배열 아이템 값의 타입을 읽는 타입추론 코드 추가필요

  if (arr.length === 0) {
    return undefined;
  }

  const isObjectItem =
    typeof arr[0] !== 'number' && otp?.dataKey && !!arr[0]?.[otp?.dataKey];

  const dataKey = otp?.dataKey;
  const _arr =
    isObjectItem && dataKey
      ? (arr as _ObjectMapType[]).map((item) => item[dataKey])
      : (arr as number[]);

  const totalSum = getSum(_arr);

  return Math.round(totalSum / arr.length);
};

/**
 * @description 브라우저별 루트 경로를 반환한다.
 */
export const getRootPath = () => {
  return isMobilePhone() ? '/mobile' : '/';
};

/**
 * @description userAgent로부터 모바일 디바이스 구분한다.
 */
export const isMobilePhone = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobilePhones = [
    'iphone',
    'ipod',
    'ipad',
    'android',
    'blackberry',
    'windows ce',
    'nokia',
    'webos',
    'opera mini',
    'sonyericsson',
    'opera mobi',
    'iemobile',
  ];

  return mobilePhones.some((item) => userAgent.includes(item));
};

/**
 * @description navigator.platform를 기준으로 구분한다.
 */
export const isMobilePlatform = () => {
  const pcDevice = 'win16|win32|win64|mac|macintel';

  if (navigator.platform) {
    if (pcDevice.includes(navigator.platform.toLowerCase())) {
      return false;
    } else {
      return true;
    }
  }

  return false;
};

/**
 * @description 쿼리 파람을 객체형태로 반환한다.
 * @param location
 */
export const getQueryParam = (location: any) => {
  // const query = new URLSearchParams(location.search);
  return qs.parse(location.search, { ignoreQueryPrefix: true });
};

export const getMinimumOfEquation = (
  equation: (x: number) => number,
  value: number
) => {
  let i = 0;
  while (true) {
    if (equation(i) > value) {
      return equation(i - 1);
    }
    ++i;
  }
};

export const isEmpty = (value: any) => {
  const empty =
    value === undefined ||
    value === 0 ||
    value === null ||
    value === '' ||
    value.length === 0 ||
    value.size === 0 ||
    (Array.isArray(value) && value.length === 0);

  return empty;
};

/**
 * @description TimeType을 string으로 반환합ㄴ디ㅏ.
 * @param {TimeType} date
 */
export const getTimeToString = (deadline: [string, string]) => {
  const [hour, minute] = deadline;
  return [fillZero(hour, 2), fillZero(minute, 2), '00'].join(':');
};
/**
 * @description 현재 시점을 기준으로 경과여부를 확인한다.
 */
export const isTimeOver = (date: Date) => {
  const today = new Date();

  return date.getTime() - today.getTime() < 0;
};

/**
 * @description 배열로 구성된 날짜를 0000년 00월 00일로 바꾼다.
 */
export const arrayToDateKo = (date: number[]) => {
  return `${date[0]}년 ${date[1]}월 ${date[2]}일`;
};

/**
 * @description 배열로 구성된 날짜를 0000.00.00 ~0000.00.00으로 바꾼다.
 */
export const arrayDateTerm = (start: number[], end: number[]) => {
  return `${start[0]}.${start[1]}.${start[2]} - ${end[0]}.${end[1]}.${end[2]}`;
};

export const dateToArray = (date: string) => {
  return date.split('-');
};

const repetitionMap = {
  oneDay: '하루',
  daily: '매일',
  weekly: '주간',
  monthly: '월간',
};

/**
 * @description 프로필 아이콘에 표시될 이름을 반환한다.
 * @param name
 */
export const getDisplayName = (name: string) => {
  if (name.length === 1) {
    return name;
  } else if (name.length === 2) {
    return name;
  } else if (name.length === 3) {
    return name.substr(1, 2);
  } else if (name.length > 3) {
    return name.substr(0, 1);
  }
  return '';
};

/**
 * @description 객체에서 해당 키값만 뽑아서 반환한다.
 * @param o
 * @param names
 */
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}

/**
 * @description fileType을 base64타입 이미지로 전환한다.
 * @param {File} file
 * @returns {Promise<string>} base64
 */
export const imageFileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (evnet: ProgressEvent<FileReader>) => {
      // 파일의 URL을 Base64 형태로 가져온다.

      if (evnet.target?.result) {
        resolve(evnet.target.result as string);
      }
    };

    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        // Calculate the percentage completed
        const percent = (event.loaded / event.total) * 100;
        // Set the value to the progress component
      }
    });
  });

type FileCustom = File & { verified_type: string };

export const typefile = (file: FileCustom) => {
  const slice = file.slice(0, 4);

  const reader = new FileReader();

  reader.readAsArrayBuffer(slice);

  reader.onload = function (e) {
    const buffer = reader.result as ArrayBuffer;
    const view = new DataView(buffer);
    const magic = view.getUint32(0, false);

    switch (magic) {
      case 0x89504e47:
        file.verified_type = 'image/png';
        break;
      case 0x47494638:
        file.verified_type = 'image/gif';
        break;
      case 0x25504446:
        file.verified_type = 'application/png';
        break;
      case 0x504b0304:
        file.verified_type = 'application/zip';
        break;
    }
  };
};

export const arrayFromFileList = (fileList: FileList): File[] =>
  Array.prototype.slice.call(fileList) as File[];

/**
 * @description base64이미지로 인코딩해서 반환한다.
 * @param {FileList} fileList
 * TODO:URL.createObjectURL로 전환하기.
 */
export const readImageFileList = async (
  fileList: FileList,
  otp?: {
    maxSize?: number;
    maxCount?: number;
  }
) =>
  await Promise.all(
    arrayFromFileList(fileList).map(
      (file, index, arr) =>
        new Promise<{ src: string; file: File }>((resolve, reject) => {
          // try {
          //   resolve({
          //     src: window.URL.createObjectURL(file),
          //     file: file,
          //   });
          // } catch (e) {
          //   reject(e);
          // }

          imageFileToBase64(file)
            .then((base64Image) => {
              resolve({
                src: base64Image,
                file: file,
              });
            })
            .catch((e) => {
              reject(e);
            });
        })
    )
  );

// 강제로 맞춘다.
export const forceTimeFormatting = (
  value: number | string,
  type: string,
  otp?: {
    type?: 'military'; // 24시 체계
  }
) => {
  const maxHour = otp?.type === 'military' ? 23 : 11;
  const maxMinute = 59;
  let re = Number(value);

  if (type === 'hour') {
    re = re < 0 ? 0 : maxHour < re ? maxHour : re;
  } else if (type === 'minute') {
    re = re < 0 ? 0 : maxMinute < re ? maxMinute : re;
  }

  return re;
};

/**
 * @description 문자열로온 00:00을 시, 분을number로 바꿔준다.
 * @param type hour, minutes, seconds
 * TODO:URL.createObjectURL로 전환하기.
 */
export const stringTimeToNumber = (
  time: string,
  type: 'hour' | 'minute' | 'second'
) => {
  const [hour, minute] = time.split(':');
  if (type === 'hour') return parseInt(hour);
  else if (type === 'minute') return parseInt(minute);
  else return 0;
};

export const fillZero = (value: string | number, count: number) => {
  let result: string = value + '';

  while (result.length < count) {
    result = `0${result}`;
  }

  return result;
};

export function isNumber(x: any): x is number {
  return typeof x === 'number';
}

export function isString(x: any): x is string {
  return typeof x === 'string';
}

/**
 * @description 띄어쓰기에 맞춰 개행을 해주는 함수
 * @param {string} target 개행문자를 삽입할 대상 문자
 * @param {string} maxWidth 최대 너비
 * @param {string} fontSize 문자의 폰트사이즈
 */
export const insertNewLine = ({
  target,
  maxWidth,
  fontSize,
}: {
  target: string;
  maxWidth: number;
  fontSize: number;
}) => {
  let cnt = 0;
  return target
    .split(' ')
    .reduce<string[]>((pre, cur, index) => {
      if ((cnt + cur.length) * fontSize > maxWidth) {
        pre.push(`\n`);
        cnt = 0;
      } else {
        cnt += cur.length;
      }
      pre.push(`${cur} `);

      return pre;
    }, [])
    .join('');
};

/**
 * @description 상대좌표 반환, 로직 재확인 필요.
 * @param event
 * @param referenceElement
 */
export function getRelativeCoordinates(
  event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  referenceElement: HTMLElement
) {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
  };

  let reference: HTMLElement = referenceElement.offsetParent as HTMLElement;

  while (reference) {
    if (!reference.offsetLeft || !reference.offsetTop) {
    }
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent as HTMLElement;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
  };
}

/**
 * @description 문자열에서 숫자만 골라서 반환환다.
 * @param  {string} str
 */
export const onlyNumber = (str: string) => {
  return str.replace(/[^0-9]/g, '');
};

export const getDateFromUTC = (
  _value: number | string,
  option?: {
    delimiter?: any;
  }
) => {
  const d = new Date(Number(_value + '') * 1000);

  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const date = d.getDate();

  const result = [y, m, date].join(option?.delimiter || '.');
  return result;
};

/**
 * @description JWT 파싱
 * @param {string} token
 * @returns {
 * userInfo: "{"userId":number,"roles":["string"]}",
 * tokenType: string,
 * aud: string,
 * iat: number,
 * exp: number
 * }
 */
export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const diffDay = (targetDay: string | number) => {
  const exfiredDay = new Date(targetDay);
  const today = new Date();
  const diffDay =
    (exfiredDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  return Math.floor(diffDay);
};

export const makeRandomId = (prefix?: string) => {
  const result = prefix || 'makeRandomId_';

  return `${result}_${Math.floor(Math.random() * 100)}`;
};

export const timeFormatterFromDeadline = (deadline: [string, string]) => {
  const [hour, minute] = deadline;

  const hourNum = parseInt(hour, 10);

  const isAfternoon = hourNum >= 12;

  let result = '';

  if (isAfternoon) {
    result = `오후 ${
      hourNum === 12 ? hourNum : fillZero(hourNum - 12, 2)
    } : ${fillZero(minute, 2)}`;
  } else {
    result = `오전 ${fillZero(hourNum, 2)} : ${fillZero(minute, 2)}`;
  }

  return result;
};

/**
 * @description
 * @param {string} data 14:30
 * @returns 오후 2:30
 */
export const timeFormatter = (data: string) => {
  if (typeof data !== 'string') {
  }

  const [hour, minute] = data.split(':');
  const numHour = parseInt(hour, 10);
  const isMorning = numHour < 12;
  let result = '';

  if (isMorning) {
    result = '오전 ' + numHour + ':' + minute;
  } else {
    result = '오후 ' + (numHour - 10) + ':' + minute;
  }

  return result;
};

/**
 * @description axios 서버 응답 포멧을 맞추기위해 사용한다. test코드에 이용됨
 * @param resBody
 */
export function createServerResponce<T>(resBody: T): AxiosResponse<T> {
  return {
    statusText: 'OK',
    status: 200,
    data: resBody,
    config: {},
    headers: {},
  };
}

/**
 * @description 쿼리스트링 빌더
 * @param obj
 */
export const buildLink = (obj: any) => {
  if (obj) {
    const query = qs.stringify(obj);

    return `?${query}`;
  } else {
    return '';
  }
};

/**
 * @description script 로더
 * @param url
 */
export async function loadScript(url: string | string[]): Promise<any> {
  if (Array.isArray(url)) {
    const promiseList = url.map((item) => loadScript(item));
    return Promise.all(promiseList);
  } else {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = function onload(e) {
        resolve(e);
      };
      script.onerror = function onerror(e) {
        reject(e);
      };
      script.src = url;
      if (!document || !document.head) {
        return;
      }
      document.head.appendChild(script);
    });
  }
}

/**
 * @description 월말과 윤달의 문제를 해결한다.
 * @param date
 * @param month
 * @ref https://hianna.tistory.com/328
 */
export function addMonth(date: Date, month: number) {
  // month달 후의 1일
  const addMonthFirstDate = new Date(
    date.getFullYear(),
    date.getMonth() + month,
    1
  );

  // month달 후의 말일
  const addMonthLastDate = new Date(
    addMonthFirstDate.getFullYear(),
    addMonthFirstDate.getMonth() + 1,
    0
  );

  const result = addMonthFirstDate;
  if (date.getDate() > addMonthLastDate.getDate()) {
    result.setDate(addMonthLastDate.getDate());
  } else {
    result.setDate(date.getDate());
  }

  return result;
}

export function getCurrentDate() {
  const d = new Date();

  const year = d.getFullYear() + '';
  const month = d.getMonth() + 1 + '';
  const date = d.getDate() + '';

  return {
    year,
    month,
    period: (forMonth: number) => {
      const d2 = addMonth(d, forMonth);
      const currentDate = `${year}.${month}.${date}`;
      const expireDate = `${d2.getFullYear()}.${
        d2.getMonth() + 1
      }.${d2.getDate()}`;

      return `${currentDate}~${expireDate}`;
    },
  };
}

/**
 * @description 콤마 메이커
 * @param num
 */
export function comma(num: string | number) {
  let len, point, str;

  num = num + '';
  point = num.length % 3;
  len = num.length;

  str = num.substring(0, point);
  while (point < len) {
    if (str != '') str += ',';
    str += num.substring(point, point + 3);
    point += 3;
  }

  return str;
}

/**
 * @description 원화포멧으로 반환
 * @param value
 */
export function wonFormatter(value: string | number) {
  if (!value) return '-';

  const stringValue = value.toString();
  const isNegative = stringValue.includes('-');

  const intValue = stringValue.replace(/[^0-9]/g, '');
  let re = comma(intValue.toString());

  if (isNegative) re = `-${re}`;

  return '￦' + re;
}
