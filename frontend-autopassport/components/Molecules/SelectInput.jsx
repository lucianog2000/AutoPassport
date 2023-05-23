import { FormControl, FormLabel, Select } from "@chakra-ui/react";

function SelectInput ({ id, label, placeholder, options, onChange }) {
  return (
    <FormControl id={id} isRequired>
      <FormLabel>{label}</FormLabel>
      <Select placeholder={placeholder} onChange={onChange}>
        {options.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
