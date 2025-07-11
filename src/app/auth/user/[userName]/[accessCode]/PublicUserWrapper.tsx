'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SideBar } from './UserProfile';
import { AchieSkeleton, ToolsSkeleton, YoutubeSkeleton } from '@/components/Skeleton/Skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { ApiAchievement, ApiSocialActivity, ApiTool } from '../../../../../../types';
import { useUserContext } from '@/context/UserContext';

export default function PublicUserWrapper({ user, children }: { user: string; children: React.ReactNode }) {
    return (
        <PublicUserLayout user={user}>{children}</PublicUserLayout>
    );
}

function PublicUserLayout({ user, children }: { user: string; children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { userData, setUserData, loading, setLoading, accessCode } = useUserContext();
    const [isAccessCodeValid, setIsAccessCodeValid] = useState(true);

    useEffect(() => {
        setLoading(true);
        async function getUser() {
            if (!user) {
                Cookies.remove('data');
                toast.error('Please provide a valid user!');
                router.push('/login');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${user}`);
                if (response.data.status === false) {
                    Cookies.remove('data');
                    toast.error(response.data.message ?? 'Profile Not Found of This User....!');
                    router.push('/login');
                    setLoading(false);
                    return;
                }
                setUserData(response.data.data);
                setLoading(false);
            } catch (error) {
                Cookies.remove('data');
                toast.error((error as Error)?.message || 'Profile Not Found of This User....!');
                router.push('/login');
                setLoading(false);
            }
        }
        getUser();
    }, [user, router, setLoading, setUserData]);

    useEffect(() => {
        async function VerifyUser() {
            if (!accessCode) {
                toast.error('Sorry, invalid access code!');
                setIsAccessCodeValid(false);
                router.push(`/public/user/${user}`);
                setLoading(false);
                return;
            }

            const data = new FormData();
            data.append("cnid", userData?.profile_nid ?? '');
            data.append("accesscode", accessCode);

            try {
                const response = await axios.post('https://inforbit.in/demo/dpd/candidate-unlocked-access', data);
                if (response.data.status === false) {
                    toast.error(response.data.message || 'Access code verification failed!');
                    setIsAccessCodeValid(false);
                    // router.push(`/public/user/${user}`);
                }
            } catch (error) {
                toast.error((error as Error)?.message || 'Access code verification error!');
                setIsAccessCodeValid(false);
                // router.push(`/public/user/${user}`);
            } finally {
                setLoading(false);
            }
        }

        if (userData?.profile_nid) {
            VerifyUser();
        }
    }, [accessCode, userData?.profile_nid]);

    return (
        <>
            {
                !isAccessCodeValid ? (
                    <div className='invalid-accesscode'>
                        <Image src="/images/icons/alert.webp" width={200} height={150} alt='alert' />
                        <h1>Your access code has been expired. Please visit user public profile and ping user for approval. </h1>
                        <Link href={`/public/user/${user}`}>
                            Visit Profile
                        </Link>
                    </div>
                ) : (
                    <section className="hero-section">
                        <div className="hero-section-wraper">
                            <SideBar userData={userData} loading={loading} userName={user} />
                            {children}
                        </div>
                        {pathname === `/auth/user/${user}/${accessCode}` && (
                            <>
                                {/* Achievements */}
                                <div className="second-layout">
                                    <div className="second-layout-wraper">
                                        {loading ? (
                                            <AchieSkeleton />
                                        ) : (
                                            <div className="first-layout-block layout-block">
                                                <div className="block-layout-wraper">
                                                    <div className="title">
                                                        <h2>Achievements</h2>
                                                    </div>
                                                    <div className="block-layout-content">
                                                        <ul>
                                                            {userData?.achievement_list?.map((achi: ApiAchievement) => (
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
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Social Activities */}
                                        {loading ? (
                                            <AchieSkeleton />
                                        ) : (
                                            <div className="second-layout-block layout-block">
                                                <div className="block-layout-wraper">
                                                    <div className="title">
                                                        <h2>Social Activities</h2>
                                                    </div>
                                                    <div className="block-layout-content">
                                                        <ul>
                                                            {userData?.social_activities_list?.map((activity: ApiSocialActivity) => (
                                                                <li key={activity.social_activities_nid}>
                                                                    <strong>{activity.title}</strong> - {activity.description}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tools & Video */}
                                <div className="third-layout">
                                    <div className="third-layout-wraper">
                                        <div className="third-layout-block first-third-layout">
                                            {loading ? (
                                                <ToolsSkeleton />
                                            ) : (
                                                <div className="third-block-layout-wraper">
                                                    <div className="title">
                                                        <h2>Tools I Use</h2>
                                                        <Link href={`/auth/user/${user}/${accessCode}/expert-area`}>
                                                            See All
                                                            <i className="hgi hgi-stroke hgi-arrow-right-02"></i>
                                                        </Link>
                                                    </div>
                                                    <div className="third-content">
                                                        {userData?.tools_list?.map((tools: ApiTool) => (
                                                            <div className="card" key={tools.tools_nid}>
                                                                <div className="card-icon">
                                                                    <Image
                                                                        src={tools.tools_image ?? '/images/icons/dummy.svg'}
                                                                        alt={tools?.title}
                                                                        width={60}
                                                                        height={60}
                                                                    />
                                                                </div>
                                                                <span>{tools.title}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="third-layout-block second-third-layout">
                                            {loading ? (
                                                <YoutubeSkeleton />
                                            ) : (
                                                <div className="third-block-layout-wraper">
                                                    <div className="video-profile">
                                                        {/* <iframe
                                                            width="100%"
                                                            height="100%"
                                                            style={{ borderRadius: '10px', border: 'none' }}
                                                            src="https://www.youtube.com/embed/Vmk_Uf1hLmM?si=gOVU8Cy1lnHRkV7F"
                                                            title="YouTube video player"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            referrerPolicy="strict-origin-when-cross-origin"
                                                        ></iframe> */}
                                                    </div>
                                                    <span className="vdo-title">View Profile Intro</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                )
            }
        </>
    );
}
