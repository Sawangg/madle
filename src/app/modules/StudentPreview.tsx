import { TextArea } from "@src/ui/TextArea";
import { Button } from "@ui/Button";

export default function StudentPreview() {
  return (
    <form>
      {/* Company Section */}
      <div className={"mt-5"}>
        <h2 className={"text-2xl font-semibold italic"}>Etudiant</h2>
        <section className={"grid grid-cols-1 gap-4"}>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"studentName"}>John DOE</label>
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"StudentYear"}>M2 APP LSI</label>
          </div>
        </section>
      </div>
      {/* Contact Section */}
      <div className="mt-5">
        <h2 className={"text-2xl font-semibold italic"}>PONCTUALITE AU TRAVAIL</h2>
        <section className={"grid grid-cols-2 gap-4"}>
          <div className={"grid "}>
            <p>Le stagiere s est-il renseigner de lui meme sur les horraires a respecter ?</p>
            <input type="radio" id="oui" name="renseigner" value="oui" />
            <label htmlFor="oui">Oui</label>
            <input type="radio" id="non" name="renseigner" value="non" />
            <label htmlFor="non">Non</label>
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
  );
}
