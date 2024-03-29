"use client";

import { useState } from "react";
import type { Dictionary } from "@lib/getDictionnary";
import CompletePreviewForm from "@src/app/modules/CompletePreviewForm";
import { Button } from "@ui/Button";

type CustomTableProps = {
  columns: Record<string, string>;
  data: Record<string, string>[];
  dictionary: Dictionary;
  previewEditable?: boolean;
};

export function CustomTable({ columns, data, dictionary, previewEditable }: Readonly<CustomTableProps>) {
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
            {Object.entries(columns).map(([_, value], index) => (
              <th key={index} className="border p-2">
                {value}
              </th>
            ))}
            <th className="border p-2">{dictionary.customtable.preview}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            return (
              <tr key={rowIndex} className="text-center">
                {Object.keys(columns).map((columnKey, columnIndex) => (
                  <td key={columnIndex} className="border p-2">
                    {columnKey == "status"
                      ? (dictionary.adm.form as Record<string, string>)[item[columnKey]]
                      : item[columnKey]}
                  </td>
                ))}
                <td className="border p-2">
                  <Button color="blue" onPress={() => openForm(item)}>
                    {dictionary.customtable.seemore}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isFormOpen && selectedItem && (
        <CompletePreviewForm
          dictionary={dictionary}
          selectedItem={selectedItem}
          columns={columns}
          closeForm={closeForm}
          handleInputChange={handleInputChange}
          previewEditable={previewEditable}
        />
      )}
    </div>
  );
}
