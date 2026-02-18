import clsx from "clsx";

type TailPosition = "top" | "bottom" | "left" | "right";

interface SpeechBubbleProps {
  tailPosition?: TailPosition;
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  tailColor?: string;
}

const tailPositionStyles: Record<TailPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent",
  right:
    "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent",
};

export default function SpeechBubble({
  children,
  tailPosition = "top",
  bgColor = "bg-white",
  textColor = "text-text-primary",
  tailColor = "border-white",
}: SpeechBubbleProps) {
  return (
    <div className="group relative inline-flex items-center justify-center">
      {/* 말풍선 박스 */}
      <div
        className={clsx(
          "whitespace-nowrap rounded-xs px-sm py-xs",
          bgColor,
          textColor,
          "shadow-[0px_8px_16px_-2px_rgba(27,33,44,0.12)]"
        )}
      >
        {children}
      </div>

      {/* 꼬리 */}
      <div
        className={clsx(
          "absolute border-[6px]",
          tailPositionStyles[tailPosition],
          tailColor
        )}
      />
    </div>
  );
}
