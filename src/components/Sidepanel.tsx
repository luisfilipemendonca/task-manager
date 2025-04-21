import { KeyboardEvent, ReactNode, RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
  "sidepanel-container absolute right-2 w-2xl bg-white rounded-sm";

const sidepanelStyles = {
  small: "w-xl",
  medium: "w-3xl",
  large: "w-6xl",
  full: "sidepanel-container-full",
};

const generateSidepanelClasses = ({ size }: SidepanelVariants) => {
  return `${baseStyles} ${sidepanelStyles[size]}`;
};

const focusableElementSelectores = [
  "button",
  "[href]",
  "input",
  "select",
  "textarea",
  '[tabIndex]:not([tabIndex="-1"])',
].join(",");

const Sidepanel = <T extends HTMLElement = HTMLElement>({
  isOpen = true,
  closeCallback,
  size = "medium",
  description,
  openElement,
  children,
}: SidepanelProps<T>) => {
  const sidepanelContainerRef = useRef<HTMLDivElement>(null);
  const sidepanelClasses = generateSidepanelClasses({ size });

  const onCloseHandler = () => {
    if (openElement.current) {
      openElement.current.focus();
    }

    closeCallback();
  };

  const onKeydownHandler = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onCloseHandler();
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const elements =
        sidepanelContainerRef.current?.querySelectorAll<HTMLElement>(
          focusableElementSelectores
        );

      if (elements) {
        const currentIndex = [...elements].indexOf(
          document.activeElement as HTMLElement
        );

        const nextIndex = event.shiftKey
          ? (currentIndex - 1 + elements.length) % elements.length
          : (currentIndex + 1) % elements.length;

        elements[nextIndex].focus();
      }
    }
  };

  useEffect(() => {
    if (sidepanelContainerRef.current) {
      sidepanelContainerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      className="fixed h-full w-full top-0 left-0 flex items-center"
      aria-label={description}
      onKeyDown={onKeydownHandler}
    >
      <Backdrop clickCallback={onCloseHandler} />
      <div
        className={sidepanelClasses}
        ref={sidepanelContainerRef}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Sidepanel;
