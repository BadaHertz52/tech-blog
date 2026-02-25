"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export default function ShareButton() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="flex items-center justify-center rounded-lg bg-gray-100 p-3 transition-colors duration-200 hover:bg-gray-200"
      aria-label={isCopied ? "Link copied" : "Copy link to clipboard"}
      title={isCopied ? "Copied!" : "Copy link"}
    >
      <Link2 className="h-5 w-5 text-gray-600" />
    </button>
  );
}
