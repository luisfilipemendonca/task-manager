import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariants = "primary" | "secondary";

type ButtonSizes = "small" | "medium" | "large";

type ButtonVariantsProps = {
  variant: ButtonVariants;
  size: ButtonSizes;
};

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & Partial<ButtonVariantsProps>
>;

const variantStyles: Record<ButtonVariants, string> = {
  primary: "bg-primary-400 text-primary-100 hover:bg-primary-500",
  secondary: "bg-primary-100 text-primary-400 hover:bg-primary-200",
};

const sizeStyles: Record<ButtonSizes, string> = {
  large: "py-2 px-15",
  medium: "py-1 px-10",
  small: "py-1 px-16",
};

const baseStyles = "border border-primary-400 rounded-sm cursor-pointer";

const generateButtonClasses = ({ variant, size }: ButtonVariantsProps) => {
  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
};

const Button = ({
  children,
  variant = "primary",
  size = "large",
}: ButtonProps) => {
  const buttonClasses = generateButtonClasses({ variant, size });

  return <button className={buttonClasses}>{children}</button>;
};

export default Button;
