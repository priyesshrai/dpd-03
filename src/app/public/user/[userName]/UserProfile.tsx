'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { usePathname } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { ApiEducation, ApiProject, ApiSkill, ApiWorkExp, HeroProps } from '../../../../../types'
import { HeroSkeleton, ProjectSkeleton, SideBarSkeleton, SkillSkeleton } from '@/components/Skeleton/Skeleton'
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import { useUserContext } from '@/context/UserContext'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Spinner from '@/components/Spinner/Spinner'
import axios from 'axios'


interface MenuItem {
    menuName: string
    path: string
    icon: string
}

interface FormData {
    name: string;
    email: string;
    phoneNo: string;
    message: string;
}

export default function UserProfile() {
    const [isSending, setIsSending] = useState<boolean>(false);
    const { userData, user, loading } = useUserContext();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phoneNo: "",
        message: ""
    })
    const [closePingForm, setClosePingForm] = useState<boolean>(true);

    const isFormValid = (data: FormData): boolean => {
        return Object.values(data).every(value => value?.trim().length > 0);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isFormValid) {
            toast.error("All fields are required...!");
            return;
        }
        setIsSending(true);
        const data = new FormData();
        data.append("cnid", userData.profile_nid!);
        data.append("int_name", formData.name);
        data.append("int_phone", formData.phoneNo);
        data.append("int_email", formData.email);
        data.append("int_details", formData.message);

        // data.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });

        toast.promise(
            axios.post("https://inforbit.in/demo/dpd/candidate-interest-api", data)
                .then((response) => {
                    if (response.data.status) {
                        setIsSending(false);
                        setClosePingForm(true);
                        return response.data.message;
                    }
                })
                .catch((error) => {
                    setIsSending(false);
                    console.log(error);
                    const errorMessage = error.response?.data?.message || error.message;
                    throw errorMessage;
                }),
            {
                loading: "Please Wait....",
                success: (message) => message || "Message Sent for Approvel",
                error: (err) => err || "Failed to send message"
            }
        );

    }

    return (
        <>
            <Hero userData={userData} loading={loading} userName={user}  />
            <Toaster />
            {!closePingForm && <PingCandidate
                formData={formData}
                updateFormData={setFormData}
                submit={handleSubmit}
                loading={isSending}
            />}
        </>
    )
}

export function Header({ userName }: { userName: string }) {
    const pathname = usePathname()
    const menu: MenuItem[] = [
        {
            menuName: "Home",
            path: `/public/user/${userName}`,
            icon: "hgi hgi-stroke hgi-home-01"
        },
        {
            menuName: "About",
            path: `/public/user/${userName}/about`,
            icon: "hgi hgi-stroke hgi-user-account"
        },
        {
            menuName: "Work/Education",
            path: `/public/user/${userName}/work`,
            icon: "hgi hgi-stroke hgi-briefcase-01"
        },
        {
            menuName: "Skills/Tools",
            path: `/public/user/${userName}/expert-area`,
            icon: "hgi hgi-stroke hgi-ai-idea"
        },
        {
            menuName: "Contact",
            path: `/public/user/${userName}/contact`,
            icon: "hgi hgi-stroke hgi-mail-01"
        }
    ]
    const [openMenu, setOpenMenu] = useState(false);
    const [isDownloading, setIsDownloading] = useState<boolean>(false)

    const isActiveLink = (menuPath: string): boolean => {
        if (menuPath === `/public/user/${userName}`) {
            return pathname === menuPath
        }
        return pathname.startsWith(menuPath)
    }
    const closeMenu = (): void => {
        setOpenMenu(false)
    }
    const downloadPDF = async () => {
        try {
            setOpenMenu(false);
            const element = document.querySelector('.outer') as HTMLElement | null;

            if (!element) {
                alert('Content not found');
                return;
            }

            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                setIsDownloading(true);

                (downloadBtn as HTMLButtonElement).hidden = true;
                (downloadBtn as HTMLButtonElement).disabled = true;
            }

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${userName}-portfolio.pdf`);
            toast.success("Profile PDF downloaded...!");

        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Error generating PDF. Please try again.');
        } finally {
            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                setIsDownloading(false);
                (downloadBtn as HTMLButtonElement).disabled = false;
            }
        }
    };

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
                            {
                                menu.map((menu) => (
                                    <li key={menu.menuName}>
                                        <button onClick={closeMenu} disabled
                                            className={isActiveLink(menu.path) ? 'active' : 'disable'}>
                                            <i className={menu.icon} aria-hidden="true"></i>
                                            <span>
                                                {menu.menuName}
                                            </span>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={`btn-container ${openMenu ? 'menu-active' : ""}`}>
                        <div className="btn-wraper">
                            <button onClick={downloadPDF} className='download-btn hd'>
                                {isDownloading ? <Spinner /> : (
                                    <>
                                        Download
                                        < i className="hgi hgi-stroke hgi-download-circle-01" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="hamberger-container" onClick={() => setOpenMenu(!openMenu)}>
                        <i className="hgi hgi-stroke hgi-menu-04"></i>
                    </div>
                    <div className={`overlay ${openMenu ? 'menu-active' : ""} `} onClick={() => setOpenMenu(false)}></div>
                </div>
            </nav>
        </motion.header >
    )
}

export function SideBar({ userData, loading }: HeroProps) {
    const currentPath = usePathname()
    const [isDownloading, setIsDownloading] = useState<boolean>(false)

    const bio = userData?.introduction ?? ""

    const getTrimmedBio = () => {
        if (currentPath.startsWith("/public")) {
            const plainText = bio.replace(/<[^>]+>/g, '')
            const shortened = plainText.length > 100 ? plainText.substring(0, 220) + "..." : plainText
            return shortened
        }
        return bio
    }

    const downloadPDF = async () => {
        try {
            const element = document.querySelector('.outer') as HTMLElement | null;

            if (!element) {
                alert('Content not found');
                return;
            }

            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                setIsDownloading(true);

                (downloadBtn as HTMLButtonElement).hidden = true;
                (downloadBtn as HTMLButtonElement).disabled = true;
            }

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${userData?.name}-portfolio.pdf`);
            toast.success("Profile PDF downloaded...!");

        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Error generating PDF. Please try again.');
        } finally {
            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                setIsDownloading(false);
                (downloadBtn as HTMLButtonElement).disabled = false;
            }
        }
    };

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
                                <h1>{userData?.name ?? "User"}</h1>

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
                                    <button>
                                        Ping to Show Interest
                                        <i className="hgi hgi-stroke hgi-touch-09"></i>
                                    </button>
                                    <button className='download-btn hhd' onClick={downloadPDF}>
                                        {isDownloading ? <Spinner /> : (
                                            <>
                                                Download
                                                < i className="hgi hgi-stroke hgi-download-circle-01" />
                                            </>
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )
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
                                <Link href={`/public/user/${userName}/work`}>
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

type Props = {
    formData: FormData;
    updateFormData: React.Dispatch<React.SetStateAction<FormData>>;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean
}

export function PingCandidate({ formData, updateFormData, submit, loading }: Props) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        updateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    return (
        <section className='ping-candidate-parent'>
            <div className="ping-candidate-wrapper">
                <div className="ping-candidate-form-container">
                    <div className="ping-form-header">
                        <span>Request Approvel</span>
                        <div className='close-pinf-form'>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="ping-form-body">
                        <form onSubmit={submit}>
                            <div className="details-edit-wraper">
                                <div className="edit-input-container">
                                    <input
                                        type="text"
                                        placeholder=''
                                        className='inputs'
                                        name='name'
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <label className='label'>Full Name</label>
                                </div>

                                <div className="edit-input-container">
                                    <input
                                        type="tel"
                                        placeholder=""
                                        required
                                        className='inputs'
                                        name='phoneNo'
                                        value={formData.phoneNo}
                                        onChange={handleChange}
                                    />
                                    <label className='label'>Phone No.</label>
                                </div>

                                <div className="edit-input-container">
                                    <input
                                        type="email"
                                        placeholder=""
                                        required
                                        className='inputs'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <label className='label'>Enter Email</label>
                                </div>

                                <div className="edit-input-container">
                                    <textarea
                                        name='message'
                                        placeholder=''
                                        className='inputs'
                                        rows={3}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                    <label className='label'>Message</label>
                                </div>
                            </div>
                            <div className="details-edit-footer">
                                <button>{loading ? <Spinner/> : "Send"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}