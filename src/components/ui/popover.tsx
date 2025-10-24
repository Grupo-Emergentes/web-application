"use client";

import * as React from "react";
import { cn } from "./utils";

// Simplified Popover component without Radix dependencies
interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const PopoverContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({ open: false, onOpenChange: () => {} });

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, open, defaultOpen = false, onOpenChange, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(open !== undefined ? open : defaultOpen);

    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      if (open === undefined) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    }, [open, onOpenChange]);

    return (
      <PopoverContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-slot="popover"
          className={cn("relative inline-block", className)}
          {...props}
        >
          {children}
        </div>
      </PopoverContext.Provider>
    );
  }
);
Popover.displayName = "Popover";

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(PopoverContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-slot="popover-trigger"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={cn("", className)}
        {...props}
      />
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(PopoverContext);
    
    const alignClasses = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    };

    if (!open) return null;

    return (
      <div className="relative z-50">
        <div 
          className="fixed inset-0 z-40"
          onClick={() => onOpenChange(false)} 
        />
        <div
          ref={ref}
          data-slot="popover-content"
          className={cn(
            "absolute top-full mt-2 z-50 w-72 rounded-md border bg-white p-4 shadow-md animate-fade-in",
            alignClasses[align],
            className
          )}
          style={{ marginTop: sideOffset }}
          {...props}
        />
      </div>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

interface PopoverAnchorProps extends React.HTMLAttributes<HTMLDivElement> {}

const PopoverAnchor = React.forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="popover-anchor"
        className={cn("", className)}
        {...props}
      />
    );
  }
);
PopoverAnchor.displayName = "PopoverAnchor";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
