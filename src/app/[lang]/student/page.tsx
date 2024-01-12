import type React from "react";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import AddInternshipForm from "@src/app/modules/AddInternshipFrom";
import { CustomTable } from "@src/app/modules/CustomTable";

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionnary(params.lang as Locale);
  console.log(dictionary);

  /*CustomTable data + column name*/
  const column = ["Date", "Company", "Contact", "Internship", "Document"];
  const data = [
    {
      Date: "2022-01-01",
      Company: "ABC Inc",
      Contact: "John Doe",
      Internship: "Software Developer",
      Document: "Resume",
    },
    {
      Date: "2022-02-01",
      Company: "XYZ Ltd",
      Contact: "Jane Smith",
      Internship: "Marketing Intern",
      Document: "Cover Letter",
    },
  ];

  return (
    <main className={"px-20 py-16 text-blue-900"}>
      <h1 className={"py-7 text-4xl font-semibold italic "}>Student</h1>
      <section>
        <h2 className={"py-4 text-2xl underline"}>My Internships</h2>
        <CustomTable columns={column} data={data} />
      </section>
      <section>
        <h2 className={"py-4 text-2xl underline"}>Add internship</h2>
        <AddInternshipForm />
      </section>
    </main>
  );
}
