import Image from "next/image";
import Link from "next/link";
import { signInGithub } from "@actions/auth/login/signInGithub";
import { signInGoogle } from "@actions/auth/login/signInGoogle";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Button } from "@ui/Button";
import { FieldSet } from "@ui/Fieldset";
import { Heading } from "@ui/Heading";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";
import { AspectRatio } from "@ui/primitives/AspectRatio";
import { Strong, Text } from "@ui/Text";

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionnary(params.lang as Locale);

  return (
    <main className="flex w-full grow items-center justify-center">
      <div className="flex w-96 flex-col gap-y-4">
        <Heading>{dictionary.admin.login.connection}</Heading>
        <div className="flex gap-2">
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
        </div>
        <form className="flex flex-col gap-y-4">
          <FieldSet>
            <Label htmlFor="email">Email</Label>
            <Input name="email" />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="password">{dictionary.admin.login.pass}</Label>
            <Input name="password" type="password" />
          </FieldSet>
          <Button className="w-full" type="submit" color="blue">
            {dictionary.admin.login.connection}
          </Button>
        </form>
        <Text>
          {dictionary.admin.login.sentenceConnection}
          <Link href="/signup">
            <Strong className="pl-2">{dictionary.admin.login.signup}</Strong>
          </Link>
        </Text>
      </div>
    </main>
  );
}
