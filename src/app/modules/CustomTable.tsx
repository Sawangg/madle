"use client";

import React, { useState } from "react";
import { Button } from "@ui/Button";

type CustomTableProps = {
  columns: string[];
  data: Record<string, string>[];
};

export function CustomTable({ columns, data }: CustomTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Record<string, string> | null>(null);

  const openForm = (item: Record<string, string>) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedItem(null);
    setIsFormOpen(false);
  };

  function handleInputChange(column: string, value: string) {
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, [column]: value });
    }
  }

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
            <th className="border p-2">Preview</th>
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
              <td className="border p-2">
                <button
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() => openForm(item)}
                >
                  See more
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && selectedItem && (
        <div className={"mt-3 bg-gray-50"}>
          <form className={"rounded border bg-gray-50 p-4"}>
            <h2 className={"font-bold"}>Information about student</h2>
            <section className={"flex flex-col justify-center"}>
              {columns.map((column, index) => (
                <div key={index} className="flex flex-col p-2">
                  <label htmlFor={`input-${index}`}>{column}</label>
                  <input
                    type="text"
                    id={`input-${index}`}
                    className="border p-2"
                    value={selectedItem[column]}
                    onChange={(e) => handleInputChange(column, e.target.value)} // Add onChange handler if needed
                  />
                </div>
              ))}
            </section>
            <section className={"flex justify-evenly"}>
              <button onClick={closeForm} className={"rounded bg-blue-900 p-3 text-center text-white"}>
                Close Form
              </button>
              <Button type="submit" color={"blue"}>
                Save
              </Button>
            </section>
          </form>
        </div>
      )}
    </div>
  );
}
