"use client";

import { useState } from "react";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import AdminPreviewForm from "@src/app/modules/AdminPreviewForm";
import CompletePreviewForm from "@src/app/modules/CompletePreviewForm";
import { Button } from "@ui/Button";

type CustomTableProps = {
  columns: Record<string, string>;
  data: Record<string, string>[];
  lang: Locale;
  previewEditable?: boolean;
  adminPage?: boolean;
};

export async function CustomTable({ columns, data, lang, previewEditable, adminPage }: Readonly<CustomTableProps>) {
  const dictionary = await getDictionary(lang);

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
                    {item[columnKey]}
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

      {isFormOpen && selectedItem && !adminPage && (
        <CompletePreviewForm
          lang={lang}
          selectedItem={selectedItem}
          columns={columns}
          closeForm={closeForm}
          handleInputChange={handleInputChange}
          previewEditable={previewEditable}
        />
      )}
      {isFormOpen && adminPage && selectedItem && (
        <AdminPreviewForm lang={lang} selectedItem={selectedItem} closeForm={closeForm} />
      )}
    </div>
  );
}
