'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CandidateList from './CandidateList';
import AddProfile from './AddProfile';
import AddSkills from './AddSkills';
import AddTools from './AddTools';
import type { FormData } from '../../../../types';
import axios from 'axios';
import { GridRowsProp } from '@mui/x-data-grid';

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

  const [candidateList, setCandidateList] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchcandidateList = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://inforbit.in/demo/dpd/candidate-profile-list");
        if (response.status === 200 && Array.isArray(response.data)) {
          const rows = response.data.map((item, index) => ({
            id: index + 1,
            name: item?.name || '',
            email: item?.profile_email || '',
          }));
          setCandidateList(rows);
        }
      } catch (error) {
        console.error('Failed to fetch candidate data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchcandidateList();
  }, []);

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
                if (tabConfig[selectedTab].key === "addProfile") {
                  return (
                    <ActiveTab
                      selectedForm={addProfileFormStep}
                      setSelectedForm={setAddProfileFormStep}
                      candidateData={candidateData}
                      setCandidateData={setCandidateData}
                    />
                  );
                }

                if (tabConfig[selectedTab].key === "candidate") {
                  return (
                    <ActiveTab
                      candidateList={candidateList}
                      loading={loading}
                    />
                  );
                }

                return <ActiveTab />;
              })()}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
