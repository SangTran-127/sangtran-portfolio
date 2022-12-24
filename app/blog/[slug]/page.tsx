// import { Seo } from '@/components/common'
// import { MainLayout } from '@/components/layout'
import { Post } from '@/models'
import { getBlogList } from '@/utils'
// import { Box, Container, Typography } from '@mui/material'
// import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from "next/navigation"

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify/lib'
import remarkParse from 'remark-parse/lib'
import remarkPrism from 'remark-prism'
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import { unified } from 'unified'
interface PageParams {
    slug: string;
};

interface PageProps {
    params: PageParams;
};



export default async function BlogDetail({ params }: PageProps) {

    const { slug } = params
    const post = await getBlog(slug)
    // console.log(post);

    return (
        <div className='mt-3'>
            <div className='w-full container mx-auto md:px-20 lg:px-40 xl:px-60 2xl:px-80 px-5'>
                <h1 className='text-dracula-orange text-4xl'>{post.title}</h1>
                <div className='flex items-center mt-3'>
                    <Link href={post.author?.profileUrl || '#'}>
                        <div className='flex items-center gap-2'>
                            <Image className='inline-block rounded-full ring-2 ring-white' src={post.author?.avatarUrl || ''} alt={post.author?.name || ' '} width={30} height={30} />
                            <p className='text-dracula-purple'>{post.author?.name}</p>
                        </div>
                    </Link>
                    <div className='mx-2 text-dracula-light'>/</div>
                    <div className='text-dracula-green'>{post.publishedDate}</div>
                </div>
                <div className='prose prose-strong:text-dracula-green prose-a:text-dracula-orange prose-code:text-dracula-purple prose-li:text-dracula-light prose-li::marker:text-color-purple' dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}>
                </div>
            </div>
            <Script src='/prism.js' strategy='afterInteractive'></Script>
        </div>
    )
}


// export const getStaticPaths: GetStaticPaths = async () => {
//     const postList = await getBlogList();
//     return {
//         paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
//         fallback: false
//     }
// }
{/* <Seo data={{
                title: `${post.title} | Sang's Blog`,
                description: post.description,
                thumbnailUrl: post.thumbnailUrl || '',
                url: `${process.env.HOST_URL}/blog/${post.slug}` || ''
            }} /> */}




// getStaticPaths
export async function generateStaticParams() {
    const posts = await getBlogList();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}
// getStaticProps
async function getBlog(slug: string): Promise<Post> {
    const thisSlug = slug
    const postList = await getBlogList()
    const thisPost = postList.find((post) => post.slug === thisSlug)
    if (!thisSlug || !thisPost) {
        notFound()
    }
    // chuyen tu MD sang HTMl
    const file = await unified()
        .use(remarkParse)
        .use(remarkToc, { heading: 'Mục lục' })
        // .use(remarkPrism)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
        .use(rehypeDocument, { title: 'some ting wong' })
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(thisPost.mdContent || '') || unified
    thisPost.htmlContent = file.toString()
    return thisPost

}

