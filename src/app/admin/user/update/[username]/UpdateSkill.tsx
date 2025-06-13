'use client'
import React, { useState, useEffect } from 'react';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { UpdateFormData, UpdateSkill } from '../../../../../../types';
import axios from 'axios';

type Candidate = {
  loading: boolean;
  candidateSkills: UpdateSkill[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
}: Candidate) {
  const [allSkillList, setAllSkillList] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UpdateSkill[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('https://inforbit.in/demo/dpd/expert-area-master-display');
        if (response.data) setAllSkillList(response.data);
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
    const formData = new FormData();
    formData.append("skills", JSON.stringify(userSkills.map((skill) => skill.expert_area_nid)));
    formData.append("user_type", "superadmin");

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  };

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
            ) : (
              <>
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
                  availableSkills ? (
                    <div
                      className="details-edit-body"
                      style={{ borderBottom: '1px solid #dadada', paddingBottom: '30px' }}
                    >
                      <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#384559' }}>Available Skills</span>
                      <div className="skill-update-wraper" style={{ marginTop: "20px" }}>
                        {availableSkills.map(skill => (
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
                  ) : ""
                }

                <div className="details-edit-footer">
                  <button onClick={handleSave}>Save</button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}
