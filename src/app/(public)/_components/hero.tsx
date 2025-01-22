import { Badge, Button } from "@/components/ui";
import { SOCIAL } from "@/constants/links";
import { ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="container w-full mx-auto" id="hero">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span>
              Powered by{" "}
              <Link href="https://together.ai" target="_blank">
                <Badge variant="secondary" className="cursor-pointer">
                  Together AI
                </Badge>
              </Link>
            </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              AI
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                React Component Coder
              </span>
              With LLama
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`An open source Claude Artifacts – generate react components with one prompt. Powered by Llama 3 on Together.ai.`}
          </p>

          <div className=" flex flex-col items-center justify-center md:flex-row gap-4">
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow" asChild>
              <Link href="/chats">
                GET STARTED
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link href={SOCIAL.GITHUB_REPO} target="_blank">
                <Github /> Github Repository
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Image
            suppressHydrationWarning
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src="/screenshot.png"
            alt="dashboard"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
