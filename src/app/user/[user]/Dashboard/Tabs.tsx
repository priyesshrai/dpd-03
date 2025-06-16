'use client'
import React, { useState } from 'react'
import Dashboard, { DashboardProps } from './Dashboard'
import Work from './Work';
import Education from './Education';
import Profile from './Profile';

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
            key: TabKey.Work,
            tabName: "Work Experience",
            icon: "hgi hgi-stroke hgi-suit-02",
            component: Work
        },
        {
            key: TabKey.Education,
            tabName: "Education",
            icon: "hgi hgi-stroke hgi-library",
            component: Education
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
    const [lastTabIndex, setLastTabIndex] = useState(0);

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
                        name={tabConfig[selectedTab].tabName}
                        currentTabKey={tabConfig[selectedTab].key}
                        setTabByKey={setTabByKey}
                        goBack={() => lastTabIndex !== null && handleTabChange(lastTabIndex)}
                    />
                </div>
            </div>
        </section>
    )
}
