'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { usePathname } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { ApiAchievement, ApiEducation, ApiProject, ApiSkill, ApiSocialActivity, ApiTool, ApiWorkExp, HeroProps } from '../../../../../types'
import { AchieSkeleton, HeroSkeleton, ProjectSkeleton, SideBarSkeleton, SkillSkeleton, ToolsSkeleton, YoutubeSkeleton } from '@/components/Skeleton/Skeleton'

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
                toast.error('Please provide a valid username!');
                router.push('/login');
                setLoading(false)
                return;
            }

            try {
                const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${userName}`);
                if (!response.data.status) {
                    toast.error(response.data.message ?? 'Profile Not Found of This User....!');
                    router.push('/login');
                    setLoading(false)
                }
                setUserData(response?.data?.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                toast.error('Profile Not Found of This User....!');
                router.push('/login');
                setLoading(false)
            }
        }

        getUser();
    }, [userName, router]);

    if (!userName) {
        alert("Sorry...! User Not found with UserName. Please provide a valid UserName.");
        router.push('/login');
    }

    return (
        <>
            <Header />
            <Hero userData={userData} loading={loading} />
            <Footer />
            <Toaster />
        </>
    )
}


function Header() {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <motion.header
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            animate={{ opacity: 1 }}
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

function SideBar({ userData, loading }: HeroProps) {
    const currentPath = usePathname()

    const bio = userData?.introduction ?? ""

    const getTrimmedBio = () => {
        if (currentPath.startsWith("/public")) {
            const plainText = bio.replace(/<[^>]+>/g, '')
            const shortened = plainText.length > 100 ? plainText.substring(0, 220) + "..." : plainText
            return shortened
        }
        return bio
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
                                    width={200} height={278} alt='Profile' />
                            </div>
                            <div className="user-data">
                                <h1>{userData?.name ?? "User"}</h1>

                                <p dangerouslySetInnerHTML={{ __html: getTrimmedBio() }} />

                                <div className="cta-button-container">
                                    <button>Ping to Show Interest<i className="hgi hgi-stroke hgi-touch-09"></i> </button>
                                </div>

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
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </>
    )
}

function Hero({ userData, loading }: HeroProps) {
    return (
        <section className='hero-section'>
            <div className="hero-section-wraper">
                <SideBar userData={userData} loading={loading} />

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
                                        userData?.recent_project_list?.map((project: ApiProject) => (
                                            <React.Fragment key={project.recent_project_nid}>
                                                <h3>
                                                    <Link href={project.project_link ?? ""}>
                                                        {project.title}
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
                                        <ul>
                                            {
                                                userData?.achievement_list?.map((achi: ApiAchievement) => (
                                                    <li key={achi.achievement_nid}>
                                                        <Link href={achi.achievement_url ?? ""} target='_blank'><strong>{achi.title}</strong></Link> -
                                                        {achi.achievement_description}
                                                    </li>
                                                ))
                                            }
                                        </ul>
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