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
  bottom:
    "top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent",
  top: "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent",
  right:
    "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent",
  left: "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent",
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
          "tex-center w-full whitespace-nowrap rounded-xs p-[4] xs:px-[2] xs:py-xs",
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
