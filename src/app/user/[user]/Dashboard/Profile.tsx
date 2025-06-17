'use client'
import React, { useState } from 'react'
import BackBtn from './BackBtn'
import { UpdateFormData, UpdateUserData } from '../../../../../types'
import LargeSpinner from '@/components/Spinner/LargeSpinner'

type UserData = {
  name?: string
  goBack?: () => void;
  candidateProfile: UpdateUserData
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  profileNid:string;
}

export default function Profile({ goBack, name, candidateProfile, setCandidateData, profileNid }: UserData) {
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF, WebP) are allowed.');
      return;
    }
    setCandidateData((prev) => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        profile: file,
      },
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setProfilePicPreview(result);
    };
    reader.readAsDataURL(file);
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCandidateData((prev) => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        [name]: value,
      },
    }));

  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();

    Object.keys(candidateProfile).forEach((key) => {
      if (key === "profile_nid") return;
      formData.append(key, candidateProfile[key as keyof UpdateUserData]);
    });
    formData.append("user_type", "superadmin")
    formData.append("cnid", profileNid)

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // toast.promise(
    //   axios.post("https://inforbit.in/demo/dpd/upd-candidate-profile-api", formData)
    //     .then((response) => {

    //       if (response.data.status) {
    //         fetchData()
    //         setLoading(false);
    //         return response.data.message;
    //       }
    //     })
    //     .catch((error) => {
    //       setLoading(false);
    //       console.log(error);
    //       const errorMessage = error.response?.data?.message || error.message;
    //       throw errorMessage;
    //     }),
    //   {
    //     loading: "Please Wait....",
    //     success: (message) => message || "Profile Added successful!",
    //     error: (err) => err || "Failed to Add Candidate Profile"
    //   }
    // );
  }

  return (
    <section className='component-section-wraper'>
      <BackBtn goBack={goBack} name={name} />

      <div className="component-common" style={{padding:"0"}}>
        <div className="details-edit-component" style={{padding:"20px"}}>
          {
            loading ?
              (<div className='edit-loading'>
                <LargeSpinner />
              </div>) : ""
          }

          <div className='details-edit-top'>
            <div className='profile-pic-container'>
              <img className='profile-img' src={
                profilePicPreview
                ?? (typeof candidateProfile.profile === 'string'
                  ? candidateProfile.profile
                  : undefined)
              } />
              <div className='profile-edit-btn-container'>
                <i className="hgi hgi-stroke hgi-edit-02"></i>
                <input type='file' accept="image/*" name='profilepic' onChange={handleProfilePicChange} />
              </div>
            </div>
          </div>

          <div className="details-edit-body">
            <div className='details-edit-wraper'>

              <div className="edit-input-container">
                <input
                  type="text"
                  name='name'
                  placeholder=''
                  required
                  onChange={handleInputChange}
                  value={candidateProfile.name}
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
                  value={candidateProfile.email}
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
                  value={candidateProfile.phone}
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
                  value={candidateProfile.headline}
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
                  value={candidateProfile.facebook}
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
                  value={candidateProfile.insta}
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
                  value={candidateProfile.linkedin}
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
                  value={candidateProfile.twitter}
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
                  value={candidateProfile.yt}
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
                  value={candidateProfile.intro}
                  className='inputs'
                  rows={5}

                />
                <label className='label'>Introduction</label>
              </div>
            </div>

          </div>

          <div className="details-edit-footer">
            <button onClick={handleSubmit}>Save</button>
          </div>

        </div>
      </div>
    </section>
  )
}
