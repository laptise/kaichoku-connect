import { Autocomplete, AutocompleteRenderOptionState, createFilterOptions, TextField } from "@mui/material";

interface DymaicSearcherProps<T> {
  searchTarget: OptionType<T>[];
  valueState: State<OptionType<T> | null>;
  label: string;
  labelKey: keyof OptionType<T>;
  buildNewData?: (value: string) => OptionType<T>;
  addNewLabel?: (value: string) => OptionType<T>;
  disabled?: boolean;
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T, state: AutocompleteRenderOptionState) => React.ReactNode;
}

export const DynamicSearcher = <T,>({
  addNewLabel,
  searchTarget: srcArr,
  valueState,
  label,
  labelKey,
  buildNewData,
  disabled,
  renderOption: userRenderOption,
}: DymaicSearcherProps<T>) => {
  const filter = createFilterOptions<OptionType<T>>();
  const [value, setValue] = valueState;

  const renderOption: (props: React.HTMLAttributes<HTMLLIElement>, option: any, state: AutocompleteRenderOptionState) => React.ReactNode = (
    props,
    option,
    state
  ) => (userRenderOption ? userRenderOption(props, option, state) : <li {...props}>{option[labelKey] as any}</li>);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          if (buildNewData) setValue(buildNewData(newValue));
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          if (buildNewData) setValue(buildNewData(newValue.inputValue));
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option[labelKey]);
        if (addNewLabel && inputValue !== "" && !isExisting) {
          filtered.push(addNewLabel(inputValue));
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={srcArr}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return String(option[labelKey]);
      }}
      disabled={disabled || false}
      renderOption={renderOption}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
