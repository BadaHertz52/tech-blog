import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

import { ToastProps } from "./types";

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

export default function Toast({ variant, title, description }: ToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={`z-50 flex flex-row items-center gap-4 rounded-2xl border-2 p-4 shadow-lg ${config.bgColor} border-white backdrop-blur-sm`}
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
