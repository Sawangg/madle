"use client";

import React, { useEffect } from "react";
import { insertTutorReview } from "@actions/reviewTutor";
import type { Dictionary } from "@lib/getDictionnary";
import { TextArea } from "@src/ui/TextArea";
import { Button } from "@ui/Button";

type PreviewTutorProps = {
  dictionary: Dictionary;
  data: Record<string, string>;
};
export default function TutorPreviewForm({ dictionary, data }: Readonly<PreviewTutorProps>) {
  const [observation, setObservation] = React.useState("");
  const [punctuality, setPunctuality] = React.useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleObservation = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservation(event.target.value);
  };
  const handlePunctuality = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPunctuality(event.target.value);
  };

  const updateTutorReview = async () => {
    const DataWeave = {
      internshipId: data.id,
      observation: observation.toString(),
      punctuality: punctuality === "true",
    };
    await insertTutorReview(DataWeave);
  };

  useEffect(() => {
    setObservation(data.observation);
    setPunctuality(data.punctuality);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.observation, data.punctuality]);

  return (
    <div>
      <h2 className={"py-4 text-2xl underline"}>Review</h2>
      {/* -- Review -- */}
      <div className={"mb-5 rounded border bg-gray-50 p-5"}>
        <form action={updateTutorReview}>
          <section className={"mt-5"}>
            <h2 className={"text-2xl font-semibold italic"}>{dictionary.adm.column.student}</h2>
            <article className={"flex flex-col pl-5 pt-3"}>
              <label htmlFor={"StudentYear"}>{data.studentName.toUpperCase()}</label>
              <label htmlFor={"studentTitle"}>{data.title}</label>
              <label htmlFor={"studentCompany"}>{data.company}</label>
            </article>
          </section>

          <section className="mt-5">
            <h2 className={"text-2xl font-semibold italic"}>Ponctualité au travail</h2>
            <article className={"grid grid-cols-2 grid-rows-2 gap-4"}>
              <p className={"col-span-2"}>Le stagiaire est-il renseigner de lui meme sur les horaires a respecter ?</p>
              <div className={"grid grid-cols-2 items-center justify-items-center"}>
                <label htmlFor="oui">Oui</label>
                <input
                  type="radio"
                  id="oui"
                  name="punctuality"
                  value="true"
                  width={"10"}
                  onChange={handlePunctuality}
                />
              </div>
              <div className={"grid grid-cols-2 items-center justify-items-center"}>
                <label htmlFor="non">Non</label>
                <input
                  type="radio"
                  id="non"
                  name="punctuality"
                  value="false"
                  width={"10"}
                  onChange={handlePunctuality}
                />
              </div>
            </article>
          </section>

          <div className={"mt-5 rounded border p-5"}>
            <h2 className={"text-2xl font-semibold italic"}>Observations</h2>
            <TextArea name={"observation"} onChange={handleObservation}></TextArea>
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
