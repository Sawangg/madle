import { useEffect, useState } from "react";
import type { Dictionary } from "@public/locales/dictionary";
import { Button } from "@ui/Button";

type FormProps = {
  dictionary: Dictionary;
  selectedItem: Record<string, string>;
  closeForm: () => void;
};

export default function CompletePreviewForm({ dictionary, selectedItem, closeForm }: Readonly<FormProps>) {
  const statusMapping = {
    Pending: "pending",
    "In progress": "inprogress",
    Ended: "ended",
  } as Record<string, string>;

  const [status, setStatus] = useState(statusMapping[selectedItem.status]);

  useEffect(() => {
    setStatus(statusMapping[selectedItem.status]);
    // IMPORTANT: Do not add another dependency to this array as it will break the status change on the select
    // Next line is here to avoid the warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem.status]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const updateStatus = (id: string, status: string) => async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const statusValue = Object.keys(statusMapping).find((key) => statusMapping[key] === status) ?? "";
    const requestBody = { id: id.toString(), status: statusValue.toString() };
    const res = await fetch("/api/internships/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (res.status === 200) {
      closeForm();
      location.reload();
    } else {
      console.log("Error, status code: ", res.status);
    }
  };

  return (
    <div className="mt-3 bg-gray-50">
      <form className="rounded border bg-gray-50 p-4" onSubmit={updateStatus(selectedItem.id, status)}>
        <h2 className="font-bold">{dictionary.previewform.title}</h2>
        <section className="flex flex-col justify-center">
          <div className="flex flex-col p-2">
            <label htmlFor="status">{dictionary.adm.form.name}</label>
            <input type="text" id="name" className="border p-2" value={selectedItem.student} disabled />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="status">{dictionary.adm.form.status}</label>
            <select id="status" name="status" value={status} onChange={handleStatusChange} className="border p-2">
              <option value={statusMapping.Pending}>{dictionary.adm.form.pending}</option>
              <option value={statusMapping["In progress"]}>{dictionary.adm.form.inprogress}</option>
              <option value={statusMapping.Ended}>{dictionary.adm.form.ended}</option>
            </select>
          </div>
        </section>
        <section className="flex justify-evenly">
          <button onClick={closeForm} className="rounded bg-blue-900 p-3 text-center text-white">
            {dictionary.previewform.close}
          </button>
          <Button type="submit" color="blue">
            {dictionary.previewform.save}
          </Button>
        </section>
      </form>
    </div>
  );
}
