import { ChangeEventHandler, forwardRef, InputHTMLAttributes } from "react";

type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  label: string;
  id: string;
};

type ControlledInput = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: never;
};

type UncontrolledInput = {
  value?: never;
  onChange?: never;
  defaultValue?: string;
};

type InputProps = BaseInputProps & (ControlledInput | UncontrolledInput);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          type={type}
          className="border-1 border-primary-300 p-1 rounded-sm focus:border-primary-500 outline-none"
          {...props}
        />
      </div>
    );
  }
);

export default Input;
