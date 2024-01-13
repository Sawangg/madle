import type React from "react";

type CustomTableProps = {
  columns: string[];
  data: Record<string, string>[];
};

export function CustomTable({ columns, data }: CustomTableProps) {
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
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="text-center">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
