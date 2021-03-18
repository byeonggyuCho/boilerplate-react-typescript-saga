import { createAction, createAsyncAction } from 'typesafe-actions';
import { MenuName } from '@config';
import { AxiosError } from 'axios';

// redux store의 모든 정보를 초기화한다.
export const CLEAR_STORE = 'base/CLEAR_STORE' as const;

// 리다이렉션 처리를 redux에서 처리하며 페이지 이동시 데이터 전달을 action을 통해 전달합니다.
export const MOVE_PAGE = 'base/MOVE_PAGE' as const;
export const PAGE_CLEAN = 'base/PAGE_CLEAN' as const;
export const OPEN_MODAL = 'base/OPEN_MODAL' as const;
export const CLOSE_MODAL = 'base/CLOSE_MODAL' as const;
export const OPEN_SIDEBAR = 'base/OPEN_SIDEBAR' as const;
export const OPEN_CONTEXT_MENU = 'base/OPEN_CONTEXT_MENU' as const;
export const CLOSE_CONTEXT_MENU = 'base/CLOSE_CONTEXT_MENU' as const;

export const SHOW_NOTIFICATION = 'base/SHOW_NOTIFICATION' as const;
export const ADD_NOTIFICATION = 'base/ADD_NOTIFICATION' as const;
export const REMOVE_NOTIFICATION = 'base/REMOVE_NOTIFICATION' as const;

export const GET_MENU = 'base/GET_MENU' as const;

/**
 * @description 서버 상태를 정검한다. (네비게이션에서 호출.)
 */
export const SERVER_HEALTH_CHECK = {
  REQUEST: 'base/SERVER_HEALTH_CHECK_REQUEST',
  SUCCESS: 'base/SERVER_HEALTH_CHECK_SUCCESS',
  FAILURE: 'base/SERVER_HEALTH_CHECK_FAILURE',
} as const;

export const clearStore = createAction(CLEAR_STORE)();
export const pageClean = createAction(PAGE_CLEAN)();
export const movePage = createAction(
  MOVE_PAGE,
  // type은 해당 페이지가 수정, 삭제처럼 재활용되는 경우 진입 케이스를 구분하기 위해서 넣는다.
  (payload: { url: string; data?: any; type?: string }) => payload
)();

/**
 * @description 컴포넌트 메뉴 닫기
 */
export const closeContextMenu = createAction(
  CLOSE_CONTEXT_MENU,
  (optionType: string) => optionType
)();

/**
 * @description 모달 오픈
 */
export const openModal = createAction(
  OPEN_MODAL,
  (req: { type: string; data?: any; theme?: string; props?: any }) => req
)();

/**
 * @description 모달 닫기.
 */
export const closeModal = createAction(
  CLOSE_MODAL,
  (payload: { type: string; data?: any }) => payload
)();

/**
 * @description 사이드바 오픈 여부
 */
export const openSidebar = createAction(
  OPEN_SIDEBAR,
  (payload: { open: boolean; menu?: MenuName; subMenu?: string }) => payload
)();

export const serverHealthCheck = createAsyncAction(
  SERVER_HEALTH_CHECK.REQUEST,
  SERVER_HEALTH_CHECK.SUCCESS,
  [SERVER_HEALTH_CHECK.FAILURE, (err: AxiosError) => err]
)();

export const showNotification = createAction(
  SHOW_NOTIFICATION,
  (payload: string) => payload
)();

export const addNotification = createAction(
  ADD_NOTIFICATION,
  (payload: Notification) => payload
)();
export const removeNotification = createAction(
  REMOVE_NOTIFICATION,
  (id: number) => id
)();

const actions = {
  clearStore,
  pageClean,
  movePage,
  openModal,
  closeModal,
  openSidebar,
  closeContextMenu,
  serverHealthCheck,
  addNotification,
  removeNotification,
  showNotification,
};

export default actions;
