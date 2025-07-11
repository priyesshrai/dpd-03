'use client'
import LargeSpinner from '@/components/Spinner/LargeSpinner'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { UpdateAchievement, UpdateFormData } from '../../../../../types'
import BackBtn from './BackBtn'
import Image from 'next/image'


type UserData = {
    name?: string
    goBack?: () => void;
    candidateachievement: UpdateAchievement[]
    setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
    profileNid: string;
}


export default function Achievement({ candidateachievement, setCandidateData, goBack, profileNid, name }: UserData) {
    const [loading, setLoading] = useState<boolean>(false)
    const achievement = candidateachievement

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
            alert("Please fill out all fields in the last Achievement before adding a new one.");
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


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData();

        achievement.forEach((achievement, index) => {
            formData.append(`achievement[${index}][name]`, achievement.name);
            formData.append(`achievement[${index}][link]`, achievement.link);
            formData.append(`achievement[${index}][description]`, achievement.description);
            if (achievement.image) {
                formData.append(`achievement[${index}][image]`, achievement.image);
            }
        });

        formData.append("user_type", "superadmin")
        formData.append("user_nid", profileNid)

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        setLoading(false)

        // toast.promise(
        //   axios.post("https://inforbit.in/demo/dpd/candidate-achievement", formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   })
        //     .then((response) => {
        //       if (response.data.status) {
        //         setLoading(false);
        //         nextStep()
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
        //     success: (message) => message || "Project Added successful!",
        //     error: (err) => err || "Failed to Add Project"
        //   }
        // );
    }

    function handleRemove(id: string) {
        const confirmDelete = window.confirm("Are you sure you want to remove this Achievement?");
        if (!confirmDelete) return;

        const updatedAchievement = achievement.filter((achi) => achi.achievement_nid !== id || "");
        setCandidateData((prevData) => ({
            ...prevData,
            achievements: updatedAchievement
        }));
    }

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

                    {
                        achievement.map((achievement, index) => (
                            <div className="details-edit-body" key={index}
                                style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
                                <span className='work-form-title'>Achievements {index + 1} </span>

                                <div className='remove' onClick={() => handleRemove(achievement.achievement_nid)}>
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
                                        {
                                            achievement.image && (
                                                <div style={{ marginBottom: "10px" }}>
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
                                                        alt='project image'
                                                    />
                                                </div>
                                            )}
                                        <input
                                            type="file"
                                            onChange={(e) => handleChange(index, "image", e.target.files ? e.target.files[0] : null)}
                                            className="inputs"
                                            required
                                        />
                                        <label className='label'>Achievement Image</label>
                                    </div>

                                    <div className="edit-input-container">
                                        <input
                                            type="text"
                                            placeholder=""
                                            value={achievement.link}
                                            onChange={(e) => handleChange(index, "link", e.target.value)}
                                            required
                                            className='inputs'
                                        />
                                        <label className='label'>Achievement Link</label>
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
                <Toaster />
            </div>
        </section>
    )
}
