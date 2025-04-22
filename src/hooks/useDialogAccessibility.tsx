import { RefObject, useEffect, useRef, KeyboardEvent } from "react";

type UseDialogAccessibilityProps<T extends HTMLElement = HTMLElement> = {
  isVisible: boolean;
  closeCallback: () => void;
  openElement: RefObject<T | null>;
};

const focusableElementSelectores = [
  "button",
  "[href]",
  "input",
  "select",
  "textarea",
  '[tabIndex]:not([tabIndex="-1"])',
].join(",");

const useDialogAcessibility = <T extends HTMLElement, P extends HTMLElement>({
  isVisible,
  closeCallback,
  openElement,
}: UseDialogAccessibilityProps<P>) => {
  const componentRef = useRef<T>(null);

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

      const elements = componentRef.current?.querySelectorAll<HTMLElement>(
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
    if (isVisible && componentRef.current) {
      componentRef.current.focus();
    }
  }, [isVisible]);

  return { componentRef, onKeydownHandler, onCloseHandler };
};

export default useDialogAcessibility;
