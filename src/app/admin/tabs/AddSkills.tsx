'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { SkillList } from './AdminTabs';
import Image from 'next/image';
import Spinner from '@/components/Spinner/Spinner';

interface Skills {
  skillName: string;
  image: File | null;
  description: string;
}
interface SkillsListProps {
  skillList: SkillList[];
  fetchSkills: () => void;
}

export default function AddSkills({ skillList, fetchSkills }: SkillsListProps) {
  const [skills, setSkills] = useState<Skills>({
    skillName: "",
    image: null,
    description: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openOptionMenu, setOpenOptionMenu] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editSkill, setEditSkill] = useState<SkillList>({
    nid: '',
    name: '',
    image_file: null,
    description: ''
  });

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
            fetchSkills();
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenOptionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleDelete(skillNid: string) {
    console.log(skillNid);
  }

  async function handleEdit(skill: SkillList) {
    if (!skill) {
      toast.error("No any valid skill is selected, please select valid skill.");
      return;
    }
    setIsEditModalOpen(true);
    setEditSkill(skill);
    setOpenOptionMenu(null);
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

            <div className='available'>
              <span className='list-title'>Available Skill</span>
              <div className='props-list'>
                {
                  skillList?.map((skill: SkillList) => (
                    <div key={skill.nid} ref={openOptionMenu === skill.nid ? menuRef : null}>
                      <div className='option-container' onClick={(e) => {
                        e.stopPropagation();
                        setPosition({ x: e.pageX, y: e.pageY });
                        setOpenOptionMenu(openOptionMenu === skill.nid ? null : skill.nid);
                      }}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      {openOptionMenu === skill.nid && (
                        <div className='options' style={{ top: position.y - 120, left: position.x }}>
                          <button onClick={(e) => { e.stopPropagation(); handleEdit(skill) }}>
                            <i className="hgi hgi-stroke hgi-pencil-edit-01"></i>
                            Edit
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(skill.nid) }}>
                            <i className="hgi hgi-stroke hgi-delete-02"></i>
                            Delete
                          </button>
                        </div>
                      )}
                      <Image
                        src={typeof skill.image_file === 'string' ? skill.image_file : ''}
                        alt={skill.name}
                        width={600}
                        height={600}
                      />
                      {skill.name}
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="details-edit-footer">
              <button type="submit" onClick={handleSubmit}>Save</button>
            </div>
          </div>
          <Toaster />
        </motion.div>
      </AnimatePresence>
      {isEditModalOpen && <HandleEdit setIsEditModalOpen={setIsEditModalOpen} setEditSkill={setEditSkill} editSkill={editSkill} />}
    </div>
  )
}

type EditType = {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditSkill: React.Dispatch<React.SetStateAction<SkillList>>;
  editSkill: SkillList;
}

function HandleEdit({ setIsEditModalOpen, editSkill, setEditSkill }: EditType) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast.error('Only images (JPEG, PNG, GIF, WebP) are allowed.');
      return;
    }
    setEditSkill((prev) => ({
      ...prev,
      image_file: file
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setEditSkill((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append('skill_nid', editSkill.nid)
    formData.append('skill_name', editSkill.name)
    formData.append('skill_description', editSkill.description)
    formData.append('skill_image', editSkill.image_file!)

    formData.forEach((value, key) => {
      console.log(key, "=", value);
    })
    setLoading(false);
  }
  return (
    <section className='edit-section-container'>
      <div className='edit-section-wraper'>
        <div className="edit-section-card">
          <div className="edit-section-top">
            <p>Update Skill</p>
            <div className='edit-card-close-btn' onClick={() => setIsEditModalOpen(false)}>
              <span></span>
              <span></span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="edit-section-body">
              <div className="edit-input-container">
                {
                  editSkill?.image_file && (
                    <div style={{ marginBottom: "10px" }}>
                      <Image src={
                        imagePreview || (typeof editSkill.image_file === "string" && editSkill.image_file) || '/image/icons/default.png'}
                        width={150}
                        height={150}
                        alt='Skill image'
                      />
                    </div>
                  )
                }
                <input
                  type="file"
                  name='image'
                  className='inputs'
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label className='label'>Skill Image</label>
              </div>

              <div className="edit-input-container">
                <input
                  type="text"
                  name='name'
                  placeholder=''
                  className='inputs'
                  value={editSkill.name}
                  onChange={handleEditChange}
                />
                <label className='label'>Skill Name</label>
              </div>

              <div className="edit-input-container">
                <textarea
                  name='description'
                  placeholder=''
                  className='inputs'
                  rows={5}
                  value={editSkill.description}
                  onChange={handleEditChange}
                />
                <label className='label'>Skill Description</label>
              </div>
            </div>

            <div className="edit-section-footer">
              <button type='submit'>{loading ? <Spinner /> : 'Update'}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
