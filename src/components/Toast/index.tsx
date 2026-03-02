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

export const openToast = (props: Omit<ToastProps, "onClose" | "isOpen">) => {
  overlay.open(({ isOpen, close }) => {
    return <Toast {...props} isOpen={isOpen} onClose={close} />;
  });
};

export function Toast({
  isOpen,
  variant,
  title,
  description,
  duration = DEFAULT_DURATION,
  onClose,
}: ToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  useEffect(() => {
    console.log("isopen");
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, isOpen]);

  return (
    <div
      className={clsx(
        `z-50 flex flex-row items-center gap-4 rounded-2xl p-4 shadow-lg ${config.bgColor} transition-top fixed right-8 backdrop-blur-sm duration-300`,
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
