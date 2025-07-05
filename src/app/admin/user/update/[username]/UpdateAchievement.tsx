import React from 'react'
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { UpdateAchievement, UpdateFormData } from '../../../../../../types';
import Image from 'next/image';
import axios from 'axios';

type Candidate = {
  loading: boolean;
  candidateachievement: UpdateAchievement[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
  profileNid: string;
}

export default function UpdateUserAchievement({ profileNid, fetchData, candidateachievement, loading, setCandidateData, setLoading }: Candidate) {
  const achievement = candidateachievement

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

  const addNewAchievement = () => {
    const lastSkill = achievement[achievement.length - 1];
    if (!lastSkill) {
      setCandidateData((prevData) => ({
        ...prevData,
        achievements: [
          ...achievement,
          {
            achievement_nid: "",
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
      toast.error("Please fill out Achievement Title & Description before adding a new one.");
      return;
    }

    setCandidateData((prevData) => ({
      ...prevData,
      achievements: [
        ...achievement,
        {
          achievement_nid: "",
          name: "",
          link: "",
          image: null,
          description: "",
        },
      ]
    }));
  };

  const handleChange = <K extends keyof UpdateAchievement>(
    index: number,
    field: K,
    value: UpdateAchievement[K]
  ) => {
    const updatedAchievement = [...achievement];
    updatedAchievement[index][field] = value;
    setCandidateData((prevData) => ({
      ...prevData,
      achievements: updatedAchievement,
    }));
  };

  // Enhanced file change handler
  const handleFileChange = (index: number, file: File | null) => {
    if (file && validateFile(file)) {
      handleChange(index, "image", file);
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();

    achievement.forEach((achievement, index) => {
      formData.append(`achievements[${index}][name]`, achievement.name);
      formData.append(`achievements[${index}][link]`, achievement.link);
      formData.append(`achievements[${index}][description]`, achievement.description);
      if (achievement.image) {
        formData.append(`achievements[${index}][image]`, achievement.image);
      }
    });

    formData.append("user_type", "superadmin")
    formData.append("user_nid", profileNid)

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // toast.promise(
    //   axios.post("https://inforbit.in/demo/dpd/upd-candidate-achievements-api", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data.status) {
    //         fetchData();
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
    //     success: (message) => message || "Achievement Added successful!",
    //     error: (err) => err || "Failed to Add Achievement"
    //   }
    // );
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
                      {achievement.image && (
                        <div style={{ marginBottom: "10px" }}>
                          {isImageFile(achievement.image) ? (
                            <Image
                              src={
                                typeof achievement.image === "string"
                                  ? achievement.image
                                  : achievement.image instanceof File
                                    ? URL.createObjectURL(achievement.image)
                                    : "/"
                              }
                              width={300}
                              height={200}
                              alt='achievement file'
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
                                {typeof achievement.image === "string"
                                  ? getFileIcon(achievement.image)
                                  : achievement.image instanceof File
                                    ? getFileIcon(achievement.image.name)
                                    : "📎"
                                }
                              </div>
                              <div style={{ fontSize: "14px", color: "#666" }}>
                                {typeof achievement.image === "string"
                                  ? (achievement.image as string).split('/').pop()
                                  : achievement.image instanceof File
                                    ? achievement.image.name
                                    : "Unknown file"
                                }
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                        className="inputs"
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                        style={{ padding: "10px" }}
                      />
                      <label className='label'>Achievement File</label>
                      <small style={{ color: "#666", fontSize: "12px", marginTop: "5px", display: "block" }}>
                        Supported: Images, PDFs, Word docs, Excel files, PowerPoint, Text files (Max: 10MB)
                      </small>
                    </div>

                    <div className="edit-input-container">
                      <input
                        type="text"
                        placeholder=""
                        value={achievement.link}
                        onChange={(e) => handleChange(index, "link", e.target.value)}
                        className='inputs'
                      />
                      <label className='label'>Achievement Link (Optional)</label>
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
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  )
}