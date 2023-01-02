import React from "react";
import { getBlogList } from "@/utils";
import Container from "@/components/layout/Container";
import PostItem from "@/components/blog/PostItem";
import { Seo } from "@/components";

async function getBlogAPI() {
  const blogList = await getBlogList();
  return blogList;
}

export default async function BlogPage() {
  const blogList = await getBlogAPI();

  return (
    <div className="text-dracula-light">
      <Container tailWindClass="md:px-20 lg:px-40 xl:px-60 2xl:px-80 px-5">
        <>
          <h1 className="text-center text-3xl my-3">Blog</h1>
          <div className="flex flex-col gap-3">
            {blogList.map((blog) => (
              <div key={blog.id}>
                <PostItem post={blog} />
              </div>
            ))}
          </div>
        </>
      </Container>
    </div>
  );
}
