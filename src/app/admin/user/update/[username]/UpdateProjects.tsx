import React from 'react'
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { UpdateFormData, UpdateProjects } from '../../../../../../types';
import Image from 'next/image';
import axios from 'axios';


type Candidate = {
  loading: boolean;
  candidateProject: UpdateProjects[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
  profileNid: string;
}

export default function UpdateUserProjects({ candidateProject, loading, setCandidateData, setLoading, fetchData, profileNid }: Candidate) {
  const projects = candidateProject;

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📊';
      case 'txt':
        return '📄';
      default:
        return '📎';
    }
  };

  const isImageFile = (file: File | string) => {
    if (typeof file === 'string') {
      return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file);
    }
    return file.type.startsWith('image/');
  };

  const validateFile = (file: File) => {
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
    ];

    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error('File type not supported. Please upload images, PDFs, Word docs, Excel files, or other supported formats.');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB.');
      return false;
    }

    return true;
  };

  const addNewProject = () => {
    const lastSkill = projects[projects.length - 1];

    if (!lastSkill) {
      setCandidateData((prevData) => ({
        ...prevData,
        projects: [
          ...projects,
          {
            recent_project_nid: "",
            name: "",
            link: "",
            image: null,
            description: "",
          },
        ]
      }));
      return;
    }

    const allFieldsFilled =
      lastSkill.name.trim() !== "" &&
      lastSkill.description.trim() !== "";

    if (!allFieldsFilled) {
      toast.error("Please Fill Project Title & Description");
      return;
    }

    setCandidateData((prevData) => ({
      ...prevData,
      projects: [
        ...projects,
        {
          recent_project_nid: "",
          name: "",
          link: "",
          image: null,
          description: "",
        },
      ]
    }));
  };

  const handleChange = <K extends keyof UpdateProjects>(
    index: number,
    field: K,
    value: UpdateProjects[K]
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (file && validateFile(file)) {
      handleChange(index, "image", file);
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)

    const formData = new FormData();
    projects.forEach((project, index) => {
      formData.append(`projects[${index}][recent_project_nid]`, project.recent_project_nid);
      formData.append(`projects[${index}][name]`, project.name);
      formData.append(`projects[${index}][link]`, project.link);
      formData.append(`projects[${index}][description]`, project.description);
      if (project.image) {
        formData.append(`projects[${index}][image]`, project.image);
      }
    });
    formData.append("user_type", "superadmin")
    formData.append("user_nid", profileNid)

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/upd-candidate-projects-api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
                      {
                        project.image && (
                          <div style={{ marginBottom: "10px" }}>
                            <div style={{ marginBottom: "10px" }}>
                              {isImageFile(project.image) ? (
                                <Image
                                  src={
                                    typeof project.image === "string"
                                      ? project.image
                                      : project.image instanceof File
                                        ? URL.createObjectURL(project.image)
                                        : "/"
                                  }
                                  width={300}
                                  height={200}
                                  alt='project file'
                                  style={{ borderRadius: "8px", objectFit: "cover" }}
                                />
                              ) : (
                                <div style={{
                                  padding: "20px",
                                  border: "2px dashed #ddd",
                                  borderRadius: "8px",
                                  textAlign: "center",
                                  backgroundColor: "#f9f9f9"
                                }}>
                                  <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                                    {typeof project.image === "string"
                                      ? getFileIcon(project.image)
                                      : project.image instanceof File
                                        ? getFileIcon(project.image.name)
                                        : "📎"
                                    }
                                  </div>
                                  <div style={{ fontSize: "14px", color: "#666" }}>
                                    {typeof project.image === "string"
                                      ? (project.image as string).split('/').pop()
                                      : project.image instanceof File
                                        ? project.image.name
                                        : "Unknown file"
                                    }
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      }
                      <>
                        <input
                          type="file"
                          onChange={(e) => handleChange(index, "image", e.target.files ? e.target.files[0] : null)}
                          className="inputs"
                          required
                        />
                        <label className='label'>Project File (Optional)</label>
                        <small style={{ color: "#666", fontSize: "12px", marginTop: "5px", display: "block" }}>
                          Supported: Images, PDFs, Word docs, Excel files, PowerPoint, Text files (Max: 10MB)
                        </small>
                      </>


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
                      <label className='label'>Project Link (Optional)</label>
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

        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  )
}
