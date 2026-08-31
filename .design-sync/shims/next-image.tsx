import { CSSProperties, ComponentProps } from "react";

import KNOWN_IMAGES from "./known-images";

type Src = string | { src: string };

interface ShimImageProps extends Omit<ComponentProps<"img">, "src" | "style"> {
  src: Src;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  style?: CSSProperties;
}

export default function Image({
  src,
  alt,
  fill,
  sizes: _sizes,
  priority: _priority,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  style,
  ...rest
}: ShimImageProps) {
  const rawSrc = typeof src === "string" ? src : src?.src;
  const resolvedSrc = KNOWN_IMAGES[rawSrc] ?? rawSrc;
  const fillStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
    : {};
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={resolvedSrc} alt={alt ?? ""} style={{ ...fillStyle, ...style }} {...rest} />
  );
}
