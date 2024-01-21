import Image from "next/image";
import { signInGithub } from "@actions/login/signInGithub";
import { signInGoogle } from "@actions/login/signInGoogle";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Button } from "@ui/Button";
import { Field } from "@ui/Fieldset";
import { Heading } from "@ui/Heading";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";
import { AspectRatio } from "@ui/primitives/AspectRatio";
import { Strong, Text } from "@ui/Text";

export default async function Page({params}: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  console.log(dictionnary);

  return (
    <main className="flex w-full grow items-center justify-center">
      <div className="flex w-96 flex-col gap-y-4">
        <Heading>Sign in</Heading>
        <Field className="flex gap-2">
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
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input name="email" />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" />
        </Field>
        <form>
          <Button className="w-full" type="submit" color={"blue"}>
            Get started
          </Button>
        </form>
        <Text>
          Don&apos;t have an account? <Strong>Sign up</Strong>
        </Text>
      </div>
    </main>
  );
}
