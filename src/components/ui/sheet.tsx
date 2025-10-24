"use client";

import * as React from "react";
import { cn } from "./utils";

// Simplified Sheet component without Radix dependencies
interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const SheetContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({ open: false, onOpenChange: () => {} });

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ children, className, open, defaultOpen = false, onOpenChange, ...props }, ref) => {
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
      <SheetContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-slot="sheet"
          className={cn("", className)}
          {...props}
        >
          {children}
        </div>
      </SheetContext.Provider>
    );
  }
);
Sheet.displayName = "Sheet";

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(SheetContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-slot="sheet-trigger"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={cn("", className)}
        {...props}
      />
    );
  }
);
SheetTrigger.displayName = "SheetTrigger";

interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(SheetContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-slot="sheet-close"
        onClick={() => onOpenChange(false)}
        className={cn("", className)}
        {...props}
      />
    );
  }
);
SheetClose.displayName = "SheetClose";

const SheetPortal: React.FC<React.PropsWithChildren<{}>> = ({ 
  children 
}) => {
  return <div data-slot="sheet-portal">{children}</div>;
};

const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onClick, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
});
SheetOverlay.displayName = "SheetOverlay";

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  onClose?: () => void;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = "right", onClose, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(SheetContext);
    
    const sideClasses = {
      right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:max-w-sm",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 sm:max-w-sm",
      top: "inset-x-0 top-0 h-auto border-b data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
      bottom: "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
    };

    if (!open) return null;

    // Use onOpenChange from context or the prop onClose
    const handleClose = () => {
      if (onClose) {
        onClose();
      } else {
        onOpenChange(false);
      }
    };

    return (
      <SheetPortal>
        <SheetOverlay 
          onClick={handleClose}
          className="animate-fade-in" 
        />
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-slot="sheet-content"
          className={cn(
            "fixed z-50 flex flex-col gap-4 bg-white shadow-lg transition-transform duration-300 ease-in-out",
            side === "right" ? "animate-slide-in-from-right" : 
            side === "left" ? "animate-slide-in-from-left" :
            side === "top" ? "animate-slide-in-from-top" :
            "animate-slide-in-from-bottom",
            sideClasses[side],
            className
          )}
          {...props}
        >
          {children}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = "SheetContent";

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
});
SheetHeader.displayName = "SheetHeader";

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
});
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      data-slot="sheet-title"
      className={cn("font-semibold", className)}
      {...props}
    />
  );
});
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="sheet-description"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
