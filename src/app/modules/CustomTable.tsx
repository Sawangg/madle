"use client";

import React, { useState } from "react";
import type { Dictionary } from "@public/locales/dictionary";
import AdminPreviewForm from "@src/app/modules/AdminPreviewForm";
import CompletePreviewForm from "@src/app/modules/CompletePreviewForm";

type CustomTableProps = {
  columns: string[];
  data: Record<string, string>[];
  dictionary: Dictionary;
  previewEditable?: boolean;
  adminPage?: boolean;
};

export function CustomTable({ columns, data, dictionary, previewEditable, adminPage }: Readonly<CustomTableProps>) {
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

  function handleInputChange(index: number, value: string) {
    if (selectedItem) {
      const keys = Object.keys(selectedItem);
      const newSelectedItem = { ...selectedItem, [keys[index]]: value };
      setSelectedItem(newSelectedItem);
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
            <th className="border p-2">
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {dictionary.customtable.preview}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            const values = Object.values(item);
            return (
              <tr key={rowIndex} className="text-center">
                {values.map((value, columnIndex) => (
                  <td key={columnIndex} className="border p-2">
                    {value}
                  </td>
                ))}
                <td className="border p-2">
                  <button
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    onClick={() => openForm(item)}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    {dictionary.customtable.seemore}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isFormOpen && selectedItem && !adminPage && (
        <CompletePreviewForm
          dictionary={dictionary}
          selectedItem={selectedItem}
          columns={columns}
          closeForm={closeForm}
          handleInputChange={handleInputChange}
          previewEditable={previewEditable}
        />
      )}
      {isFormOpen && adminPage && selectedItem && (
        <AdminPreviewForm dictionary={dictionary} selectedItem={selectedItem} closeForm={closeForm} />
      )}
    </div>
  );
}
