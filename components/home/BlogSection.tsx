import React from 'react'
import { getBlogList } from '@/utils';
import Container from '../layout/Container';
interface BlogSectionProps {}



export default async function BlogSection (props: BlogSectionProps) {
    const blogList = await getBlogList();
    const lastestBlog = blogList.reduce((prevBlog, blog) => Number(prevBlog.publishedDate) > Number(blog.publishedDate) ? prevBlog : blog)
    console.log(lastestBlog.publishedDate);
    return (
        <Container tailWindClass='max-w-screen-lg md:px-20 mx-auto hero-container md:flex md:justify-between md:items-center px-3'>
            <>
                <h1>Caksdk</h1>
            </>
        </Container>
    )
}

