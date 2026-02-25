export interface ToastProps {
  variant: "success" | "warning" | "error";
  title?: string;
  description: string;
  duration?: number;
}
