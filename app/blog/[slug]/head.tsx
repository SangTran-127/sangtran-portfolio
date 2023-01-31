import { NEXT_SEO_DEFAULT } from "@/next-seo.config";
import { getBlogBySlug } from "@/utils";
import { NextSeo, NextSeoProps } from "next-seo";
import React from "react";

interface HeaderProps {
  params: {
    slug: string;
  };
}

const Head = async ({ params }: HeaderProps) => {
  const blog = await getBlogBySlug(params.slug);
  const updatedMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: blog?.title,
    description: blog?.description,
    titleTemplate: '%s',
    openGraph: {
      url: `https://www.sangtran.dev/blog/${blog?.slug}`,
      title: blog?.title,
      description: blog?.description,
      type: "article",
      article: {
        publishedTime: blog?.publishedDate,
        section: blog?.title,
        authors: [
          blog?.author?.profileUrl as string
        ],
        tags: blog?.tagList.map((tag) => tag.name),
      },
      images: [
        {
          url: blog?.thumbnailUrl as string,
          width: 800,
          height: 600,
          alt: blog?.thumbnailUrl as string,
          type: 'image/jpeg',
        }
      ]
    }
  }
  return <NextSeo {...updatedMeta} useAppDir={true} />
};

export default Head;
