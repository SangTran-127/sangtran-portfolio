"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { ROUTE_LIST } from '../route-list'
import { usePathname } from 'next/navigation'
import logo from '@/assests/images/ide.png'
const HeaderDesktop = () => {
    const pathname = usePathname()
    console.log(pathname);
    return (
        <div className='md:block hidden py-2'>
            <div className='container mx-auto max-w-screen-lg px-20'>
                <div className='flex justify-between items-center'>
                    <Image src={logo} alt='My Logo' width={50} />
                    <div className='flex justify-end text-dracula-light '>
                        {
                            ROUTE_LIST.map((route) => (
                                <Link key={route.path} href={route.path} passHref>
                                    <button className={clsx({ "text-dracula-green": pathname === route.path }, 'ml-3')}>
                                        <p className='hover:text-dracula-blue'>{route.label}</p>
                                    </button>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HeaderDesktop