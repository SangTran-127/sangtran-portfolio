"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import avatarUrl from '@/assests/images/waves.png'
import LogoTitle from '@/assests/logo/logo-s.png'
import AnimatedLetter from './AnimatedLetter'

const HeroSection = () => {
    const [letterClass, setLetterClass] = useState<string>('text-animate')
    const nameArray = ['a', 'n', 'g']
    const jobArray = ['W', 'e', 'b', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']
    function popupLetters() {
        window.setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }
    useEffect(() => {
        console.log('re-render');
        popupLetters()
    }, [])
    return (
        <section className='xs:pt-4 md:pt-18'>
            <div className='container max-w-screen-lg px-20 mx-auto hero-container md:flex md:justify-between md:items-center'>
                <div className='text-zone text-center min-w-max' >
                    <div className='mb-3'>
                        <h1 className='pt-5'>
                            <span className={letterClass}>H</span>
                            <span className={`${letterClass} _12`}>i,</span>
                            <br />
                            <span className={`${letterClass} _13`}>I</span>
                            <span className={`${letterClass} _14`}>&apos;m</span>
                            <span>{' '}</span>
                            <Image src={LogoTitle} alt='Sang' className='logo-img' />
                            <AnimatedLetter letterClass={letterClass} idx={15} strArray={nameArray} />
                            <br />
                            <AnimatedLetter letterClass={letterClass} idx={22} strArray={jobArray} />
                        </h1>
                    </div>
                    <h2 className='my-2'>Welcome to my Portfolio</h2>
                    <button className='contact-button'>Contact Me &rarr;</button>
                </div>
                <div className='py-5 hidden md:block'>
                    <Image src={avatarUrl} alt='avatar' style={{ boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px', color: '#282A36', borderRadius: '50%' }} width="400" />
                </div>
            </div>

        </section >
    )
}

export default HeroSection
