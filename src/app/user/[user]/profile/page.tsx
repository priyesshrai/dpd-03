import React from 'react'
import Tabs from '../Dashboard/Tabs'

export default async function page({ params }: { params: Promise<{ user: string }> }) {
  const { user } = await params;

  return (
    <Tabs user={user} />
  )
}
