'use client'
import React from 'react'
import { DashboardProps } from '@/app/user/Dashboard/Dashboard'

type TabConfig = {
    key: string;
    tabName: string;
    // icon: React.ComponentType<{ isActive: boolean }>;
    // component: React.ComponentType<DashboardProps>
}

export default function AdminTabs() {
  const tabConfig: TabConfig[] = [
    {
      key: "overview",
      tabName: "Overview",
      // icon: "",
      // component: ""
    },
    {
      key: "profile",
      tabName: "Profile",
      // icon: "",
      // component: ""
    }

  ]
  return (
    <div>AdminTabs</div>
  )
}
