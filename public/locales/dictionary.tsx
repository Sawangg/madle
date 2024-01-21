export type Column = {
  date: string;
  company: string;
  student: string;
  internship: string;
  document: string;
  status: string;
};

export type Form = {
  name: string;
  status: string;
  ended: string;
  inprogress: string;
  pending: string;
};

export type Adm = {
  title: string;
  internshiptitle: string;
  managetitle: string;
  notfound: string;
  column: Column;
  form: Form;
};

export type Login = {
  github: string;
  google: string;
  apple: string;
  choice: string;
  connection: string;
  division: string;
  pass: string;
};

export type Admin = {
  login: Login;
  signout: string;
};

export type CustomTableType = {
  preview: string;
  seemore: string;
};

export type PrefiewFormType = {
  title: string;
  close: string;
  save: string;
};

export type Dictionary = {
  adm: Adm;
  admin: Admin;
  customtable: CustomTableType;
  previewform: PrefiewFormType;
};
