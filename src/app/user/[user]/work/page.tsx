'use client'
import CommonFooter from '@/components/CommonFooter';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';
import React from 'react'

export default function WorkAndEducationPage() {
    const { userData, loading } = useUserContext();
    return (
        <div className='other-page'>
            {
                loading && (<div className='edit-loading'>
                    <LargeSpinner />
                </div>)
            }
            <div className="other-page-wraper">
                <div className="heading">
                    <h2>
                        Education & Projects
                    </h2>
                </div>
                <div className="body">
                    <div className="body-education">
                        <span>Education</span>
                        <div className='education'>
                            {
                                userData.education_list?.map((edu) => (
                                    <div className="work-component-item" key={edu.education_nid}>
                                        <div className="item-top">
                                            <h3>{edu.degree_title}</h3>
                                            <p>{edu.passing_year}</p>
                                        </div>
                                        <span>{edu.from_institute}</span>
                                        <p className='work-summery'>
                                            {edu.education_profile}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="body-achievement">
                        <div className="achi">
                            {
                                userData?.recent_project_list?.map((project) => (
                                    <div className="achi-card" key={project.recent_project_nid}>
                                        <Image src={project.recent_project_img!} width={1000} height={500}
                                            alt={project.title} />
                                        <h2>
                                            {project.title}
                                            <a href={project.project_link} target='_blank'>
                                                <i className="hgi hgi-stroke hgi-unlink-03"></i>
                                            </a>
                                        </h2>
                                        <p>{project.project_description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <CommonFooter />
            </div>
        </div>
    )
}
