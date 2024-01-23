import { getDictionary, type Locale } from "@lib/getDictionnary";
import { Button } from "@ui/Button";

type FormProps = {
  lang: Locale;
  selectedItem: Record<string, string>;
  columns: Record<string, string>;
  closeForm: () => void;
  handleInputChange: (index: number, value: string) => void;
  previewEditable?: boolean;
};

export default async function CompletePreviewForm({
  lang,
  selectedItem,
  columns,
  closeForm,
  handleInputChange,
  previewEditable,
}: Readonly<FormProps>) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="mt-3 bg-gray-50">
      <form className="rounded border bg-gray-50 p-4">
        <h2 className="font-bold">{dictionary.previewform.title}</h2>
        <section className="flex flex-col justify-center">
          {Object.entries(selectedItem).map(([key, value], index) => (
            <div key={index} className="flex flex-col p-2">
              <label htmlFor={`input-${index}`}>{columns[key]}</label>
              <input
                type="text"
                id={`input-${index}`}
                className="border p-2"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={!previewEditable}
              />
            </div>
          ))}
        </section>
        <section className="flex justify-evenly">
          <button onClick={closeForm} className="rounded bg-blue-900 p-3 text-center text-white">
            {dictionary.previewform.close}
          </button>
          {previewEditable && (
            <Button type="submit" color="blue">
              {dictionary.previewform.save}
            </Button>
          )}
        </section>
      </form>
    </div>
  );
}
