"use client";

import { deleteInternshipById } from "@actions/updateInternships";
import type { Dictionary } from "@lib/getDictionnary";
import { Button } from "@ui/Button";

type DeleteInternshipProps = {
  dictionary: Dictionary;
  id: number;
};
export function DeleteInternship({ dictionary, id }: Readonly<DeleteInternshipProps>) {
  const deleteInternship = async () => {
    try {
      await deleteInternshipById(id);
      console.log(`Internship with id ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete internship with id ${id}.`, error);
    }
  };
  return (
    <form action={deleteInternship}>
      <Button type="submit" color="red">
        {dictionary.customtable.deletedText}
      </Button>
    </form>
  );
}
