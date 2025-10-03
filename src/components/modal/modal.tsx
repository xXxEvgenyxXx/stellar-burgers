/* prettier-ignore */
/* eslint-disable */
import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps & { 'data-cy'?: string }> = memo(({ title, onClose, children, 'data-cy': dataCy, ...rest }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose} data-cy={dataCy} {...rest}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
