"use client"
import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathName = usePathname();
    return (
        <section className='sticky left-0 top-0 h-screen w-fit flex flex-col justify-between bg-dark-1 p-6 pt-28 max-sm:hidden lg:w-[264px] text-white'>
            <div className='flex flex-1 flex-col gap-6'>
                {sideBarLinks.map((link) => {
                    const isActive = pathName === link.route;

                    return (
                        <Link href={link.route} key={link.label}
                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', { 'bg-blue-1': isActive, })}
                        >
                            <Image src={link.imgUrl}
                                alt={link.label}
                                height={24} width={24}
                            />
                            <p className='font-semibold text-lg max-lg:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar
