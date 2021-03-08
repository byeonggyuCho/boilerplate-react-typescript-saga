import * as Base from './base';
import * as Plan from './plan';
import * as Store from './store';
import * as Checklist from './checklist';
import * as Category from './category';

export { Base, Plan, Store, Checklist, Category };

export interface ToastGridRowType {
  rowStatus?: 'edit' | 'basic';
  rowKey?: number;
  setting?: string;
  _attributes?: {
    rowNum?: number;
    checked?: boolean;
    disabled?: boolean;
    checkDisabled?: boolean;
    rowSpan?: {
      [props: string]: number;
    };
    className?: {
      row?: string[];
      column?: {
        [props: string]: string[];
      };
    };
  };
}

/**
 * @description null이 아닌 타입만 추려냅니다.
 */
export type NonNullablePropertyKeys<T> = {
  [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];

/**
 * @description T라는 함수타입의 리턴 타입을 얻는다.
 */
export type _ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

/**
 * @example
 * type T0 = Unpacked<string>;  // string
 * type T1 = Unpacked<string[]>;  // string
 * type T2 = Unpacked<() => string>;  // string
 * type T3 = Unpacked<Promise<string>>;  // string
 * type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
 * type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string
 */
export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
