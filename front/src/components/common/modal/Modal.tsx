import confirm, { ConfirmReturnType } from './confirm';
import Diaglog, { DialogProps } from './Dialog';
import withModalContextHandler from './withModalContextHandler';

type ModalType = typeof Diaglog & {
    confirm: (props: DialogProps) => ConfirmReturnType;
};

const Modal = withModalContextHandler(Diaglog) as ModalType;

Modal.confirm = confirm;

export default Modal;
