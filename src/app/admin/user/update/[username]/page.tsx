import React from 'react'
import UpdateTabs from './UpdateTabs';

export default async function UpdateUserInfoPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return (
    <UpdateTabs userName={username}/>
  )
}
