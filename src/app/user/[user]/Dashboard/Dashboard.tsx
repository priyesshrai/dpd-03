import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UpdateAchievement, UpdateEducation, UpdateFormData, UpdateProjects, UpdateSkill, UpdateSocialActivity, UpdateTools, UpdateUserData, UpdateWorkExperience } from '../../../../../types';
import { UpdUserSkill, UpdUserTop, UpdUserWork } from '@/components/Skeleton/Skeleton';


export type DashboardProps = {
  currentTabKey?: string;
  setTabByKey?: (key: string) => void;
  goBack?: () => void;
  name?: string;
};

type Das = {
  setTabByKey: (key: string) => void;
  candidateData: UpdateFormData;
  loading: boolean;
}

export default function Dashboard({ setTabByKey, candidateData, loading }: Das) {
  return (
    <section className='component-section-wraper'>
      <DashboardTop setTabByKey={setTabByKey} personalData={candidateData.personalData} loading={loading} />
      <DashboardEducation setTabByKey={setTabByKey} candidateEdu={candidateData.education} loading={loading} />
      <DashboardWork setTabByKey={setTabByKey} candidateWork={candidateData.workExp} loading={loading} />
      <DashboardInterest setTabByKey={setTabByKey} loading={loading} candidateSkill={candidateData.skills} />
      <DashboardTools setTabByKey={setTabByKey} loading={loading} candidateTool={candidateData.tools} />
      <DashboardProjects setTabByKey={setTabByKey} candidateProject={candidateData.projects} loading={loading} />
      <DashboardAchievements setTabByKey={setTabByKey} candidateAchievement={candidateData.achievements} loading={loading} />
      <DashboardCertificate setTabByKey={setTabByKey} />
      <DashboardSocialActivity setTabByKey={setTabByKey} candidateActivity={candidateData.socialActivity} loading={loading} />
    </section>
  )
}

type DasTop = {
  setTabByKey?: (key: string) => void;
  personalData: UpdateUserData
  loading: boolean
}

function DashboardTop({ setTabByKey, personalData, loading }: DasTop) {
  return (
    <div className="component-dashboard-top component-common">
      {
        loading ? <UpdUserTop /> : (
          <>
            <div className="component-dashboard-top-wraper">
              <div className='component-block component-block-1'>
                <Image
                  src={
                    typeof personalData?.profile === 'string'
                      ? personalData.profile
                      : "/images/profile/default.png"
                  }
                  width={200}
                  height={200}
                  alt={personalData.name}
                />
              </div>

              <div className='component-block component-block-2'>
                <h1>{personalData.name}</h1>
                <h2> {personalData.headline} </h2>
                <p>
                  {personalData.intro}
                </p>
                <div className='component-block-2-social-media'>
                  {
                    personalData?.insta ? (<Link href={personalData.insta} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-instagram"></i></Link>) : ("")
                  }
                  {
                    personalData?.linkedin ? (<Link href={personalData?.linkedin} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-linkedin-01"></i></Link>) : ("")
                  }
                  {
                    personalData?.facebook ? (<Link href={personalData?.facebook} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-facebook-01"></i></Link>) : ("")
                  }
                  {
                    personalData?.yt ? (<Link href={personalData?.yt} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-youtube"></i></Link>) : ("")
                  }
                  {
                    personalData?.twitter ? (<Link href={personalData?.twitter} target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-new-twitter"></i></Link>) : ("")
                  }
                </div>
              </div>
            </div>
            <div className='edit-component' onClick={() => setTabByKey?.('profile')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>
  )
}

type DasEdu = {
  setTabByKey?: (key: string) => void;
  candidateEdu: UpdateEducation[]
  loading: boolean
}

function DashboardEducation({ setTabByKey, candidateEdu, loading }: DasEdu) {
  return (
    <div className="component-common">
      {
        loading ? <UpdUserWork /> : (
          <>
            <div className="work-component-header">
              <h2>Education</h2>
            </div>
            <div className="work-component-wraper common-component-wraper">

              {
                candidateEdu.length !== 0 ? (
                  candidateEdu.map((edu) => (
                    <div className="work-component-item" key={edu.education_nid}>
                      <div className="item-top">
                        <h3>{edu.degree}</h3>
                        <p>{edu.passingYear}</p>
                      </div>
                      <Link href="#" target='_blank'>{edu.institute}</Link>
                      <p className='work-summery'>
                        {edu.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No Education Found</div>
                )
              }

            </div>
            <div className='edit-component' onClick={() => setTabByKey?.('education')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>
  )
}

type DasWork = {
  setTabByKey?: (key: string) => void;
  candidateWork: UpdateWorkExperience[]
  loading: boolean
}

function DashboardWork({ setTabByKey, loading, candidateWork }: DasWork) {
  return (
    <div className="component-common">
      {
        loading ? <UpdUserWork /> : (
          <>
            <div className="work-component-header">
              <h2>Work Experience</h2>
            </div>
            <div className="work-component-wraper common-component-wraper">
              {
                candidateWork.length !== 0 ? (
                  candidateWork.map((work) => (
                    <div className="work-component-item" key={work.work_exp_nid}>
                      <div className="item-top">
                        <h3>{work.position}</h3>
                        <p>{work.workingPeriod}</p>
                      </div>
                      <Link href="#" target='_blank'>{work.company}</Link>
                      <p className='work-summery'>{work.description}</p>
                    </div>
                  ))
                ) : (
                  <div>No Work Experience Found</div>
                )
              }
            </div>
            <div className='edit-component' onClick={() => setTabByKey?.('work')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>

  )
}

type DasSkill = {
  setTabByKey?: (key: string) => void;
  candidateSkill: UpdateSkill[]
  loading: boolean
}

function DashboardInterest({ setTabByKey, loading, candidateSkill }: DasSkill) {
  return (
    <div className="component-common">
      {
        loading ? <UpdUserSkill /> : (
          <>
            <div className="work-component-header">
              <h2>Expert Area / Skills</h2>
            </div>

            <div className="skill-component-wraper common-component-wraper">
              {
                candidateSkill.length !== 0 ? (
                  candidateSkill.map((skill) => (
                    <div className="skill-component-item" key={skill.expert_area_nid}>
                      <div className='skill-item-wraper'>
                        <div className='skill-img'>
                          <Image src={typeof skill.skill_icon === 'string' ? skill.skill_icon : "/images/profile/default.png"} width={200} height={200} alt={skill.skill_name} />
                        </div>
                        <h3>{skill.skill_name}</h3>
                        <p className='skill-summery'>
                          {skill.skill_desc}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No Skill set were Found</div>
                )
              }
            </div>

            <div className='edit-component' onClick={() => setTabByKey?.('skills')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>

  )
}

type DasTool = {
  setTabByKey?: (key: string) => void;
  candidateTool: UpdateTools[]
  loading: boolean
}

function DashboardTools({ setTabByKey, loading, candidateTool }: DasTool) {
  return (
    <div className="component-common">

      {
        loading ? <UpdUserSkill /> : (
          <>
            <div className="work-component-header">
              <h2>Tools</h2>
            </div>

            <div className="tools-component-wraper common-component-wraper">
              {
                candidateTool.length !== 0 ? (
                  candidateTool.map((tool) => (
                    <div className="tools-item" key={tool.tools_nid}>
                      <Image
                        src={typeof tool.tools_image === 'string' ? tool.tools_image : "/images/profile/default.png"}
                        alt={tool.title}
                        className='tools-logo'
                        width={500}
                        height={500} />
                    </div>
                  ))
                ) : (
                  <div>No any Tools Found</div>
                )
              }
            </div>

            <div className='edit-component' onClick={() => setTabByKey?.('tools')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>
  )
}

type DasProject = {
  setTabByKey?: (key: string) => void;
  candidateProject: UpdateProjects[]
  loading: boolean
}

function DashboardProjects({ setTabByKey, loading, candidateProject }: DasProject) {
  return (
    <div className="component-common">
      {
        loading ? <UpdUserWork /> : (
          <>
            <div className="work-component-header">
              <h2>Recent Projects</h2>
            </div>

            <div className="receent-project-component-wraper common-component-wraper">

              {
                candidateProject.length !== 0 ? (
                  candidateProject.map((project) => (
                    <div className="recent-project-item" key={project.recent_project_nid}>
                      <div className="item-top">
                        <Link href={project.link} target='_blank'>{project.name}</Link>
                        <Link href={project.link} target='_blank' className='recent-project-link'>
                          <i className="hgi hgi-stroke hgi-globe-02"></i>
                        </Link>
                      </div>
                      <p className='work-summery'>
                        {project.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No Projects were found.</div>
                )
              }

            </div>

            <div className='edit-component' onClick={() => setTabByKey?.('projects')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>

  )
}

type DasAchievement = {
  setTabByKey?: (key: string) => void;
  candidateAchievement: UpdateAchievement[]
  loading: boolean
}

function DashboardAchievements({ setTabByKey, loading, candidateAchievement }: DasAchievement) {
  return (
    <div className="component-common">
      {
        loading ? <UpdUserWork /> : (
          <>
            <div className="work-component-header">
              <h2>My Achievements</h2>
            </div>

            <div className="receent-project-component-wraper common-component-wraper">

              {
                candidateAchievement.length !== 0 ? (
                  candidateAchievement.map((achi) => (
                    <div className="recent-project-item" key={achi.achievement_nid}>
                      <div className="item-top">
                        <Link href={achi.link} target='_blank'>{achi.name}</Link>
                        <Link href={achi.link} target='_blank' className='recent-project-link'>
                          <i className="hgi hgi-stroke hgi-globe-02"></i>
                        </Link>
                      </div>
                      <p className='work-summery'>
                        {achi.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No Achievement were found.</div>
                )
              }

            </div>

            <div className='edit-component' onClick={() => setTabByKey?.('achievements')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>

  )
}

function DashboardCertificate({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>My Certificate</h2>
      </div>

      <div className="certificate-component-wraper common-component-wraper">
        <div className="certificate-item">
          <Image
            src="/images/certificates/c-01.jpg"
            alt='Certificate'
            className='certificate-img'
            width={500}
            height={500} />
          <div className='certificate-item-text'>
            <h3> Google Professional Cloud Architect</h3>
          </div>
        </div>
        <div className="certificate-item">
          <Image
            src="/images/certificates/c-02.jpg"
            alt='Certificate'
            className='certificate-img'
            width={500}
            height={500} />
          <div className='certificate-item-text'>
            <h3> AWS Certified Solutions Architect – Associate</h3>
          </div>
        </div>
        <div className="certificate-item">
          <Image
            src="/images/certificates/c-01.jpg"
            alt='Certificate'
            className='certificate-img'
            width={500}
            height={500} />
          <div className='certificate-item-text'>
            <h3> Meta Front-End Developer Certificate </h3>
          </div>
        </div>
      </div>

      <div className='edit-component' onClick={() => setTabByKey?.('certificate')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
    </div>
  )
}

type DasActivity = {
  setTabByKey?: (key: string) => void;
  candidateActivity: UpdateSocialActivity[]
  loading: boolean
}

function DashboardSocialActivity({ setTabByKey, loading, candidateActivity }: DasActivity) {
  return (
    <div className="component-common">
      {
        loading ? <UpdUserWork /> : (
          <>
            <div className="work-component-header">
              <h2>Social Activity</h2>
            </div>

            <div className="receent-project-component-wraper common-component-wraper">
              {
                candidateActivity.length !== 0 ? (
                  candidateActivity.map((activity) => (
                    <div className="recent-project-item" key={activity.social_activities_nid}>
                      <div className="item-top">
                        <span>{activity.title}</span>
                      </div>
                      <p className='work-summery' style={{ maxWidth: '100%' }}>
                        {activity.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No Social Activity were found.</div>
                )
              }
            </div>

            <div className='edit-component' onClick={() => setTabByKey?.('socialActivity')}>
              <i className="hgi hgi-stroke hgi-edit-02"></i>
            </div>
          </>
        )
      }
    </div>
  )
}


