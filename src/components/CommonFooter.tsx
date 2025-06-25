'use client'
import { useUserContext } from '@/context/UserContext';
import { Marquee } from '@devnomic/marquee';

export default function CommonFooter() {
  const { userData } = useUserContext()
  return (
    <div className="footer">
      <Marquee pauseOnHover={true} fade={true}>
        {userData.profile_heading}
      </Marquee>
    </div>
  )
}
