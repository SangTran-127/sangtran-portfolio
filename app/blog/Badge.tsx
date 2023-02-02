import { Tag } from '@/models'
import React from 'react'
import Image from 'next/image'
interface BadgeProps {
    active?: boolean
    tag: Tag
    handleActiveBadge: (tagName: Tag) => void
}

const Badge = ({ active = false, tag, handleActiveBadge }: BadgeProps) => {
    return (
        <div className={`flex items-center gap-2 ${active ? `bg-white text-dracula-darker-900` : `bg-dracula-dark-800 hover:bg-dracula-dark-400  text-dracula-light`}  mr-2 px-2.5 py-0.5 rounded cursor-pointer`}
            onClick={() => handleActiveBadge(tag)}
        >
            {
                tag.path && <Image src={tag.path} alt={tag.name} style={{
                    fill: tag.color
                }} />
            }
            <p
                className=" text-xs font-semibold"
            >
                {tag.name}
            </p>
        </div>
    )
}

export default Badge