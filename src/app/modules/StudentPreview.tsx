import { TextArea } from "@src/ui/TextArea";
import { Button } from "@ui/Button";

type StudentPreviewProps = {
  studentName: string;
  studentYear: string;
};

export default function StudentPreview({ studentName, studentYear }: StudentPreviewProps) {
  return (
    <div className={"mb-5 rounded border bg-gray-50 p-5"}>
      <form>
        {/* Company Section */}
        <div className={"mt-5"}>
          <h2 className={"text-2xl font-semibold italic"}>Etudiant</h2>
          <section className={"flex flex-col pt-3"}>
            <label htmlFor={"studentName"}>{studentName}</label>
            <label htmlFor={"StudentYear"}>{studentYear}</label>
          </section>
        </div>
        {/* Contact Section */}
        <div className="mt-5">
          <h2 className={"text-2xl font-semibold italic"}>Ponctualité au travail</h2>
          <section className={"grid grid-cols-2 grid-rows-2 gap-4"}>
            <p className={"col-span-2"}>Le stagiere s est-il renseigner de lui meme sur les horraires a respecter ?</p>
            <div className={"grid grid-cols-2 items-center justify-items-center"}>
              <label htmlFor="oui">Oui</label>
              <input type="radio" id="oui" name="renseigner" value="oui" width={"10"} />
            </div>
            <div className={"grid grid-cols-2 items-center justify-items-center"}>
              <label htmlFor="non">Non</label>
              <input type="radio" id="non" name="renseigner" value="non" width={"10"} />
            </div>
          </section>
        </div>

        {/* Internship Section */}
        <div className={"mt-5 rounded border p-5"}>
          <h2 className={"text-2xl font-semibold italic"}>Observations</h2>
          <TextArea></TextArea>
        </div>

        {/* Submit Button */}
        <div className={"mt-5 text-center"}>
          <Button className="w-40" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
