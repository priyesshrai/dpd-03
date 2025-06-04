'use client'
import React, { useState } from 'react'
import { DashboardProps } from '@/app/user/Dashboard/Dashboard'
import Image from 'next/image';
import CandidateList from './CandidateList';
import AddProfile from './AddProfile';
import AddSkills from './AddSkills';
import AddTools from './AddTools';
import type { FormData } from '../../../../types';

type TabConfig = {
  key: string;
  tabName: string;
  icon: string;
  component: React.ElementType;
}

export default function AdminTabs() {
  const tabConfig: TabConfig[] = [
    {
      key: "candidate",
      tabName: "Candidate List",
      icon: "hgi hgi-stroke hgi-user-list",
      component: CandidateList
    },
    {
      key: "addProfile",
      tabName: "Add New Profile",
      icon: "hgi hgi-stroke hgi-user-add-01",
      component: AddProfile
    },
    {
      key: "addSkills",
      tabName: "Add New Skills",
      icon: "hgi hgi-stroke hgi-idea-01",
      component: AddSkills
    },
    {
      key: "addTool",
      tabName: "Add New Tools",
      icon: "hgi hgi-stroke hgi-code",
      component: AddTools
    },
  ];


  const [selectedTab, setSelectedTab] = useState(0)
  const ActiveTab = tabConfig[selectedTab].component;
  const [addProfileFormStep, setAddProfileFormStep] = useState(0);
  const [candidateData, setCandidateData] = useState<FormData>({
    personalData: {
      name: "",
      email: "",
      phone: "",
      headline: "",
      intro: "",
      facebook: "",
      insta: "",
      linkedin: "",
      twitter: "",
      yt: ""
    },
    education: [
      {
        institute: "",
        degree: "",
        passingYear: "",
        description: "",
      }
    ],
    workExp: [
      {
        company: "",
        position: "",
        workingPeriod: "",
        description: "",
      }
    ],
    skills: [],
    tools: [],
    projects: [
      {
        name: "",
        link: "",
        image: null,
        description: "",
      }
    ],
    achievements: [
      {
        name: "",
        link: "",
        image: null,
        description: "",
      }
    ],
    socialActivity: [
      {
        title: "",
        description: "",
      }
    ]
  })

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
              <div className="admin-component-section">
                {(() => {
                  const TabComponent = tabConfig[selectedTab].component;

                  if (tabConfig[selectedTab].key === "addProfile") {
                    return (
                      <TabComponent
                        selectedForm={addProfileFormStep}
                        setSelectedForm={setAddProfileFormStep}
                        candidateData={candidateData}
                        setCandidateData={setCandidateData}
                      />
                    );
                  }
                  return <TabComponent />;
                })()}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
