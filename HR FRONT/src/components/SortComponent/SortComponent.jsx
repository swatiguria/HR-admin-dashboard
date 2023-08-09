import React from "react";
import Select, { components } from "react-select";

const SortComponent = ({ options, placeholder, sortHandler, setPageOnChange, icon, value }) => {
  const DropdownIcon = () => {
    return <img src={icon} alt="dropDownIcon" />;
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropdownIcon />
      </components.DropdownIndicator>
    );
  };
  return (
    <>
      <Select
        className="w-full h-full font-semibold flex items-center justify-center  text-indigo-950"
        components={{ DropdownIndicator }}
        placeholder={placeholder}
        onChange={(selectedOption) => {
          sortHandler(selectedOption.value)
          setPageOnChange()
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            background: "transparent",
            color: "white !important",
            outline: "none !important"
          }),
        }}
        options={options}
        value={value}
      />
    </>
  );
};

export default SortComponent;