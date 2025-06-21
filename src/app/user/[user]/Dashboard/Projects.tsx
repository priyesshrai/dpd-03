'use client'
import LargeSpinner from '@/components/Spinner/LargeSpinner'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { UpdateFormData, UpdateProjects } from '../../../../../types'
import BackBtn from './BackBtn'
import Image from 'next/image'


type UserData = {
    name?: string
    goBack?: () => void;
    candidateProject: UpdateProjects[]
    setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
    profileNid: string;
}

export default function Projects({ candidateProject, goBack, setCandidateData, profileNid, name }: UserData) {
    const projects = candidateProject;
    const [loading, setLoading] = useState<boolean>(false)

    const addNewProject = () => {
        const lastSkill = projects[projects.length - 1];

        if (!lastSkill) {
            setCandidateData((prevData) => ({
                ...prevData,
                projects: [
                    ...projects,
                    {
                        recent_project_nid: "",
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
            alert("Please fill out Project Name and Description fields in the last Project before adding a new one.");
            return;
        }

        setCandidateData((prevData) => ({
            ...prevData,
            projects: [
                ...projects,
                {
                    recent_project_nid: "",
                    name: "",
                    link: "",
                    image: null,
                    description: "",
                },
            ]
        }));
    };

    const handleChange = <K extends keyof UpdateProjects>(
        index: number,
        field: K,
        value: UpdateProjects[K]
    ) => {
        const updatedProjects = [...projects];
        updatedProjects[index][field] = value;
        setCandidateData((prevData) => ({
            ...prevData,
            projects: updatedProjects,
        }));
    };

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true)

        const formData = new FormData();
        projects.forEach((project, index) => {
            formData.append(`projects[${index}][recent_project_nid]`, project.recent_project_nid);
            formData.append(`projects[${index}][name]`, project.name);
            formData.append(`projects[${index}][link]`, project.link);
            formData.append(`projects[${index}][description]`, project.description);
            if (project.image) {
                formData.append(`projects[${index}][image]`, project.image);
            }
        });
        formData.append("user_type", "superadmin")
        formData.append("user_nid", profileNid)

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        // toast.promise(
        //     axios.post("https://inforbit.in/demo/dpd/upd-candidate-projects-api", formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     })
        //         .then((response) => {
        //             if (response.data.status) {
        //                 fetchData()
        //                 setLoading(false);
        //                 return response.data.message;
        //             }
        //         })
        //         .catch((error) => {
        //             setLoading(false);
        //             console.log(error);
        //             const errorMessage = error.response?.data?.message || error.message;
        //             throw errorMessage;
        //         }),
        //     {
        //         loading: "Please Wait....",
        //         success: (message) => message || "Project Added successful!",
        //         error: (err) => err || "Failed to Add Project"
        //     }
        // );
    }

    function handleRemove(id: string) {
        const confirmDelete = window.confirm("Are you sure you want to remove this Project?");
        if (!confirmDelete) return;

        const updatedProject = projects.filter((project) => project.recent_project_nid !== id || "");
        setCandidateData((prevData) => ({
            ...prevData,
            projects: updatedProject
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
                        projects.map((project, index) => (
                            <div className="details-edit-body" key={index}
                                style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
                                <span className='work-form-title'>Project {index + 1} </span>

                                <div className='remove' onClick={() => handleRemove(project.recent_project_nid)}>
                                    <i className="hgi hgi-stroke hgi-delete-02"></i>
                                </div>

                                <div className="details-edit-wraper">

                                    <div className="edit-input-container">
                                        <input
                                            type="text"
                                            placeholder=''
                                            onChange={(e) => handleChange(index, "name", e.target.value)}
                                            value={project.name}
                                            className='inputs'
                                            required
                                        />
                                        <label className='label'>Project Name</label>
                                    </div>

                                    <div className="edit-input-container">
                                        {
                                            project.image && (
                                                <div style={{ marginBottom: "10px" }}>
                                                    <Image
                                                        src={
                                                            typeof project.image === "string"
                                                                ? project.image
                                                                : project.image instanceof File
                                                                    ? URL.createObjectURL(project.image)
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
                                        <label className='label'>Project Image</label>
                                    </div>

                                    <div className="edit-input-container">
                                        <input
                                            type="text"
                                            placeholder=""
                                            value={project.link}
                                            onChange={(e) => handleChange(index, "link", e.target.value)}
                                            required
                                            className='inputs'
                                        />
                                        <label className='label'>Project Link</label>
                                    </div>

                                    <div className="edit-input-container">
                                        <textarea
                                            name='intro'
                                            placeholder=''
                                            value={project.description}
                                            onChange={(e) =>
                                                handleChange(index, "description", e.target.value)
                                            }
                                            className='inputs'
                                            rows={5}
                                            required
                                        />
                                        <label className='label'>Project Summary</label>
                                    </div>
                                </div>


                            </div>
                        ))
                    }
                    <div className="details-edit-footer">
                        <button onClick={addNewProject}>Add New</button>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                <Toaster />
            </div>
        </section>
    )
}
