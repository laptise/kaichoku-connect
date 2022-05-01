import { Autocomplete, createFilterOptions, TextField } from "@mui/material";

interface DymaicSearcherProps<T> {
  searchTarget: OptionType<T>[];
  valueState: State<OptionType<T> | null>;
  label: string;
  labelKey: keyof OptionType<T>;
  buildNewData: (value: string) => OptionType<T>;
  addNewLabel?: (value: string) => OptionType<T>;
  disabled?: boolean;
}

export const DynamicSearcher = <T,>({
  addNewLabel,
  searchTarget: srcArr,
  valueState,
  label,
  labelKey,
  buildNewData,
  disabled,
}: DymaicSearcherProps<T>) => {
  const filter = createFilterOptions<OptionType<T>>();
  const [value, setValue] = valueState;
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue(buildNewData(newValue));
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue(buildNewData(newValue.inputValue));
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
      renderOption={(props, option) => <li {...props}>{option[labelKey] as any}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
