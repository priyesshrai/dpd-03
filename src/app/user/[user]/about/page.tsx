'use client'
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { useUserContext } from '@/context/UserContext';
import { Marquee } from '@devnomic/marquee';
import Link from 'next/link';

export default function UserAboutPage() {
  const { userData, loading } = useUserContext();

  return (
    <div className="other-page">
      {
        loading && (<div className='edit-loading'>
          <LargeSpinner />
        </div>)
      }

      <div className="other-page-wraper">
        <div className="heading">
          <h2>
            Hi, this is <span>{userData.name} 🖐</span>
          </h2>
        </div>
        <div className="body">
          <div className="body-intro">
            <span>{userData.profile_heading}</span>
            <p>
              {userData.introduction}
            </p>
          </div>

          <div className="body-social">
            <span>Connect Me On</span>
            <div className='social-media'>
              {
                userData.instagram_link && (
                  <div className='icon-container insta'>
                    <Link
                      href={userData.instagram_link}
                      target='_blank'>
                      <i className="hgi hgi-stroke hgi-instagram"></i>
                    </Link>
                  </div>
                )
              }
              {
                userData.linkedin_link && (
                  <div className='icon-container linkedin'>
                    <Link
                      href={userData.linkedin_link}
                      target='_blank'>
                      <i className="hgi hgi-stroke hgi-linkedin-01"></i>
                    </Link>
                  </div>
                )
              }
              {
                userData.facebook_link && (
                  <div className='icon-container fb'>
                    <Link
                      href={userData.facebook_link}
                      target='_blank'>
                      <i className="hgi hgi-stroke hgi-facebook-01"></i>
                    </Link>
                  </div>
                )
              }
              {
                userData.twitter_link && (
                  <div className='icon-container twitter'>
                    <Link
                      href={userData.twitter_link}
                      target='_blank'>
                      <i className="hgi hgi-stroke hgi-new-twitter"></i>
                    </Link>
                  </div>
                )
              }
              {
                userData.youtube_link && (
                  <div className='icon-container yt'>
                    <Link
                      href={userData.youtube_link}
                      target='_blank'>
                      <i className="hgi hgi-stroke hgi-youtube"></i>
                    </Link>
                  </div>
                )
              }
            </div>
          </div>

        </div>
        <CommonFooter />
      </div>

    </div>
  )
}

export function CommonFooter() {
  const { userData } = useUserContext()
  return (
    <div className="footer">
      <Marquee pauseOnHover={true} fade={true}>
        {userData.profile_heading}
      </Marquee>
    </div>
  )
}
