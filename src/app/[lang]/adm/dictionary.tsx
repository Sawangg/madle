export type Column = {
  date: string;
  company: string;
  student: string;
  internship: string;
  document: string;
  status: string;
};

export type Form = {
  name: string,
  status: string,
  ended: string,
  inprogress: string,
  pending: string
};

export type Adm = {
  title: string;
  internshiptitle: string;
  managetitle: string;
  notfound: string;
  column: Column;
  form: Form;
};

export type Dictionary = {
  adm: Adm;
};
