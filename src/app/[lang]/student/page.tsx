import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserId } from "@actions/getUserId";
import { isStudent } from "@actions/isStudent";
import { getInternshipStudentTableByStudentId } from "@db/prepared/internships";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import AddInternshipForm from "@src/app/modules/AddInternshipForm";
import { CustomTable } from "@src/app/modules/CustomTable";

export const metadata: Metadata = {
  title: "Madle - Student part",
  description: "Madle internship platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale } }>) {
  // Student check
  const session = await auth();
  const student = await isStudent(session!.user!.email!);
  if (!student) return redirect("/");

  const studentId = await getUserId(session!.user!.email!);

  const dictionary = await getDictionary(params.lang);

  // Column key and its name in the table (based on language)
  // (Be sure that the key is exactly the same as the one in the data or the value won't be displayed)
  const column: Record<string, string> = {
    dateStart: dictionary.student.column.datestart,
    dateEnd: dictionary.student.column.dateend,
    company: dictionary.student.column.company,
    contact: dictionary.student.column.contact,
    internship: dictionary.student.column.internship,
  };

  const data = (await getInternshipStudentTableByStudentId(studentId).execute()).map((internship) => ({
    ...internship,
    dateStart: internship.dateStart.toISOString().split("T")[0],
    dateEnd: internship.dateEnd.toISOString().split("T")[0],
    company: internship.company,
    contact: internship.contactEmail,
    internship: internship.title,
  }));

  return (
    <main className="px-20 py-16 text-blue-900">
      <h1 className="py-7 text-4xl font-semibold italic">{dictionary.student.title}</h1>
      <section>
        <h2 className="py-4 text-2xl underline">{dictionary.student.internshiptitle}</h2>
        <CustomTable columns={column} data={data} dictionary={dictionary} />
      </section>
      <section>
        <h2 className={"py-4 text-2xl underline"}>Add internship</h2>
        <AddInternshipForm studentId={studentId} />
      </section>
    </main>
  );
}
