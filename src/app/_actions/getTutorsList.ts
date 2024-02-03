"use server";

import { preparedTutorsList } from "@db/prepared/preparedTutorsList";

export const getTutorsList = async () => {
  return await preparedTutorsList.execute();
};
