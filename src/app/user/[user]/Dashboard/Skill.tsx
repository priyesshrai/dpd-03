'use client'
import LargeSpinner from '@/components/Spinner/LargeSpinner'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { UpdateFormData, UpdateSkill } from '../../../../../types'
import BackBtn from './BackBtn'
import axios from 'axios'

type UserData = {
    name?: string
    goBack?: () => void;
    candidateSkills: UpdateSkill[]
    setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
    profileNid: string;
}
type Skill = {
    name: string;
    nid: string;
    description: string;
    image_file: string;
};

export default function Skill({ candidateSkills, name, goBack, setCandidateData, profileNid }: UserData) {
    const [loading, setLoading] = useState<boolean>(false)
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
        setLoading(true)
        const formData = new FormData();
        formData.append("skills", JSON.stringify(userSkills.map((skill) => skill.expert_area_nid)));
        formData.append("user_type", "superadmin");
        formData.append("user_nid", profileNid);

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        // toast.promise(
        //     axios.post("https://inforbit.in/demo/dpd/upd-candidate-skills-api", formData)
        //         .then((response) => {

        //             if (response.data.status) {
        //                 fetchData();
        //                 setLoading(false);
        //                 return response.data.message || "Skill added successfully!";
        //             } else {
        //                 throw response.data.message || "Failed to add skill.";
        //             }
        //         })
        //         .catch((error) => {
        //             setLoading(false);
        //             console.error(error);
        //             const errorMessage = error.response?.data?.message || error.message;
        //             throw errorMessage;
        //         }),
        //     {
        //         loading: "Please wait...",
        //         success: (message) => message || "Skill added successfully!",
        //         error: (err) => err || "Failed to add skill."
        //     }
        // );
    };

    return (
        <section className='component-section-wraper'>
            <BackBtn goBack={goBack} name={name} />

            <div className='component-common' style={{ padding: 0 }}>
                <div className="details-edit-component" style={{ padding: "30px" }}>

                    {
                        loading ?
                            (<div className='edit-loading'>
                                <LargeSpinner />
                            </div>) : ("")
                    }
                    <div className="details-edit-body" style={{ borderBottom: '1px solid #dadada', paddingBottom: '30px' }}>
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
                            <div className="details-edit-body" style={{ borderBottom: '1px solid #dadada', paddingBottom: '30px' }}>
                                <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#384559' }}>
                                    Available Skills
                                </span>
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
                </div>
                <Toaster />
            </div>
        </section>
    )
}
