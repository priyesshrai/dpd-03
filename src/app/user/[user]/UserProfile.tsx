'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from "motion/react"
import { usePathname } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { ApiEducation, ApiProject, ApiSkill, ApiWorkExp, HeroProps } from '../../../../types'
import { HeroSkeleton, ProjectSkeleton, SideBarSkeleton, SkillSkeleton } from '@/components/Skeleton/Skeleton'
import Cookies from "js-cookie";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { useUserContext } from '@/context/UserContext'


interface MenuItem {
    menuName: string
    path: string
    icon: string
}

export default function UserProfile() {
    const { userData, user, loading } = useUserContext()

    return (
        <>
            <Hero userData={userData} loading={loading} userName={user} />
            <Toaster />
        </>
    )
}

export function UserHeader({ userName }: { userName: string }) {
    const pathname = usePathname()
    const menu: MenuItem[] = [
        {
            menuName: "Home",
            path: `/user/${userName}`,
            icon: "hgi hgi-stroke hgi-home-01"
        },
        {
            menuName: "About",
            path: `/user/${userName}/about`,
            icon: "hgi hgi-stroke hgi-user-account"
        },
        {
            menuName: "Work/Education",
            path: `/user/${userName}/work`,
            icon: "hgi hgi-stroke hgi-briefcase-01"
        },
        {
            menuName: "Skills/Tools",
            path: `/user/${userName}/expert-area`,
            icon: "hgi hgi-stroke hgi-ai-idea"
        },
        {
            menuName: "Contact",
            path: `/user/${userName}/contact`,
            icon: "hgi hgi-stroke hgi-mail-01"
        }
    ]
    const [openMenu, setOpenMenu] = useState(false);
    function handleLogOut() {
        Cookies.remove("data");
        toast.success("Logout Successful...!")
        window.location.href = '/';
        return;
    }

    const isActiveLink = (menuPath: string): boolean => {
        if (menuPath === `/user/${userName}`) {
            return pathname === menuPath
        }
        return pathname.startsWith(menuPath)
    }
    const closeMenu = (): void => {
        setOpenMenu(false)
    }

    return (
        <motion.header
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            animate={{ opacity: 1 }}
            className='header'>
            <nav className='navbar'>
                <div className="menu-container">
                    <div className="logo-container">
                        <Link href={'/user/' + userName}>
                            <Image src='/images/user/logo.png' width={200} height={27} alt='This is logo' />
                        </Link>
                    </div>
                    <div className={`links-container ${openMenu ? 'menu-active' : ""}`}>
                        <ul className='links-wraper'>
                            <li className='mob-logo'>
                                <Link href={'/user/' + userName}>
                                    <Image src='/images/user/logo.png' width={220} height={50} alt='This is logo' />
                                </Link>
                            </li>
                            {
                                menu.map((menu) => (
                                    <li key={menu.menuName}>
                                        <Link onClick={closeMenu} href={menu.path}
                                            className={isActiveLink(menu.path) ? 'active' : ''}>
                                            <i className={menu.icon} aria-hidden="true"></i>
                                            <span>
                                                {menu.menuName}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={`btn-container ${openMenu ? 'menu-active' : ""}`}>
                        <div className="btn-wraper">
                            {/* <div className="them-toggler">
                                <i className="hgi hgi-stroke hgi-sharp hgi-sun-02"></i>
                            </div> */}
                            {/* <Link href='https://www.youtube.com/watch?v=Vmk_Uf1hLmM'>
                                <i className="hgi hgi-stroke hgi-video-replay"></i>
                                View Videos
                            </Link> */}
                            <button onClick={handleLogOut}>Logout</button>
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

export function SideBar({ userData, loading, userName }: HeroProps) {
    const currentPath = usePathname()
    const [showShareMenu, setShowShareMenu] = useState<boolean>(false)
    const [shareLink, setShareLink] = useState<string>("")

    const bio = userData?.introduction ?? ""

    const getTrimmedBio = () => {
        if (currentPath.startsWith("/user")) {
            const plainText = bio.replace(/<[^>]+>/g, '')
            const shortened = plainText.length > 100 ? plainText.substring(0, 220) + "..." : plainText
            return shortened
        }
        return bio
    }

    function openShareModal(slug: string) {
        setShareLink(slug)
        setShowShareMenu(true)
    }
    return (
        <>
            {
                loading ? <SideBarSkeleton /> : (
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        className='side-bar'
                    >
                        <div className="side-bar-wraper">
                            <div className="profile-container">
                                <Image src={userData?.profile_photo || "/images/profile/default.png"}
                                    width={1080} height={1080} alt='Profile' />
                            </div>
                            <div className="user-data">
                                <h1>{userData?.name ?? ""}</h1>

                                <p dangerouslySetInnerHTML={{ __html: getTrimmedBio() }} />

                                <div className="social-media-container">
                                    {
                                        userData?.instagram_link ? (<Link href={userData.instagram_link} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-instagram"></i></Link>) : ("")
                                    }
                                    {
                                        userData?.linkedin_link ? (<Link href={userData?.linkedin_link} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-linkedin-01"></i></Link>) : ("")
                                    }
                                    {
                                        userData?.facebook_link ? (<Link href={userData?.facebook_link} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-facebook-01"></i></Link>) : ("")
                                    }
                                    {
                                        userData?.youtube_link ? (<Link href={userData?.youtube_link} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-youtube"></i></Link>) : ("")
                                    }
                                    {
                                        userData?.twitter_link ? (<Link href={userData?.twitter_link} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-new-twitter"></i></Link>) : ("")
                                    }
                                </div>

                                <div className="cta-button-container">
                                    <button onClick={() => openShareModal(userData?.profile_slug)}>Share</button>
                                    <Link href={`/user/${userName}/profile`}>
                                        Update
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            }
            {
                showShareMenu &&
                <Share setShowShareMenu={setShowShareMenu} shareLink={shareLink} />
            }
        </>
    )
}

function Hero({ userData, loading, userName }: HeroProps) {
    return (
        <>
            <div className="work-block">
                <div className="work-block-wraper">
                    {
                        loading ? (<HeroSkeleton />) : (

                            <motion.div
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.2, ease: "easeInOut", delay: 0.15 }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                className="block    ">
                                <div className="block-wraper">
                                    <div className="title">
                                        <h2>Education/Work Ex.</h2>
                                    </div>
                                    <div className="content">
                                        <Marquee direction="up" pauseOnHover={true} className='[--duration:1s]'>
                                            <div className="content-wraper">
                                                <div className="details">
                                                    <div className="details-wraper" style={{ padding: "0" }}>
                                                        <div className="company-name">
                                                            <p style={{ fontSize: "20px" }}>Education</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    userData?.education_list?.map((edu: ApiEducation) => (
                                                        <div className="details" key={edu.education_nid}>
                                                            <div className="details-wraper">
                                                                <div className="company-name">
                                                                    <p>{edu.passing_year} - {edu.degree_title}</p>
                                                                    <span>{edu.from_institute}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                <hr />
                                                <div className="details">
                                                    <div className="details-wraper" style={{ padding: "0" }}>
                                                        <div className="company-name">
                                                            <p style={{ fontSize: "20px" }}>Work Experience</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    userData?.work_exp_list?.map((work: ApiWorkExp) => (
                                                        <div className="details" key={work.work_exp_nid}>
                                                            <div className="details-wraper">
                                                                <div className="company-name">
                                                                    <p>{work.working_years} - {work.last_designation},  {work.company_name}</p>
                                                                    <span>{work.brief_job_profile}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </Marquee>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }

                    {
                        loading ? (<SkillSkeleton />) : (

                            <motion.div
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.2, ease: "easeInOut", delay: 0.2 }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                className="block second">
                                <div className="block-wraper">
                                    <div className="title">
                                        <h2>My Expert Area</h2>
                                    </div>
                                    <div className="block-area">
                                        <div className="block-area-wraper">
                                            {
                                                userData?.expert_area_list?.map((skill: ApiSkill) => (
                                                    <div className="item" key={skill.expert_area_nid}>
                                                        <div className="item-icon">
                                                            <Image src={skill.expertise_icon}
                                                                width={200} height={200}
                                                                alt={skill.expertise_name_details} />
                                                        </div>
                                                        <span>{skill.expertise_name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </div>
            </div>

            <div className="project-block">
                {
                    loading ? (
                        <div className="project-block-wraper">
                            <ProjectSkeleton />
                        </div>
                    ) : (

                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.22 }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            className="project-block-wraper">
                            <div className="title">
                                <h2>Recent Projects</h2>
                                <Link href={`/user/${userName}/work`}>
                                    All Project
                                    <i className="hgi hgi-stroke hgi-arrow-right-02"></i>
                                </Link>
                            </div>
                            <div className="block-layout-content">
                                {
                                    userData?.recent_project_list?.slice(0, 3)?.map((project: ApiProject) => (
                                        <React.Fragment key={project.recent_project_nid}>
                                            <h3>
                                                <Link href={project.project_link ?? ""} target='_blank'>
                                                    {project.title}
                                                </Link>
                                                <Link target='_blank'
                                                    href={project.recent_project_img!}
                                                    download={project.recent_project_img!}
                                                    rel="noopener noreferrer">

                                                    <i className="hgi hgi-stroke hgi-ai-image"></i>
                                                </Link>
                                            </h3>
                                            <p>{project.project_description}</p>
                                            <br />
                                        </React.Fragment>
                                    ))
                                }
                            </div>

                        </motion.div>
                    )
                }
            </div>
        </>
    )
}

export function Footer() {
    return (
        <footer>
            Copyright 2025 @ Wizards |
            Design By &nbsp;
            <a href="https://www.wizards.co.in">
                Wizards
            </a>
        </footer>
    )
}

type Share = {
    setShowShareMenu: React.Dispatch<React.SetStateAction<boolean>>;
    shareLink: string
}

function Share({ setShowShareMenu, shareLink }: Share) {
    const defaultLink: string = "https://dpd.profilebuilder.in/public/user/"

    const containerRef = useRef<HTMLDivElement | null>(null)

    async function handleCopy() {
        await navigator.clipboard.writeText(`https://dpd.profilebuilder.in/public/user/${shareLink}`);
        toast.success("Link copied!");
    }

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const modalElement = containerRef.current?.querySelector('.share-card');
        if (modalElement && !modalElement.contains(e.target as Node)) {
            setShowShareMenu(false);
        }
    }
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowShareMenu(false);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    return (
        <div className='share-section' ref={containerRef} onClick={handleOutsideClick} >
            <div className="share-section-wraper">
                <div className="share-card">
                    <div className="share-card-wraper">
                        <div className="share-close-btn">
                            <div onClick={() => setShowShareMenu(false)}>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="share-icons">
                            <Link
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(defaultLink + shareLink)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-icons-container wp">
                                <i className="hgi hgi-stroke hgi-whatsapp"></i>
                            </Link>

                            <Link
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(defaultLink + shareLink)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-icons-container lk">
                                <i className="hgi hgi-stroke hgi-linkedin-02"></i>
                            </Link>

                            <Link
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(defaultLink + shareLink)}&text=Check out this profile!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-icons-container tw">
                                <i className="hgi hgi-stroke hgi-twitter"></i>
                            </Link>

                            <Link
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(defaultLink + shareLink)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-icons-container fb">
                                <i className="hgi hgi-stroke hgi-facebook-02"></i>
                            </Link>

                            <Link
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-icons-container in"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toast("Instagram does not support direct link sharing. Copy the link and paste it in your post.");
                                }}>
                                <i className="hgi hgi-stroke hgi-instagram"></i>
                            </Link>
                        </div>

                        <div className="copy-link">
                            <input type="text" value={defaultLink + shareLink} readOnly />
                            <i className="hgi hgi-stroke hgi-copy-01" onClick={handleCopy}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}