import React, { useState } from 'react'
import { UpdateFormData, UpdateWorkExperience } from '../../../../../../types';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


type Candidate = {
  loading: boolean;
  candidateWork: UpdateWorkExperience[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  profileNid: string;
}
export default function UpdateUserWorkExe({ candidateWork, loading, setCandidateData, setLoading, profileNid }: Candidate) {
  const workExperiences = candidateWork;

  const addNewExperience = () => {
    const lastExperience = workExperiences[workExperiences.length - 1];

    if (!lastExperience) {
      setCandidateData((prevData) => ({
        ...prevData,
        workExp: [
          ...workExperiences,
          {
            work_exp_nid: "",
            company: "",
            position: "",
            workingPeriod: "",
            description: "",
          },
        ]
      }));
      return;
    }

    const allFieldsFilled = Object.values(lastExperience).every(
      (field) => field.trim() !== ""
    );
    if (!allFieldsFilled) {
      alert("Please fill out all fields in the last experience before adding a new one.");
      return;
    }
    setCandidateData((prevData) => ({
      ...prevData,
      workExp: [
        ...workExperiences,
        {
          work_exp_nid: "",
          company: "",
          position: "",
          workingPeriod: "",
          description: "",
        },
      ]
    }));
  };

  const handleChange = (
    index: number,
    field: keyof UpdateWorkExperience,
    value: string
  ) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      workExp: updatedExperiences,
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("workex", JSON.stringify(workExperiences));
    formData.append("user_type", "superadmin")
    formData.append("user_nid", profileNid)

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/upd-candidate-work-api", formData)
        .then((response) => {
          if (response.data.status) {
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
        success: (message) => message || "Work Experience Added successful!",
        error: (err) => err || "Failed to Add Work Experience"
      }
    );
  }

  function handleRemove(id: string) {
    const confirmDelete = window.confirm("Are you sure you want to remove this work experience?");
    if (!confirmDelete || !id) return;

    const updatedWork = workExperiences.filter((work) => work.work_exp_nid !== id || !id);
    setCandidateData((prevData) => ({
      ...prevData,
      workExp: updatedWork
    }));
  }

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
                </div>) : ("")
            }
            {
              workExperiences.map((experience, index) => (
                <div className="details-edit-body" key={index}
                  style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
                  <span className='work-form-title'>Work Experience {index + 1} </span>
                  <div className='remove' onClick={() => handleRemove(experience.work_exp_nid)}>
                    <i className="hgi hgi-stroke hgi-delete-02"></i>
                  </div>

                  <div className="details-edit-wraper">

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


                </div>
              ))
            }
            <div className="details-edit-footer">
              <button onClick={addNewExperience}>Add New</button>
              <button onClick={handleSubmit}>Save</button>
            </div>


          </div>

        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  )
}
