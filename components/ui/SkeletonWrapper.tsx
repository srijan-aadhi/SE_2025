import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

function SkeletonWrapper({
  children,
  isLoading,
  fullWidth = true,
}: {
  children: ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
}) {
  if (!isLoading) return children;
  return (
  <Skeleton className={cn(fullWidth && "w-full")}>
    <div className=""></div>
  </Skeleton>
  );

}

export default SkeletonWrapper;
