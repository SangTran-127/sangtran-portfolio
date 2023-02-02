"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/legacy/image';
import PostItem from '@/components/blog/PostItem'
import { Post, Tag } from '@/models'
import React, { useState, useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Badge from './Badge';


interface BlogContainerProps {
    blogList: Post[]
    devLanguages: Tag[]
    typeList: string[]
}

interface Item {
    id: string | number;
    name: string;
    slug: string;
}

function filterByTag(postList: Post[], filter: string[]) {
    return postList.filter(post => filter.every(tag => {
        const ls = convertTag(post.tagList)
        return ls.includes(tag)
    }))

}
function convertTag(tagList: Tag[]): string[] {
    return tagList.map((tag) => tag.name)
}

const BlogContainer = ({ blogList, devLanguages, typeList }: BlogContainerProps) => {

    const router = useRouter();
    const [postList, setPostList] = useState<Post[]>(blogList);
    const [activeTag, setActiveTag] = useState<Tag[]>([])
    const items: Item[] = blogList.map((blog) => ({
        id: blog.id,
        name: blog.title,
        slug: blog.slug
    }))
    const handleClickTag = (tagName: Tag) => {

        setActiveTag((prev) => {
            if (prev.includes(tagName)) {

                return prev.filter((prevTagName) => prevTagName != tagName)
            }
            return [...prev, tagName]

        })
    }
    const handleOnSelected = (item: Item) => {
        router.push('/blog/' + item.slug)
    }

    useEffect(() => {
        const blogs = filterByTag(blogList, convertTag(activeTag))
        console.log("render")
        setPostList(blogs)
    }, [activeTag, blogList])

    return (
        <div className='flex flex-col gap-6'>
            <div>
                <ReactSearchAutocomplete<Item>
                    items={items}
                    onSelect={handleOnSelected}
                    placeholder="Search me"
                />
            </div>
            {/* <div className='flex justify-center gap-3'>
                {typeList.map((type) => (
                    <div key={type} className='bg-dracula-dark-800 hover:bg-dracula-dark-400  text-dracula-light mr-2 px-2.5 py-0.5 rounded cursor-pointer'>
                        #{type}
                    </div>
                ))}
            </div> */}
            <div className='flex justify-center flex-wrap gap-1 items-center'>
                {devLanguages.map((tag) => (
                    <Badge
                        tag={tag}
                        key={tag.name}
                        handleActiveBadge={handleClickTag}
                        active={activeTag.includes(tag)}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-3">
                {postList.length !== 0 ? postList.map((blog) => (
                    <div key={blog.id}>
                        <PostItem post={blog} />
                    </div>
                )) : <div className='text-center'>Danh sáchh rỗng 😭</div>}
            </div>
        </div>
    )
}

export default BlogContainer

