import {
  createContext,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useContext,
} from "react";
import useDialogAcessibility from "../hooks/useDialogAccessibility";
import Backdrop from "./Backdrop";
import { createPortal } from "react-dom";

type ModalProps<T extends HTMLElement = HTMLElement> = {
  isOpen: boolean;
  labelledBy: string;
  describedBy: string;
  closeCallback: () => void;
  openElement: RefObject<T | null>;
  children: ReactNode;
  classNames?: {
    container?: string;
    modal?: string;
  };
};

type ModalContextProps = {
  closeCallback: () => void;
};

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext)
    throw new Error("modalcontext must be used within is provider");

  return modalContext;
};

const ModalHeader = ({
  children,
  classNames = "",
}: PropsWithChildren<{ classNames?: string }>) => {
  return <div className={`py-4 px-8 ${classNames}`}>{children}</div>;
};

const ModalBody = ({
  children,
  classNames = "",
}: PropsWithChildren<{ classNames?: string }>) => {
  return (
    <div className={`py-4 px-8 border-y-1 border-primary-500/30 ${classNames}`}>
      {children}
    </div>
  );
};

const ModalFooter = ({
  children,
  classNames = "",
}: PropsWithChildren<{ classNames?: string }>) => {
  return <div className={`py-4 px-8 ${classNames}`}>{children}</div>;
};

const Modal = <T extends HTMLElement>({
  isOpen,
  closeCallback,
  openElement,
  classNames,
  labelledBy,
  describedBy,
  children,
}: ModalProps<T>) => {
  const { componentRef, onCloseHandler, onKeydownHandler } =
    useDialogAcessibility<HTMLDivElement, T>({
      isVisible: isOpen,
      closeCallback,
      openElement,
    });

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ closeCallback }}>
      <div
        role="dialog"
        aria-modal="true"
        onKeyDown={onKeydownHandler}
        className={`fixed h-full w-full flex items-center justify-center top-0 left-0 px-4 ${classNames?.container}`}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      >
        <Backdrop clickCallback={onCloseHandler} />
        <div
          ref={componentRef}
          tabIndex={-1}
          className={`bg-white w-full max-w-xl z-10 rounded-lg ${classNames?.modal}`}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
};

export default Modal;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
