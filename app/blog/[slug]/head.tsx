import { getBlogBySlug } from "@/utils";
import React from "react";

interface HeaderProps {
  params: {
    slug: string;
  };
}

const Head = async ({ params }: HeaderProps) => {
  const blog = await getBlogBySlug(params.slug);
  return (
    <>
      <title>{blog?.title}</title>
      <meta name="title" content={blog?.title} />
      <meta name="description" content={blog?.description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.WEB_URL}/blog` || ""} />
      <meta property="og:title" content={blog?.title} />
      <meta property="og:description" content={blog?.description} />
      <meta property="og:image" content={blog?.thumbnailUrl} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`${process.env.WEB_URL}/blog` || ""}
      />
      <meta property="twitter:title" content={blog?.title} />
      <meta property="twitter:description" content={blog?.description} />
      <meta property="twitter:image" content={blog?.thumbnailUrl} />
    </>
  );
};

export default Head;
