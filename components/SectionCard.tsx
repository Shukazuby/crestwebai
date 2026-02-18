"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  /** Called when Edit is clicked. Optional for MVP. */
  onEdit?: () => void;
  onCopy?: () => void;
  className?: string;
}

function SectionCard({
  title,
  children,
  onEdit,
  onCopy,
  className,
}: SectionCardProps) {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else {
      const text = typeof children === "string" ? children : getTextContent(children);
      void navigator.clipboard.writeText(text);
    }
  };

  return (
    <article
      className={cn(
        "rounded-lg border border-crest-text/10 bg-crest-background p-5 shadow-sm",
        "flex flex-col gap-3",
        className
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-crest-text">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="crestSecondary"
            size="sm"
            onClick={onEdit ?? (() => {})}
            className="text-crest-text"
          >
            Edit
          </Button>
          <Button
            variant="crestSecondary"
            size="sm"
            onClick={handleCopy}
            className="text-crest-text"
          >
            Copy
          </Button>
        </div>
      </header>
      <div className="text-sm text-crest-text/90 leading-relaxed">
        {children}
      </div>
    </article>
  );
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node) && node.props?.children)
    return getTextContent(node.props.children);
  return "";
}

SectionCard.displayName = "SectionCard";

export { SectionCard };
