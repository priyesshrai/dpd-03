'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from "motion/react"
import { usePathname } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { ApiAchievement, ApiEducation, ApiProject, ApiSkill, ApiSocialActivity, ApiTool, ApiWorkExp, HeroProps } from '../../../../types'
import { AchieSkeleton, HeroSkeleton, ProjectSkeleton, SideBarSkeleton, SkillSkeleton, ToolsSkeleton, YoutubeSkeleton } from '@/components/Skeleton/Skeleton'
import Cookies from "js-cookie";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";


type UserProfileProps = {
    userName: string;
};

export default function UserProfile({ userName }: UserProfileProps) {
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        async function getUser() {
            if (!userName) {
                Cookies.remove("data");
                toast.error('Please provide a valid username!');
                router.push('/login');
                setLoading(false)
                return;
            }

            try {
                const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${userName}`);
                if (response.data.status === false) {
                    Cookies.remove("data")
                    toast.error(response.data.message ?? 'Profile Not Found of This User....!');
                    router.push('/login');
                    setLoading(false)
                    return;
                }
                setUserData(response?.data?.data)
                setLoading(false)
            } catch (error) {
                Cookies.remove("data");
                console.log(error);
                toast.error('Profile Not Found of This User....!');
                router.push('/login');
                setLoading(false)
                return
            }
        }

        getUser();
    }, [userName, router]);

    if (!userName) {
        Cookies.remove("data")
        alert("Sorry...! User Not found with UserName. Please provide a valid UserName.");
        router.push('/login');
        return;
    }

    return (
        <>
            <UserHeader userName={userName} />
            <Hero userData={userData} loading={loading} userName={userName} />
            <Footer />
            <Toaster />
        </>
    )
}

export function UserHeader({ userName }: { userName: string }) {
    const [openMenu, setOpenMenu] = useState(false);
    function handleLogOut() {
        Cookies.remove("data");
        toast.success("Logout Successful...!")
        window.location.href = '/';
        return;
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
                            <li>
                                <Link href={'/user/' + userName} className='active'>
                                    <i className="hgi hgi-stroke hgi-user-sharing"></i>
                                    <span>
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={userName + '/profile'} className=''>
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

function SideBar({ userData, loading, userName }: HeroProps) {
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
                                    <Link href={`${userName}/profile`}>
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
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const images = userData?.recent_project_list?.map((project: ApiProject) => ({
        src: project.recent_project_img,
        width: 1920,
        height: 1080,
    })) || [];

    return (
        <section className='hero-section'>
            <div className="hero-section-wraper">
                <SideBar userData={userData} loading={loading} userName={userName} />

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
                                    <Link href='#'>
                                        All Project
                                        <i className="hgi hgi-stroke hgi-arrow-right-02"></i>
                                    </Link>
                                </div>
                                <div className="block-layout-content">
                                    {
                                        userData?.recent_project_list?.slice(0, 3)?.map((project: ApiProject, i: number) => (
                                            <React.Fragment key={project.recent_project_nid}>
                                                <h3>
                                                    <Link href={project.project_link ?? ""} target='_blank'>
                                                        {project.title}
                                                    </Link>
                                                    <i className="hgi hgi-stroke hgi-ai-image"
                                                        onClick={() => {
                                                            setIndex(i);
                                                            setOpen(true);
                                                        }}></i>
                                                </h3>
                                                <p>{project.project_description}</p>
                                                <br />
                                            </React.Fragment>
                                        ))
                                    }
                                    <Lightbox
                                        open={open}
                                        close={() => setOpen(false)}
                                        slides={images}
                                        index={index}
                                        plugins={[Zoom, Fullscreen, Slideshow]}
                                    />
                                </div>

                            </motion.div>
                        )
                    }
                </div>
            </div>

            <div className="second-layout">
                <div className="second-layout-wraper">
                    {
                        loading ? (<AchieSkeleton />) : (

                            <div className="first-layout-block layout-block">
                                <div className="block-layout-wraper">
                                    <div className="title">
                                        <h2>Achievements</h2>
                                    </div>
                                    <div className="block-layout-content">
                                        <div className='im'>
                                            <ul>
                                                {
                                                    userData?.achievement_list?.map((achi: ApiAchievement) => (
                                                        <li key={achi.achievement_nid}>
                                                            <div className='li-sep'>
                                                                <Link href={achi.achievement_url ?? ""} target='_blank'>
                                                                    <strong>{achi.title}</strong></Link>
                                                                {
                                                                    achi.achievement_image ? (
                                                                        <a href=''>
                                                                            <i className="hgi hgi-stroke hgi-image-01"></i>
                                                                        </a>
                                                                    ) : (
                                                                        <i className="hgi hgi-stroke hgi-image-01"></i>
                                                                    )
                                                                }
                                                            </div>

                                                            {achi.achievement_description}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        loading ? (<AchieSkeleton />) : (
                            <div className="second-layout-block layout-block">
                                <div className="block-layout-wraper">
                                    <div className="title">
                                        <h2>Social Activities</h2>
                                    </div>
                                    <div className="block-layout-content">
                                        <ul>
                                            {
                                                userData?.social_activities_list?.map((activity: ApiSocialActivity) => (
                                                    <li key={activity.social_activities_nid}>
                                                        <strong>{activity.title}</strong> - {activity.description}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="third-layout">
                <div className="third-layout-wraper">
                    <div className="third-layout-block first-third-layout">

                        {
                            loading ? (<ToolsSkeleton />) : (
                                <div className="third-block-layout-wraper">
                                    <div className="title">
                                        <h2>Tools I Use</h2>
                                        <Link href='#'>
                                            See All
                                            <i className="hgi hgi-stroke hgi-arrow-right-02"></i>
                                        </Link>
                                    </div>
                                    <div className="third-content">
                                        {
                                            userData?.tools_list?.map((tools: ApiTool) => (
                                                <div className="card" key={tools.tools_nid}>
                                                    <div className="card-icon">
                                                        <Image
                                                            src={tools.tools_image ?? "/images/icons/dummy.svg"}
                                                            alt={tools?.title}
                                                            width={60} height={60} />
                                                    </div>
                                                    <span>{tools.title}</span>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <div className="third-layout-block second-third-layout">
                        {
                            loading ? (<YoutubeSkeleton />) : (
                                <div className="third-block-layout-wraper">
                                    <div className="video-profile">
                                        <iframe width="100%" height="100%" style={{ borderRadius: "10px", border: "none" }} src="https://www.youtube.com/embed/Vmk_Uf1hLmM?si=gOVU8Cy1lnHRkV7F" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                                    </div>

                                    <span className='vdo-title'>View Profile Intro</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </section>
    )
}

function Footer() {
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
    const defaultLink: string = "https://dreampathdevelopment/public/user/"

    const containerRef = useRef<HTMLDivElement | null>(null)

    async function handleCopy() {
        await navigator.clipboard.writeText(`https://dreampathdevelopment/public/user/${shareLink}`);
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