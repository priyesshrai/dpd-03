'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Dashboard from './Dashboard'
import Work from './Work';
import Education from './Education';
import Profile from './Profile';
import { ApiAchievement, ApiEducation, ApiProject, ApiSkill, ApiSocialActivity, ApiTool, ApiWorkExp, UpdateFormData } from '../../../../../types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

enum TabKey {
    Overview = "overview",
    Profile = 'profile',
    Education = 'education',
    Work = 'work',
    Skill = 'skill',
    Tools = 'tools',
    Project = 'project',
    Achievement = 'achievement',
    Social = 'social',
    Certificate = 'certificate'
}

type TabConfig = {
    key: string;
    tabName: string;
    icon: string;
    component: React.ElementType
}

type TabsProps = {
    user: string
};

export default function Tabs({ user }: TabsProps) {
    const router = useRouter();
    const tabConfig: TabConfig[] = [
        {
            key: TabKey.Overview,
            tabName: "Overview",
            icon: "hgi hgi-stroke hgi-chart-column",
            component: Dashboard
        },
        {
            key: TabKey.Profile,
            tabName: "Profile",
            icon: "hgi hgi-stroke hgi-account-setting-03",
            component: Profile
        },
        {
            key: TabKey.Education,
            tabName: "Education",
            icon: "hgi hgi-stroke hgi-library",
            component: Education
        },
        {
            key: TabKey.Work,
            tabName: "Work Experience",
            icon: "hgi hgi-stroke hgi-suit-02",
            component: Work
        },
        {
            key: TabKey.Skill,
            tabName: "Skills / Interests",
            icon: "hgi hgi-stroke hgi-idea-01",
            component: Education
        },
        {
            key: TabKey.Tools,
            tabName: "Tools",
            icon: "hgi hgi-stroke hgi-clipboard",
            component: Education
        },
        {
            key: TabKey.Project,
            tabName: "Projects",
            icon: "hgi hgi-stroke hgi-code",
            component: Education
        },
        {
            key: TabKey.Achievement,
            tabName: "Achievements",
            icon: "hgi hgi-stroke hgi-champion",
            component: Education
        },
        {
            key: TabKey.Certificate,
            tabName: "Certificate",
            icon: "hgi hgi-stroke hgi-certificate-01",
            component: Education
        },
        {
            key: TabKey.Social,
            tabName: "Social Activity",
            icon: "hgi hgi-stroke hgi-agreement-02",
            component: Education
        },

    ]
    const [selectedTab, setSelectedTab] = useState(0)
    const ActiveTab = tabConfig[selectedTab].component;
    const currentTabKey = tabConfig[selectedTab].key;
    const [lastTabIndex, setLastTabIndex] = useState(0);

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

    async function fetchData() {
        setLoading(true)
        if (!user) {
            toast.error('Please provide a valid username!');
            router.push('/login');
            setLoading(false)
            return;
        }

        try {
            const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${user}`);
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
                education: apiData?.education_list.map((edu: ApiEducation) => ({
                    education_nid: edu.education_nid || "",
                    institute: edu.from_institute || "",
                    degree: edu.degree_title || "",
                    passingYear: edu.passing_year || "",
                    description: edu.education_profile || "",
                })),
                workExp: apiData.work_exp_list.map((work: ApiWorkExp) => ({
                    work_exp_nid: work.work_exp_nid || "",
                    company: work.company_name || "",
                    position: work.last_designation || "",
                    workingPeriod: work.working_years || "",
                    description: work.brief_job_profile || "",
                })),
                skills: apiData.expert_area_list.map((skill: ApiSkill) => ({
                    expert_area_nid: skill.expert_area_nid || "",
                    skill_name: skill.expertise_name || "",
                    skill_desc: skill.expertise_name_details || "",
                    skill_icon: skill.expertise_icon || "",
                })),
                tools: apiData.tools_list.map((tool: ApiTool) => ({
                    tools_nid: tool.tools_nid || "",
                    title: tool.title || "",
                    tools_image: tool.tools_image || "",
                })),
                projects: apiData.recent_project_list.map((proj: ApiProject) => ({
                    recent_project_nid: proj.recent_project_nid || "",
                    name: proj.title || "",
                    link: proj.project_link || "",
                    image: proj.recent_project_img || null,
                    description: proj.project_description || "",
                })),
                achievements: apiData.achievement_list.map((ach: ApiAchievement) => ({
                    achievement_nid: ach.achievement_nid || "",
                    name: ach.title || "",
                    link: ach.achievement_url || "",
                    image: ach.achievement_image || null,
                    description: ach.achievement_description || "",
                })),
                socialActivity: apiData.social_activities_list.map((act: ApiSocialActivity) => ({
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

    useEffect(() => {
        fetchData();
    }, [user]);

    const propsMapper = useMemo(
        () => ({
            [TabKey.Overview]: { candidateData: candidateData },
            [TabKey.Profile]: { candidateProfile: candidateData.personalData },
            [TabKey.Education]: { candidateEducation: candidateData.education },
            [TabKey.Work]: { candidateWork: candidateData.workExp },
            [TabKey.Skill]: { candidateSkills: candidateData.skills },
            [TabKey.Tools]: { candidateTools: candidateData.tools },
            [TabKey.Project]: { candidateProject: candidateData.projects },
            [TabKey.Achievement]: { candidateachievement: candidateData.achievements },
            [TabKey.Certificate]: { candidateCertificate: candidateData.achievements },
            [TabKey.Social]: { candidateSocial: candidateData.socialActivity },
        }),
        [candidateData]
    );

    const handleTabChange = (newIndex: number) => {
        if (newIndex !== selectedTab) {
            setLastTabIndex(selectedTab);
            setSelectedTab(newIndex);
        }
    };

    const setTabByKey = (key: string) => {
        const index = tabConfig.findIndex(tab => tab.key === key);
        if (index !== -1) setSelectedTab(index);
    };

    return (
        <section className='user-profile-dashboard'>
            <div className="profile-dashboard-wraper">
                <div className="tab-section">
                    <div className="tab-section-wraper">
                        {tabConfig.map((tab, index) => {
                            return (
                                <div
                                    key={tab.key}
                                    className={`tab-item ${selectedTab === index ? 'active' : ''}`}
                                    onClick={() => handleTabChange(index)}
                                >
                                    <i className={tab.icon}></i>
                                    <span>{tab.tabName}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="component-section">
                    <ActiveTab
                        {...propsMapper[currentTabKey as TabKey]}
                        name={tabConfig[selectedTab].tabName}
                        currentTabKey={tabConfig[selectedTab].key}
                        setTabByKey={setTabByKey}
                        goBack={() => lastTabIndex !== null && handleTabChange(lastTabIndex)}
                        setCandidateData={setCandidateData}
                        profileNid={candidateData?.personalData?.profile_nid}
                    />
                </div>
            </div>
        </section>
    )
}
