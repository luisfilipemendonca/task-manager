import { TextareaHTMLAttributes } from "react";

type TextareaVariants = "small" | "medium" | "large";

type TextareaVariantsProps = {
  size: TextareaVariants;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
} & Partial<TextareaVariantsProps>;

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

const Textarea = ({ label, id, size = "medium", ...props }: TextareaProps) => {
  const textareaClasses = generateTextareaStyles({ size });

  return (
    <div className="flex flex-col items-start">
      <label htmlFor={id}>{label}</label>
      <textarea className={textareaClasses} id={id} {...props}></textarea>
    </div>
  );
};

export default Textarea;
