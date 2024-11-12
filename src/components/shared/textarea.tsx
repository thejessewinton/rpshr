import { forwardRef, type InputHTMLAttributes, type Ref } from "react";

import { cn } from "~/utils/core";

type TextAreaProps = {
  label?: string;
  secondaryLabel?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef(
  (
    { name, className, onChange, ...props }: TextAreaProps,
    ref: Ref<HTMLTextAreaElement>,
  ) => {
    return (
      <textarea
        ref={ref}
        name={name}
        onChange={onChange}
        className={cn(
          "min-w-0 max-w-none appearance-none rounded border bg-transparent px-3 py-2 text-base outline-none ring-0 placeholder-shown:text-ellipsis sm:text-sm",
          "border-neutral-200/70 text-neutral-700 placeholder:text-neutral-700 focus:text-neutral-700",
          "dark:border-neutral-700/30 dark:text-neutral-400 placeholder:dark:text-neutral-400 focus:dark:text-white",
          className,
        )}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
