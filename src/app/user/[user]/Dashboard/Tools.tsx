'use client'
import LargeSpinner from '@/components/Spinner/LargeSpinner'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { UpdateFormData, UpdateTools } from '../../../../../types'
import BackBtn from './BackBtn'
import axios from 'axios'


type UserData = {
    name?: string
    goBack?: () => void;
    candidateTools: UpdateTools[]
    setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
    profileNid: string;
}
type Tools = {
    nid: string;
    name: string;
    image_file: string;
};

export default function Tools({ candidateTools, goBack, name, setCandidateData, profileNid }: UserData) {
    const [loading, setLoading] = useState<boolean>(false)

    const [allToolList, setAllToolList] = useState<Tools[]>([]);
    const [userTools, setUserTools] = useState<UpdateTools[]>([]);
    const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('https://inforbit.in/demo/dpd/tools-master-display');
                if (response.data) setAllToolList(response.data);
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

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        // toast.promise(
        //     axios.post("https://inforbit.in/demo/dpd/upd-candidate-tools-api", formData)
        //         .then((response) => {
        //             if (response.data.status) {
        //                 fetchData();
        //                 setLoading(false);
        //                 return response.data.message || "Tool added successfully!";
        //             } else {
        //                 throw response.data.message || "Failed to add Tool.";
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
        // )
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
                                <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#384559' }}>
                                    Available Tools
                                </span>
                                <div className="skill-update-wraper" style={{ marginTop: "20px" }}>
                                    {availableSkills.map(tool => (
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
                <Toaster />
            </div>
        </section>
    )
}
