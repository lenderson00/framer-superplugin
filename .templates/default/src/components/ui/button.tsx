import { cn } from "../../lib/utils";
import { Spinner } from "./spinner";
import { Button as ButtonAria } from 'react-aria-components';
import { ButtonProps } from 'react-aria-components';

interface Props extends Omit<ButtonProps, 'isDisabled'> {
  variant?: "primary" | "secondary" | "destructive";
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...rest
}: Props) => (
  <ButtonAria
    className={cn(`framer-button-${variant}`, className)}
    {...rest}
  >
    {rest.isPending ? (
      <Spinner />
    ) : (
      children
    )}
  </ButtonAria>
);
