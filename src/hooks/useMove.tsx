import { useDispatch } from 'react-redux';
import { movePage as movePageAction } from '@modules/base/action';

import { useHistory } from 'react-router-dom';
interface pageMoveFunctionParam {
  url: string;
  data?: any;
}

const useMove = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const movePage = (param: pageMoveFunctionParam) => {
    dispatch(movePageAction(param));
  };

  const goBack = () => {
    history.goBack();
  };

  return {
    movePage,
    goBack,
  };
};

export default useMove;
