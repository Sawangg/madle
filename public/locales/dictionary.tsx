export type Dictionary = {
  admin: {
    login: {
      github: string;
      google: string;
      apple: string;
      sentenceConnection: string;
      connection: string;
      pass: string;
    };
    signup: {
      passConfirm : string;
      typeUser: string;
      choiceType: string;
      student: string;
      tutor: string;
      administrator: string;

    }
    signout: string;
  };
  adm: {
    title: string;
    internshiptitle: string;
    managetitle: string;
    notfound: string;
    column: {
      datestart: string;
      dateend: string;
      company: string;
      student: string;
      title: string;
      status: string;
    };
    form: {
      name: string;
      status: string;
      ended: string;
      inprogress: string;
      pending: string;
    };
  };
  student: {
    title: string;
    internshiptitle: string;
    column: {
      date: string;
      company: string;
      contact: string;
      internship: string;
      document: string;
    };
  };
  tutor: {
    title: string;
    column: {
      datestart: string;
      dateend: string;
      company: string;
      contact: string;
      internship: string;
      document: string;
      content: string;
      status: string;
    };
  };
  customtable: {
    preview: string;
    seemore: string;
  };
  previewform: {
    title: string;
    close: string;
    save: string;
  };
};
