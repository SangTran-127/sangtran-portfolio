import { getSortedBlogList } from "@/utils";
import Container from "@/components/layout/Container";
import { devLanguages } from "@/utils";
import BlogContainer from "./BlogContainer";


export default async function BlogPage() {
  const blogList = await getSortedBlogList();
  const typeList = new Set(blogList.map(blog => blog.type))
  return (
    <div className="text-dracula-light mb-14 mt-5">
      <Container tailWindClass="md:px-20 lg:px-40 xl:px-60 2xl:px-80 px-5">
        <>
          <h1 className="text-center text-3xl mb-3">Blog</h1>
          <BlogContainer blogList={blogList} devLanguages={devLanguages} typeList={[...typeList]} />
        </>
      </Container>
    </div>
  );
}
