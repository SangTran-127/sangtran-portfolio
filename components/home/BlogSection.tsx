import React from 'react'
import { getBlogList } from '@/utils';
import Container from '../layout/Container';
interface BlogSectionProps {}



export default async function BlogSection (props: BlogSectionProps) {
    const blogList = await getBlogList();
    const sectionList = blogList.sort((prevBlog, currentBlog) => Number(currentBlog.publishedDate) - Number(prevBlog.publishedDate))

    sectionList.forEach((b) => {
        console.log(b.publishedDate);
        
    })
    
    return (
        <Container tailWindClass='max-w-screen-lg md:px-20 mx-auto hero-container md:flex md:justify-between md:items-center px-3'>
            <>
                <h1>Stories & Blog</h1>
                <p>The lastest blog</p>
                <div className='grid'>

                </div>
            </>
        </Container>
    )
}

