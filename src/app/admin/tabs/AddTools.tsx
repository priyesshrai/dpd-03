'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { ToolList } from './AdminTabs';
import Image from 'next/image';
import Spinner from '@/components/Spinner/Spinner';

interface Tools {
  tools_name: string;
  image: File | null;
}
interface ToolListProps {
  toolList: ToolList[]
  fetchTools: () => void
}


export default function AddTools({ toolList, fetchTools }: ToolListProps) {
  const [skills, setSkills] = useState<Tools>({
    tools_name: "",
    image: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openOptionMenu, setOpenOptionMenu] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editTools, setEditTools] = useState<ToolList>({
    nid: '',
    name: '',
    image_file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    formData.append("tools_name", skills.tools_name);
    formData.append("user_type", "superadmin");

    if (skills.image) {
      formData.append("image", skills.image);
    }

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/tools-master", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.status) {
            setSkills({
              tools_name: "",
              image: null,
            });
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            fetchTools();
            setLoading(false);
            return response.data.message || "Tool added successfully!";
          } else {
            throw response.data.message || "Failed to add Tool.";
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
        success: (message) => message || "Tool added successfully!",
        error: (err) => err || "Failed to add Tool."
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

  async function handleEdit(tools: ToolList) {
    if (!tools) {
      toast.error("No any valid skill is selected, please select valid skill.");
      return;
    }
    setIsEditModalOpen(true);
    setEditTools(tools);
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
                    name='tools_name'
                    placeholder=''
                    onChange={handleChange}
                    value={skills.tools_name}
                    className='inputs'
                    required
                  />
                  <label className='label'>Tool Name</label>
                </div>

                <div className="edit-input-container">
                  <input
                    type="file"
                    name='image'
                    onChange={handleFileChange}
                    className='inputs'
                    ref={fileInputRef}
                    required
                  />
                  <label className='label'>Tool Image</label>
                </div>
              </div>
            </div>

            <div className='available'>
              <span className='list-title'>Available Tools</span>
              <div className='props-list'>
                {
                  toolList?.map((tool: ToolList) => (
                    <div key={tool.nid} ref={openOptionMenu === tool.nid ? menuRef : null}>
                      <div className='option-container' onClick={(e) => {
                        e.stopPropagation();
                        setPosition({ x: e.pageX, y: e.pageY });
                        setOpenOptionMenu(openOptionMenu === tool.nid ? null : tool.nid);
                      }}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      {openOptionMenu === tool.nid && (
                        <div className='options' style={{ top: position.y - 120, left: position.x }}>
                          <button onClick={(e) => { e.stopPropagation(); handleEdit(tool) }}>
                            <i className="hgi hgi-stroke hgi-pencil-edit-01"></i>
                            Edit
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(tool.nid) }}>
                            <i className="hgi hgi-stroke hgi-delete-02"></i>
                            Delete
                          </button>
                        </div>
                      )}
                      <Image src={typeof tool.image_file === 'string' ? tool.image_file : ''} alt={tool.name} width={600} height={600} />
                      {tool.name}
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
      {isEditModalOpen && <HandleEdit setIsEditModalOpen={setIsEditModalOpen} setEditTool={setEditTools} editTool={editTools} />}
    </div>
  )
}


type EditType = {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTool: React.Dispatch<React.SetStateAction<ToolList>>;
  editTool: ToolList;
}

function HandleEdit({ setIsEditModalOpen, editTool, setEditTool }: EditType) {
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
    setEditTool((prev) => ({
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
    setEditTool((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append('skill_nid', editTool.nid)
    formData.append('skill_name', editTool.name)
    formData.append('skill_image', editTool.image_file!)

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
            <p>Update Tools</p>
            <div className='edit-card-close-btn' onClick={() => setIsEditModalOpen(false)}>
              <span></span>
              <span></span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="edit-section-body">
              <div className="edit-input-container">
                {
                  editTool?.image_file && (
                    <div style={{ marginBottom: "10px" }}>
                      <Image src={
                        imagePreview || (typeof editTool.image_file === "string" && editTool.image_file) || '/image/icons/default.png'}
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
                <label className='label'>Tool Image</label>
              </div>

              <div className="edit-input-container">
                <input
                  type="text"
                  name='name'
                  placeholder=''
                  className='inputs'
                  value={editTool.name}
                  onChange={handleEditChange}
                />
                <label className='label'>Tool Name</label>
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
