import { useState, useCallback, useEffect } from 'react';

interface Form {
  [props: string]: {
    value: any;
    require?: boolean;
    maxLength?: number;
    minLength?: number;
    message?: string;
    regex?: string;
    type?: 'number' | 'string' | 'boolean' | 'array';
  };
}

/**
 * @description 폼 데이터 필수값 체크
 * @param initialForm {Form} 초기값
 */
function useInput<T extends Form>(initialForm: T extends Form ? T : Form) {
  type Result<InitialForm extends Form> = {
    [Key in keyof InitialForm]: InitialForm[Key][keyof Pick<
      InitialForm[Key],
      'value'
    >];
  };

  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState<Result<T> | {}>({});

  useEffect(() => {
    setResult(
      Object.entries(form).reduce<Result<T> | {}>(
        (prev, [key, { value }], idx) => {
          const re: any = prev ? prev : {};
          if (value) {
            re[key] = value;
            prev = re;
          }

          return prev;
        },
        {}
      )
    );
  }, [form]);

  /**
   * @description 폼 데이터 입력
   */
  const onChange = useCallback(
    (param: { [name: string]: any }) => {
      const _result = Object.entries(param).reduce(
        (prev, [key, value], idx) => {
          prev = {
            ...prev,

            [key]: {
              ...prev[key],
              value: param[key],
            },
          };

          return prev;
        },
        form
      );

      setForm(_result);
    },
    [form]
  );
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  /**
   * @deprecated 미사용... formData를 사용할것...
   */
  const getForm = () =>
    Object.entries(form).reduce<{ [props: string]: any }>(
      (prev, [key, { value }], idx) => {
        if (value) {
          prev[key] = value;
        }

        return prev;
      },
      {}
    );

  /**
   * @description 유효성 검증
   */
  const validateForm = (): { value: boolean; message: string } => {
    const result = {
      value: false,
      message: '',
    };

    const re = Object.entries(form).find(
      ([
        key,
        { type, value, require = false, message, maxLength, minLength },
      ]) => {
        if (require && !value) {
          return (result.message = message || `${key}는 필수값 입니다.`);
        } else if (
          value &&
          maxLength !== undefined &&
          (value + '').length > maxLength
        ) {
          return (result.message =
            message || `${key}는 최대 ${maxLength}자 입니다.`);
        } else if (
          value &&
          minLength !== undefined &&
          (value + '').length < minLength
        ) {
          return (result.message =
            message || `${key}는 최소 ${maxLength}자 입니다.`);
        } else if (value && type !== undefined && type !== typeof value) {
          return (result.message =
            message || `${key}는 자료형은 ${type}입니다.`);
        }
      }
    );

    if (re) {
      return result;
    } else {
      return {
        ...result,
        value: true,
      };
    }
  };

  return {
    onChange,
    reset,
    getForm,
    validateForm,
    formData: result as Result<T>,
  };
}

export default useInput;
