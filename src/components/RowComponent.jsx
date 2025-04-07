import React from "react";
import RowActions from "./RowActions";

const RowComponent = ({ row }) => {
  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td className="p-2">{Number(row.value).toFixed(2)}</td>
        <RowActions rowId={row.id} variance={row.variance} />
      </tr>
      {row.children?.map((child, index) => (
        <tr key={index}>
          <td className="p-2">{`-- ${child.label}`}</td>
          <td>{Number(child.value).toFixed(2)}</td>
          <RowActions rowId={child.id} variance={child.variance} />
        </tr>
      ))}
    </>
  );
};

export default RowComponent;
