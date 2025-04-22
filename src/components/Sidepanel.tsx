import { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";
import useDialogAcessibility from "../hooks/useDialogAccessibility";

type SidepanelSizes = "small" | "medium" | "large" | "full";

type SidepanelVariants = {
  size: SidepanelSizes;
};

type SidepanelProps<T extends HTMLElement = HTMLElement> = {
  isOpen: boolean;
  closeCallback: () => void;
  size?: SidepanelSizes;
  description: string;
  openElement: RefObject<T | null>;
  children: ReactNode;
};

type BackdropProps = {
  clickCallback: () => void;
};

const Backdrop = ({ clickCallback }: BackdropProps) => {
  return (
    <div
      tabIndex={0}
      onClick={clickCallback}
      className="fixed h-full w-full bg-primary-500/60"
    ></div>
  );
};

const baseStyles =
  "sidepanel-container absolute right-2 w-2xl bg-white rounded-sm p-8";

const sidepanelStyles = {
  small: "w-xl",
  medium: "w-3xl",
  large: "w-6xl",
  full: "sidepanel-container-full",
};

const generateSidepanelClasses = ({ size }: SidepanelVariants) => {
  return `${baseStyles} ${sidepanelStyles[size]}`;
};

const Sidepanel = <T extends HTMLElement = HTMLElement>({
  isOpen = true,
  closeCallback,
  size = "medium",
  description,
  openElement,
  children,
}: SidepanelProps<T>) => {
  const sidepanelClasses = generateSidepanelClasses({ size });

  const { componentRef, onKeydownHandler, onCloseHandler } =
    useDialogAcessibility<HTMLDivElement, HTMLElement>({
      isVisible: isOpen,
      closeCallback,
      openElement,
    });

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      className="fixed h-full w-full top-0 left-0 flex items-center"
      aria-label={description}
      onKeyDown={onKeydownHandler}
    >
      <Backdrop clickCallback={onCloseHandler} />
      <div className={sidepanelClasses} ref={componentRef} tabIndex={-1}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Sidepanel;
