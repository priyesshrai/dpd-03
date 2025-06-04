'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

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
  // userData: UserData;
  // setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  nextStep: () => void;
};

type AddProfileProps = {
  selectedForm: number;
  setSelectedForm: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddProfile({ selectedForm, setSelectedForm }: AddProfileProps) {

  const formConfig: TabConfig[] = [
    {
      key: "profileForm",
      name: "Profile Form",
      component: ProfileForm,
    },
    {
      key: "educationForm",
      name: "Education Form",
      component: EducationForm,
    },
    {
      key: "workForm",
      name: "Work Form",
      component: WorkForm,
    },
    {
      key: "skills",
      name: "Skills Form",
      component: SkillsForm,
    },
    {
      key: "tools",
      name: "Tools Form",
      component: ToolsForm,
    },
    {
      key: "projects",
      name: "Projects Form",
      component: ProjectForm,
    },
    {
      key: "achievement",
      name: "Achievements Form",
      component: AchievementForm,
    },
    {
      key: "social_activity",
      name: "Social Activity Form",
      component: SocialActivityForm,
    },
  ]
  const ActiveForm = formConfig[selectedForm].component;
  const nextStep = () => {
    setSelectedForm((prev) =>
      prev < formConfig.length - 1 ? prev + 1 : 0
    );
  };


  return (
    <div className='component-common' style={{ padding: 0 }}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={formConfig[selectedForm].key}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveForm nextStep={nextStep} />
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

      </div>

      <div className="details-edit-footer">
        <button onClick={handleSubmit}>Next</button>
      </div>

    </div>
  )
}

function EducationForm({ nextStep }: StepProps) {
  const [education, setEducation] = useState<Education[]>([
    {
      institute: "",
      degree: "",
      passingYear: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false)

  const addNewEducation = () => {
    const lastExperience = education[education.length - 1];
    const allFieldsFilled = Object.values(lastExperience).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill out all fields in the last Education before adding a new one.");
      return;
    }

    setEducation([
      ...education,
      {
        institute: "",
        degree: "",
        passingYear: "",
        description: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedExperiences = [...education];
    updatedExperiences[index][field] = value;
    setEducation(updatedExperiences);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const userId: string | null = await localStorage.getItem("userId")
    const formData = new FormData();
    formData.append("education", JSON.stringify(education));
    formData.append("user_type", "superadmin")
    formData.append("profile_nid", userId!)

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-education-api", formData)
        .then((response) => {
          console.log(response);

          if (response.data.status) {
            setEducation([
              {
                institute: "",
                degree: "",
                passingYear: "",
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
        success: (message) => message || "Education Added successful!",
        error: (err) => err || "Failed to Add Education"
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
        education.map((edu, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            <span className='work-form-title'>Education {index + 1} </span>
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
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  )
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

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-work-experience-api", formData)
        .then((response) => {

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
            <span className='work-form-title'>Work Experience {index + 1} </span>

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
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  )
}

interface Skill {
  nid: string;
  name: string;
}

function SkillsForm({ nextStep }: StepProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/expert-area-master-display');
        if (response.data) {
          setSkills(response.data);
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

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/candidate-expert-area", formData)
        .then((response) => {
          setLoading(false);
          if (response.data.status) {
            setSelectedSkills([]);
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
                    position: "relative",
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
                  {skills.map((skill) => (
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
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}

function ToolsForm({ nextStep }: StepProps) {
  const [tools, setTools] = useState<Skill[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await axios.get('http://inforbit.in/demo/dpd/tools-master-display');
        if (response.data) {
          setTools(response.data);
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
                    position: "relative",
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
                  {tools.map((tool) => (
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
          <button type="submit">Next</button>
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

function ProjectForm({ nextStep }: StepProps) {
  const [projects, setProjects] = useState<Projects[]>([
    {
      name: "",
      link: "",
      image: null,
      description: "",
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false)

  const addNewProject = () => {
    const lastSkill = projects[projects.length - 1];
    const allFieldsFilled =
      lastSkill.name.trim() !== "" &&
      lastSkill.link.trim() !== "" &&
      lastSkill.image !== null &&
      lastSkill.description.trim() !== "";

    if (!allFieldsFilled) {
      alert("Please fill out all fields in the last Project before adding a new one.");
      return;
    }

    setProjects([
      ...projects,
      {
        name: "",
        link: "",
        image: null,
        description: "",
      },
    ]);
  };


  const handleChange = <K extends keyof Projects>(
    index: number,
    field: K,
    value: Projects[K]
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
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
            setProjects([
              {
                name: "",
                link: "",
                image: null,
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
        success: (message) => message || "Project Added successful!",
        error: (err) => err || "Failed to Add Project"
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
        projects.map((project, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            <span className='work-form-title'>Project {index + 1} </span>

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
                  onChange={(e) => handleChange(index, "image", e.target.files ? e.target.files[0] : null)}
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
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  )
}

function AchievementForm({ nextStep }: StepProps) {
  const [achievement, setAchievement] = useState<Projects[]>([
    {
      name: "",
      link: "",
      image: null,
      description: "",
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false)

  const addNewAchievement = () => {
    const lastSkill = achievement[achievement.length - 1];
    const allFieldsFilled =
      lastSkill.name.trim() !== "" &&
      lastSkill.link.trim() !== "" &&
      lastSkill.image !== null &&
      lastSkill.description.trim() !== "";

    if (!allFieldsFilled) {
      alert("Please fill out all fields in the last Achievement before adding a new one.");
      return;
    }

    setAchievement([
      ...achievement,
      {
        name: "",
        link: "",
        image: null,
        description: "",
      },
    ]);
  };

  const handleChange = <K extends keyof Projects>(
    index: number,
    field: K,
    value: Projects[K]
  ) => {
    const updatedProjects = [...achievement];
    updatedProjects[index][field] = value;
    setAchievement(updatedProjects);
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
            setAchievement([
              {
                name: "",
                link: "",
                image: null,
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
        success: (message) => message || "Project Added successful!",
        error: (err) => err || "Failed to Add Project"
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
        achievement.map((achievement, index) => (
          <div className="details-edit-body" key={index}
            style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
            <span className='work-form-title'>Achievements {index + 1} </span>

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
                  onChange={(e) => handleChange(index, "image", e.target.files ? e.target.files[0] : null)}
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
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  )
}

interface SocialActivity {
  title: string,
  description: string
}

function SocialActivityForm({ nextStep }: StepProps) {
  const [socialActivity, setSocialActivity] = useState<SocialActivity[]>([
    {
      title: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false)

  const addNewSocialActivity = () => {
    const lastExperience = socialActivity[socialActivity.length - 1];
    const allFieldsFilled = Object.values(lastExperience).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill out all fields in the last experience before adding a new one.");
      return;
    }

    setSocialActivity([
      ...socialActivity,
      {
        title: "",
        description: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof SocialActivity,
    value: string
  ) => {
    const updatedExperiences = [...socialActivity];
    updatedExperiences[index][field] = value;
    setSocialActivity(updatedExperiences);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const userId: string | null = await localStorage.getItem("userId")
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
            setSocialActivity([
              {
                title: "",
                description: "",
              },
            ]);
            localStorage.removeItem("userId");
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
