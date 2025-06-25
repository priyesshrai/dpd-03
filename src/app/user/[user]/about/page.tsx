'use client'
import { useUserContext } from '@/context/UserContext';

export default function UserAboutPage() {
  const { userData, loading } = useUserContext();

  return (
    <div className="other-page">
      {userData.name}
    </div>
  )
}
