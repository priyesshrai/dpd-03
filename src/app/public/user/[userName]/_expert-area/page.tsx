'use client'
import CommonFooter from '@/components/CommonFooter';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';
import React from 'react'

export default function ExpertArea() {
    const { userData, loading } = useUserContext();
    return (
        <div className='other-page'>
            {
                loading && (<div className='edit-loading'>
                    <LargeSpinner />
                </div>)
            }
            <div className="other-page-wraper">
                <div className="body">
                    <div className="body-skill">
                        <span>Skills</span>
                        <div className='skills'>
                            {
                                userData?.expert_area_list?.map((skill) => (
                                    <div className="skill-items" key={skill.expert_area_nid}>
                                        <Image src={skill.expertise_icon} alt={skill.expertise_name} width={500} height={500} />
                                        <h2>
                                            {skill.expertise_name}
                                        </h2>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <hr />
                    <div className="body-skill" style={{ marginTop: "30px" }}>
                        <span>Tools</span>
                        <div className='skills'>
                            {
                                userData?.tools_list?.map((tool) => (
                                    <div className="skill-items" key={tool.tools_nid}>
                                        <Image src={tool.tools_image} alt={tool.title} width={1000} height={1000} />
                                        <h2>
                                            {tool.title}
                                        </h2>
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
