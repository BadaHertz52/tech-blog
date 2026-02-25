import { overlay } from "overlay-kit";
import { useCallback, useEffect, useRef } from "react";

import Toast from "@/components/Toast";
import type { ToastProps } from "@/components/Toast/types";

const DEFAULT_DURATION = 1_000;

interface UseOpenToastProps extends ToastProps {
  duration?: number;
}

export const useOpenToast = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const openToast = useCallback(
    ({
      variant,
      title,
      description,
      duration = DEFAULT_DURATION,
    }: UseOpenToastProps) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      overlay.open(({ close }) => {
        timerRef.current = setTimeout(() => {
          close();
          timerRef.current = null;
        }, duration);

        return (
          <Toast variant={variant} title={title} description={description} />
        );
      });
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { openToast };
};
