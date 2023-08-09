import React from "react";
import dropDownIcon from "../../assets/addEmployee/arrow_drop_down.svg";
import Select, { components } from "react-select";
import './styles.scss'

const SelectComponent = ({ options, placeholder, onChange, value }) => {
  const DropdownIcon = () => {
    return <img src={dropDownIcon} alt="dropDownIcon" />;
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
        className="w-full font-thin  text-indigo-950"
        components={{ DropdownIndicator }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            background: "transparent",
            color: "white !important"
          }),
        }}
        options={options}
      />
    </>
  );
};

export default SelectComponent;
