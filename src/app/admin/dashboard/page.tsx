import React from 'react'
import AdminTabs from '../tabs/AdminTabs'

export default function AdminDashboard() {
  return (
    <>
      <AdminTabs />
    </>
  )
}


export async function generateMetadata() {
  return {
    title: "Super Admin",
    description: "DreamPath Development",
    icons: {
      icon: "/images/user/logo.png"
    }
  };
}