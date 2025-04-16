'use client'
import React, { useEffect, useRef } from 'react'
import SideBar from '../SideBar/SideBar'
import Image from 'next/image'
import Link from 'next/link';
import { motion } from "motion/react"
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { OptionsType } from "@fancyapps/ui/types/Fancybox/options";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function HeroSection() {
    return (
        <section className='hero-section'>
            <div className="hero-section-wraper">
                <SideBar />

                <div className="work-block">
                    <div className="work-block-wraper">
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
                                        <div className="details">
                                            <div className="details-wraper">
                                                <div className="company-name">
                                                    <p>2020 - MBA in Marketing</p>
                                                    <span>ICFAI Business School, Hyderabad</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <div className="details-wraper">
                                                <div className="company-name">
                                                    <p>2017 - B.Com in Computer Application</p>
                                                    <span>Vellore Institute of Technology, Vellore</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <div className="details-wraper">
                                                <div className="company-name">
                                                    <p>2014 - Higher Secondary CBSE</p>
                                                    <span>HSMS, Durgapur</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="details">
                                            <div className="details-wraper" style={{ padding: "0" }}>
                                                <div className="company-name">
                                                    <p style={{ fontSize: "20px" }}>Work Experience</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="details">
                                            <div className="details-wraper">
                                                <div className="company-name">
                                                    <p>2025 - Started Dreampath Development</p>
                                                    <span>A Bootstrap project</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <div className="details-wraper">
                                                <div className="company-name">
                                                    <p>2024 - Wizards Next LLP</p>
                                                    <span>Incorporated collaboration of JR Digital Marketing Services & Semi Colon Solutions</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <div className="details-wraper">
                                                <div className="company-name">
                                                    <p>2023 - Joint Venture with Semi Colon Solutions</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <div className="details-wraper">
                                                <div className="company-name">
                                                    <p>2021 - Founded JR Digital Marketing Services</p>
                                                    <span>A Bootstrap Startup</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>

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
                                        <div className="item">
                                            <div className="item-icon">
                                                <Image src='/images/skills/social-media.png' width={100} height={100} alt='Logo' />
                                            </div>
                                            <span>Social Media Management</span>
                                        </div>
                                        <div className="item">
                                            <div className="item-icon">
                                                <Image src='/images/skills/content-creation.png' width={100} height={100} alt='Logo' />
                                            </div>
                                            <span>Content Creation</span>
                                        </div>
                                        <div className="item">
                                            <div className="item-icon">
                                                <Image src='/images/skills/graphic.png' width={100} height={100} alt='Logo' />
                                            </div>
                                            <span>Graphic Designing</span>
                                        </div>
                                        <div className="item">
                                            <div className="item-icon">
                                                <Image src='/images/skills/marketing.png' width={100} height={100} alt='Logo' />
                                            </div>
                                            <span>Marketing Strategy Development</span>
                                        </div>
                                        <div className="item">
                                            <div className="item-icon">
                                                <Image src='/images/skills/social.png' width={100} height={100} alt='Logo' />
                                            </div>
                                            <span>Ad Campaign Management</span>
                                        </div>
                                        <div className="item">
                                            <div className="item-icon">
                                                <Image src='/images/skills/performance.png' width={50} height={50} alt='Logo' />
                                            </div>
                                            <span>Performance Marketing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="project-block">
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
                            <h3>Social Media Management</h3>
                            <ul>
                                <li>Dhanuka Silks</li>
                                <li>GNSR Textiles</li>
                                <li>Sunbeam Academy</li>
                                <li>Akash Institute - Basti</li>
                                <li>Career Launcher - Varanasi</li>
                                <li>IMS - Varanasi, Lucknow</li>
                            </ul>
                            <br />
                            <h3>Strategy Management</h3>
                            <ul>
                                <li>Nuskha Kitchen</li>
                                <li>Round Table India</li>
                            </ul>
                            <br />
                            <h3>Case Study Written</h3>
                            <a href='https://drive.google.com/file/d/1efoKo4LsjfSmJARXe2WhzNhihBIWy6do/view?usp=drive_link'>Chocolates and Cakes Shop </a> - <span> An online liquor selling company. Helped the company increase the sales by 30% in 3 months with the help in Meta Ads, Meta Pixels, and social media management in the Year 2021.</span>
                            <br />

                            <a href='https://drive.google.com/file/d/126pKoLsTbCB43sytB1dwPBANstc0RO8w/view?usp=drive_link'>Jawed Habib Varanasi </a> - <span> Helped the salon franchise gain more than 100 customers in a time span of 90 days in the Year 2022.</span>

                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="second-layout">
                <div className="second-layout-wraper">
                    <div className="first-layout-block layout-block">
                        <div className="block-layout-wraper">
                            <div className="title">
                                <h2>Achievements</h2>
                            </div>
                            <div className="block-layout-content">
                                <ul>
                                    <li>
                                        <strong>Launched book on Convention to Digital</strong> - A shift in banking in the year 2018 - In the final year of B.Com in Computer Application
                                    </li>
                                    <li>
                                        <strong>Launched a magazine - Alumni Forum - ICFAI Alumni Realtionship Cell</strong> - In the final year of MBA in Hyderabad
                                    </li>
                                    <li>
                                        Awarded as the <strong> Most Innovative Tech Entrepeneur from VIT University</strong> in the year 2021.
                                    </li>
                                    <li>
                                        Invited as a <strong>Guest Lecturers in Jaipuria Institute of Management</strong> , Jaipur in the year 2022.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="second-layout-block layout-block">
                        <div className="block-layout-wraper">
                            <div className="title">
                                <h2>Social Activities</h2>
                            </div>
                            <div className="block-layout-content">
                                <ul>
                                    <li>
                                        Helped the poor and needy in slums, working independently with the team members of JR Digital Marketing Services.
                                    </li>
                                    <li>
                                        Help the students of Kutumbh NGO by conduction a 7 days workshop on Digital Literacy for the children upto class 10th.
                                    </li>
                                    <li>
                                        Created a documentary for Abhinav Vidhyalay - A school for the underprivilledged and poor in the village Mirzamurad in association with Round Table India
                                    </li>
                                    <li>
                                        Help the Red Cross army in the Blood Bank Booth Drive in Varanasi in 2022.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="third-layout">
                <div className="third-layout-wraper">
                    <div className="third-layout-block first-third-layout">
                        <div className="third-block-layout-wraper">
                            <div className="title">
                                <h2>Tools I Use</h2>
                                <Link href='#'>
                                    See All
                                    <i className="hgi hgi-stroke hgi-arrow-right-02"></i>
                                </Link>
                            </div>
                            <div className="third-content">
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/canva-icon.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>Canva</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/figma.png' alt='logo' width={50} height={50} />
                                    </div>
                                    <span>Figma</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/adobe-photoshop-icon.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>Adobe Photoshop</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/adobe-illustrator-icon.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>Adobe Illustrator</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/adobe-lightroom-icon.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>Adobe Lightroom</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/premiere-pro.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>Adobe Premier Pro</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/capcut-icon.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>CapCut</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/final-cut.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>Apple Final Cut Pro</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/wordpress-icon.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>Wordpress</span>
                                </div>
                                <div className="card">
                                    <div className="card-icon">
                                        <Image src='/images/tools/html-icon.png' alt='logo' width={60} height={60} />
                                    </div>
                                    <span>HTML</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="third-layout-block second-third-layout">
                        <div className="third-block-layout-wraper">
                            <div className="video-profile">
                                <iframe width="100%" height="100%" style={{borderRadius:"10px",border:"none"}} src="https://www.youtube.com/embed/Vmk_Uf1hLmM?si=gOVU8Cy1lnHRkV7F" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                            </div>

                            <span className='vdo-title'>View Profile Intro</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}


function Fancybox(props: {
    children?: React.ReactNode;
    delegate?: string;
    options?: Partial<OptionsType>;
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const delegate = props.delegate || "[data-fancybox]";
        const options = props.options || {};

        NativeFancybox.bind(container, delegate, options);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return <div className='box-wraper' ref={containerRef}>{props.children}</div>;
}

export { Fancybox };