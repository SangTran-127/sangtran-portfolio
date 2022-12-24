import { Post } from '@/models'
import { format } from 'date-fns'
interface PostItemProps {
    post: Post
}

const PostItem = ({ post }: PostItemProps) => {
    return (
        <div className='text-dracula-light'>
            <h5 className='text-dracula-light'>{post.title}</h5>
            <div className='my-2'>
                <p className='flex text-dracula-light'>
                    {format(new Date(post.publishedDate), 'dd MMM yyyy')}
                </p>
                <br />
                <p className='flex text-dracula-light'>
                    {post.tagList.join(', ')}
                </p>
            </div>
            <p className='text-dracula-light'>{post.description}</p>
        </div>
    )
}

export default PostItem