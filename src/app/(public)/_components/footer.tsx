import { Logo } from "@/components/base";
import { Button } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { SOCIAL } from "@/constants/links";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32 mx-auto">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Logo />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <Link
                href={SOCIAL.GITHUB}
                className="opacity-60 hover:opacity-100"
              >
                Github
              </Link>
            </div>

            <div>
              <Link
                href={SOCIAL.TWITTER}
                className="opacity-60 hover:opacity-100"
              >
                Twitter
              </Link>
            </div>

            <div>
              <Link
                href={SOCIAL.INSTAGRAM}
                className="opacity-60 hover:opacity-100"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            Developed with 💖 by
            <Button asChild variant="link">
              <Link href={SOCIAL.DISCORD}>HKN</Link>
            </Button>
          </h3>
        </section>
      </div>
    </footer>
  );
};
