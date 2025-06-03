'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import LargeSpinner from '@/components/Spinner/LargeSpinner';

interface Skills {
  skillName: string;
  image: File | null;
  description: string;
}

export default function AddSkills() {

  const [skills, setSkills] = useState<Skills>({
    skillName: "",
    image: null,
    description: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setSkills((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    setSkills((prevData) => ({
      ...prevData,
      image: file
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("skillName", skills.skillName);
    formData.append("description", skills.description);
    formData.append("user_type", "superadmin");

    if (skills.image) {
      formData.append("image", skills.image);
    }


    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/expert-area-master", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {

          if (response.data.status) {
            setSkills({
              skillName: "",
              image: null,
              description: "",
            });
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            setLoading(false);
            return response.data.message || "Skill added successfully!";
          } else {
            throw response.data.message || "Failed to add skill.";
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          const errorMessage = error.response?.data?.message || error.message;
          throw errorMessage;
        }),
      {
        loading: "Please wait...",
        success: (message) => message || "Skill added successfully!",
        error: (err) => err || "Failed to add skill."
      }
    );
  }

  return (
    <div className='component-common'>
      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          
          {loading && (
            <div className='edit-loading'>
              <LargeSpinner />
            </div>
          )}
          <div className="details-edit-component" style={{ padding: "30px" }}>


            <form onSubmit={handleSubmit}>
              <div className="details-edit-body" >
                <div className="details-edit-wraper">
                  <div className="edit-input-container">
                    <input
                      type="text"
                      name='skillName'
                      placeholder=''
                      onChange={handleChange}
                      value={skills.skillName}
                      className='inputs'
                      required
                    />
                    <label className='label'>Skill Name</label>
                  </div>

                  <div className="edit-input-container">
                    <input
                      type="file"
                      name='image'
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className='inputs'
                      required
                    />
                    <label className='label'>Skill Image</label>
                  </div>

                  <div className="edit-input-container">
                    <textarea
                      name='description'
                      placeholder=''
                      value={skills.description}
                      onChange={handleChange}
                      className='inputs'
                      rows={5}
                      required
                    />
                    <label className='label'>Skill Description</label>
                  </div>
                </div>
              </div>

              <div className="details-edit-footer">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
          <Toaster />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
