
import HeroSection from '@/components/home/HeroSection'
import BlogSection from '@/components/home/BlogSection'
import React, {Suspense} from 'react'


const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <Suspense fallback={<div>Loading ...</div>}>
                {/* @ts-expect-error */}
                <BlogSection />
            </Suspense>
        </div>
    )
}

export default HomePage