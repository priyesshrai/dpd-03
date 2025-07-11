'use client'
import LargeSpinner from '@/components/Spinner/LargeSpinner'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { UpdateFormData, UpdateSocialActivity } from '../../../../../types'
import BackBtn from './BackBtn'


type UserData = {
    name?: string
    goBack?: () => void;
    candidateSocial: UpdateSocialActivity[]
    setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
    profileNid: string;
}
export default function SocialActivity({ candidateSocial, setCandidateData, name, profileNid, goBack }: UserData) {
    const [loading, setLoading] = useState<boolean>(false)
    const socialActivity = candidateSocial

    const addNewSocialActivity = () => {
        const lastExperience = socialActivity[socialActivity.length - 1];

        if (!lastExperience) {
            setCandidateData((prevData) => ({
                ...prevData,
                socialActivity: [
                    ...socialActivity,
                    {
                        social_activities_nid: "",
                        title: "",
                        description: "",
                    },
                ]
            }));
            return;
        }

        const allFieldsFilled = Object.values(lastExperience).every(
            (field) => field.trim() !== ""
        );

        if (!allFieldsFilled) {
            alert("Please fill out all fields in the last experience before adding a new one.");
            return;
        }

        setCandidateData((prevData) => ({
            ...prevData,
            socialActivity: [
                ...socialActivity,
                {
                    social_activities_nid: "",
                    title: "",
                    description: "",
                },
            ]
        }));
    };

    const handleChange = (
        index: number,
        field: keyof UpdateSocialActivity,
        value: string
    ) => {
        const updatedSocialActivity = [...socialActivity];
        updatedSocialActivity[index][field] = value;
        setCandidateData((prevData) => ({
            ...prevData,
            socialActivity: updatedSocialActivity,
        }));
    };

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("social_activities", JSON.stringify(socialActivity));
        formData.append("user_type", "superadmin")
        formData.append("user_nid", profileNid)
        

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        setLoading(false)
        // toast.promise(
        //   axios.post("https://inforbit.in/demo/dpd/candidate-social-activities", formData)
        //     .then((response) => {
        //       if (response.data.status) {
        //         setCandidateData({
        //           personalData: {
        //             name: "",
        //             email: "",
        //             phone: "",
        //             headline: "",
        //             intro: "",
        //             facebook: "",
        //             insta: "",
        //             linkedin: "",
        //             twitter: "",
        //             yt: ""
        //           },
        //           education: [
        //             {
        //               institute: "",
        //               degree: "",
        //               passingYear: "",
        //               description: "",
        //             }
        //           ],
        //           workExp: [
        //             {
        //               company: "",
        //               position: "",
        //               workingPeriod: "",
        //               description: "",
        //             }
        //           ],
        //           skills: [],
        //           tools: [],
        //           projects: [
        //             {
        //               name: "",
        //               link: "",
        //               image: null,
        //               description: "",
        //             }
        //           ],
        //           achievements: [
        //             {
        //               name: "",
        //               link: "",
        //               image: null,
        //               description: "",
        //             }
        //           ],
        //           socialActivity: [
        //             {
        //               title: "",
        //               description: "",
        //             }
        //           ]
        //         })
        //         localStorage.removeItem("userId");
        //         localStorage.removeItem("tempInfo")
        //         setLoading(false);
        //         nextStep();
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
        //     success: (message) => message || "Social Activity Added successful!",
        //     error: (err) => err || "Failed to Add Social Activity"
        //   }
        // );
    }

    function handleRemove(id: string) {
        const confirmDelete = window.confirm("Are you sure you want to remove this Social Activity?");
        if (!confirmDelete) return;

        const updatedActivity = socialActivity.filter((activity) => {
            return activity.social_activities_nid !== id || "";
        });

        setCandidateData((prevData) => ({
            ...prevData,
            socialActivity: updatedActivity
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
                        socialActivity.map((activity, index) => (
                            <div className="details-edit-body" key={index}
                                style={{ borderBottom: "1px solid #dadada", paddingBottom: "50px" }} >
                                <span className='work-form-title'>Social Activity {index + 1} </span>

                                <div className='remove' onClick={() => handleRemove(activity.social_activities_nid)}>
                                    <i className="hgi hgi-stroke hgi-delete-02"></i>
                                </div>

                                <div className="details-edit-wraper">

                                    <div className="edit-input-container">
                                        <input
                                            type="text"
                                            placeholder=''
                                            onChange={(e) => handleChange(index, "title", e.target.value)}
                                            value={activity.title}
                                            className='inputs'
                                            required
                                        />
                                        <label className='label'>Social Activity Title</label>
                                    </div>

                                    <div className="edit-input-container">
                                        <textarea
                                            name='intro'
                                            placeholder=''
                                            value={activity.description}
                                            onChange={(e) =>
                                                handleChange(index, "description", e.target.value)
                                            }
                                            className='inputs'
                                            rows={5}
                                            required
                                        />
                                        <label className='label'>Social Activity Description</label>
                                    </div>
                                </div>


                            </div>
                        ))
                    }
                    <div className="details-edit-footer">
                        <button onClick={addNewSocialActivity}>Add New</button>
                        <button onClick={handleSubmit}>Save</button>
                    </div>

                </div>
                <Toaster />
            </div>
        </section>
    )
}
