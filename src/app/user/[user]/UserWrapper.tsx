'use client'
import React, { useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import axios from 'axios';
import { SideBar } from './UserProfile';
import { AchieSkeleton, ToolsSkeleton, YoutubeSkeleton } from '@/components/Skeleton/Skeleton';
import { ApiAchievement, ApiSocialActivity, ApiTool } from '../../../../types';
import Link from 'next/link';
import Image from 'next/image';
import { useUserContext } from '@/context/UserContext';


export default function UserWrapper({ user, children }: { user: string, children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname()
    const { userData, setUserData, loading, setLoading } = useUserContext();

    useEffect(() => {
        setLoading(true)
        async function getUser() {
            if (!user) {
                Cookies.remove("data");
                toast.error('Please provide a valid user!');
                router.push('/login');
                setLoading(false)
                return;
            }

            try {
                const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${user}`);
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
    }, [user, router]);

    if (!user) {
        Cookies.remove("data")
        alert("Sorry...! User Not found with user. Please provide a valid user.");
        router.push('/login');
        return;
    }

    return (
        <>
            {
                pathname !== `/user/${user}/profile` ? (
                    <section className='hero-section'>
                        <div className="hero-section-wraper">
                            <SideBar userData={userData} loading={loading} userName={user} />
                            {children}
                        </div>
                        {pathname === `/user/${user}` &&
                            <>
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
                                                                            <p>
                                                                                <strong style={{ marginRight: "5px" }}>{achi.title}</strong>
                                                                                {achi.achievement_image && <Link
                                                                                    target='_blank'
                                                                                    href={achi.achievement_image!}
                                                                                    download={achi.achievement_image!}
                                                                                    rel="noopener noreferrer"
                                                                                >

                                                                                    <i className="hgi hgi-stroke hgi-ai-image"></i>
                                                                                </Link>}
                                                                                {achi.achievement_url && <Link
                                                                                    target='_blank'
                                                                                    href={achi.achievement_url!}
                                                                                    download={achi.achievement_url!}
                                                                                    rel="noopener noreferrer"
                                                                                >

                                                                                    <i className="hgi hgi-stroke hgi-unlink-04"></i>
                                                                                </Link>}
                                                                            </p>
                                                                            <br />
                                                                            <span style={{ display: "block", paddingLeft: "12px" }}>
                                                                                {achi.achievement_description}
                                                                            </span>
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
                                                            <Link href={`/user/${user}/expert-area`}>
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
                                                        <div className="video-profile"></div>
                                                        <span className='vdo-title'>View Profile Intro</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </section>
                ) : children
            }
        </>
    )
}
