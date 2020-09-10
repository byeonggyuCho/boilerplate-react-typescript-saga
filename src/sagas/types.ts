export interface Action {
  payload: any;
  type: string;
  meta?: any;
}

export interface AsyncActionType {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

export interface SagaInterface {
  (action: Action): any;
}

export interface AsyncAPI<reqData, resData> {
  (req?: reqData): Promise<resData>;
}
