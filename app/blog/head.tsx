import { NEXT_SEO_DEFAULT } from "@/next-seo.config";
import { NextSeo, NextSeoProps } from "next-seo";

const Head = () => {
  const updatedMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: "Sang | Blog page",
    description: "Welcome to Sang's blog page",
    titleTemplate: '%s'
  }
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <NextSeo {...updatedMeta} useAppDir={true} />
    </head>
  )
};

export default Head;
