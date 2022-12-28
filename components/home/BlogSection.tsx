import React from 'react'
import { getBlogList } from '@/utils';
import Container from '../layout/Container';
import BlogCard from '../blog/BlogCard';



interface BlogSectionProps {}


export default async function BlogSection (props: BlogSectionProps) {

    const blogList = await getBlogList();
    // get lastest day
    const sectionList = blogList.sort((prevBlog, currentBlog) => new Date(prevBlog.publishedDate).getTime() - new Date(currentBlog.publishedDate).getTime())

    sectionList.forEach((b) => {
        console.log(b.publishedDate);
        
    })
    const [lastestBlog, ...restBlog] = sectionList
    return (
        <Container tailWindClass='max-w-screen-lg md:px-20 mx-auto px-3'>
            <>
                <h1 className='text-dracula-light text-center text-3xl'>Stories & Blog</h1>
                <p className='text-dracula-dark-300 text-center'>The lastest blog</p>
                <div className='grid grid-cols-2 grid-rows-3'>
                    <div>
                        <BlogCard blog={lastestBlog}/>
                    </div>

                    <div>
                        {restBlog.map((blog) => (
                            <div key={blog.title}>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                  
                </div>
            </>
        </Container>
    )
}

