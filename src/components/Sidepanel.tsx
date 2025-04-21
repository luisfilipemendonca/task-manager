import { ReactNode, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type SidepanelSizes = "small" | "medium" | "large" | "full";

type SidepanelVariants = {
  size: SidepanelSizes;
};

type SidepanelProps = {
  isOpen: boolean;
  closeCallback: () => void;
  size?: SidepanelSizes;
  description: string;
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

const Sidepanel = ({
  isOpen = true,
  closeCallback,
  size = "medium",
  description,
  children,
}: SidepanelProps) => {
  const sidepanelContainerRef = useRef<HTMLDivElement>(null);
  const sidepanelClasses = generateSidepanelClasses({ size });

  const onKeydownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCallback();
      }
    },
    [closeCallback]
  );

  useEffect(() => {
    if (!isOpen) return;

    if (sidepanelContainerRef.current) {
      sidepanelContainerRef.current.focus();
    }

    document.addEventListener("keydown", onKeydownHandler);

    return () => {
      document.removeEventListener("keydown", onKeydownHandler);
    };
  }, [isOpen, onKeydownHandler]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      className="fixed h-full w-full top-0 left-0 flex items-center"
      aria-label={description}
    >
      <Backdrop clickCallback={closeCallback} />
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
