'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ApiAchievement, ApiEducation, ApiProject, ApiSkill, ApiSocialActivity, ApiTool, ApiWorkExp, UpdateFormData } from '../../../../../../types';
import UpdateProfile from './UpdateProfile';
import UpdateEducation from './UpdateEducation';
import UpdateWorkExe from './UpdateWorkExe';
import UpdateTools from './UpdateTools';
import UpdateProjects from './UpdateProjects';
import UpdateAchievement from './UpdateAchievement';
import UpdateSocialActivity from './UpdateSocialActivity';
import UpdateSkill from './UpdateSkill';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


type TabConfig = {
    key: string;
    tabName: string;
    icon: string;
    component: React.ElementType;
}
type UserProfileProps = {
    userName: string;
};


export default function UpdateTabs({ userName }: UserProfileProps) {
    const router = useRouter();
    const tabConfig: TabConfig[] = [
        {
            key: "profile",
            tabName: "Profile",
            icon: "hgi hgi-stroke hgi-user-list",
            component: UpdateProfile
        },
        {
            key: "education",
            tabName: "Education",
            icon: "hgi hgi-stroke hgi-user-add-01",
            component: UpdateEducation
        },
        {
            key: "work",
            tabName: "Work Experience",
            icon: "hgi hgi-stroke hgi-idea-01",
            component: UpdateWorkExe
        },
        {
            key: "skill",
            tabName: "Skills",
            icon: "hgi hgi-stroke hgi-code",
            component: UpdateSkill
        },
        {
            key: "tools",
            tabName: "Tools",
            icon: "hgi hgi-stroke hgi-code",
            component: UpdateTools
        },
        {
            key: "project",
            tabName: "Projects",
            icon: "hgi hgi-stroke hgi-code",
            component: UpdateProjects
        },
        {
            key: "achievement",
            tabName: "Achievements",
            icon: "hgi hgi-stroke hgi-code",
            component: UpdateAchievement
        },
        {
            key: "social",
            tabName: "Social Activity",
            icon: "hgi hgi-stroke hgi-code",
            component: UpdateSocialActivity
        },
    ];
    const [selectedTab, setSelectedTab] = useState(0)
    const ActiveTab = tabConfig[selectedTab].component;
    const [loading, setLoading] = useState<boolean>(true);
    const [candidateData, setCandidateData] = useState<UpdateFormData>({
        personalData: {
            profile_nid: "",
            name: "",
            email: "",
            phone: "",
            headline: "",
            intro: "",
            facebook: "",
            insta: "",
            linkedin: "",
            twitter: "",
            yt: "",
            profile: "",
        },
        education: [
            {
                education_nid: "",
                institute: "",
                degree: "",
                passingYear: "",
                description: "",
            }
        ],
        workExp: [
            {
                work_exp_nid: "",
                company: "",
                position: "",
                workingPeriod: "",
                description: "",
            }
        ],
        skills: [{
            expert_area_nid: "",
            skill_name: "",
            skill_desc: "",
            skill_icon: "",
        }],
        tools: [
            {
                tools_nid: "",
                title: "",
                tools_image: "",
            }
        ],
        projects: [
            {
                recent_project_nid: "",
                name: "",
                link: "",
                image: null,
                description: "",
            }
        ],
        achievements: [
            {
                achievement_nid: "",
                name: "",
                link: "",
                image: null,
                description: "",
            }
        ],
        socialActivity: [
            {
                social_activities_nid: "",
                title: "",
                description: "",
            }
        ]
    })

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            if (!userName) {
                toast.error('Please provide a valid username!');
                router.push('/login');
                setLoading(false)
                return;
            }

            try {
                const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${userName}`);
                const apiData = response?.data?.data;

                const mappedData: UpdateFormData = {
                    personalData: {
                        profile_nid: apiData.profile_nid || "",
                        name: apiData.name || "",
                        email: apiData.profile_email || "",
                        phone: apiData.phone_number || "",
                        headline: apiData.profile_heading || "",
                        intro: apiData.introduction || "",
                        facebook: apiData.facebook_link || "",
                        insta: apiData.instagram_link || "",
                        linkedin: apiData.linkedin_link || "",
                        twitter: apiData.twitter_link || "",
                        yt: apiData.youtube_link || "",
                        profile: apiData.profile_photo || ""
                    },
                    education: apiData?.education_list.map((edu:ApiEducation) => ({
                        education_nid: edu.education_nid || "",
                        institute: edu.from_institute || "",
                        degree: edu.degree_title || "",
                        passingYear: edu.passing_year || "",
                        description: edu.education_profile || "",
                    })),
                    workExp: apiData.work_exp_list.map((work:ApiWorkExp) => ({
                        work_exp_nid: work.work_exp_nid || "",
                        company: work.company_name || "",
                        position: work.last_designation || "",
                        workingPeriod: work.working_years || "",
                        description: work.brief_job_profile || "",
                    })),
                    skills: apiData.expert_area_list.map((skill:ApiSkill) => ({
                        expert_area_nid: skill.expert_area_nid || "",
                        skill_name: skill.expertise_name || "",
                        skill_desc: skill.expertise_name_details || "",
                        skill_icon: skill.expertise_icon || "",
                    })),
                    tools: apiData.tools_list.map((tool:ApiTool) => ({
                        tools_nid: tool.tools_nid || "",
                        title: tool.title || "",
                        tools_image: tool.tools_image || "",
                    })),
                    projects: apiData.recent_project_list.map((proj:ApiProject) => ({
                        recent_project_nid: proj.recent_project_nid || "",
                        name: proj.project_name || "",
                        link: proj.project_link || "",
                        image: proj.project_image || null,
                        description: proj.project_profile || "",
                    })),
                    achievements: apiData.achievement_list.map((ach:ApiAchievement) => ({
                        achievement_nid: ach.achievement_nid || "",
                        name: ach.achievement_title || "",
                        link: ach.achievement_link || "",
                        image: ach.achievement_image || null,
                        description: ach.achievement_profile || "",
                    })),
                    socialActivity: apiData.social_activities_list.map((act:ApiSocialActivity) => ({
                        social_activities_nid: act.social_activities_nid || "",
                        title: act.title || "",
                        description: act.description || "",
                    })),
                };

                setCandidateData(mappedData);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching profile:", error);
                setLoading(false)
            }
        }

        fetchData();
    }, [userName]);

    return (
        <section className='admin-dashboard-container'>
            <div className="admin-dashboard-wraper">
                <div className="admin-tabs-container">
                    <div className="admin-tab-top">
                        <Image src="/images/user/logo.png" width={500} height={100} alt='DreamPath Development' />
                    </div>
                    <div className="admin-tab-body">
                        {
                            tabConfig.map((tab, index) => (
                                <div className={`admin-tab-item ${selectedTab === index ? 'active' : ''}`}
                                    key={tab.key}
                                    onClick={() => setSelectedTab(index)}
                                >
                                    <i className={tab.icon}></i>
                                    <span>{tab.tabName}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="admin-component-container">
                    <div className="admin-component-wraper">
                        <div className="admin-component-header">
                            <div className="admin-header-wraper">
                                <h1>{tabConfig[selectedTab].tabName}</h1>
                                <div className='logo-container'>
                                    <div className="admin-logo">
                                        <i className="hgi hgi-stroke hgi-user-story"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="admin-component-section">
                            {(() => {
                                if (tabConfig[selectedTab].key === "profile") {
                                    return (
                                        <ActiveTab
                                            candidateProfile={candidateData.personalData}
                                            loading={loading}
                                            setLoading={setLoading}
                                            setCandidateData={setCandidateData}
                                        />
                                    )
                                }
                            })()}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
