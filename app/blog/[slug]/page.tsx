import { Post } from "@/models";
import { getBlogList, getMDToHTML } from "@/utils";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { Seo } from "@/components";
interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

export default async function BlogDetail({ params }: PageProps) {
  const { slug } = params;
  const post = await getBlog(slug);

  return (
    <>
      <Seo
        data={{
          title: `${post.title} | Sang's Blog`,
          description: post.description,
          thumbnailUrl: post.thumbnailUrl || "",
          url: `${process.env.WEB_URL}/blog/${post.slug}` || "",
        }}
      />
      <div className="mt-3">
        <Container tailWindClass="w-full md:px-20 lg:px-40 xl:px-60 2xl:px-80 px-5">
          <div>
            <div className="lg:flex w-full lg:gap-4 lg:justify-between">
              <div className="lg:w-7/12">
                <h1 className="text-dracula-orange text-4xl">{post.title}</h1>
                <div className="flex gap-2 mt-3">
                  {post.tagList.map((tag) => (
                    <p
                      key={tag}
                      className="bg-dracula-dark-800 hover:bg-dracula-dark-400  text-dracula-light text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
                <div className="flex items-center mt-3">
                  <Link href={post.author?.profileUrl || "#"}>
                    <div className="flex items-center gap-2">
                      <Image
                        className="inline-block rounded-full ring-2 ring-white"
                        src={post.author?.avatarUrl || ""}
                        alt={post.author?.name || " "}
                        width={30}
                        height={30}
                      />
                      <p className="text-dracula-purple">{post.author?.name}</p>
                    </div>
                  </Link>
                  <div className="mx-2 text-dracula-light">/</div>
                  <div className="text-dracula-green">{post.publishedDate}</div>
                </div>
              </div>
              <div className="lg:w-5/12">
                <Image
                  src={post.thumbnailUrl || ""}
                  width={300}
                  height={240}
                  alt={post.title}
                  className="lg:rounded-lg hidden lg:block w-full"
                />
              </div>
            </div>
            <div
              className="prose prose-strong:text-dracula-green prose-a:text-dracula-orange prose-code:text-dracula-purple prose-li:text-dracula-light prose-li::marker:text-color-purple"
              dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
            ></div>
          </div>
        </Container>
      </div>
    </>
  );
}

// getStaticPaths
export async function generateStaticParams() {
  const posts = await getBlogList();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
// getStaticProps
async function getBlog(slug: string): Promise<Post> {
  const thisSlug = slug;
  const postList = await getBlogList();
  const thisPost = postList.find((post) => post.slug === thisSlug);
  if (!thisSlug || !thisPost) {
    notFound();
  }
  // chuyen tu MD sang HTMl
  thisPost.htmlContent = await getMDToHTML(thisPost.mdContent || "");
  return thisPost;
}
