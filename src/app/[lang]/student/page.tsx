import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isStudent } from "@actions/isStudent";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import AddInternshipForm from "@src/app/modules/AddInternshipFrom";
import { CustomTable } from "@src/app/modules/CustomTable";
import { SectionInfo } from "@src/app/modules/sectionInfo";

export const metadata: Metadata = {
  title: "Madle - Student part",
  description: "Madle internship platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale } }>) {
  // Student check
  const session = await auth();
  const student = await isStudent(session!.user!.email!);
  if (!student) return redirect("/");

  const dictionary = await getDictionary(params.lang);

  // Column key and its name in the table (based on language)
  // (Be sure that the key is exactly the same as the one in the data or the value won't be displayed)
  const column = {
    date: dictionary.student.column.date,
    company: dictionary.student.column.company,
    contact: dictionary.student.column.contact,
    internship: dictionary.student.column.internship,
    document: dictionary.student.column.document,
  };
  const data = [
    {
      date: "2022-01-01",
      company: "ABC Inc",
      contact: "John Doe",
      internship: "Software Developer",
      document: "Resume",
    },
    {
      date: "2022-02-01",
      company: "XYZ Ltd",
      contact: "Jane Smith",
      internship: "Marketing Intern",
      document: "Cover Letter",
    },
  ];

  return (
    <main className="px-20 py-16 text-blue-900">
      <h1 className="py-7 text-4xl font-semibold italic">{dictionary.student.title}</h1>
      <SectionInfo dictionary={dictionary} />
      <section>
        <h2 className="py-4 text-2xl underline">{dictionary.student.internshiptitle}</h2>
        <CustomTable columns={column} data={data} dictionary={dictionary} />
      </section>
      <section>
        <h2 className="py-4 text-2xl underline">Add internship</h2>
        <AddInternshipForm />
      </section>
    </main>
  );
}
