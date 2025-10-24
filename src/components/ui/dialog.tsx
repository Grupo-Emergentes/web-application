"use client";

import * as React from "react";
import { cn } from "./utils";

// Simplified Dialog component without Radix dependencies
interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({ open: false, onOpenChange: () => {} });



const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ children, open, defaultOpen = false, onOpenChange, ...props }, ref) => {
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
      <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div 
          ref={ref} 
          data-state={isOpen ? "open" : "closed"}
          data-slot="dialog"
          {...props}
        >
          {children}
        </div>
      </DialogContext.Provider>
    );
  }
);
Dialog.displayName = "Dialog";

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, asChild, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(DialogContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-slot="dialog-trigger"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={cn("", className)}
        {...props}
      />
    );
  }
);
DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = ({ children, ...props }: { children: React.ReactNode }) => {
  return <div data-slot="dialog-portal" {...props}>{children}</div>;
};

interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-slot="dialog-close"
        onClick={() => onOpenChange(false)}
        className={cn("", className)}
        {...props}
      />
    );
  }
);
DialogClose.displayName = "DialogClose";

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onClick, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
});
DialogOverlay.displayName = "DialogOverlay";

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, onClose, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(DialogContext);
    
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
      <DialogPortal>
        <DialogOverlay 
          onClick={handleClose}
          className="animate-fade-in"
        />
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-slot="dialog-content"
          className={cn(
            "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg sm:max-w-lg animate-fade-in",
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
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
});
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
});
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
});
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="dialog-description"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal
};
