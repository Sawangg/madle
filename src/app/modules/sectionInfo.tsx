import Image from "next/image";
import type { Dictionary } from "@lib/getDictionnary";

type CustomTableProps = {
  dictionary: Dictionary;
};

export function SectionInfo({ dictionary }: Readonly<CustomTableProps>) {
  return (
    <div className="my-5 flex max-w-full overflow-x-auto rounded-3xl bg-blue-200 p-3">
      <Image src={"/assets/info.svg"} alt={"icons"} width={50} height={50} />
      <div className="ml-5">
        <h2> - {dictionary.infoBox.info1}</h2>
        <h2> - {dictionary.infoBox.info2}</h2>
      </div>
    </div>
  );
}
