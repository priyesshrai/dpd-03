import React from 'react'

export default async function UserAboutPage({ params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
  return (
    <div>UserAboutPage</div>
  )
}
