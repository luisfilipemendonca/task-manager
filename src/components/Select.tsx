import {
  KeyboardEvent,
  ReactNode,
  Ref,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export type SelectApi<T> = {
  getSelectedOption: () => T | null;
};

export type OptionProps<T> = {
  id: string;
  value: string;
  label: string;
  disabled?: true;
  params?: T;
};

type ControlledSelectProps<T> = {
  selectApiRef?: never;
  onSelect: (option: T | null) => void;
};

type UncontrolledSelectProps<T> = {
  onSelect?: never;
  selectApiRef: RefObject<T | null>;
};

type BaseSelectProps<T> = {
  label: string;
  id: string;
  options: OptionProps<T>[];
};

type NormalSelectProps<T> = {
  type?: "normal";
  defaultValue?: OptionProps<T>;
  renderOption?: ({
    option,
    selectedOption,
  }: RenderOptionProps<T>) => ReactNode;
} & BaseSelectProps<T>;

type MultipleSelectProps<T> = {
  type: "multiple";
  defaultValue?: OptionProps<T>[];
  renderOption?: ({
    option,
    selectedOptions,
  }: RenderOptionMultipleProps<T>) => ReactNode;
} & BaseSelectProps<T>;

type SelectProps<T> =
  | (NormalSelectProps<T> & ControlledSelectProps<OptionProps<T>>)
  | (NormalSelectProps<T> & UncontrolledSelectProps<SelectApi<OptionProps<T>>>)
  | (MultipleSelectProps<T> & ControlledSelectProps<OptionProps<T>[]>)
  | (MultipleSelectProps<T> &
      UncontrolledSelectProps<SelectApi<OptionProps<T>[]>>);

type BaseRenderOption<T> = {
  option: OptionProps<T>;
};

type RenderOptionProps<T> = {
  selectedOption: OptionProps<T> | null;
} & BaseRenderOption<T>;

type RenderOptionMultipleProps<T> = {
  selectedOptions: OptionProps<T>[] | null;
} & BaseRenderOption<T>;

type OptionStates = "normal" | "focused" | "selected" | "disabled";

const baseOptionStyles = "px-4 block py-1";

const optionStyles: Record<OptionStates, string> = {
  normal: "hover:bg-primary-100 cursor-pointer",
  selected: "bg-primary-300 text-white cursor-pointer",
  focused: "outline-1 outline-primary-500 outline-offset-1 cursor-pointer",
  disabled: "text-gray-500 cursor-auto",
};

const isControlledSelect = <T,>(
  props: SelectProps<T>
): props is
  | (NormalSelectProps<T> & ControlledSelectProps<OptionProps<T>>)
  | (MultipleSelectProps<T> & ControlledSelectProps<OptionProps<T>[]>) => {
  return typeof props.onSelect === "function";
};

const isMultipleSelect = <T,>(
  props: SelectProps<T>
): props is
  | (MultipleSelectProps<T> & ControlledSelectProps<OptionProps<T>[]>)
  | (MultipleSelectProps<T> &
      UncontrolledSelectProps<SelectApi<OptionProps<T>[]>>) => {
  return props.type === "multiple";
};

const generateOptionStyles = (state: OptionStates) => {
  return `${baseOptionStyles} ${optionStyles[state]}`;
};

const Select = <T,>(props: SelectProps<T>) => {
  const selectedOptions = useMemo(() => {
    if (!props.defaultValue) return [];

    const values = [];

    if (isMultipleSelect(props)) {
      props.defaultValue?.forEach((defaultOption) => {
        if (props.options.find((option) => option.id === defaultOption.id)) {
          values.push(defaultOption);
        }
      });
    } else {
      if (
        props.options.find((option) => option.id === props.defaultValue?.id)
      ) {
        values.push(props.defaultValue);
      }
    }

    return values;
  }, [props]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentSelectedOption, setCurrentSelectedOption] =
    useState<OptionProps<T>[]>(selectedOptions);
  const [focusedOption, setFocusedOption] = useState(-1);

  const filteredOptions = props.options.filter((option) =>
    option.value.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const onCleanHandler = () => {
    setInputValue("");

    if (isControlledSelect(props)) {
      props.onSelect(null);
    } else {
      setCurrentSelectedOption([]);
    }
  };

  const onSelectOptionHandler = (option: OptionProps<T>, index: number) => {
    if (option.disabled) return;

    setIsExpanded(false);
    setFocusedOption(index);

    if (isControlledSelect(props)) {
      if (isMultipleSelect(props)) {
        props.onSelect([...currentSelectedOption, option]);
      } else {
        props.onSelect(option);
      }
    } else {
      if (isMultipleSelect(props)) {
        setCurrentSelectedOption((prevState) => [...prevState, option]);
      } else {
        setCurrentSelectedOption([option]);
      }

      setInputValue(option.value);
    }
  };

  const onKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setIsExpanded(true);
      setFocusedOption((prevState) =>
        prevState === props.options.length - 1 ? 0 : prevState + 1
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setIsExpanded(true);
      setFocusedOption((prevState) =>
        prevState <= 0 ? props.options.length - 1 : prevState - 1
      );
    }

    if (e.key === "Escape" || e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      setIsExpanded(false);
    }
  };

  const api = isMultipleSelect(props)
    ? ({
        getSelectedOption: () =>
          currentSelectedOption.length ? currentSelectedOption : null,
      } as SelectApi<OptionProps<T>[]>)
    : ({
        getSelectedOption: () => currentSelectedOption?.[0] ?? null,
      } as SelectApi<OptionProps<T>>);

  useImperativeHandle(
    props.selectApiRef as Ref<
      SelectApi<OptionProps<T>> | SelectApi<OptionProps<T>[]>
    >,
    () => api
  );

  return (
    <div className="flex flex-col items-start">
      <label htmlFor={props.id}>{props.label}</label>
      <div className="w-full relative">
        <div className="border-1 border-primary-300 rounded-sm flex">
          <div className="flex-1 flex">
            <input
              id={props.id}
              ref={inputRef}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={isExpanded}
              aria-controls={`${props.id}-controls`}
              className="h-8 outline-none px-2 flex-1"
              value={inputValue}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeydownHandler}
              autoComplete="off"
            />
            {/* <div className="flex-1">{inputValue}</div> */}
          </div>
          <div className="flex">
            {isMultipleSelect(props) ? null : (
              <button
                onClick={onCleanHandler}
                className="h-8 w-8 cursor-pointer"
              >
                c
              </button>
            )}
            <span className="w-[1px] bg-primary-300 h-full block"></span>
            <button
              tabIndex={-1}
              aria-expanded={isExpanded}
              aria-controls={`${props.id}-controls`}
              className="h-8 w-8 cursor-pointer"
            >
              t
            </button>
          </div>
        </div>
        {isExpanded && (
          <ul
            id={`${props.id}-controls`}
            role="listbox"
            className="shadow-sm shadow-primary-300 mt-1 py-1 absolute top-100% w-full bg-white z-1 overflow-auto max-h-48"
          >
            {filteredOptions.map((option, index) => {
              const isFocused = focusedOption === index;
              const isSelected = currentSelectedOption.includes(option);
              const isDisabled = option?.disabled;

              const optionClasses = generateOptionStyles(
                isDisabled
                  ? "disabled"
                  : isSelected
                  ? "selected"
                  : isFocused
                  ? "focused"
                  : "normal"
              );

              return (
                <li
                  role="option"
                  onClick={() => onSelectOptionHandler(option, index)}
                  key={option.id}
                >
                  {props.renderOption &&
                  typeof props.renderOption === "function" ? (
                    isMultipleSelect(props) ? (
                      props.renderOption({
                        option,
                        selectedOptions: currentSelectedOption.length
                          ? currentSelectedOption
                          : null,
                      })
                    ) : (
                      props.renderOption({
                        option,
                        selectedOption: currentSelectedOption?.[0] ?? null,
                      })
                    )
                  ) : (
                    <span className={` ${optionClasses}`}>{option.label}</span>
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
