import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

import { Spinner } from "@/components/ui/spinner";
import { Button as ButtonAria, PressEvent } from 'react-aria-components';

const buttonVariants = cva(
  "h-[30px] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md  font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "framer-button-primary",
        destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500  focus:bg-red-600",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "framer-button-secondary",
        ghost: " w-fit  bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[30px] rounded-lg ",
        sm: "h-[28px] rounded-md px-3",
        lg: "h-[32px] rounded-md px-8",
        icon: "h-[30px] w-[30px] shrink-0 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  onClick?: ((e: PressEvent) => void) | undefined;
  asChild?: boolean;
  isPending?: boolean;
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  onPress?: ((e: PressEvent) => void) | undefined;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, asChild = false, onClick, isPending, children, ...props }, ref) => {

    if (asChild) {
      return <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    }

    return (
      <ButtonAria
        className={cn(buttonVariants({ variant, size, className }))}
        isDisabled={isPending || props.isDisabled}
        onPress={onClick || props.onPress}
        ref={ref}
        {...props}
      >
        {isPending ? <Spinner /> : children}
      </ButtonAria>
    );
  }
);

Button.displayName = "Button"

export { Button }