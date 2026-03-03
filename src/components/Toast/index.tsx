import clsx from "clsx";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { overlay } from "overlay-kit";
import { useEffect } from "react";

interface ToastProps {
  isOpen: boolean;
  variant: "success" | "warning" | "error";
  title?: string;
  description: string;
  duration?: number;
  onClose?: () => void;
  unmount?: () => void;
}

const variantConfig = {
  success: {
    bgColor: "bg-blue-100",
    icon: CheckCircle,
    iconColor: "text-blue-500",
  },
  warning: {
    bgColor: "bg-amber-100",

    icon: AlertTriangle,
    iconColor: "text-amber-500",
  },
  error: {
    bgColor: "bg-red-100",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
} as const;

const DEFAULT_DURATION = 1_500;

export const openToast = (
  props: Omit<ToastProps, "isOpen" | "onClose" | "unmount">
) => {
  overlay.open(({ isOpen, close, unmount }) => {
    return (
      <Toast {...props} isOpen={isOpen} onClose={close} unmount={unmount} />
    );
  });
};

// CSS transition 시간 (duration-300)
const ANIMATION_DURATION = 300;

export function Toast({
  isOpen,
  variant,
  title,
  description,
  duration = DEFAULT_DURATION,
  onClose,
  unmount,
}: ToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  useEffect(() => {
    if (!isOpen) return;

    // 1단계: duration 후 onClose 호출 (숨김 시작)
    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration);

    // 2단계: animation 완료 후 unmount (메모리 정리)
    const unmountTimer = setTimeout(() => {
      unmount?.();
    }, duration + ANIMATION_DURATION);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(unmountTimer);
    };
  }, [duration, isOpen, onClose, unmount]);

  return (
    <div
      className={clsx(
        `z-50 flex flex-row items-center gap-4 rounded-2xl p-4 shadow-lg ${config.bgColor} transition-top fixed left-1/2 -translate-x-1/2 backdrop-blur-sm duration-${ANIMATION_DURATION}`,
        isOpen ? "visible top-[85px]" : "invisible top-[80px]"
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`h-6 w-6 flex-shrink-0 ${config.iconColor}`} />
      <div className="flex flex-col">
        {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
}
