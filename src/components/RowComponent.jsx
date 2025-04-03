// RowComponent.js
import React, { Fragment } from "react";
import RowActions from "./RowActions";

const RowComponent = ({
  row,
  inputValue,
  onInputChange,
  onPercentageChange,
  onValueChange,
}) => {
  return (
    <Fragment>
      <tr className="">
        <td className="p-2 ">{row.label}</td>
        <td>{row.value}</td>
        <RowActions
          rowId={row.id}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onPercentageChange={onPercentageChange}
          onValueChange={onValueChange}
          variance={row.variance}
        />
      </tr>
      {row.children?.map((child, index) => (
        <tr key={index} className="">
          <td className="p-2 ">{`-- ${child.label}`}</td>
          <td className="">{child.value}</td>
          <RowActions
            rowId={child.id}
            inputValue={inputValue}
            onInputChange={onInputChange}
            onPercentageChange={onPercentageChange}
            onValueChange={onValueChange}
            variance={child.variance}
          />
        </tr>
      ))}
    </Fragment>
  );
};

export default RowComponent;
