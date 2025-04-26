import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";

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
  primary: "bg-primary-300 text-white hover:bg-primary-400",
  secondary: "bg-white text-primary-400 hover:bg-primary-100",
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "large", ...props }, ref) => {
    const buttonClasses = generateButtonClasses({ variant, size });

    return (
      <button className={buttonClasses} {...props} ref={ref}>
        {children}
      </button>
    );
  }
);

export default Button;
