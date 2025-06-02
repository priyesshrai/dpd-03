'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

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
      <Toaster />
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
    const formData = new FormData();

    Object.keys(userData).map((key) => (
      formData.append(key, userData[key as keyof UserData])
    ))
    formData.append("profile", profilePicURL!)
    formData.append("user_type", "superadmin")

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-profile-registration-api", formData)
        .then((response) => {

          if (response.data.status) {

            localStorage.setItem("userId", response.data.profile_nid)

            setUserData({
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
            setProfilePicURL(null)
            setProfilePicPreview(null)
            setLoading(false);
            nextStep()
            return response.data.message;
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          const errorMessage = error.response?.data?.message || error.message;
          throw errorMessage;
        }),
      {
        loading: "Please Wait....",
        success: (message) => message || "Profile Added successful!",
        error: (err) => err || "Failed to Add Candidate Profile"
      }
    );

  }

  return (
    <div className="details-edit-component" style={{ padding: "30px" }}>

      {
        loading ?
          (<div className='edit-loading'>
            <LargeSpinner />
          </div>) : ""
      }

      <div className='details-edit-top' >
        <div className='profile-pic-container'>
          <img className='profile-img' src={profilePicPreview ?? '/images/profile/default.png'} />
          <div className='profile-edit-btn-container'>
            <i className="hgi hgi-stroke hgi-edit-02"></i>
            <input type='file'
              accept="image/*"
              name='profilepic'
              onChange={handleProfilePicChange} />
          </div>
        </div>
      </div>

      <div className="details-edit-body" style={{ marginTop: "50px" }}>
        <div className="edit-input-container">
          <input
            type="text"
            name='name'
            placeholder=''
            required
            onChange={handleInputChange}
            value={userData.name}
            className='inputs'
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
          />
          <label className='label'>Introduction</label>
        </div>

      </div>

      <div className="details-edit-footer">
        <button onClick={handleSubmit}>Next</button>
      </div>

    </div>
  )
}


interface WorkExperience {
  company: string;
  position: string;
  workingPeriod: string;
  description: string;
}

function WorkForm({ nextStep }: StepProps) {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    {
      company: "",
      position: "",
      workingPeriod: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false)

  const addExperience = () => {
    const lastExperience = workExperiences[workExperiences.length - 1];
    const allFieldsFilled = Object.values(lastExperience).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill out all fields in the last experience before adding a new one.");
      return;
    }

    setWorkExperiences([
      ...workExperiences,
      {
        company: "",
        position: "",
        workingPeriod: "",
        description: "",
      },
    ]);
  };


  const handleChange = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][field] = value;
    setWorkExperiences(updatedExperiences);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const userId: string | null = await localStorage.getItem("userId")
    const formData = new FormData();
    formData.append("work_experiences", JSON.stringify(workExperiences));
    formData.append("user_type", "superadmin")
    formData.append("profile_nid", userId!)

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    toast.promise(
      axios.post("http://inforbit.in/demo/dpd/candidate-work-experience-api", formData)
        .then((response) => {
          console.log(response);
          
          if (response.data.status) {
            setWorkExperiences([
              {
                company: "",
                position: "",
                workingPeriod: "",
                description: "",
              },
            ]);
            setLoading(false);
            nextStep()
            return response.data.message;
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          const errorMessage = error.response?.data?.message || error.message;
          throw errorMessage;
        }),
      {
        loading: "Please Wait....",
        success: (message) => message || "Work Experience Added successful!",
        error: (err) => err || "Failed to Add Work Experience"
      }
    );
  }

  return (
    <div className="details-edit-component" style={{ padding: "30px" }}>

      {
        loading ?
          (<div className='edit-loading'>
            <LargeSpinner />
          </div>) : ""
      }

      {
        workExperiences.map((experience, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            {/* <span className='work-form-title'>Work Experience {index + 1} </span> */}
            <div className="edit-input-container">
              <input
                type="text"
                name='company'
                placeholder=''
                onChange={(e) => handleChange(index, "company", e.target.value)}
                value={experience.company}
                className='inputs'
                required
              />
              <label className='label'>Company Name</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                name='position'
                placeholder=''
                onChange={(e) => handleChange(index, "position", e.target.value)}
                value={experience.position}
                className='inputs'
                required
              />
              <label className='label'>Position</label>
            </div>

            <div className="edit-input-container">
              <input
                type="text"
                placeholder=""
                value={experience.workingPeriod}
                onChange={(e) => handleChange(index, "workingPeriod", e.target.value)}
                required
                className='inputs'
              />
              <label className='label'>Working Period</label>
            </div>

            <div className="edit-input-container">
              <textarea
                name='intro'
                placeholder=''
                value={experience.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className='inputs'
                rows={5}
                required
              />
              <label className='label'>Description</label>
            </div>

          </div>
        ))
      }
      <div className="details-edit-footer">
        <button onClick={addExperience}>Add New</button>
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  )
}