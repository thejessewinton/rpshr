"use client";

import { forwardRef, type Ref } from "react";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import { cn } from "~/utils/core";

export const ContextMenu = ({
  children,
  ...props
}: ContextMenuPrimitive.ContextMenuProps) => {
  return (
    <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>
  );
};

const ContextMenuTrigger = forwardRef(
  (
    { className, ...props }: ContextMenuPrimitive.ContextMenuTriggerProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <ContextMenuPrimitive.Trigger
        className={cn(className)}
        ref={ref}
        {...props}
      />
    );
  },
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";

const ContextMenuContent = forwardRef(
  (
    { className, ...props }: ContextMenuPrimitive.ContextMenuContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <ContextMenuPrimitive.Content
        className={cn(
          "z-[9999] mt-1 w-40 space-y-1 overflow-hidden rounded-lg border bg-transparent p-1 text-xs shadow-lg shadow-black/10 backdrop-blur-sm radix-state-closed:animate-fade-out",
          "border-neutral-200/70 text-neutral-700",
          "dark:border-neutral-700/30 dark:text-neutral-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

ContextMenuContent.displayName = "ContextMenuContent";

const ContextMenuItem = forwardRef(
  (
    { className, ...props }: ContextMenuPrimitive.ContextMenuItemProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <ContextMenuPrimitive.Item
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-2 rounded p-2 outline-none",
          "focus:bg-neutral-200/70 focus:text-neutral-700 radix-highlighted:bg-neutral-200/70 radix-highlighted:text-neutral-700",
          "focus:dark:bg-neutral-700/20 focus:dark:text-white radix-highlighted:dark:bg-neutral-700/20 radix-highlighted:dark:text-white",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuSub = ({
  ...props
}: ContextMenuPrimitive.ContextMenuSubProps) => {
  return <ContextMenuPrimitive.Sub {...props} />;
};

ContextMenuSub.displayName = "ContextMenuSub";

const ContextMenuSubTrigger = forwardRef(
  (
    { className, ...props }: ContextMenuPrimitive.ContextMenuSubTriggerProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <ContextMenuPrimitive.SubTrigger
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-2 rounded p-2 outline-none",
          "focus:bg-neutral-200/70 focus:text-neutral-700 radix-highlighted:bg-neutral-200/70 radix-highlighted:text-neutral-700",
          "focus:dark:bg-neutral-700/20 focus:dark:text-white radix-highlighted:dark:bg-neutral-700/20 radix-highlighted:dark:text-white",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

const ContextMenuSubContent = forwardRef(
  (
    { className, ...props }: ContextMenuPrimitive.ContextMenuSubContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <ContextMenuPrimitive.SubContent
        className={cn(
          "mt-1 w-40 space-y-1 overflow-hidden rounded-lg border p-1 text-xs shadow-lg shadow-black/10 backdrop-blur-sm radix-state-closed:animate-fade-out",
          "border-neutral-200/70 bg-neutral-100/70 text-neutral-700",
          "dark:border-neutral-700/30 dark:bg-neutral-800/70 dark:text-neutral-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

ContextMenuSubContent.displayName = "ContextMenuSubContent";

const ContextMenuSeparator = forwardRef(
  (
    { className, ...props }: ContextMenuPrimitive.ContextMenuSeparatorProps,
    ref: Ref<HTMLHRElement>,
  ) => {
    return (
      <ContextMenuPrimitive.Separator
        className={cn(
          "my-1 h-px w-full",
          "bg-neutral-300",
          "dark:bg-neutral-700",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Sub = ContextMenuSub;
ContextMenu.SubTrigger = ContextMenuSubTrigger;
ContextMenu.SubContent = ContextMenuSubContent;
ContextMenu.Separator = ContextMenuSeparator;
