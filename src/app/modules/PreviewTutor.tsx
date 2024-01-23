"use client";

import React from "react";
import { TextArea } from "@src/ui/TextArea";
import { Button } from "@ui/Button";

type PreviewTutorProps = {
  data: Record<string, string>[];
};
export default function PreviewTutor({ data }: Readonly<PreviewTutorProps>) {
  const [selectedStudent, setSelectedStudent] = React.useState("");
  const [studentData, setStudentData] = React.useState({
    studentId: "",
    studentName: "",
    studentJob: "",
    studentCompany: "",
  });
  // Function to handle the select change
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudent(event.target.value);
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevent the page from reloading
    if (!selectedStudent) {
      alert("No name selected");
    } else {
      const student = data.find((internships) => internships.studentName === selectedStudent);
      if (student) {
        setStudentData({
          studentId: student.studentId,
          studentName: student.studentName,
          studentJob: student.title,
          studentCompany: student.company,
        });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!");
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.internshipId = studentData.studentId;
    data.punctuality = data.punctuality === "true";
    console.log(data);

    // Send data to API
    const response = await fetch("/api/tutor_review/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Error during the request");
    } else {
      console.log("Dat successfully sent");
    }
  };

  return (
    <div>
      <h2 className={"py-4 text-2xl underline"}>Review</h2>
      {/*Select the student*/}
      <form className={"flex flex-row items-center justify-center gap-4 py-3 align-middle"}>
        <select name="user" id="userType" className={" rounded-xl border p-2"} onChange={handleSelectChange}>
          <option value="">-- Select a name --</option>
          {data.map((internship) => (
            <option value={internship.studentName} key={internship.studentName}>
              {internship.studentName.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleButtonClick}
        >
          Valider
        </button>
      </form>

      {/* -- Review -- */}
      <div className={"mb-5 rounded border bg-gray-50 p-5"}>
        <form method={"POST"} onSubmit={handleSubmit}>
          <section className={"mt-5"}>
            <h2 className={"text-2xl font-semibold italic"}>Etudiant</h2>
            <article className={"flex flex-col pt-3"}>
              <label htmlFor={"studentName"}>{studentData.studentName}</label>
              <label htmlFor={"studentName"}>{studentData.studentJob}</label>
              <label htmlFor={"StudentYear"}>{studentData.studentCompany}</label>
            </article>
          </section>

          <section className="mt-5">
            <h2 className={"text-2xl font-semibold italic"}>Ponctualité au travail</h2>
            <article className={"grid grid-cols-2 grid-rows-2 gap-4"}>
              <p className={"col-span-2"}>Le stagiaire est-il renseigner de lui meme sur les horaires a respecter ?</p>
              <div className={"grid grid-cols-2 items-center justify-items-center"}>
                <label htmlFor="oui">Oui</label>
                <input type="radio" id="oui" name="punctuality" value="true" width={"10"} />
              </div>
              <div className={"grid grid-cols-2 items-center justify-items-center"}>
                <label htmlFor="non">Non</label>
                <input type="radio" id="non" name="punctuality" value="false" width={"10"} />
              </div>
            </article>
          </section>

          <div className={"mt-5 rounded border p-5"}>
            <h2 className={"text-2xl font-semibold italic"}>Observations</h2>
            <TextArea name={"observation"}></TextArea>
          </div>

          <div className={"mt-5 text-center"}>
            <Button className="w-40" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
