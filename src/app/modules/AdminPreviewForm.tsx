"use client";

import { useEffect, useState } from "react";
import { updateInternshipStatus } from "@actions/updateInternships";
import type { Dictionary } from "@lib/getDictionnary";
import { Button } from "@ui/Button";

type FormProps = {
  dictionary: Dictionary;
  selectedItem: Record<string, string>;
  columns: Record<string, string>;
};

export default function AdminPreviewForm({ dictionary, selectedItem, columns }: Readonly<FormProps>) {
  const updateInternshipWithId = async () => {
    const data = {
      id: selectedItem.id,
      status: status as "pending" | "inprogress" | "ended",
    };
    await updateInternshipStatus(data);
  };

  const [status, setStatus] = useState(selectedItem.status);

  useEffect(() => {
    setStatus(selectedItem.status);
    // IMPORTANT: Do not add another dependency to this array as it will break the status change on the select
    // Next line is here to avoid the warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem.status]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return (
    <div className="mt-3 bg-gray-50">
      <form className="rounded border bg-gray-50 p-4" action={updateInternshipWithId}>
        <h2 className="font-bold">{dictionary.previewform.title}</h2>
        <section className="flex flex-col justify-center">
          {Object.entries(selectedItem)
            .filter(([key]) => columns[key])
            .map(([key, value], index) => (
              <div key={index} className="flex flex-col p-2">
                <label htmlFor={`input-${index}`}>{columns[key]}</label>
                <input type="text" id={`input-${index}`} className="border p-2" value={value} disabled={true} />
              </div>
            ))}
          <div className="flex flex-col p-2">
            <label htmlFor="status">{dictionary.adm.form.status}</label>
            <select id="status" name="status" value={status} onChange={handleStatusChange} className="border p-2">
              <option value="pending">{dictionary.adm.form.pending}</option>
              <option value="inprogress">{dictionary.adm.form.inprogress}</option>
              <option value="ended">{dictionary.adm.form.ended}</option>
            </select>
          </div>
        </section>
        <section className="flex justify-evenly">
          <Button type="submit" color="blue">
            {dictionary.previewform.save}
          </Button>
        </section>
      </form>
    </div>
  );
}
