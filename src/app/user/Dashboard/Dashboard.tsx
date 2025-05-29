import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export type DashboardProps = {
  currentTabKey?: string;
  setTabByKey?: (key: string) => void;
};

export default function Dashboard({ setTabByKey }: DashboardProps) {

  return (
    <section className='component-section-wraper'>
      <DashboardTop setTabByKey={setTabByKey} />
      <DashboardWork setTabByKey={setTabByKey} />
      <DashboardEducation setTabByKey={setTabByKey} />
      <DashboardInterest setTabByKey={setTabByKey} />
      <DashboardProjects setTabByKey={setTabByKey} />
      <DashboardAchievements setTabByKey={setTabByKey} />
      <DashboardCertificate setTabByKey={setTabByKey} />
      <DashboardSocialActivity setTabByKey={setTabByKey} />
    </section>
  )
}


function DashboardTop({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-dashboard-top component-common">
      <div className="component-dashboard-top-wraper">
        <div className='component-block component-block-1'>
          <Image src='/images/profile/profile.png' width={200} height={200} alt="User Profile" />
        </div>

        <div className='component-block component-block-2'>
          <h1>Ravi Khetan</h1>
          <h2> CEO & Founder | Wizards Next LLP Varanasi </h2>
          <p>
            CEO & Founder | Wizards Next LLP 📍 Varanasi | 💼 Digital Marketing Wizard Crafting spells in the digital realm with 7+ years of marketing magic 🪄. From SEO sorcery 🔍 to social media charm ✨, I help brands grow and glow 🌟. Leading a team of creative wizards 🧑‍🎨👨‍💻, we brew strategy, design, and results-driven campaigns that make businesses unforgettable 💥.
          </p>
          <div className='component-block-2-social-media'>
            <Link href='https://www.instagram.com/ravikhtnvns/' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-instagram"></i></Link>
            <Link href='https://www.linkedin.com/in/ravi-khetan-a5127261/' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-linkedin-01"></i></Link>
            <Link href='https://www.facebook.com/ravi.khetan.2025' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-facebook-01"></i></Link>
            <Link href='https://www.youtube.com/@Ravi2147' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-youtube"></i></Link>
          </div>
        </div>
      </div>
      <div className='edit-component' onClick={() => setTabByKey?.('profile')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
    </div>
  )
}

function DashboardWork({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>Work Experience</h2>
      </div>
      <div className="work-component-wraper common-component-wraper">

        <div className="work-component-item">
          <div className="item-top">
            <h3>CEO & Founder</h3>
            <p>Jan 2020 - Present</p>
          </div>
          <Link href="#" target='_blank'>Wizards Next LLP</Link>
          <p className='work-summery'>Leading a team of digital marketing experts, driving innovative strategies to enhance brand visibility and engagement.</p>
        </div>

        <div className="work-component-item">
          <div className="item-top">
            <h3>CEO & Founder</h3>
            <p>Jan 2020 - Present</p>
          </div>
          <Link href="#" target='_blank'>Wizards Next LLP</Link>
          <p className='work-summery'>Leading a team of digital marketing experts, driving innovative strategies to enhance brand visibility and engagement.</p>
        </div>

        <div className="work-component-item">
          <div className="item-top">
            <h3>CEO & Founder</h3>
            <p>Jan 2020 - Present</p>
          </div>
          <Link href="#" target='_blank'>Wizards Next LLP</Link>
          <p className='work-summery'>Leading a team of digital marketing experts, driving innovative strategies to enhance brand visibility and engagement.</p>
        </div>

      </div>
      <div className='edit-component' onClick={() => setTabByKey?.('work')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
    </div>

  )
}

function DashboardEducation({ setTabByKey }: { setTabByKey?: (key: string) => void }) {
  return (
    <div className="component-common">
      <div className="work-component-header">
        <h2>Education</h2>
      </div>
      <div className="work-component-wraper common-component-wraper">

        <div className="work-component-item">
          <div className="item-top">
            <h3> MBA in Marketing</h3>
            <p>Jan 2020 - June 2022 </p>
          </div>
          <Link href="#" target='_blank'>ICFAI Business School, Hyderabad</Link>
          <p className='work-summery'>
            Completed a comprehensive MBA program focused on marketing strategies, digital campaigns, and consumer analytics to drive business growth.
          </p>
        </div>

        <div className="work-component-item">
          <div className="item-top">
            <h3>B.Com in Computer Application</h3>
            <p>May 2017 - Jan 2020</p>
          </div>
          <Link href="#" target='_blank'>Vellore Institute of Technology, Vellore</Link>
          <p className='work-summery'>
            Earned a bachelor's degree combining commerce principles with computer applications, preparing for tech-driven business environments.
          </p>
        </div>

        <div className="work-component-item">
          <div className="item-top">
            <h3>Higher Secondary CBSE</h3>
            <p>April 2014 - March 2016</p>
          </div>
          <Link href="#" target='_blank'>HSMS, Durgapur</Link>
          <p className='work-summery'>
            Completed senior secondary education with emphasis on commerce and computer science, laying a strong foundation for higher studies.

          </p>
        </div>

      </div>
      <div className='edit-component' onClick={() => setTabByKey?.('education')}>
        <i className="hgi hgi-stroke hgi-edit-02"></i>
      </div>
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

      <div className='edit-component' onClick={() => setTabByKey?.('Skills')}>
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
            Spearheaded the creation and launch of "Alumni Forum", a magazine by the ICFAI Alumni Relationship Cell during the MBA program in Hyderabad.
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
            Published "Convention to Digital: A Shift in Banking" during the final year of B.Com, highlighting the evolution of traditional banking to digital platforms.
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



