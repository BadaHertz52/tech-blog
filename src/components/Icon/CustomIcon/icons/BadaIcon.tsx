import Image from "next/image";

import badaImg from "@/assets/images/bada.webp";

import type React from "react";

interface BadaIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function BadaIcon({
  width = 24,
  height = 24,
  className,
}: BadaIconProps) {
  return (
    <Image
      src={badaImg}
      alt="BADA"
      width={width}
      height={height}
      className={className}
    />
  );
}
