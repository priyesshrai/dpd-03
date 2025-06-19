import React from 'react'
import UpdateTabs from './UpdateTabs';
import axios from 'axios';

export default async function UpdateUserInfoPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return (
    <UpdateTabs userName={username} />
  )
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  try {
    const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${username}`);
    const userData = response?.data?.data;

    return {
      title: userData.name,
      description: userData.profile_heading,
      icons: {
        icon: userData.profile_photo
      }
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      title: 'User not found',
    };
  }
}
