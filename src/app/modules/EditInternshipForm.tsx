import type { Dictionary } from "@src/app/[lang]/adm/dictionary";
import { Button } from "@ui/Button";

type FormProps = {
  dictionary: Dictionary;
  name: string;
  status: string;
};

export default function EditInternshipFrom({ dictionary, name, status }: Readonly<FormProps>) {
  const statusMapping = {
    0: "pending",
    1: "inprogress",
    2: "ended",
  } as Record<number, string>;

  return (
    <form>
      {/* Company Section */}
      <div className={"mb-5 rounded border p-5"}>
        <section className={"grid grid-rows-2 gap-4"}>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"name"}>{dictionary.adm.form.name}</label>
            <input type="text" id={"name"} className={"border"} defaultValue={name} />
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"status"}>{dictionary.adm.form.status}</label>
            <select id={"status"} name="status" defaultValue={statusMapping[Number(status)]}>
              <option value={statusMapping[0]}>{dictionary.adm.form.pending}</option>
              <option value={statusMapping[1]}>{dictionary.adm.form.inprogress}</option>
              <option value={statusMapping[2]}>{dictionary.adm.form.ended}</option>
            </select>
          </div>
        </section>
      </div>

      {/* Edit Button */}
      <div className={"text-center"}>
        <Button className="w-40" type="submit">
          Edit
        </Button>
      </div>
    </form>
  );
}
