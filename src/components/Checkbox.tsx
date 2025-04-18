import { ChangeEventHandler, InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

type CheckboxVariants = {
  state: keyof typeof checkboxStyles;
};

const checkboxStyles = {
  checked: "bg-primary-400",
  unchecked: "bg-white",
};

const baseStyles = "w-3.5 h-3.5 inline-block";

const generateCheckboxClasses = ({ state }: CheckboxVariants) => {
  return `${baseStyles} ${checkboxStyles[state]}`;
};

const Checkbox = ({ label, checked, id, ...props }: CheckboxProps) => {
  const checkboxClasses = generateCheckboxClasses({
    state: checked ? "checked" : "unchecked",
  });

  return (
    <label htmlFor={id} className="inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className="sr-only"
        {...props}
      />
      <span className={checkboxClasses}></span>
      {label && <span className="ml-2">{label}</span>}
    </label>
  );
};

export default Checkbox;
