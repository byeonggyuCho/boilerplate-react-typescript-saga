import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules';
import * as baseAction from '@modules/base/action';

type HandleMap = {
  [modalName: string]: (modalName: string, modalInfo: any) => void;
};
/**
 * @description 모달 제어
 */
const useModal = () => {
  // const [activeModalName, setActiveModalName] = useState();
  const dispatch = useDispatch();

  const modalGroup = useSelector((state: RootState) => state.base.modal);

  return {
    getModalInfo(modalType: string) {
      return modalGroup[modalType];
    },
    getActiveModalList() {
      return Object.entries(modalGroup).filter(([key, value]) => value?.open);
    },
    isModalOpen(modalType: string) {
      return modalGroup[modalType]?.open;
    },

    /**
     *
     * @param opt
     * @param {boolean} cover 현재 열린 모달 위에 곂쳐서 열것인지 새로 열것인지 여부.
     */
    openModal(
      param: {
        type: string;
        theme?: 'blur' | string;
        data?: any;
        props?: any;
      },
      cover?: boolean
    ) {
      dispatch(baseAction.openModal(param));
    },
    closeModal(param: { type: string; data?: any }) {
      dispatch(baseAction.closeModal(param));
    },

    handleModalState(
      modalState: { [modalName: string]: any },
      handlerMap: HandleMap
    ) {
      for (const [modalName, modalInfo] of Object.entries(modalState)) {
        if (modalInfo?.open && handlerMap[modalName]) {
          handlerMap[modalName](modalName, modalInfo);
          break;
        }
      }
    },
  };
};

export default useModal;
