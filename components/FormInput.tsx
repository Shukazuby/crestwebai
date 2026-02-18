"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FormInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  label: string;
  id: string;
  error?: string;
  wrapperClassName?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, error, wrapperClassName, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-1.5", wrapperClassName)}>
        <label
          htmlFor={id}
          className="text-sm font-medium text-crest-text leading-none"
        >
          {label}
        </label>
        <Input
          ref={ref}
          id={id}
          className={cn(
            "border-crest-text/20 text-crest-text placeholder:text-crest-text/50 focus-visible:ring-crest-primary",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
