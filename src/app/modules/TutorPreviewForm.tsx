"use client";

import { useEffect, useState } from "react";
import { insertTutorReview } from "@actions/reviewTutor";
import type { Dictionary } from "@lib/getDictionnary";
import { TextArea } from "@src/ui/TextArea";
import { Button } from "@ui/Button";

type TutorPreview = {
  internshipId: number;
  id: number;
  observation: string;
  punctuality: boolean;
};

type PreviewTutorProps = {
  dictionary: Dictionary;
  data: Record<string, string | number>;
  tutorPreview: TutorPreview;
};
export default function TutorPreviewForm({ dictionary, data, tutorPreview }: Readonly<PreviewTutorProps>) {
  const [observation, setObservation] = useState("");
  const [punctuality, setPunctuality] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleObservation = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservation(event.target.value);
  };
  const handlePunctuality = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPunctuality(event.target.value);
  };

  const updateTutorReview = async () => {
    const DataWeave = {
      internshipId: data.id as number,
      observation: observation.toString(),
      punctuality: punctuality === "true",
    };
    await insertTutorReview(DataWeave);
  };

  useEffect(() => {
    setObservation(data.observation as string);
    setPunctuality(data.punctuality as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.observation, data.punctuality]);

  return (
    <div>
      <h2 className="py-4 text-2xl underline">Review</h2>
      {/* -- Review -- */}
      <div className="mb-5 rounded border bg-gray-50 p-5">
        <form action={updateTutorReview}>
          <section className="mt-5">
            <h2 className="text-2xl font-semibold italic">{dictionary.adm.column.student}</h2>
            <article className="flex flex-col pl-5 pt-3 font-semibold text-black">
              <label htmlFor="StudentYear">{(data.studentName as string).toUpperCase()}</label>
              <label htmlFor="studentTitle">{data.title}</label>
              <label htmlFor="studentCompany">{data.company}</label>
            </article>
          </section>

          <section className="mt-5">
            <h2 className="text-2xl font-semibold italic">{dictionary.previewtutor.punctuality}</h2>
            <article className="grid grid-cols-2 grid-rows-2 gap-4">
              <p className="col-span-2">{dictionary.previewtutor.punctualityComment}</p>
              <div className="grid grid-cols-2 items-center justify-items-center">
                <label htmlFor="oui">{dictionary.previewtutor.yes}</label>
                {typeof tutorPreview !== "undefined" ? (
                  <input
                    type="radio"
                    id="oui"
                    name="punctuality"
                    value="true"
                    width="10"
                    onChange={handlePunctuality}
                    checked={tutorPreview.punctuality}
                    disabled
                  />
                ) : (
                  <input
                    type="radio"
                    id="oui"
                    name="punctuality"
                    value="true"
                    width="10"
                    onChange={handlePunctuality}
                    required
                  />
                )}
              </div>
              <div className="grid grid-cols-2 items-center justify-items-center">
                <label htmlFor="non">{dictionary.previewtutor.no}</label>
                {typeof tutorPreview !== "undefined" ? (
                  <input
                    type="radio"
                    id="non"
                    name="punctuality"
                    value="false"
                    width="10"
                    onChange={handlePunctuality}
                    checked={!tutorPreview.punctuality}
                    disabled
                  />
                ) : (
                  <input
                    type="radio"
                    id="non"
                    name="punctuality"
                    value="false"
                    width="10"
                    onChange={handlePunctuality}
                    required
                  />
                )}
              </div>
            </article>
          </section>

          <div className="mt-5 rounded border p-5">
            <h2 className="text-2xl font-semibold italic">{dictionary.previewtutor.observation}</h2>
            {typeof tutorPreview !== "undefined" ? (
              <TextArea name="observation" onChange={handleObservation} value={tutorPreview.observation} disabled />
            ) : (
              <TextArea name="observation" onChange={handleObservation} required />
            )}
          </div>

          <div className="mt-5 text-center">
            {typeof tutorPreview !== "undefined" ? (
              <Button className="w-40" type="submit" isDisabled>
                {dictionary.previewtutor.submit}
              </Button>
            ) : (
              <Button className="w-40" type="submit">
                {dictionary.previewtutor.submit}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
