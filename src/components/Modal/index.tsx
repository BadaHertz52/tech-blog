import { ReactNode, useRef } from "react";

import Icon from "@/components/Icon";
import useEscapeClose from "./hooks/useEscapeClose";
import useFocusTrap from "./hooks/useFocusTrap";
import useScrollLock from "./hooks/useScrollLock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  "aria-label": string;
}

interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
}

interface ModalContentProps {
  children: ReactNode;
}

function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex h-[51px] w-full items-center justify-between px-5 py-[10px]">
      {title && (
        <p className="whitespace-nowrap text-[24px] font-extrabold leading-[1.2] tracking-[0.6px] text-black">
          {title}
        </p>
      )}
      {onClose && (
        <button type="button" onClick={onClose} aria-label="모달 닫기">
          <Icon name="x" width={24} height={24} />
        </button>
      )}
    </div>
  );
}

function ModalContent({ children }: ModalContentProps) {
  return <div className="min-h-px w-full min-w-px flex-1">{children}</div>;
}

function Modal({
  isOpen,
  onClose,
  children,
  "aria-label": ariaLabel,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useFocusTrap({ ref: modalRef, isOpen });
  useEscapeClose(isOpen, onClose);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="relative flex w-auto rounded-[32px] bg-white shadow-[12px_12px_24px_0px_#e0e5ec,-12px_-12px_24px_0px_#ffffff]"
      >
        {children}
      </div>
    </div>
  );
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;

export default Modal;
