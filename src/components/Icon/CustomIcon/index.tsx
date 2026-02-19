import type React from "react";

import BadaIcon from "./icons/BadaIcon";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import type { CustomIconName } from "../types";

type CustomIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const customIconMap: Record<
  Exclude<CustomIconName, "bada">,
  CustomIconComponent
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  name: CustomIconName;
}

export default function CustomIcon({
  name,
  width = 24,
  height = 24,
  ...rest
}: CustomIconProps) {
  // bada는 이미지 기반이므로 별도 처리
  if (name === "bada") {
    return (
      <BadaIcon
        width={Number(width)}
        height={Number(height)}
        className={rest.className}
      />
    );
  }

  const IconComponent = customIconMap[name];
  return <IconComponent width={width} height={height} {...rest} />;
}
