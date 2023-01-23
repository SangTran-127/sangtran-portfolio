import { getSortedBlogList } from "@/utils";
import Container from "@/components/layout/Container";
import PostItem from "@/components/blog/PostItem";


export default async function BlogPage() {
  const blogList = await getSortedBlogList();

  return (
    <div className="text-dracula-light my-14">
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
