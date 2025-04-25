import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export type SelectApi = {
  getSelectedOption: () => void;
};

type OptionProps<T> = {
  id: string;
  value: string;
  label: string;
  params?: T;
};

type ControledSelectProps<T> = {
  onSelect: (option: OptionProps<T>) => void;
  selectApiRef?: never;
};

type UncontroledSelectProps = {
  onSelect?: never;
  selectApiRef: RefObject<SelectApi | null>;
};

type SelectProps<T> = {
  label: string;
  id: string;
  selectedOption?: OptionProps<T>;
  options: OptionProps<T>[];
  renderOption?: ({
    option,
    selectedOption,
  }: RenderOptionProps<T>) => ReactNode;
} & (ControledSelectProps<T> | UncontroledSelectProps);

type RenderOptionProps<T> = {
  option: OptionProps<T>;
  selectedOption: OptionProps<T> | null;
};

type OptionStates = "normal" | "focused" | "selected";

const optionStyles: Record<OptionStates, string> = {
  normal: "hover:bg-primary-100",
  selected: "bg-primary-300 text-white",
  focused: "outline-1 outline-primary-500 outline-offset-1",
};

const isControlledInput = <T,>(
  onSelect: ControledSelectProps<T>["onSelect"] | undefined
) => {
  return typeof onSelect !== "undefined" && typeof onSelect === "function";
};

const generateOptionStyles = (state: OptionStates) => {
  return optionStyles[state];
};

const Select = <T,>({
  label,
  id,
  options,
  renderOption,
  selectApiRef,
  selectedOption,
  onSelect,
}: SelectProps<T>) => {
  const defaultSelectedOption = useMemo(() => {
    if (!selectedOption) return null;

    return options.find((option) => option.id === selectedOption.id) ?? null;
  }, [options, selectedOption]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState(
    defaultSelectedOption?.value ?? ""
  );
  const [currentSelectedOption, setCurrentSelectedOption] =
    useState<OptionProps<T> | null>(defaultSelectedOption);
  const [focusedOption, setFocusedOption] = useState(-1);

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const onSelectOptionHandler = (option: OptionProps<T>, index: number) => {
    setIsExpanded(false);
    setFocusedOption(index);

    if (isControlledInput(onSelect)) {
      onSelect(option);
    } else {
      setCurrentSelectedOption(option);
      setInputValue(option.value);
    }
  };

  const onKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setIsExpanded(true);
      setFocusedOption((prevState) =>
        prevState === options.length - 1 ? 0 : prevState + 1
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setIsExpanded(true);
      setFocusedOption((prevState) =>
        prevState <= 0 ? options.length - 1 : prevState - 1
      );
    }

    if (e.key === "Escape" || e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      setIsExpanded(false);
    }
  };

  useImperativeHandle(selectApiRef, () => ({
    getSelectedOption: () => currentSelectedOption,
  }));

  return (
    <div className="flex flex-col items-start">
      <label htmlFor={id}>{label}</label>
      <div className="w-full relative">
        <div className="border-1 border-primary-300 rounded-sm flex">
          <input
            id={id}
            ref={inputRef}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isExpanded}
            aria-controls={`${id}-controls`}
            className="h-8 outline-none px-2 flex-1"
            value={inputValue}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeydownHandler}
            autoComplete="off"
          />
          <button
            tabIndex={-1}
            aria-expanded={isExpanded}
            aria-controls={`${id}-controls`}
            className="h-8 w-8"
          >
            t
          </button>
        </div>
        {isExpanded && (
          <ul
            id={`${id}-controls`}
            role="listbox"
            className="shadow-sm shadow-primary-300 mt-1 py-1 absolute top-100% w-full bg-white z-1 overflow-auto max-h-48"
          >
            {filteredOptions.map((option, index) => {
              const isFocused = focusedOption === index;
              const isSelected = currentSelectedOption?.id === option.id;

              const optionClasses = generateOptionStyles(
                isSelected ? "selected" : isFocused ? "focused" : "normal"
              );

              return (
                <li
                  role="option"
                  onClick={() => onSelectOptionHandler(option, index)}
                  key={option.id}
                >
                  {renderOption && typeof renderOption === "function" ? (
                    renderOption({
                      option,
                      selectedOption: currentSelectedOption,
                    })
                  ) : (
                    <span
                      className={`px-4 block py-1 cursor-pointer ${optionClasses}`}
                    >
                      {option.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
