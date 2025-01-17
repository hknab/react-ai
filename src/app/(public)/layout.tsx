import { Navbar } from "@/components/feature";
import { FC, PropsWithChildren } from "react";
import { FooterSection } from "./_components";

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full px-4">
        {" "}
        {children} <FooterSection />
      </div>
    </>
  );
};

export default PublicLayout;
