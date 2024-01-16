import React from "react";
import { handleClick } from "@actions/customTable/handleRowClick";

type CustomTableProps = {
  columns: string[];
  data: Record<string, string>[];
  pageRedirectOnClick?: string;
};

export function CustomTable({columns, data, pageRedirectOnClick}: Readonly<CustomTableProps>) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((column, index) => (
              <th key={index} className="border p-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            const values = Object.values(item);
            return pageRedirectOnClick ? (
              <tr key={rowIndex} className={pageRedirectOnClick ? "hover:bg-gray-50" : ""}>
                {values.map((value, columnIndex) => (
                  <td key={columnIndex} className="border p-0">
                    <form
                      action={pageRedirectOnClick ? handleClick(rowIndex, pageRedirectOnClick) : undefined}
                    >
                      <button className="w-full p-2 text-left">{value}</button>
                    </form>
                  </td>
                ))}
              </tr>
            ) : (
              <tr key={rowIndex}>
                {values.map((value, columnIndex) => (
                  <td key={columnIndex} className="border p-2">
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
