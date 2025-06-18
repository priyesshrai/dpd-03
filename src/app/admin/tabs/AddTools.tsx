'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { ToolList } from './AdminTabs';
import Image from 'next/image';

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
      axios.post("http://inforbit.in/demo/dpd/tools-master", formData, {
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

                  <div className="edit-input-container">
                    <span className='list-title'>Available Tools</span>
                    <div className='props-list'>
                      {
                        toolList?.map((tool: ToolList) => (
                          <div key={tool.nid}>
                            <Image src={tool.image_file ?? ""} alt={tool.name} width={600} height={600} />
                            {tool.name}
                          </div>
                        ))
                      }
                    </div>
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
