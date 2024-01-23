import type { Metadata } from "next";
import { signup } from "@actions/auth/signup";
import { getDictionary, type Locale } from "@lib/getDictionnary";
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

export default async function Page({ params }: Readonly<{ params: { lang: Locale } }>) {
  const dictionary = await getDictionary(params.lang);

  return (
    <main className="flex w-full grow items-center justify-center">
      <div className="flex h-full items-center justify-center">
        <form action={signup} className="flex w-96 flex-col gap-y-4">
          <Heading>Sign Up</Heading>
          <FieldSet className="flex flex-col" isRequired>
            <Label htmlFor="userType">{dictionary.admin.signup.typeUser}</Label>
            <Select label="userType" name="userType" id="userType" isRequired>
              <Option value="student">{dictionary.admin.signup.student}</Option>
              <Option value="tutor">{dictionary.admin.signup.tutor}</Option>
              <Option value="admin">{dictionary.admin.signup.administrator}</Option>
            </Select>
          </FieldSet>
          <FieldSet>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" required />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="firstName">{dictionary.admin.signup.firstName}</Label>
            <Input id="firstName" name="firstName" required />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="lastName">{dictionary.admin.signup.lastName}</Label>
            <Input id="lastName" name="lastName" required />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="password">{dictionary.admin.login.pass}</Label>
            <Input id="password" name="password" type="password" required />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="passwordConfirm">{dictionary.admin.signup.passConfirm}</Label>
            <Input id="passwordConfirm" name="passwordConfirm" type="password" required />
          </FieldSet>
          <Button className="w-full" type="submit" color="blue">
            {dictionary.admin.login.signup}
          </Button>
        </form>
      </div>
    </main>
  );
}
