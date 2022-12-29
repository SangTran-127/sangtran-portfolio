import { Post } from "@/models";
import React from "react";
// import Image from "next/image";
import Image from "next/legacy/image";
import Link from "next/link";
interface BlogCardProps {
  blog: Post;
  lastest?: boolean;
}

export default function BlogCard({ blog, lastest }: BlogCardProps) {
  return (
    <div
      className={`flex ${
        lastest ? "flex-col h-full border rounded-lg px-3 py-3" : ""
      } gap-4 w-full `}
    >
      <div className={`${lastest ? "" : "w-5/12"}`}>
        <Image
          src={blog.thumbnailUrl || ""}
          alt={blog.title}
          width={384}
          height={256}
          layout="responsive"
          className="rounded-lg"
        />
      </div>
      <div className={`${lastest ? "" : "w-7/12"}`}>
        <div className="flex text-dracula-light">
          {blog.tagList.map((tag) => (
            <p
              key={tag}
              className="bg-dracula-dark-800 hover:bg-dracula-dark-400  text-dracula-light text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {tag}
            </p>
          ))}
        </div>
        <Link href={`/blog/${blog.slug}`} legacyBehavior>
          <h5 className="text-lg line-clamp-2 mt-3 font-semibold text-dracula-orange cursor-pointer">
            {blog.title}
          </h5>
        </Link>
        <div className="mt-3">
          <div>
            <Link href={blog.author?.profileUrl || "#"}>
              <div className="flex items-center gap-3">
                <Image
                  className="inline-block rounded-full"
                  src={blog.author?.avatarUrl || ""}
                  alt={blog.author?.name || " "}
                  width={30}
                  height={30}
                />
                <div>
                  <p className="text-dracula-purple text-md">
                    {blog.author?.name}
                  </p>
                  <p className="text-sm text-dracula-green">
                    {blog.publishedDate}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
