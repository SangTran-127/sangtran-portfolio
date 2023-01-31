import { NEXT_SEO_DEFAULT } from "@/next-seo.config";
import { NextSeo, NextSeoProps } from "next-seo";

const Head = () => {
  const updatedMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: "Sang | Blog page",
    description: "Welcome to Sang's blog page",
    titleTemplate: '%s'
  }
  return <NextSeo {...updatedMeta} useAppDir={true} />
};

export default Head;
