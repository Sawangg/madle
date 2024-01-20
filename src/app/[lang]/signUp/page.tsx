import type React from "react";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Button } from "@ui/Button";
import { Field } from "@ui/Fieldset";
import { Heading } from "@ui/Heading";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";
import { Strong, Text } from "@ui/Text";

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionnary(params.lang as Locale);
  console.log(dictionary);

  return (
    <main className={"h-screen w-full"}>
      <div className="flex h-full items-center justify-center">
        <div className="flex w-96 flex-col gap-y-4">
          <Heading>Sign Up</Heading>
          {/*<Field className="flex gap-2">
            <form action={signInGoogle} className="w-1/2">
              <Button className="w-full" outline>
                <div className="w-4" data-slot="icon">
                  <AspectRatio ratio={0.9816}>
                    <Image src="/assets/google.png" alt="" fill />
                  </AspectRatio>
                </div>
                Google
              </Button>
            </form>
            <form action={signInGithub} className="w-1/2">
              <Button className="w-full" outline>
                <div className="w-6" data-slot="icon">
                  <AspectRatio ratio={1}>
                    <Image src="/assets/github.png" alt="" fill />
                  </AspectRatio>
                </div>
                Github
              </Button>
            </form>
          </Field>*/}
          <Field className={"flex flex-col"}>
            <Label htmlFor="userType">Type of user</Label>
            <select name="user" id="userType" className={"mt-3 rounded-xl border p-2"}>
              <option value="">--Please choose an option--</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Administrator</option>
            </select>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input name="email" />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" />
          </Field>
          <Field>
            <Label htmlFor="passwordConfirm">Confirm your password</Label>
            <Input name="passwordConfirm" type="passwordConfirm" />
          </Field>
          <form>
            <Button className="w-full" type="submit" color={"blue"}>
              Get started
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
