import React from 'react'
import UpdateTabs from './UpdateTabs';

export default async function UpdateUserInfoPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  // console.log(username);
  
  return (
    <UpdateTabs userName={username}/>
  )
}
