'use client'
import React, { useState } from 'react'
import { DashboardProps } from './Dashboard'
import BackBtn from './BackBtn'

type UserData = {
  name: string,
  headline: string,
  intro: string,
  facebook: string,
  insta: string,
  linkedin: string,
  twitter: string,
  yt: string,
}

export default function Profile({ goBack, name }: DashboardProps) {
  const [userData, setUserData] = useState<UserData>({
    name: "Ravi Khetan",
    headline: "CEO & Founder | Wizards Next LLP Varanasi",
    intro: "CEO & Founder | Wizards Next LLP Varanasi | Digital Marketing Wizard Crafting spells in the digital realm with 7+ years of marketing magic 🪄. From SEO sorcery to social media charm, I help brands grow and glow. Leading a team of creative wizards, we brew strategy, design, and results-driven campaigns that make businesses unforgettable",
    facebook: "",
    insta: "",
    linkedin: "",
    twitter: "",
    yt: ""
  })
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null)
  const [profilePicURL, setProfilePicURL] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isDisable, setIsDisable] = useState<boolean>(true)

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF, WebP) are allowed.');
      return;
    }
    setProfilePicURL(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setProfilePicPreview(result);
    };
    reader.readAsDataURL(file);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setUserData((prevData: UserData) => (
      {
        ...prevData,
        [name]: value
      }
    ))

  }

  return (
    <section className='component-section-wraper'>
      <BackBtn goBack={goBack} name={name} />

      <div className="component-common">
        <div className="details-edit-component">

          <div className='details-edit-top'>
            <div className='profile-pic-container'>
              <img className='profile-img' src={profilePicPreview ?? '/images/profile/profile.png'} />
              <div className='profile-edit-btn-container'>
                <i className="hgi hgi-stroke hgi-edit-02"></i>
                <input disabled={isDisable} type='file' accept="image/*" name='profilepic' onChange={handleProfilePicChange} />
              </div>
            </div>
          </div>

          <div className="details-edit-body">
            <div className="edit-input-container">
              <input
                type="text"
                name='name'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.name}
                className='inputs'
                disabled={isDisable}
              />
              <label className='label'>Name</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                name='headline'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.headline}
                className='inputs'
                disabled={isDisable}
              />
              <label className='label'>Headline</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                name='facebook'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.facebook}
                className='inputs'
                disabled={isDisable}
              />
              <label className='label'>Facebook</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                name='insta'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.insta}
                className='inputs'
                disabled={isDisable}
              />
              <label className='label'>Instagram</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                name='linkedin'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.linkedin}
                className='inputs'
                disabled={isDisable}
              />
              <label className='label'>LinkedIn</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                name='twitter'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.twitter}
                className='inputs'
                disabled={isDisable}
              />
              <label className='label'>Twitter</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                name='yt'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.yt}
                className='inputs'
                disabled={isDisable}
              />
              <label className='label'>YouTube</label>
            </div>

            <div className="edit-input-container">
              <textarea
                name='intro'
                placeholder=''
                required
                onChange={handleInputChange}
                value={userData.intro}
                className='inputs'
                rows={5}
                disabled={isDisable}
              />
              <label className='label'>Introduction</label>
            </div>

          </div>

          <div className="details-edit-footer">
            <button onClick={()=>setIsDisable(false)}>Edit</button>
            <button>Save</button>
          </div>

        </div>
      </div>
    </section>
  )
}
