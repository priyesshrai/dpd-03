'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from "motion/react"

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <motion.header
            initial={{ opacity: 0}}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            animate={{ opacity: 1}}
            className='header'>
            <nav className='navbar'>
                <div className="menu-container">
                    <div className="logo-container">
                        <Link href='/'>
                            <Image src='/images/user/logo.png' width={200} height={27} alt='This is logo' />
                        </Link>
                    </div>
                    <div className={`links-container ${openMenu ? 'menu-active' : ""}`}>
                        <ul className='links-wraper'>
                            <li className='mob-logo'>
                                <Link href='/'>
                                    <Image src='/images/user/logo.png' width={220} height={50} alt='This is logo' />
                                </Link>
                            </li>
                            <li>
                                <Link href='/' className='active'>
                                    <i className="hgi hgi-stroke hgi-user-sharing"></i>
                                    <span>
                                        Profile
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/about'>
                                    <i className="hgi hgi-stroke hgi-user-square"></i>
                                    <span>
                                        About
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/services'>
                                    <i className="hgi hgi-stroke hgi-layers-01"></i>
                                    <span>
                                        Education/Experience
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/work'>
                                    <i className="hgi hgi-stroke hgi-ai-beautify"></i>
                                    <span>
                                        Projects / Activities
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/blog'>
                                    <i className="hgi hgi-stroke hgi-license-draft"></i>
                                    <span>
                                        Skills/ Tools
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`btn-container ${openMenu ? 'menu-active' : ""}`}>
                        <div className="btn-wraper">
                            {/* <div className="them-toggler">
                                <i className="hgi hgi-stroke hgi-sharp hgi-sun-02"></i>
                            </div> */}
                            <Link href='https://www.youtube.com/watch?v=Vmk_Uf1hLmM'>
                                <i className="hgi hgi-stroke hgi-video-replay"></i>
                                View Videos
                            </Link>
                        </div>
                    </div>
                    <div className="hamberger-container" onClick={() => setOpenMenu(!openMenu)}>
                        <i className="hgi hgi-stroke hgi-menu-04"></i>
                    </div>
                    <div className={`overlay ${openMenu ? 'menu-active' : ""} `} onClick={() => setOpenMenu(false)}></div>
                </div>
            </nav>
        </motion.header>
    )
}
