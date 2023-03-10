// thg nay se duoc goi bang getStaticProps o phia server nen se su dung dc file path, ... cua nodejs
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post, Tag } from "@/models";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify/lib";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
//icons
import javascript from "@/assests/icons/dev/javascript.svg";
import nextjs from "@/assests/icons/dev/nextdotjs.svg";
import reactjs from "@/assests/icons/dev/react.svg";
import redis from "@/assests/icons/dev/redis.svg";
import typescript from "@/assests/icons/dev/typescript.svg";
import nodejs from "@/assests/icons/dev/nodedotjs.svg";

export const devLanguages: Array<Tag> = [
  {
    name: "javascript",
    path: javascript,
    color: "#F7DF1E",
  },
  {
    name: "reactjs",
    path: reactjs,
    color: "#61DAFB",
  },
  {
    name: "redis",
    path: redis,
    color: "#DC382D",
  },
  {
    name: "nextjs",
    path: nextjs,
    color: "#000000",
  },
  {
    name: "nodejs",
    path: nodejs,
    color: "#339933",
  },
  {
    name: "typescript",
    path: typescript,
    color: "#3178C6",
  },
];

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
      type: data.type,
      tagList: data.tags.map((tag: string) => getDevLogoIcons(tag)),
      publishedDate: data.date,
      description: excerpt || "",
      mdContent: content,
    });
  }
  return postList;
}
export async function getMDToHTML(mdContent: string) {
  const file =
    (await unified()
      .use(remarkParse)
      .use(remarkToc, { heading: "M???c l???c" })
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: "wrap" })
      .use(rehypeDocument, { title: "some ting wong" })
      .use(rehypeFormat)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(mdContent)) || unified;

  return file.toString();
}

export async function getBlogBySlug(slug: string): Promise<Post | undefined> {
  const blogList = await getBlogList();
  return blogList.find((blog) => blog.slug === slug);
}

export function sortBlogByDate(blogList: Post[]): Post[] {
  return blogList.sort(
    (prevBlog, currentBlog) =>
      new Date(currentBlog.publishedDate).getTime() -
      new Date(prevBlog.publishedDate).getTime()
  );
}

export async function getSortedBlogList(): Promise<Post[]> {
  const blogList = await getBlogList();
  return sortBlogByDate(blogList);
}

function getDevLogoIcons(name: string): Tag {
  let tag = devLanguages.find(
    (language) => language.name === name.toLowerCase()
  );
  if (!tag) {
    return {
      name,
      path: undefined,
      color: "",
    };
  }
  return tag;
}
