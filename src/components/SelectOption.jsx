import React from "react";
import Select from "react-select/dist/declarations/src/Select";
import { primaryColor } from "../constant/constant";

//"rgba(63, 65, 26, 1)"
const changeColorOpacity = (color, opacity) => {
  color = color.split(",");
  color[color.length - 1] = opacity + ")";
  color = color.join(",");
  console.log(color);
  return color;
};

const SelectOption = ({ options }) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select bg-red-500"
      defaultValue={options[0]}
      isSearchable={true}
      name="color"
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: primaryColor,
          primary25: changeColorOpacity(primaryColor, 0.5),
          neutral80: primaryColor,
        },
      })}
    />
  );
};

export default SelectOption;
