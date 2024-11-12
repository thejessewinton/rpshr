"use client";

import { forwardRef, type Ref } from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "~/utils/core";

export const Popover = ({
  children,
  ...props
}: PopoverPrimitive.PopoverProps) => {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
};

const PopoverTrigger = forwardRef(
  (
    { className, ...props }: PopoverPrimitive.PopoverTriggerProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <PopoverPrimitive.Trigger
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-xs font-light outline-none transition-colors focus:ring-2",
          "text-neutral-700 hover:bg-neutral-200/70 focus:ring-neutral-200/70",
          "dark:text-neutral-400 hover:dark:bg-neutral-800/70 focus:dark:ring-neutral-700/30",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

PopoverTrigger.displayName = "DropdownTrigger";

const PopoverContent = forwardRef(
  (
    { className, ...props }: PopoverPrimitive.PopoverContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <PopoverPrimitive.Content
        className={cn(
          "z-[9999] mt-1 w-80 space-y-1 overflow-hidden rounded-lg border p-3 text-xs shadow-lg shadow-black/10 outline-none backdrop-blur-sm radix-state-closed:animate-fade-out",
          "border-neutral-200/70 bg-neutral-100/70 text-neutral-700 focus:bg-neutral-100/70",
          "dark:border-neutral-700/30 dark:bg-neutral-800/70 dark:text-neutral-400 focus:dark:bg-neutral-800/70",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

PopoverContent.displayName = "DropdownContent";

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
