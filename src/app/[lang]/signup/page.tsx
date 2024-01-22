import type React from "react";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import type { Dictionary } from "@public/locales/dictionary";
import { Button } from "@ui/Button";
import { Field } from "@ui/Fieldset";
import { Heading } from "@ui/Heading";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = (await getDictionnary(params.lang as Locale)) as Dictionary;

  return (
    <main className={"h-screen w-full"}>
      <div className="flex h-full items-center justify-center">
        <div className="flex w-96 flex-col gap-y-4">
          <Heading>Sign Up</Heading>
          <Field className={"flex flex-col"}>
            <Label htmlFor="userType">{dictionary.admin.signup.typeUser}</Label>
            <select name="user" id="userType" className={"mt-3 rounded-xl border p-2"}>
              <option value="">--{dictionary.admin.signup.choiceType}--</option>
              <option value="student">{dictionary.admin.signup.student}</option>
              <option value="tutor">{dictionary.admin.signup.tutor}</option>
              <option value="admin">{dictionary.admin.signup.administrator}</option>
            </select>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input name="email" />
          </Field>
          <Field>
            <Label htmlFor="password">{dictionary.admin.login.pass}</Label>
            <Input name="password" type="password" />
          </Field>
          <Field>
            <Label htmlFor="passwordConfirm">{dictionary.admin.signup.passConfirm}</Label>
            <Input name="passwordConfirm" type="passwordConfirm" />
          </Field>
          <form>
            <Button className="w-full" type="submit" color={"blue"}>
              {dictionary.admin.login.connection}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
