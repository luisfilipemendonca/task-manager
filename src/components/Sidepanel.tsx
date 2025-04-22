import {
  createContext,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import useDialogAcessibility from "../hooks/useDialogAccessibility";
import Backdrop from "./Backdrop";

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

type SidepanelFooterProps = {
  children: ({
    closeCallback,
  }: {
    closeCallback: SidepanelContextProps["closeCallback"];
  }) => ReactNode;
};

type SidepanelContextProps = {
  closeCallback: () => void;
};

const baseStyles =
  "sidepanel-container absolute right-2 w-2xl bg-white rounded-sm flex flex-col";

const sidepanelStyles = {
  small: "w-xl",
  medium: "w-3xl",
  large: "w-6xl",
  full: "sidepanel-container-full",
};

const generateSidepanelClasses = ({ size }: SidepanelVariants) => {
  return `${baseStyles} ${sidepanelStyles[size]}`;
};

const SidepanelContext = createContext<SidepanelContextProps | null>(null);

const useSidepanelContext = () => {
  const sidepanelContext = useContext(SidepanelContext);

  if (!sidepanelContext)
    throw new Error("sidepanelContext must be used within is provider");

  return sidepanelContext;
};

const SidepanelHeader = ({ children }: PropsWithChildren) => {
  return <div className="p-8 border-b-1 border-b-primary-300">{children}</div>;
};

const SidepanelBody = ({ children }: PropsWithChildren) => {
  return <div className="h-full overflow-auto p-8">{children}</div>;
};

const SidepanelFooter = ({ children }: SidepanelFooterProps) => {
  const { closeCallback } = useSidepanelContext();

  return (
    <div className="px-8 py-4 border-t-primary-300 border-t-1 flex justify-end [&>*:not(:last-child)]:mr-4">
      {children({ closeCallback })}
    </div>
  );
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
    <SidepanelContext.Provider value={{ closeCallback: onCloseHandler }}>
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
      </div>
    </SidepanelContext.Provider>,
    document.body
  );
};

export default Sidepanel;

Sidepanel.Header = SidepanelHeader;
Sidepanel.Body = SidepanelBody;
Sidepanel.Footer = SidepanelFooter;
