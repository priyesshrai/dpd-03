'use client'
import React, { useState, useEffect, useCallback } from 'react';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { UpdateFormData, UpdateSkill } from '../../../../../../types';
import axios from 'axios';

type Candidate = {
  loading: boolean;
  candidateSkills: UpdateSkill[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
  profileNid: string
};

type Skill = {
  name: string;
  nid: string;
  description: string;
  image_file: string;
};

export default function UpdateUserSkill({
  candidateSkills,
  loading,
  setCandidateData,
  setLoading,
  fetchData,
  profileNid
}: Candidate) {
  const [allSkillList, setAllSkillList] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UpdateSkill[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [searchedSkill, setSearchedSkill] = useState<string>('');
  const [filteredSkill, setFilteredSkill] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/expert-area-master-display');
        if (response.data) {
          setAllSkillList(response.data);
          setFilteredSkill(response.data);
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    setUserSkills(candidateSkills);
    const selected = candidateSkills.map(skill => skill.expert_area_nid);
    setSelectedSkillIds(selected);
  }, [candidateSkills]);

  const availableSkills = allSkillList.filter(
    skill => !selectedSkillIds.includes(skill.nid)
  );

  const handleCheckboxChange = (skill: Skill) => {
    setSelectedSkillIds(prev => [...prev, skill.nid]);
    setUserSkills(prev => [
      ...prev,
      {
        expert_area_nid: skill.nid,
        skill_name: skill.name,
        skill_desc: skill.description || '',
        skill_icon: skill.image_file || '',
      },
    ]);
    setCandidateData(prev => ({
      ...prev,
      skills: [
        ...(prev.skills || []),
        {
          expert_area_nid: skill.nid,
          skill_name: skill.name,
          skill_desc: skill.description || '',
          skill_icon: skill.image_file || '',
        },
      ],
    }));
  };

  const handleRemoveSkill = (nid: string) => {
    setUserSkills(prev => prev.filter(skill => skill.expert_area_nid !== nid));
    setCandidateData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(skill => skill.expert_area_nid !== nid),
    }));
    setSelectedSkillIds(prev => prev.filter(id => id !== nid));
  };

  const handleSave = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("skills", JSON.stringify(userSkills.map((skill) => skill.expert_area_nid)));
    formData.append("user_type", "superadmin");
    formData.append("user_nid", profileNid);

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/upd-candidate-skills-api", formData)
        .then((response) => {

          if (response.data.status) {
            fetchData();
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
  };

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedSkill(e.target.value);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = allSkillList.filter(skill =>
        skill.name.toLowerCase().includes(searchedSkill.toLowerCase()) &&
        !selectedSkillIds.includes(skill.nid)
      );
      setFilteredSkill(filtered);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchedSkill, allSkillList, selectedSkillIds]);


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
                Skills
              </span>
            </div>

            {loading ? (
              <div className="edit-loading">
                <LargeSpinner />
              </div>
            ) : ("")
            }
            <div
              className="details-edit-body"
              style={{ borderBottom: '1px solid #dadada', paddingBottom: '30px' }}
            >
              <div className="initial-skill-update-wraper">
                {userSkills.map(skill => (
                  <div className="initial-items" key={skill.expert_area_nid}>
                    <span>{skill.skill_name}</span>
                    <div className="del-btn" onClick={() => handleRemoveSkill(skill.expert_area_nid)}>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {
              availableSkills.length > 0 && (
                <div className="details-edit-body" style={{ borderBottom: '1px solid #dadada', paddingBottom: '30px' }}>
                  <div className='search-container'>
                    <div className='search-wraper'>
                      <i className="hgi hgi-stroke hgi-search-01"></i>
                      <input
                        type="text"
                        placeholder='Available skill set'
                        name='search'
                        value={searchedSkill}
                        onChange={handleSearch}
                      />
                      {searchedSkill.length > 0 && <i className="hgi hgi-stroke hgi-cancel-01" onClick={() => setSearchedSkill('')}></i>}
                    </div>
                  </div>
                  <div className="skill-update-wraper" style={{ marginTop: "20px" }}>
                    {filteredSkill.map(skill => (
                      <div className="update-skill-items" key={skill.nid}>
                        <label>
                          <input
                            type="checkbox"
                            value={skill.nid}
                            onChange={() => handleCheckboxChange(skill)}
                          />
                          {skill.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
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
