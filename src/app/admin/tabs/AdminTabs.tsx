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
import ChangePassword from './ChangePassword';

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
      tabName: "Skills Master",
      icon: "hgi hgi-stroke hgi-idea-01",
      component: AddSkills
    },
    {
      key: "addTool",
      tabName: "Tools Master",
      icon: "hgi hgi-stroke hgi-code",
      component: AddTools
    },
    {
      key: "changePass",
      tabName: "Change Password",
      icon: "hgi hgi-stroke hgi-edit-02",
      component: ChangePassword
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
  const [openMenu, setOpenMenu] = useState<boolean>(false)

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
            education: item?.education_list || "",
            work: item?.work_exp_list || "",
            skill: item?.expert_area_list || "",
            project: item?.recent_project_list || "",
            tools: item?.tools_list || "",
            achievement: item?.achievement_list || "",
            socialActivity: item?.social_activities_list || "",
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
  }, [selectedTab === 0]);

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
  useEffect(() => {
    fetchSkills();
    fetchTools();
  }, [])

  useEffect(() => {
    if (selectedTab !== 1) {
      if (localStorage.getItem("userId")) {
        localStorage.removeItem("userId");
        setCandidateData({
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
        setAddProfileFormStep(0)
      }

      if (localStorage.getItem("tempInfo")) {
        localStorage.removeItem("tempInfo");
        setCandidateData({
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
        setAddProfileFormStep(0)
      }
    }
  }, [selectedTab]);

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
    return;
  }

  return (
    <section className='admin-dashboard-container'>
      <div className="admin-dashboard-wraper">
        <div className={`admin-tabs-container ${openMenu ? "active" : ''}`}>
          <div className="admin-tab-top">
            <Image src="/images/user/logo.png" width={500} height={100} alt='DreamPath Development' />
          </div>
          <div className="admin-tab-body">
            {
              tabConfig.map((tab, index) => (
                <div className={`admin-tab-item ${selectedTab === index ? 'active' : ''}`}
                  key={tab.key}
                  onClick={() => { setSelectedTab(index); setOpenMenu(false) }}
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
                <div className='header-container-a'>
                  <div className='hum' onClick={() => setOpenMenu(!openMenu)}>
                    <div className='overlay-1' style={{ width: openMenu ? '100%' : '0' }}></div>
                    <span className={`${openMenu ? "active" : ""}`}></span>
                    <span className={`${openMenu ? "active" : ""}`}></span>
                    <span className={`${openMenu ? "active" : ""}`}></span>
                  </div>
                  <h1>{tabConfig[selectedTab].tabName}</h1>
                </div>
                <div className='logo-container'>
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

                return <ActiveTab
                  toolList={toolList}
                  skillList={skillList}
                  fetchTools={fetchTools}
                  fetchSkills={fetchSkills}
                />;
              })()}
            </div>

          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
