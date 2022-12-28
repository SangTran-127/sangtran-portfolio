import { Post } from '@/models'
import React from 'react'

interface BlogCardProps {
    blog: Post
    lastest?: boolean
}

export default function BlogCard ({blog}: BlogCardProps) {

  return (
    <div>{blog.title}</div>
  )
}

