import type { Metadata } from "next";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Button } from "@ui/Button";
import { FieldSet } from "@ui/Fieldset";
import { Heading } from "@ui/Heading";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";
import { Option, Select } from "@ui/Select";

export const metadata: Metadata = {
  title: "Madle - Student part",
  description: "Madle internship platform",
};

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionnary(params.lang as Locale);

  return (
    <main className="flex w-full grow items-center justify-center">
      <div className="flex h-full items-center justify-center">
        <form className="flex w-96 flex-col gap-y-4">
          <Heading>Sign Up</Heading>
          <FieldSet className="flex flex-col">
            <Label htmlFor="userType">{dictionary.admin.signup.typeUser}</Label>
            <Select label="userType" name="userType" id="userType">
              <Option value="student">{dictionary.admin.signup.student}</Option>
              <Option value="tutor">{dictionary.admin.signup.tutor}</Option>
              <Option value="admin">{dictionary.admin.signup.administrator}</Option>
            </Select>
          </FieldSet>
          <FieldSet>
            <Label htmlFor="email">Email</Label>
            <Input name="email" />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="password">{dictionary.admin.login.pass}</Label>
            <Input name="password" type="password" />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="passwordConfirm">{dictionary.admin.signup.passConfirm}</Label>
            <Input name="passwordConfirm" type="password" />
          </FieldSet>
          <Button className="w-full" type="submit" color="blue">
            {dictionary.admin.login.signup}
          </Button>
        </form>
      </div>
    </main>
  );
}
