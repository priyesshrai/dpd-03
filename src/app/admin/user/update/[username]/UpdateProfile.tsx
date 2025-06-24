'use client'
import React, { useRef, useState } from 'react'
import { UpdateFormData, UpdateUserData } from '../../../../../../types';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { CropperRef, Cropper } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css';

export type Candidate = {
  loading: boolean;
  candidateProfile: UpdateUserData;
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  profileNid: string
  fetchData: () => void;
}

export default function UpdateProfile({ candidateProfile, loading, setCandidateData, setLoading, profileNid, fetchData }: Candidate) {
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null)
  const cropperRef = useRef<CropperRef>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);


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
      setCropSrc(result);
      setProfilePicPreview(result);
      setShowCropper(true);
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

    formData.forEach((value, key) => (
      console.log(key + " > " + value)
    ))

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/upd-candidate-profile-api", formData)
        .then((response) => {

          if (response.data.status) {
            fetchData()
            setLoading(false);
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

  const handleCropApply = async () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();

      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });

            setCandidateData((prev) => ({
              ...prev,
              personalData: {
                ...prev.personalData,
                profile: file
              }
            }))
            const previewURL = URL.createObjectURL(blob);
            setProfilePicPreview(previewURL);
            setShowCropper(false);
          } else {
            toast.error("Failed to crop image.");
          }
        }, 'image/jpeg');
      }
    }
  };

  return (
    <div className='component-common' style={{ padding: 0 }}>

      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
        >
          <div className="details-edit-component" style={{ padding: "30px" }}>

            {
              loading ?
                (<div className='edit-loading'>
                  <LargeSpinner />
                </div>) : ""
            }

            <div className='details-edit-top' >
              <div className='profile-pic-container'>
                <img
                  className='profile-img'
                  src={
                    profilePicPreview
                    || (typeof candidateProfile?.profile === 'string' && candidateProfile.profile)
                    || "/images/profile/default.png"
                  }
                />
                <div className='profile-edit-btn-container'>
                  <i className="hgi hgi-stroke hgi-edit-02"></i>
                  <input type='file'
                    accept="image/*"
                    name='profilepic'
                    onChange={handleProfilePicChange}
                  />
                </div>
              </div>
            </div>

            {showCropper && cropSrc && (
              <div className='avatar-cropper'>
                <div className="avatar-cropper-wraper">
                  <div className="avatar-card">
                    <Cropper
                      ref={cropperRef}
                      src={cropSrc}
                      className="cropper"
                      stencilProps={{ aspectRatio: 1 }}
                      style={{ width: '100%', height: '400px' }}
                    />
                    <button onClick={handleCropApply}>Apply Crop</button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="details-edit-body" style={{ marginTop: "50px" }}>
                <div className="details-edit-wraper">

                  <div className="edit-input-container">
                    <input
                      type="text"
                      name='name'
                      placeholder=''
                      required
                      onChange={handleInputChange}
                      value={candidateProfile.name || ''}
                      className='inputs'
                    />
                    <label className='label'>Name</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="email"
                      name='email'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.email || ''}
                      className='inputs'
                      readOnly
                      disabled
                    />
                    <label className='label'>Email</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="tel"
                      name='phone'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.phone || ''}
                      className='inputs'
                      readOnly
                      disabled
                    />
                    <label className='label'>Phone No.</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="text"
                      name='headline'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.headline || ''}
                      className='inputs'
                    />
                    <label className='label'>Headline</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="url"
                      name='facebook'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.facebook || ''}
                      className='inputs'
                    />
                    <label className='label'>Facebook</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="url"
                      name='insta'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.insta || ''}
                      className='inputs'
                    />
                    <label className='label'>Instagram</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="url"
                      name='linkedin'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.linkedin || ''}
                      className='inputs'
                    />
                    <label className='label'>LinkedIn</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="url"
                      name='twitter'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.twitter || ''}
                      className='inputs'
                    />
                    <label className='label'>Twitter</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="url"
                      name='yt'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.yt || ''}
                      className='inputs'
                    />
                    <label className='label'>YouTube</label>
                  </div>

                  <div className="edit-input-container">
                    <textarea
                      name='intro'
                      placeholder=''
                      onChange={handleInputChange}
                      value={candidateProfile.intro || ''}
                      className='inputs'
                      rows={5}
                    />
                    <label className='label'>Introduction</label>
                  </div>

                </div>
              </div>

              <div className="details-edit-footer">
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : 'Save'}
                </button>
              </div>
            </form>

          </div>

        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div >
  )
}
