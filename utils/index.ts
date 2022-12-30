// thg nay se duoc goi bang getStaticProps o phia server nen se su dung dc file path, ... cua nodejs
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post } from "@/models";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify/lib";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { unified } from "unified";
import remarkPrism from "remark-prism";
import rehypeHighlight from "rehype-highlight";

const BLOG_FOLDER = path.join(process.cwd(), "blogs_store");

export async function getBlogList(): Promise<Post[]> {
  const filenameList = fs.readdirSync(BLOG_FOLDER);
  const postList: Post[] = [];
  for (const filename of filenameList) {
    const filePath = path.join(BLOG_FOLDER, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, excerpt, content } = matter(fileContents, {
      excerpt_separator: "<!-- truncate-->",
    });
    postList.push({
      id: filename,
      slug: data.slug,
      title: data.title,
      thumbnailUrl: data.image,
      author: {
        name: data.author,
        title: data.author_title,
        profileUrl: data.author_url,
        avatarUrl: data.author_image_url,
      },
      tagList: data.tags,
      publishedDate: data.date,
      description: excerpt || "",
      mdContent: content,
    });
  }
  return postList;
}
export async function getMDToHTML(mdContent: string) {
  // console.log(remarkPrism.toString());
  const file =
    (await unified()
      .use(remarkParse)
      .use(remarkToc, { heading: "Mục lục" })
      // .use(remarkPrism)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: "wrap" })
      .use(rehypeDocument, { title: "some ting wong" })
      .use(rehypeFormat)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(mdContent)) || unified;
  // const finalFileHTML = hljs.highlightAuto(file.toString()).value;
  return file.toString();
}
