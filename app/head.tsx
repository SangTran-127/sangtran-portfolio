import { NEXT_SEO_DEFAULT } from "@/next-seo.config";
import { NextSeo } from "next-seo";
export default function Head() {

  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <NextSeo {...NEXT_SEO_DEFAULT} useAppDir={true} />
    </head>
  );


}
