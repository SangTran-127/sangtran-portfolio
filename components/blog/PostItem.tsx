import { Post } from "@/models";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="text-dracula-light flex gap-2 max-w-4xl">
      <div className="lg:w-4/12 md:w-5/12 hidden md:block">
        <Image
          src={post.thumbnailUrl || ""}
          alt={post.title}
          width={300}
          height={300}
          className="rounded-lg"
        />
      </div>
      <div className="lg:w-8/12 md:w-7/12 flex flex-col justify-between gap-2 md:gap-0">
        <Link href={`/blog/${post.slug}`} legacyBehavior>
          <a className="text-dracula-orange text-xl">{post.title}</a>
        </Link>
        <div className="flex items-center my-1">
          <Link href={post.author?.profileUrl || "#"}>
            <div className="flex items-center gap-2">
              <Image
                className="inline-block rounded-full ring-2 ring-white"
                src={post.author?.avatarUrl || ""}
                alt={post.author?.name || " "}
                width={20}
                height={20}
              />
              <p className="text-dracula-purple text-sm">{post.author?.name}</p>
            </div>
          </Link>
          <p className="mx-1"> - </p>
          <p className="text-dracula-green text-xs">
            {format(new Date(post.publishedDate), "dd MMM yyyy")}
          </p>
        </div>
        <div className="">
          <div className="flex text-dracula-light">
            {post.tagList.map((tag) => (
              <div key={tag.name} className="flex items-center gap-2 bg-dracula-dark-800 hover:bg-dracula-dark-400  mr-2 px-2.5 py-0.5 rounded">
                {
                  tag.path && <Image src={tag.path} alt={tag.name} style={{
                    color: 'red'
                  }} />
                }
                <p
                  className=" text-dracula-light text-xs font-semibold"
                >
                  {tag.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
          <p className="text-dracula-dark-300">{post.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
