"use server";

export const handleClick = (rowIndex: number, pageRedirectOnClick: string) => {
  if (pageRedirectOnClick == "adm") {
    return `/adm/${rowIndex}`;
  }
  return "#";
};
