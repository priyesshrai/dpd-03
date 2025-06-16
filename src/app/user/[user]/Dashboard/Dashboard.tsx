import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UpdateEducation, UpdateFormData, UpdateUserData, UpdateWorkExperience } from '../../../../../types';
import { UpdUserTop, UpdUserWork } from '@/components/Skeleton/Skeleton';


export type DashboardProps = {
  currentTabKey?: string;
  setTabByKey?: (key: string) => void;
  goBack?: () => void;
  name?: string;
  candidateData: UpdateFormData;
  loading: boolean;
};

export default function Dashboard({ setTabByKey, candidateData, loading }: DashboardProps) {
  // console.log(candidateData);

  return (
    <section className='component-section-wraper'>
      <DashboardTop setTabByKey={setTabByKey} personalData={candidateData.personalData} loading={loading} />
      <DashboardEducation setTabByKey={setTabByKey} candidateEdu={candidateData.education} loading={loading} />
      <DashboardWork setTabByKey={setTabByKey} candidateWork={candidateData.workExp} loading={loading} />
      <DashboardInterest setTabByKey={setTabByKey} />
      <DashboardTools setTabByKey={setTabByKey} />
      <DashboardProjects setTabByKey={setTabByKey} />
      <DashboardAchievements setTabByKey={setTabByKey} />
      <DashboardCertificate setTabByKey={setTabByKey} />
      <DashboardSocialActivity setTabByKey={setTabByKey} />
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
                candidateEdu?.map((edu) => (
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
                candidateWork?.map((work) => (
                  <div className="work-component-item" key={work.work_exp_nid}>
                    <div className="item-top">
                      <h3>{work.position}</h3>
                      <p>{work.workingPeriod}</p>
                    </div>
                    <Link href="#" target='_blank'>{work.company}</Link>
                    <p className='work-summery'>{work.description}</p>
                  </div>
                ))
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

function DashboardInterest({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>Expert Area / Skills</h2>
      </div>

      <div className="skill-component-wraper common-component-wraper">

        <div className="skill-component-item">
          <div className='skill-item-wraper'>
            <div className='skill-img'>

            </div>
            <h3>SEO Optimization</h3>
            <p className='skill-summery'>
              Expert in optimizing websites for search engines, improving visibility and driving organic traffic.
            </p>
          </div>
        </div>

        <div className="skill-component-item">
          <div className='skill-item-wraper'>
            <div className='skill-img'>

            </div>
            <h3>Social Media Management </h3>
            <p className='skill-summery'>
              Building and maintaining brand presence across social media platforms.
            </p>
          </div>
        </div>

        <div className="skill-component-item">
          <div className='skill-item-wraper'>
            <div className='skill-img'>

            </div>
            <h3>Content Creation</h3>
            <p className='skill-summery'>
              Crafting engaging visual and written content for digital platforms.
            </p>
          </div>
        </div>

        <div className="skill-component-item">
          <div className='skill-item-wraper'>
            <div className='skill-img'>

            </div>
            <h3>Graphic Designing</h3>
            <p className='skill-summery'>
              Designing impactful visuals to communicate brand messages effectively.
            </p>
          </div>
        </div>

        <div className="skill-component-item">
          <div className='skill-item-wraper'>
            <div className='skill-img'>

            </div>
            <h3>Marketing Strategy</h3>
            <p className='skill-summery'>
              Planning effective campaigns to meet business and branding goals.
            </p>
          </div>
        </div>

        <div className="skill-component-item">
          <div className='skill-item-wraper'>
            <div className='skill-img'>

            </div>
            <h3>Ad Campaign Management</h3>
            <p className='skill-summery'>
              Managing and optimizing paid ads for better reach and results.
            </p>
          </div>
        </div>

      </div>

      <div className='edit-component' onClick={() => setTabByKey?.('skills')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
    </div>

  )
}

function DashboardProjects({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>Recent Projects</h2>
      </div>

      <div className="receent-project-component-wraper common-component-wraper">

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">Social Media Growth Campaign</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Developed and executed a 3-month content strategy across Instagram and LinkedIn for a local brand, resulting in a 250% increase in follower engagement and a 35% growth in conversions through organic efforts.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">E-commerce Performance Marketing Project</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Managed Google Ads and Meta Ads for an online fashion store, optimizing ad spend and improving ROI by 4.2x through targeted keyword research, A/B testing, and landing page optimizations.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">Brand Identity & Launch Strategy</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Led the digital branding, logo design, and content rollout for a tech startup. Strategized and implemented the launch plan including SEO-optimized blogs, press releases, and influencer outreach.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">Content Marketing Funnel for a SaaS Product</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Created a multi-channel content marketing funnel with blog posts, email sequences, and lead magnets, which boosted lead generation by 60% in 90 days.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">YouTube Channel Growth Project</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Built and scaled a YouTube channel from 0 to 10,000+ subscribers in 6 months through SEO-driven video titles, engaging thumbnails, and content scheduling strategy.
          </p>
        </div>

      </div>

      <div className='edit-component' onClick={() => setTabByKey?.('projects')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
    </div>

  )
}

function DashboardAchievements({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>My Achievements</h2>
      </div>

      <div className="receent-project-component-wraper common-component-wraper">

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">Guest Lecture - 2022</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Invited as a guest lecturer at Jaipuria Institute of Management, Jaipur, to share insights on entrepreneurship and digital transformation.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">Innovation Award – 2021</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Recognized as the Most Innovative Tech Entrepreneur by VIT University for outstanding contributions to digital innovation and entrepreneurship.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">Magazine Launch - 2020</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Spearheaded the creation and launch of &quot;Alumni Forum&quot;, a magazine by the ICFAI Alumni Relationship Cell during the MBA program in Hyderabad.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <Link href="">Book Launch - 2018</Link>
            <Link href="" target='_blank' className='recent-project-link'>
              <i className="hgi hgi-stroke hgi-globe-02"></i>
            </Link>
          </div>
          <p className='work-summery'>
            Published &quot;Convention to Digital: A Shift in Banking&quot; during the final year of B.Com, highlighting the evolution of traditional banking to digital platforms.
          </p>
        </div>

      </div>

      <div className='edit-component' onClick={() => setTabByKey?.('achievements')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
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

function DashboardSocialActivity({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>Social Activity</h2>
      </div>

      <div className="receent-project-component-wraper common-component-wraper">

        <div className="recent-project-item">
          <div className="item-top">
            <span>Empowering Lives in Urban Slums with JR Digital Marketing Services</span>
          </div>
          <p className='work-summery' style={{ maxWidth: '100%' }}>
            Independently collaborated with team members of JR Digital Marketing Services to support the poor and underprivileged families in slum areas. The initiative included distributing food packets, clothing, and essential supplies, as well as spreading awareness about hygiene and basic healthcare. This effort helped uplift living conditions and brought hope to communities often overlooked.
          </p>
        </div>

        <div className="recent-project-item">
          <div className="item-top">
            <span>Digital Literacy Workshop for Underprivileged Students at Kutumbh NGO</span>
          </div>
          <p className='work-summery' style={{ maxWidth: '100%' }}>
            Organized and conducted a 7-day hands-on workshop focused on Digital Literacy for students up to class 10th associated with Kutumbh NGO. The workshop aimed to equip young learners with basic computer skills, internet safety knowledge, and tools for educational development. This initiative empowered children with essential digital skills needed in today&apos;s world and bridged the digital divide among marginalized youth.
          </p>
        </div>
        <div className="recent-project-item">
          <div className="item-top">
            <span>Documentary Project for Abhinav Vidyalay in Collaboration with Round Table India</span>
          </div>
          <p className='work-summery' style={{ maxWidth: '100%' }}>
            Led the creation of a documentary for Abhinav Vidyalay, a school for underprivileged children in Mirzamurad village, Varanasi. This project was undertaken in association with Round Table India, aiming to highlight the school&apos;s efforts in providing education to children from impoverished backgrounds. The documentary served as a powerful tool to generate awareness and garner support for educational initiatives in rural areas.
          </p>
        </div>
        <div className="recent-project-item">
          <div className="item-top">
            <span> Blood Donation Awareness and Support with Red Cross in Varanasi (2022)</span>
          </div>
          <p className='work-summery' style={{ maxWidth: '100%' }}>
            Actively volunteered with the Red Cross Army during their Blood Bank Booth Drive in 2022, held in Varanasi. Assisted in organizing booths, guiding donors, and spreading awareness about the importance of blood donation. Contributed to saving lives by promoting voluntary blood donation and encouraging public participation in this life-saving cause.
          </p>
        </div>


      </div>

      <div className='edit-component' onClick={() => setTabByKey?.('socialActivity')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
    </div>
  )
}

function DashboardTools({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>Tools</h2>
      </div>

      <div className="tools-component-wraper common-component-wraper">
        <div className="tools-item">
          <Image
            src="/images/svg/figma.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/canva.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/google.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/adobe-illustrator.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/adobe-photoshop.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/adobe-lightroom.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/adobe-premiere-pro.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/final-cut.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/wordpress.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
        <div className="tools-item">
          <Image
            src="/images/svg/html.svg"
            alt='Certificate'
            className='tools-logo'
            width={500}
            height={500} />
        </div>
      </div>

      <div className='edit-component' onClick={() => setTabByKey?.('tools')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
    </div>
  )
}

