
import { Post } from '@/models'
import { getBlogList } from '@/utils'
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
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import { unified } from 'unified'
import remarkPrism from 'remark-prism'
import Container from '@/components/layout/Container'

interface PageParams {
    slug: string;
};

interface PageProps {
    params: PageParams;
};



export default async function BlogDetail({ params }: PageProps) {

    const { slug } = params
    const post = await getBlog(slug)

    return (
        <div className='mt-3'>
            <Container tailWindClass='w-full md:px-20 lg:px-40 xl:px-60 2xl:px-80 px-5'>
                <>
                <h1 className='text-dracula-orange text-4xl'>{post.title}</h1>
                <div className='flex gap-2 mt-3'>
                    {post.tagList.map((tag) => (
                        <p key={tag} className='bg-dracula-dark-800 hover:bg-dracula-dark-400  text-dracula-light text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>
                            {tag}
                        </p>
                    ))}
                </div>
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
                </>
            </Container>
            <Script src='/prism.js' strategy='afterInteractive'></Script>
        </div>
    )
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

