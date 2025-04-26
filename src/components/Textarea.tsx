import { ChangeEventHandler, forwardRef, TextareaHTMLAttributes } from "react";

type TextareaVariants = "small" | "medium" | "large";

type TextareaVariantsProps = {
  size: TextareaVariants;
};

type BaseTextareaProps = {
  label: string;
  id: string;
};

type ControlledTextarea = BaseTextareaProps & {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  defaultValue?: never;
};

type UncontrolledTextarea = BaseTextareaProps & {
  value?: never;
  onChange?: never;
  defaultValue?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  (ControlledTextarea | UncontrolledTextarea) &
  Partial<TextareaVariantsProps>;

const baseStyles =
  "w-full border-1 border-primary-300 rounded-sm resize-none p-2";

const sizeVariants: Record<TextareaVariants, string> = {
  small: "h-16",
  medium: "h-24",
  large: "h-32",
};

const generateTextareaStyles = ({ size }: TextareaVariantsProps) => {
  return `${baseStyles} ${sizeVariants[size]}`;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, size = "medium", ...props }, ref) => {
    const textareaClasses = generateTextareaStyles({ size });

    return (
      <div className="flex flex-col items-start">
        <label htmlFor={id}>{label}</label>
        <textarea
          ref={ref}
          className={textareaClasses}
          id={id}
          {...props}
        ></textarea>
      </div>
    );
  }
);

export default Textarea;
