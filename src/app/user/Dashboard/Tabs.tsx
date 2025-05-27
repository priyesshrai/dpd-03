'use client'
import React, { useState } from 'react'
import Dashboard, { DashboardProps } from './Dashboard'
import Work from './Work';
import Education from './Education';
import Profile from './Profile';

type TabConfig = {
    key: string;
    tabName: string;
    icon: string;
    component: React.ComponentType<DashboardProps>
}

export default function Tabs() {
    const tabConfig: TabConfig[] = [
        {
            key: "overview",
            tabName: "Overview",
            icon: "hgi hgi-stroke hgi-dashboard-square-03",
            component: Dashboard
        },
        {
            key: "profile",
            tabName: "Profile",
            icon: "hgi hgi-stroke hgi-user-sharing",
            component: Profile
        },
        {
            key: "education",
            tabName: "Education",
            icon: "hgi hgi-stroke hgi-libraries",
            component: Education
        },
        {
            key: "work",
            tabName: "Work Experience",
            icon: "hgi hgi-stroke hgi-suit-02",
            component: Work
        },
    ]
    const [selectedTab, setSelectedTab] = useState(0)
    const ActiveTab = tabConfig[selectedTab].component;

    const setTabByKey = (key: string) => {
        const index = tabConfig.findIndex(tab => tab.key === key);
        if (index !== -1) setSelectedTab(index);
        console.log(index);
        
    };

    return (
        <section className='user-profile-dashboard'>
            <div className="profile-dashboard-wraper">
                <div className="tab-section">
                    <div className="tab-section-wraper">
                        {tabConfig.map((tab, index) => (
                            <div
                                key={tab.key}
                                className={`tab-item ${selectedTab === index ? 'active' : ''}`}
                                onClick={() => setSelectedTab(index)}
                            >
                                <i className={tab.icon}></i>
                                <span>{tab.tabName}</span>
                            </div>
                        ))}
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
