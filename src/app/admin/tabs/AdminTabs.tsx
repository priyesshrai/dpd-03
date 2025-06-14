'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CandidateList from './CandidateList';
import AddProfile from './AddProfile';
import AddSkills from './AddSkills';
import AddTools from './AddTools';
import type { CandidateRow, FormData } from '../../../../types';
import axios from 'axios';
import { GridRowsProp } from '@mui/x-data-grid';
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

type TabConfig = {
  key: string;
  tabName: string;
  icon: string;
  component: React.ElementType;
}
export type ToolList = {
  image_file: string;
  name: string;
  nid: string;
}
export type SkillList = {
  image_file: string;
  name: string;
  nid: string;
  description: string;
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
  const [toolList, setToolList] = useState<ToolList[]>();
  const [skillList, setSkillList] = useState<SkillList[]>();

  useEffect(() => {
    const fetchcandidateList = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://inforbit.in/demo/dpd/candidate-profile-list");
        if (response.status === 200 && Array.isArray(response.data)) {
          const rows = response.data.map((item, index) => ({
            id: index + 1,
            name: item?.name || '',
            email: item?.profile_email || '',
            profileId: item?.profile_nid || "",
            slug: item?.profile_slug || "",
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
  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/tools-master-display');
        if (response.data) {
          setToolList(response.data)
        } else {
          toast.error(response.data.message || 'Failed to fetch Tools.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching Tools.');
      }
    }
    async function fetchSkills() {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/expert-area-master-display');
        if (response.data) {
          setSkillList(response.data)
        } else {
          toast.error(response.data.message || 'Failed to fetch skills.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching skills.');
      }
    }
    fetchSkills();
    fetchTools();
  }, [])

  async function UpdateUserData(userData: CandidateRow) {
    setLoading(true);
    if (!userData.profileId) {
      alert("Please Wait User Data is not loaded fully");
      return;
    }

    const response = await axios.get(`http://inforbit.in/demo/dpd/candidate-profile/${userData?.profileId}`)
    console.log(response.data);
    setLoading(false)
  }

  function handleLogOut() {
    Cookies.remove("data");
    toast.success("Logout Successful...!")
    window.location.href = '/';
  }

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
                  <button onClick={handleLogOut}>
                    <i className="hgi hgi-stroke hgi-keyframes-double-remove"></i>
                  </button>
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
                      UpdateUserData={UpdateUserData}
                    />
                  );
                }

                return <ActiveTab toolList={toolList} skillList={skillList} />;
              })()}
            </div>

          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
