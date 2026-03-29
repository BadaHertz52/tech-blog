import { RefObject, useEffect } from "react";

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapProps {
  ref: RefObject<HTMLElement | null>;
  isOpen: boolean;
}

const getFocusableEls = (el: HTMLElement) =>
  Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

const createTabHandler = ({ firstEl, lastEl }: { firstEl: HTMLElement; lastEl: HTMLElement }) =>
  (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
      return;
    }

    if (document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  };

const useFocusTrap = ({ ref, isOpen }: UseFocusTrapProps) => {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const previousFocus = document.activeElement as HTMLElement;
    const modalEl = ref.current;
    const focusableEls = getFocusableEls(modalEl);

    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    firstEl.focus();

    const handleKeyDown = createTabHandler({ firstEl, lastEl });
    modalEl.addEventListener("keydown", handleKeyDown);

    return () => {
      modalEl.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, ref]);
};

export default useFocusTrap;
