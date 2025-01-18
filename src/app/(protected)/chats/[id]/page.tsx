"use client";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  console.log({ id });
  return <div>Page</div>;
};

export default Page;
