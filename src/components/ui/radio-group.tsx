"use client";

import * as React from "react";
import { cn } from "./utils";

// Simplified RadioGroup component without Radix dependencies
interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(defaultValue || value || "");

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleValueChange = (newValue: string) => {
      setSelectedValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
        <div
          ref={ref}
          data-slot="radio-group"
          role="radiogroup"
          className={cn("grid gap-3", className)}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    // Corregido para usar un valor por defecto cuando el contexto es undefined
    const context = React.useContext(RadioGroupContext);
    const selectedValue = context?.value;
    const onValueChange = context?.onValueChange;
    const checked = selectedValue === value;

    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="radio"
          checked={checked}
          value={value}
          onChange={() => onValueChange?.(value)}
          data-slot="radio-group-item"
          className={cn(
            "peer appearance-none h-4 w-4 rounded-full border border-gray-300 bg-white shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <div className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 opacity-0 transition-opacity",
          checked && "opacity-100"
        )} />
      </div>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
