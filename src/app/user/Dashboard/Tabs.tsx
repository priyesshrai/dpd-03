'use client'
import React, { useState } from 'react'
import Dashboard, { DashboardProps } from './Dashboard'
import Work from './Work';
import Education from './Education';
import Profile from './Profile';
import { OverViewIcon , UserIcon, SkillIcon, EducationIcon, WorkIcon, ToolIcon, ProjectIcon, AchievementIcon, CertificateIcon, SocialIcon } from './Icons';

type TabConfig = {
    key: string;
    tabName: string;
    icon: React.ComponentType<{ isActive: boolean }>;
    component: React.ComponentType<DashboardProps>
}

export default function Tabs() {
    const tabConfig: TabConfig[] = [
        {
            key: "overview",
            tabName: "Overview",
            icon: OverViewIcon,
            component: Dashboard
        },
        {
            key: "profile",
            tabName: "Profile",
            icon: UserIcon,
            component: Profile
        },
        {
            key: "work",
            tabName: "Work Experience",
            icon: WorkIcon,
            component: Work
        },
        {
            key: "education",
            tabName: "Education",
            icon: EducationIcon,
            component: Education
        },
        {
            key: "skills",
            tabName: "Skills / Interests",
            icon: SkillIcon,
            component: Education
        },
        {
            key: "tools",
            tabName: "Tools",
            icon: ToolIcon,
            component: Education
        },
        {
            key: "projects",
            tabName: "Projects",
            icon: ProjectIcon,
            component: Education
        },
        {
            key: "achievements",
            tabName: "Achievements",
            icon: AchievementIcon,
            component: Education
        },
        {
            key: "certificate",
            tabName: "Certificate",
            icon: CertificateIcon,
            component: Education
        },
        {
            key: "socialActivity",
            tabName: "Social Activity",
            icon: SocialIcon,
            component: Education
        },

    ]
    const [selectedTab, setSelectedTab] = useState(0)
    const ActiveTab = tabConfig[selectedTab].component;

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
                            const Icon = tab.icon;
                            const isActive = selectedTab === index;

                            return (
                                <div
                                    key={tab.key}
                                    className={`tab-item ${selectedTab === index ? 'active' : ''}`}
                                    onClick={() => setSelectedTab(index)}
                                >
                                    <Icon isActive={isActive} />
                                    <span>{tab.tabName}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div className="component-section">
                    <ActiveTab
                        currentTabKey={tabConfig[selectedTab].key}
                        setTabByKey={setTabByKey}
                    />
                </div>
            </div>
        </section>
    )
}
