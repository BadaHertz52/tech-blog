import type React from "react";

import Icon from "@/components/Icon";
import type { IconName } from "@/components/Icon/types";

interface EmptyStateLayoutProps {
  children: React.ReactNode;
}

function EmptyStateLayout({ children }: EmptyStateLayoutProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center text-text-secondary">
        {children}
      </div>
    </div>
  );
}

interface EmptyStateIconProps {
  name?: IconName;
  width?: number;
  customIcon?: React.ReactNode;
}

function EmptyStateIcon({
  name = "bada",
  width = 48,
  customIcon,
}: EmptyStateIconProps) {
  return (
    <div>
      {customIcon ? (
        customIcon
      ) : (
        <Icon
          name={name}
          width={width}
          className="text-text-secondary opacity-100"
        />
      )}
    </div>
  );
}

interface EmptyStateContentProps {
  children?: React.ReactNode;
}

function EmptyStateContent({ children }: EmptyStateContentProps) {
  return (
    <div className="mt-2 flex flex-col items-center gap-1 text-text-primary">
      {children}
    </div>
  );
}

interface EmptyStateActionsProps {
  children: React.ReactNode;
}

function EmptyStateActions({ children }: EmptyStateActionsProps) {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
      {children}
    </div>
  );
}

const EmptyState = Object.assign(EmptyStateLayout, {
  Icon: EmptyStateIcon,
  Content: EmptyStateContent,
  Actions: EmptyStateActions,
});

export default EmptyState;
