import React from 'react'
import type { UpdateEducation, UpdateFormData } from '../../../../../../types';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

type Candidate = {
  profileNid: string;
  loading: boolean;
  candidateEducation: UpdateEducation[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}


export default function UpdateUserEducation({ candidateEducation, loading, setCandidateData, setLoading, profileNid, fetchData }: Candidate) {
  const education = candidateEducation

  const handleChange = (
    index: number,
    field: keyof UpdateEducation,
    value: string
  ) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  const addNewEducation = () => {
    const lastExperience = education[education.length - 1];

    if (!lastExperience) {
      setCandidateData((prevData) => ({
        ...prevData,
        education: [
          ...education,
          {
            education_nid: "",
            institute: "",
            degree: "",
            passingYear: "",
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
      toast.error("Please fill out all fields in the last Education before adding a new one.");
      return;
    }

    setCandidateData((prevData) => ({
      ...prevData,
      education: [
        ...education,
        {
          education_nid: "",
          institute: "",
          degree: "",
          passingYear: "",
          description: "",
        },
      ]
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("education", JSON.stringify(education));
    formData.append("user_type", "superadmin")
    formData.append("user_nid", profileNid)

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/upd-candidate-education-api", formData)
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
        success: (message) => message || "Education Added successful!",
        error: (err) => err || "Failed to Add Education"
      }
    );
  }

  function handleRemove(id: string) {
    const confirmDelete = window.confirm("Are you sure you want to remove this Education?");
    if (!confirmDelete) return;

    const updatedEdu = education.filter((edu) => edu.education_nid !== id || "");
    setCandidateData((prevData) => ({
      ...prevData,
      education: updatedEdu
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
              education.map((edu, index) => (
                <div className="details-edit-body" key={index}
                  style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
                  <span className='work-form-title'>Education {index + 1} </span>
                  <div className='remove' onClick={() => handleRemove(edu.education_nid ?? "")}>
                    <i className="hgi hgi-stroke hgi-delete-02"></i>
                  </div>
                  <div className="details-edit-wraper">

                    <div className="edit-input-container">
                      <input
                        type="text"
                        name='institute'
                        placeholder=''
                        onChange={(e) => handleChange(index, "institute", e.target.value)}
                        value={edu.institute}
                        className='inputs'
                        required
                      />
                      <label className='label'>Institute Name</label>
                    </div>

                    <div className="edit-input-container">
                      <input
                        type="text"
                        name='degree'
                        placeholder=''
                        onChange={(e) => handleChange(index, "degree", e.target.value)}
                        value={edu.degree}
                        className='inputs'
                        required
                      />
                      <label className='label'>Degree</label>
                    </div>

                    <div className="edit-input-container">
                      <input
                        type="text"
                        placeholder=""
                        value={edu.passingYear}
                        onChange={(e) => handleChange(index, "passingYear", e.target.value)}
                        required
                        className='inputs'
                      />
                      <label className='label'>Passing Year</label>
                    </div>

                    <div className="edit-input-container">
                      <textarea
                        name='intro'
                        placeholder=''
                        value={edu.description}
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
              <button onClick={addNewEducation}>Add New</button>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  )
}
