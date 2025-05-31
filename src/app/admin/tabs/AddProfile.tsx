'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import LargeSpinner from '@/components/Spinner/LargeSpinner';

type TabConfig = {
  key: string;
  name: string;
  component: React.ComponentType<StepProps>;
}

type StepProps = {
  // userData: UserData;
  // setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  nextStep: () => void;
};

export default function AddProfile() {

  const formConfig: TabConfig[] = [
    {
      key: "profileForm",
      name: "Profile Form",
      component: ProfileForm,
    },
    {
      key: "workForm",
      name: "Work Form",
      component: WorkForm,
    },
  ]

  const [selectedTab, setSelectedTab] = useState(0)
  const ActiveTab = formConfig[selectedTab].component;

  const nextStep = () => {
    if (selectedTab < formConfig.length - 1) {
      setSelectedTab((prev) => prev + 1);
    }
  };

  return (
    <div className='component-common' style={{ padding: 0 }}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={formConfig[selectedTab].key}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveTab nextStep={nextStep} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

type UserData = {
  name: string,
  email: string,
  phone: string,
  headline: string,
  intro: string,
  facebook: string,
  insta: string,
  linkedin: string,
  twitter: string,
  yt: string,
}

function ProfileForm({ nextStep }: StepProps) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    headline: "",
    intro: "",
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

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const UserData = new FormData();
    UserData.append("name", userData.name)
    UserData.append("email", userData.email)
    UserData.append("phone", userData.phone)
    UserData.append("profile", profilePicURL!)
    UserData.append("headline", userData.headline)
    UserData.append("intro", userData.intro)
    UserData.append("facebook", userData.facebook)
    UserData.append("insta", userData.insta)
    UserData.append("linkedin", userData.linkedin)
    UserData.append("twitter", userData.twitter)
    UserData.append("yt", userData.yt)

    UserData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    setLoading(false)
    nextStep()
  }

  return (
    <div className="details-edit-component" style={{ padding: "30px" }}>

      {
        loading ?
          (<div className='edit-loading'>
            <LargeSpinner />
          </div>) : ""
      }

      <div className='details-edit-top'>
        <div className='profile-pic-container'>
          <img className='profile-img' src={profilePicPreview ?? '/images/profile/default.png'} />
          <div className='profile-edit-btn-container'>
            <i className="hgi hgi-stroke hgi-edit-02"></i>
            <input disabled={isDisable} type='file'
              accept="image/*"
              name='profilepic'
              onChange={handleProfilePicChange} />
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
            type="email"
            name='email'
            placeholder=''
            required
            onChange={handleInputChange}
            value={userData.email}
            className='inputs'
            disabled={isDisable}
          />
          <label className='label'>Email</label>
        </div>

        <div className="edit-input-container">
          <input
            type="tel"
            name='phone'
            placeholder=''
            required
            onChange={handleInputChange}
            value={userData.phone}
            className='inputs'
            disabled={isDisable}
          />
          <label className='label'>Phone No.</label>
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
        <button onClick={() => setIsDisable(false)}>Edit</button>
        <button onClick={handleSubmit}>Save</button>
      </div>

    </div>
  )
}

function WorkForm() {
  return (
    <div>Hello</div>
  )
}