import LoadingUI from "./LoadingUI";

interface LoadingFallbackProps {
  customTwClass?: string;
}

export default function LoadingFallback({
  customTwClass = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
}: LoadingFallbackProps) {
  return (
    <div className={customTwClass}>
      <LoadingUI />
    </div>
  );
}
