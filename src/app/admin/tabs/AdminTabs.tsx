'use client'
import React, { useState } from 'react'
import { DashboardProps } from '@/app/user/Dashboard/Dashboard'
import Image from 'next/image';
import CandidateList from './CandidateList';
import AddProfile from './AddProfile';

type TabConfig = {
  key: string;
  tabName: string;
  icon: string;
  component: React.ComponentType<DashboardProps>
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
    }
  ]

  const [selectedTab, setSelectedTab] = useState(0)
  const ActiveTab = tabConfig[selectedTab].component;


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
            



            <ActiveTab />
          </div>
        </div>
      </div>
    </section>
  )
}
