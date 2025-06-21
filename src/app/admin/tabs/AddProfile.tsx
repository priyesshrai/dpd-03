'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import type { AddProfileProps, FormData } from '../../../../types';
import Image from 'next/image';

type TabConfig = {
  key: string;
  name: string;
  component: React.ComponentType<StepProps>;
}

interface WorkExperience {
  company: string;
  position: string;
  workingPeriod: string;
  description: string;
}

interface Education {
  institute: string,
  degree: string,
  passingYear: string
  description: string;
}

type StepProps = {
  nextStep: () => void;
  candidateData: FormData;
  setCandidateData: React.Dispatch<React.SetStateAction<FormData>>;
  selectedForm: number
  isUserIdPresent: boolean;
};
type TempInfo = {
  name: string;
  email: string;
  phone: string;
  profile: string | null
}


export default function AddProfile(
  { selectedForm, setSelectedForm, candidateData, setCandidateData }: AddProfileProps) {
  const [isUserIdPresent, setIsUserIdPresent] = useState<boolean>(false)
  const [tempInfo, setTempInfo] = useState<TempInfo>()

  const formConfig: TabConfig[] = [
    {
      key: "profileForm",
      name: "Profile",
      component: ProfileForm,
    },
    {
      key: "educationForm",
      name: "Education",
      component: EducationForm,
    },
    {
      key: "workForm",
      name: "Work Form",
      component: WorkForm,
    },
    {
      key: "skills",
      name: "Skills",
      component: SkillsForm,
    },
    {
      key: "tools",
      name: "Tools",
      component: ToolsForm,
    },
    {
      key: "projects",
      name: "Projects",
      component: ProjectForm,
    },
    {
      key: "achievement",
      name: "Achievements",
      component: AchievementForm,
    },
    {
      key: "social_activity",
      name: "Social Activity",
      component: SocialActivityForm,
    },
  ]
  const ActiveForm = formConfig[selectedForm].component;
  const nextStep = () => {
    setSelectedForm((prev) =>
      prev < formConfig.length - 1 ? prev + 1 : 0
    );
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    setIsUserIdPresent(userId ? true : false);
  }, [selectedForm === 0])

  useEffect(() => {
    function getTempUser() {
      const tempUserStr = localStorage.getItem("tempInfo") || ""
      setTempInfo(tempUserStr ? JSON.parse(tempUserStr) : undefined)
    }
    getTempUser()
  }, [selectedForm === 1, isUserIdPresent])

  function handleNavigation(index: number) {
    const userId = localStorage.getItem("userId")

    if (!userId && index !== 0) {
      alert("Create Candidate Profile First...!")
      return;
    }
    setSelectedForm(index)
  }


  return (
    <div className='component-common' style={{ padding: 0 }}>

      {
        tempInfo ? (
          <div className='profileWorkingOn'>
            <Image src={tempInfo?.profile || "/images/profile/default.png"}
              width={60} height={60} alt={tempInfo?.name || "User"} style={{ borderRadius: "50%", objectFit: "cover", width: "60px", height: "60px" }} />
            <span>{tempInfo?.name}</span>
            <strong>{tempInfo?.email}</strong>
            <strong>{tempInfo?.phone}</strong>
          </div>
        ) : ""
      }

      <div className='formNavigation'>
        {
          formConfig.map((formName, idx) => (
            <React.Fragment key={formName.key}>
              <span
                className={selectedForm === idx ? "active" : ""}
                onClick={() => handleNavigation(idx)}
              >
                {formName.name}
              </span>
              {idx < formConfig.length - 1 && <span className="separator"> &gt; </span>}
            </React.Fragment>
          ))
        }
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={formConfig[selectedForm].key}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
        >
          <ActiveForm
            nextStep={nextStep}
            candidateData={candidateData}
            setCandidateData={setCandidateData}
            selectedForm={selectedForm}
            isUserIdPresent={isUserIdPresent}
          />
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

function ProfileForm({ nextStep, candidateData, setCandidateData, isUserIdPresent }: StepProps) {
  const userData = candidateData.personalData;
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null)
  const [profilePicURL, setProfilePicURL] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast.error('Only images (JPEG, PNG, GIF, WebP) are allowed.');
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

    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key as keyof UserData]);
    });

    formData.append("profile", profilePicURL!)
    formData.append("user_type", "superadmin")

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-profile-registration-api", formData)
        .then((response) => {

          if (response.data.status) {
            localStorage.setItem("userId", response.data.profile_nid)
            localStorage.setItem("tempInfo",
              JSON.stringify(
                {
                  "name": userData.name,
                  "email": userData.email,
                  "phone": userData.phone,
                  "profile": profilePicPreview
                }))
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
              onChange={handleProfilePicChange}
              disabled={isUserIdPresent}
            />
          </div>
        </div>
      </div>

      <div className="details-edit-body" style={{ marginTop: "50px" }}>
        <div className="details-edit-wraper">

          <div className="edit-input-container">
            <input
              type="text"
              name='name'
              placeholder=''
              required
              onChange={handleInputChange}
              value={userData.name}
              className='inputs'
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
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
              disabled={isUserIdPresent}
            />
            <label className='label'>Introduction</label>
          </div>

        </div>

      </div>

      <div className="details-edit-footer">
        <button disabled={isUserIdPresent} onClick={handleSubmit}>Save</button>
      </div>

    </div>
  )
}

function EducationForm({ nextStep, candidateData, setCandidateData }: StepProps) {
  const education = candidateData.education;
  const [loading, setLoading] = useState<boolean>(false)

  const addNewEducation = () => {
    const lastExperience = education[education.length - 1];

    if (!lastExperience) {
      setCandidateData((prevData) => ({
        ...prevData,
        education: [
          ...education,
          {
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
          institute: "",
          degree: "",
          passingYear: "",
          description: "",
        },
      ]
    }));
  };

  const handleChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const userId: string | null = await localStorage.getItem("userId")
    const formData = new FormData();
    formData.append("education", JSON.stringify(education));
    formData.append("user_type", "superadmin")
    formData.append("profile_nid", userId!)

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-education-api", formData)
        .then((response) => {
          if (response.data.status) {
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
        success: (message) => message || "Education Added successful!",
        error: (err) => err || "Failed to Add Education"
      }
    );
  }

  function handleRemove(index?: number) {
    const confirmDelete = window.confirm("Are you sure you want to remove this Education?");
    if (!confirmDelete) return;

    const updatedEdu = education.filter((_, i) => i !== index);
    setCandidateData((prevData) => ({
      ...prevData,
      education: updatedEdu
    }));
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
        education.map((edu, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            <span className='work-form-title'>Education {index + 1} </span>
            <div className='remove' onClick={() => handleRemove(index)}>
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
  )
}

function WorkForm({ nextStep, candidateData, setCandidateData }: StepProps) {
  const workExperiences = candidateData.workExp
  const [loading, setLoading] = useState<boolean>(false)

  const addExperience = () => {
    const lastExperience = workExperiences[workExperiences.length - 1];

    if (!lastExperience) {
      setCandidateData((prevData) => ({
        ...prevData,
        workExp: [
          ...workExperiences,
          {
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
      toast.error("Please fill out all fields in the last experience before adding a new one.");
      return;
    }
    setCandidateData((prevData) => ({
      ...prevData,
      workExp: [
        ...workExperiences,
        {
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
    field: keyof WorkExperience,
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
    const userId: string | null = await localStorage.getItem("userId")
    const formData = new FormData();
    formData.append("work_experiences", JSON.stringify(workExperiences));
    formData.append("user_type", "superadmin")
    formData.append("profile_nid", userId!)

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-work-experience-api", formData)
        .then((response) => {
          if (response.data.status) {
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

  function handleRemove(id: number) {
    const confirmDelete = window.confirm("Are you sure you want to remove this work experience?");
    if (!confirmDelete) return;

    const updatedWork = workExperiences.filter((_, index) => index !== id);
    setCandidateData((prevData) => ({
      ...prevData,
      workExp: updatedWork
    }));
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
            <span className='work-form-title'>Work Experience {index + 1} </span>
            <div className='remove' onClick={() => handleRemove(index)}>
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
        <button onClick={addExperience}>Add New</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

function SkillsForm({ nextStep, candidateData, setCandidateData }: StepProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const skills = candidateData.skills;
  const [loading, setLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/expert-area-master-display');
        if (response.data) {
          setCandidateData((prevData) => ({
            ...prevData,
            skills: response.data
          }));
        } else {
          toast.error(response.data.message || 'Failed to fetch skills.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching skills.');
      }
    }
    fetchSkills();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (skillId: string) => {
    setSelectedSkills((prevSelected) => {
      if (prevSelected.includes(skillId)) {
        return prevSelected.filter((id) => id !== skillId);
      } else {
        return [...prevSelected, skillId];
      }
    });
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const userId: string | null = await localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("skill_ids", JSON.stringify(selectedSkills));
    formData.append("user_type", "superadmin");
    formData.append("profile_nid", userId!);

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-expert-area", formData)
        .then((response) => {
          if (response.data.status) {
            setLoading(false);
            nextStep();
            return response.data.message || "Skills added successfully!";
          } else {
            throw response.data.message || "Failed to add skills.";
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          const errorMessage = error.response?.data?.message || error.message;
          throw errorMessage;
        }),
      {
        loading: "Submitting...",
        success: (message) => message,
        error: (err) => err || "Failed to add skills."
      }
    );
  }

  return (
    <div className="details-edit-component" style={{ padding: "30px" }}>
      {loading && (
        <div className="edit-loading">
          <LargeSpinner />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="details-edit-body">
          <div className="details-edit-wraper">
            <div
              className="custom-select-container"
              ref={dropdownRef}
              style={{
                position: "relative",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                cursor: "pointer",
                userSelect: "none"
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div>
                {selectedSkills.length > 0
                  ? `${selectedSkills.length} skill(s) selected`
                  : "Select skills"}
              </div>

              {dropdownOpen && (
                <div
                  className="custom-dropdown"
                  style={{
                    position: "fixed",
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    zIndex: 10,
                    maxHeight: "200px",
                    overflowY: "auto",
                    marginTop: "20px",
                    padding: "10px"
                  }}
                >
                  {skills?.map((skill) => (
                    <label
                      key={skill.nid}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginBottom: "5px"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill.nid)}
                        onChange={() => handleCheckboxChange(skill.nid)}
                      />
                      {skill.name}
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="details-edit-footer">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

function ToolsForm({ nextStep, candidateData, setCandidateData }: StepProps) {
  const tools = candidateData.tools;
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/tools-master-display');
        if (response.data) {
          setCandidateData((prevData) => ({
            ...prevData,
            tools: response.data
          }));
        } else {
          toast.error(response.data.message || 'Failed to fetch Tools.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching Tools.');
      }
    }
    fetchTools();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (toolIs: string) => {
    setSelectedTools((prevSelected) => {
      if (prevSelected.includes(toolIs)) {
        return prevSelected.filter((id) => id !== toolIs);
      } else {
        return [...prevSelected, toolIs];
      }
    });
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const userId: string | null = await localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("tools_ids", JSON.stringify(selectedTools));
    formData.append("user_type", "superadmin");
    formData.append("profile_nid", userId!);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-tools", formData)
        .then((response) => {
          setLoading(false);
          if (response.data.status) {
            setSelectedTools([]);
            nextStep();
            return response.data.message || "Tools added successfully!";
          } else {
            throw response.data.message || "Failed to add Tools.";
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          const errorMessage = error.response?.data?.message || error.message;
          throw errorMessage;
        }),
      {
        loading: "Submitting...",
        success: (message) => message,
        error: (err) => err || "Failed to add Tools."
      }
    );
  }

  return (
    <div className="details-edit-component" style={{ padding: "30px" }}>
      {loading && (
        <div className="edit-loading">
          <LargeSpinner />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="details-edit-body">
          <div className="details-edit-wraper">
            <div
              className="custom-select-container"
              ref={dropdownRef}
              style={{
                position: "relative",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                cursor: "pointer",
                userSelect: "none"
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div>
                {selectedTools.length > 0
                  ? `${selectedTools.length} tool(s) selected`
                  : "Select Tools"}
              </div>

              {dropdownOpen && (
                <div
                  className="custom-dropdown"
                  style={{
                    position: "fixed",
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    zIndex: 10,
                    maxHeight: "200px",
                    overflowY: "auto",
                    marginTop: "20px",
                    padding: "10px"
                  }}
                >
                  {tools?.map((tool) => (
                    <label
                      key={tool.nid}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginBottom: "5px"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTools.includes(tool.nid)}
                        onChange={() => handleCheckboxChange(tool.nid)}
                      />
                      {tool.name}
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="details-edit-footer">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

interface Projects {
  name: string,
  link: string,
  image: File | null,
  description: string
}

function ProjectForm({ nextStep, candidateData, setCandidateData }: StepProps) {
  const projects = candidateData.projects
  const [loading, setLoading] = useState<boolean>(false)

  const addNewProject = () => {
    const lastSkill = projects[projects.length - 1];

    if (!lastSkill) {
      setCandidateData((prevData) => ({
        ...prevData,
        projects: [
          ...projects,
          {
            name: "",
            link: "",
            image: null,
            description: "",
          },
        ]
      }));
      return;
    }

    const allFieldsFilled = lastSkill.name.trim() !== ""

    if (!allFieldsFilled) {
      toast.error("Please fill out all fields in the last Project before adding a new one.");
      return;
    }

    setCandidateData((prevData) => ({
      ...prevData,
      projects: [
        ...projects,
        {
          name: "",
          link: "",
          image: null,
          description: "",
        },
      ]
    }));
  };

  const handleChange = <K extends keyof Projects>(
    index: number,
    field: K,
    value: Projects[K]
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const userId: string | null = await localStorage.getItem("userId")

    const formData = new FormData();
    projects.forEach((project, index) => {
      formData.append(`projects[${index}][name]`, project.name);
      formData.append(`projects[${index}][link]`, project.link);
      formData.append(`projects[${index}][description]`, project.description);
      if (project.image) {
        formData.append(`projects[${index}][image]`, project.image);
      }
    });

    formData.append("user_type", "superadmin")
    formData.append("profile_nid", userId!)

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-recent-project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.status) {
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
        success: (message) => message || "Project Added successful!",
        error: (err) => err || "Failed to Add Project"
      }
    );
  }

  function handleRemove(id: number) {
    const confirmDelete = window.confirm("Are you sure you want to remove this Project?");
    if (!confirmDelete) return;

    const updatedProject = projects.filter((_, idx) => idx !== id);
    setCandidateData((prevData) => ({
      ...prevData,
      projects: updatedProject
    }));
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
        projects.map((project, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            <span className='work-form-title'>Project {index + 1} </span>
            <div className='remove' onClick={() => handleRemove(index)}>
              <i className="hgi hgi-stroke hgi-delete-02"></i>
            </div>

            <div className="details-edit-wraper">

              <div className="edit-input-container">
                <input
                  type="text"
                  placeholder=''
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  value={project.name}
                  className='inputs'
                  required
                />
                <label className='label'>Project Name</label>
              </div>

              <div className="edit-input-container">
                <input
                  type="file"
                  onChange={(e) => {
                    handleChange(index, "image", e.target.files ? e.target.files[0] : null)
                  }}
                  className="inputs"
                  required
                />
                <label className='label'>Project Image</label>
              </div>

              <div className="edit-input-container">
                <input
                  type="text"
                  placeholder=""
                  value={project.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  required
                  className='inputs'
                />
                <label className='label'>Project Link</label>
              </div>

              <div className="edit-input-container">
                <textarea
                  name='intro'
                  placeholder=''
                  value={project.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className='inputs'
                  rows={5}
                  required
                />
                <label className='label'>Project Summary</label>
              </div>
            </div>


          </div>
        ))
      }
      <div className="details-edit-footer">
        <button onClick={addNewProject}>Add New</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

function AchievementForm({ nextStep, candidateData, setCandidateData }: StepProps) {
  const achievement = candidateData.achievements;
  const [loading, setLoading] = useState<boolean>(false)

  const addNewAchievement = () => {
    const lastSkill = achievement[achievement.length - 1];
    if (!lastSkill) {
      setCandidateData((prevData) => ({
        ...prevData,
        achievements: [
          ...achievement,
          {
            name: "",
            link: "",
            image: null,
            description: "",
          },
        ]
      }));
      return;
    }
    const allFieldsFilled = lastSkill.name.trim() !== ""

    if (!allFieldsFilled) {
      toast.error("Please fill out all fields in the last Achievement before adding a new one.");
      return;
    }

    setCandidateData((prevData) => ({
      ...prevData,
      achievements: [
        ...achievement,
        {
          name: "",
          link: "",
          image: null,
          description: "",
        },
      ]
    }));
  };

  const handleChange = <K extends keyof Projects>(
    index: number,
    field: K,
    value: Projects[K]
  ) => {
    const updatedAchievement = [...achievement];
    updatedAchievement[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      achievements: updatedAchievement,
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const userId: string | null = await localStorage.getItem("userId")
    const formData = new FormData();

    achievement.forEach((achievement, index) => {
      formData.append(`achievement[${index}][name]`, achievement.name);
      formData.append(`achievement[${index}][link]`, achievement.link);
      formData.append(`achievement[${index}][description]`, achievement.description);
      if (achievement.image) {
        formData.append(`achievement[${index}][image]`, achievement.image);
      }
    });

    formData.append("user_type", "superadmin")
    formData.append("profile_nid", userId!)

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-achievement", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.status) {
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
        success: (message) => message || "Project Added successful!",
        error: (err) => err || "Failed to Add Project"
      }
    );
  }

  function handleRemove(id: number) {
    const confirmDelete = window.confirm("Are you sure you want to remove this Achievement?");
    if (!confirmDelete) return;

    const updatedAchievement = achievement.filter((_, idx) => idx !== id);
    setCandidateData((prevData) => ({
      ...prevData,
      achievements: updatedAchievement
    }));
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
        achievement.map((achievement, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            <span className='work-form-title'>Achievements {index + 1} </span>
            <div className='remove' onClick={() => handleRemove(index)}>
              <i className="hgi hgi-stroke hgi-delete-02"></i>
            </div>

            <div className="details-edit-wraper">

              <div className="edit-input-container">
                <input
                  type="text"
                  placeholder=''
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  value={achievement.name}
                  className='inputs'
                  required
                />
                <label className='label'>Achievement Name</label>
              </div>

              <div className="edit-input-container">
                <input
                  type="file"
                  onChange={(e) => {
                    handleChange(index, "image", e.target.files ? e.target.files[0] : null)
                  }}
                  className="inputs"
                  required
                />
                <label className='label'>Achievement Image</label>
              </div>

              <div className="edit-input-container">
                <input
                  type="text"
                  placeholder=""
                  value={achievement.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  required
                  className='inputs'
                />
                <label className='label'>Achievement Link</label>
              </div>

              <div className="edit-input-container">
                <textarea
                  name='intro'
                  placeholder=''
                  value={achievement.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className='inputs'
                  rows={5}
                  required
                />
                <label className='label'>Achievement Summary</label>
              </div>
            </div>


          </div>
        ))
      }
      <div className="details-edit-footer">
        <button onClick={addNewAchievement}>Add New</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

interface SocialActivity {
  title: string,
  description: string
}

function SocialActivityForm({ nextStep, candidateData, setCandidateData }: StepProps) {
  const socialActivity = candidateData.socialActivity
  const [loading, setLoading] = useState<boolean>(false)

  const addNewSocialActivity = () => {
    const lastExperience = socialActivity[socialActivity.length - 1];

    if (!lastExperience) {
      setCandidateData((prevData) => ({
        ...prevData,
        socialActivity: [
          ...socialActivity,
          {
            title: "",
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
      toast.error("Please fill out all fields in the last experience before adding a new one.");
      return;
    }

    setCandidateData((prevData) => ({
      ...prevData,
      socialActivity: [
        ...socialActivity,
        {
          title: "",
          description: "",
        },
      ]
    }));
  };

  const handleChange = (
    index: number,
    field: keyof SocialActivity,
    value: string
  ) => {
    const updatedSocialActivity = [...socialActivity];
    updatedSocialActivity[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      socialActivity: updatedSocialActivity,
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const userId: string | null = localStorage.getItem("userId")
    const formData = new FormData();
    formData.append("social_activities", JSON.stringify(socialActivity));
    formData.append("user_type", "superadmin")
    formData.append("profile_nid", userId!)

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-social-activities", formData)
        .then((response) => {
          if (response.data.status) {
            setCandidateData({
              personalData: {
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
              },
              education: [
                {
                  institute: "",
                  degree: "",
                  passingYear: "",
                  description: "",
                }
              ],
              workExp: [
                {
                  company: "",
                  position: "",
                  workingPeriod: "",
                  description: "",
                }
              ],
              skills: [],
              tools: [],
              projects: [
                {
                  name: "",
                  link: "",
                  image: null,
                  description: "",
                }
              ],
              achievements: [
                {
                  name: "",
                  link: "",
                  image: null,
                  description: "",
                }
              ],
              socialActivity: [
                {
                  title: "",
                  description: "",
                }
              ]
            })
            localStorage.removeItem("userId");
            localStorage.removeItem("tempInfo")
            setLoading(false);
            nextStep();
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
        success: (message) => message || "Social Activity Added successful!",
        error: (err) => err || "Failed to Add Social Activity"
      }
    );
  }

  function handleRemove(id: number) {
    const confirmDelete = window.confirm("Are you sure you want to remove this Social Activity?");
    if (!confirmDelete) return;

    const updatedActivity = socialActivity.filter((_, idx) => {
      return idx !== id;
    });

    setCandidateData((prevData) => ({
      ...prevData,
      socialActivity: updatedActivity
    }));
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
        socialActivity.map((activity, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            <span className='work-form-title'>Social Activity {index + 1} </span>
            <div className='remove' onClick={() => handleRemove(index)}>
              <i className="hgi hgi-stroke hgi-delete-02"></i>
            </div>

            <div className="details-edit-wraper">

              <div className="edit-input-container">
                <input
                  type="text"
                  placeholder=''
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  value={activity.title}
                  className='inputs'
                  required
                />
                <label className='label'>Social Activity Title</label>
              </div>

              <div className="edit-input-container">
                <textarea
                  name='intro'
                  placeholder=''
                  value={activity.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className='inputs'
                  rows={5}
                  required
                />
                <label className='label'>Social Activity Description</label>
              </div>
            </div>


          </div>
        ))
      }
      <div className="details-edit-footer">
        <button onClick={addNewSocialActivity}>Add New</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}
