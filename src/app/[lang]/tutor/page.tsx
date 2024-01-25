import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Link } from "react-aria-components";
import { getInternshipTutorTableByTutorId } from "@db/prepared/internships";
import { preparedUserEmail } from "@db/prepared/preparedUserEmail";
import { getAllTutorsPreview } from "@db/prepared/tutorsPreview";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import { Button } from "@ui/Button";

export const metadata: Metadata = {
  title: "Madle - Tutor part",
  description: "Madle internship platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale } }>) {
  const dictionary = await getDictionary(params.lang);
  const session = await auth();
  let userId = "";
  if (session?.user?.email !== undefined) {
    const user = await preparedUserEmail.execute({ email: session?.user?.email });
    console.log(user);
    if (user.length === 0) redirect("/");
    if (user[0].role !== "tutor") redirect("/");
    userId = user[0].id;
  }

  // Column key and its name in the table (based on language) (Be sure that the key is exactly the same as the one in the data or the value won't be displayed)
  const column: Record<string, string> = {
    dateStart: dictionary.adm.column.datestart,
    dateEnd: dictionary.adm.column.dateend,
    studentName: dictionary.adm.column.student,
    title: dictionary.adm.column.title,
    company: dictionary.adm.column.company,
    status: dictionary.adm.column.status,
  };

  const data = (await getInternshipTutorTableByTutorId(userId).execute()).map((internship) => ({
    ...internship,
    dateStart: internship.dateStart.toISOString().split("T")[0],
    dateEnd: internship.dateEnd.toISOString().split("T")[0],
    studentFirstName: internship.studentFirstName ?? "",
    studentLastName: internship.studentLastName ?? "",
    studentName:
      internship.studentFirstName && internship.studentLastName
        ? `${internship.studentFirstName} ${internship.studentLastName}`
        : "",
  }));
  // TO DO : Check if tutorPreview is complete
  const tutorPreview = (await getAllTutorsPreview.execute()).map((tutorPreview) => ({
    ...tutorPreview,
  }));

  return (
    <main className="px-20 py-16 text-blue-900">
      <h1 className="py-7 text-4xl font-semibold italic">{dictionary.tutor.title}</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              {Object.entries(column).map(([_, value], index) => (
                <th key={index} className="border p-2">
                  {value}
                </th>
              ))}
              <th className="border p-2">{dictionary.customtable.evalComplete}</th>
              <th className="border p-2">{dictionary.customtable.preview}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => {
              return (
                <tr key={rowIndex} className="text-center">
                  {Object.keys(column).map((columnKey, columnIndex) => (
                    <td key={columnIndex} className="border p-2">
                      {columnKey == "status"
                        ? (dictionary.adm.form as Record<string, string>)[item[columnKey]]
                        : (item as Record<string, string>)[columnKey]}
                    </td>
                  ))}
                  <td className="border p-2">
                    {tutorPreview.find((tutor) => tutor.internshipId === item.id) ? (
                      <img src="/assets/icons8-vérifié.svg" alt="eye" className="m-auto" />
                    ) : (
                      <img src="/assets/icons8-effacer.svg" alt="eye" className="m-auto" />
                    )}
                  </td>
                  <td className="border p-2">
                    <Link href={`/tutor/${item.id}`}>
                      <Button color="blue">{dictionary.customtable.seemore}</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
