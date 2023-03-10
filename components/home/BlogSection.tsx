import React from "react";
import { getSortedBlogList } from "@/utils";
import Container from "../layout/Container";
import BlogCard from "../blog/BlogCard";
import Link from "next/link";

export default async function BlogSection() {
  const blogList = await getSortedBlogList();

  const [lastestBlog, ...restBlog] = blogList;
  return (
    <Container tailWindClass="max-w-screen-lg mx-auto px-3">
      <>
        <Link href={`/blog`} legacyBehavior>
          <h1 className="text-dracula-light hover:text-dracula-orange text-center text-3xl cursor-pointer">
            Stories & Blog
          </h1>
        </Link>
        <p className="text-dracula-dark-300 text-center">The lastest blog</p>
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-3 mt-3">
          <div>
            <BlogCard blog={lastestBlog} lastest={true} />
          </div>

          <div className="flex flex-col justify-around gap-3 md:gap-0">
            {restBlog.map((blog) => (
              <div key={blog.title} className="">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </>
    </Container>
  );
}
