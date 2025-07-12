'use client'
import React, { useState, useEffect, useCallback } from 'react';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { UpdateFormData, UpdateTools } from '../../../../../../types';
import axios from 'axios';


type Candidate = {
  loading: boolean;
  candidateTools: UpdateTools[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
  profileNid: string
};

type Tools = {
  nid: string;
  name: string;
  image_file: string;
};

export default function UpdateUserTools({ candidateTools, loading, setCandidateData, setLoading, fetchData, profileNid }: Candidate) {
  const [allToolList, setAllToolList] = useState<Tools[]>([]);
  const [userTools, setUserTools] = useState<UpdateTools[]>([]);
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);
  const [searchedTool, setSearchedTool] = useState<string>('');
  const [filteredTool, setFilteredTool] = useState<Tools[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/tools-master-display');
        if (response.data) { setAllToolList(response.data); setFilteredTool(response.data) };
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    setUserTools(candidateTools);
    const selected = candidateTools.map(tool => tool.tools_nid);
    setSelectedToolIds(selected);
  }, [candidateTools]);

  const availableSkills = allToolList.filter(
    tool => !selectedToolIds.includes(tool.nid)
  );

  const handleCheckboxChange = (tool: Tools) => {
    setSelectedToolIds(prev => [...prev, tool.nid]);
    setUserTools(prev => [
      ...prev,
      {
        tools_nid: tool.nid,
        title: tool.name,
        tools_image: tool.image_file || '',
      },
    ]);
    setCandidateData(prev => ({
      ...prev,
      tools: [
        ...(prev.tools || []),
        {
          tools_nid: tool.nid,
          title: tool.name,
          tools_image: tool.image_file || '',
        },
      ]
    }));
  };

  const handleRemoveSkill = (nid: string) => {
    setUserTools(prev => prev.filter(tool => tool.tools_nid !== nid));
    setCandidateData(prev => ({
      ...prev,
      tools: (prev.tools || []).filter(tool => tool.tools_nid !== nid),
    }));
    setSelectedToolIds(prev => prev.filter(id => id !== nid));
  };

  const handleSave = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("tools", JSON.stringify(userTools.map((tool) => tool.tools_nid)));
    formData.append("user_type", "superadmin");
    formData.append("user_nid", profileNid);

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/upd-candidate-tools-api", formData)
        .then((response) => {
          if (response.data.status) {
            fetchData();
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
        success: (message) => message || "Skill added successfully!",
        error: (err) => err || "Failed to add skill."
      }
    )
  };

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedTool(e.target.value);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = allToolList.filter(tool =>
        tool.name.toLowerCase().includes(searchedTool.toLowerCase()) &&
        !selectedToolIds.includes(tool.nid)
      );
      setFilteredTool(filtered);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchedTool, allToolList, selectedToolIds]);


  return (
    <div className="component-common" style={{ padding: 0 }}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
        >
          <div className="details-edit-component" style={{ padding: '30px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#384559' }}>
                Tools
              </span>
            </div>

            {loading ? (
              <div className="edit-loading">
                <LargeSpinner />
              </div>
            ) : ("")}
            <div
              className="details-edit-body"
              style={{ borderBottom: '1px solid #dadada', paddingBottom: '30px' }}
            >
              <div className="initial-skill-update-wraper">
                {userTools.map(tool => (
                  <div className="initial-items" key={tool.tools_nid}>
                    <span>{tool.title}</span>
                    <div className="del-btn" onClick={() => handleRemoveSkill(tool.tools_nid)}>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {
              availableSkills ? (
                <div className="details-edit-body" style={{ borderBottom: '1px solid #dadada', paddingBottom: '30px' }}>
                  <div className='search-container'>
                    <div className='search-wraper'>
                      <i className="hgi hgi-stroke hgi-search-01"></i>
                      <input
                        type="text"
                        placeholder='Avaliable skill set'
                        name='search'
                        value={searchedTool}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="skill-update-wraper" style={{ marginTop: "20px" }}>
                    {filteredTool.map(tool => (
                      <div className="update-skill-items" key={tool.nid}>
                        <label>
                          <input
                            type="checkbox"
                            value={tool.nid}
                            onChange={() => handleCheckboxChange(tool)}
                          />
                          {tool.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : ""
            }

            <div className="details-edit-footer">
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}
