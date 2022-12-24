

import React from 'react'
import { getBlogList } from '@/utils'
import { Post } from '@/models'
import Link from 'next/link'
import PostItem from '@/components/blog/PostItem'
// import { Seo } from '@/components/common'



async function getBlogAPI() {
    const blogList = await getBlogList();
    return blogList
}

export default async function BlogPage() {
    const blogList = await getBlogAPI()
    return (
        <div className='text-dracula-light'>
            {/* <Seo data={{
                title: `Sang's Blog`,
                description: 'This my blog, hope you find something interesting',
                thumbnailUrl: '',
                url: `${process.env.HOST_URL}/blog` || ''
            }} /> */}
            <div>
                <h3>Blog</h3>
                <ul>
                    {
                        blogList.map((blog) => (
                            <li key={blog.id}>
                                <Link href={`/blog/${blog.slug}`} legacyBehavior>
                                    <a>
                                        <PostItem post={blog} />
                                    </a>
                                </Link>
                                <br />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

