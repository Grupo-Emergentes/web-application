"use client";

import * as React from "react";
import { cn } from "./utils";

// Simplified Dropdown Menu component without Radix dependencies
interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const DropdownMenuContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({ open: false, onOpenChange: () => {} });

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
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
      <DropdownMenuContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div 
          ref={ref} 
          data-state={isOpen ? "open" : "closed"}
          data-slot="dropdown-menu" 
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuPortal: React.FC<React.PropsWithChildren<{}>> = ({ 
  children 
}) => {
  return <div data-slot="dropdown-menu-portal">{children}</div>;
};

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(DropdownMenuContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-state={open ? "open" : "closed"}
        data-slot="dropdown-menu-trigger"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={cn("", className)}
        {...props}
      />
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, sideOffset = 4, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(DropdownMenuContext);
    
    if (!open) return null;

    return (
      <DropdownMenuPortal>
        <div 
          className="fixed inset-0 z-40"
          onClick={() => onOpenChange(false)} 
        />
        <div
          ref={ref}
          data-slot="dropdown-menu-content"
          data-state={open ? "open" : "closed"}
          style={{ marginTop: sideOffset }}
          className={cn(
            "absolute top-full z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md animate-fade-in",
            className
          )}
          {...props}
        />
      </DropdownMenuPortal>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuGroup = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-group"
        className={cn("", className)}
        {...props}
      />
    );
  }
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-item"
        data-inset={inset}
        data-variant={variant}
        className={cn(
          "relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8",
          variant === "destructive" && "text-red-600 hover:bg-red-50",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        data-slot="dropdown-menu-checkbox-item"
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm select-none hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </span>
        {children}
      </div>
    );
  }
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

interface DropdownMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <DropdownMenuRadioContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          role="radiogroup"
          data-slot="dropdown-menu-radio-group"
          className={cn("", className)}
          {...props}
        />
      </DropdownMenuRadioContext.Provider>
    );
  }
);
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

interface DropdownMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

// Creamos un contexto específico para usar en los componentes de radio
const DropdownMenuRadioContext = React.createContext<{ 
  value?: string; 
  onValueChange?: (value: string) => void 
}>({ value: undefined });

const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, children, value, ...props }, ref) => {
    // Usamos el contexto específico en lugar de crear uno nuevo
    const radioGroup = React.useContext(DropdownMenuRadioContext);
    const isSelected = radioGroup?.value === value;

    return (
      <div
        ref={ref}
        role="menuitemradio"
        data-slot="dropdown-menu-radio-item"
        data-state={isSelected ? "checked" : "unchecked"}
        className={cn(
          "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm select-none hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        onClick={() => radioGroup?.onValueChange?.(value)}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" fill="currentColor"></circle>
            </svg>
          )}
        </span>
        {children}
      </div>
    );
  }
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-label"
        data-inset={inset}
        className={cn(
          "px-2 py-1.5 text-sm font-medium text-slate-900 data-[inset]:pl-8",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-slate-200", className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs text-slate-500 tracking-widest", className)}
      {...props}
    />
  );
});
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

interface DropdownMenuSubProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenuSub = React.forwardRef<HTMLDivElement, DropdownMenuSubProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-sub"
        className={cn("relative", className)}
        {...props}
      />
    );
  }
);
DropdownMenuSub.displayName = "DropdownMenuSub";

interface DropdownMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-sub-trigger"
        data-inset={inset}
        className={cn(
          "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm select-none hover:bg-slate-100 focus:bg-slate-100 data-[state=open]:bg-slate-100 data-[inset]:pl-8",
          className
        )}
        {...props}
      >
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    );
  }
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

interface DropdownMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
