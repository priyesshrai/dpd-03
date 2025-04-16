'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from "motion/react"
import { usePathname } from 'next/navigation'

export default function SideBar() {
  const currentPath = usePathname()

  const bio = "✨ CEO & Founder | Wizards Next LLP 📍 Varanasi | 💼 Digital Marketing Wizard Crafting spells in the digital realm with 7+ years of marketing magic 🪄. From SEO sorcery 🔍 to social media charm ✨, I help brands grow and glow 🌟. Leading a team of creative wizards 🧑‍🎨👨‍💻, we brew strategy, design, and results-driven campaigns that make businesses unforgettable 💥."

  const getTrimmedBio = () => {
    if (currentPath === "/") {
      const plainText = bio.replace(/<[^>]+>/g, '')
      const shortened = plainText.length > 100 ? plainText.substring(0, 220) + "..." : plainText
      return shortened
    }
    return bio
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      className='side-bar'
    >
      <div className="side-bar-wraper">
        <div className="profile-container">
          <Image src='/images/profile/profile.png' width={200} height={278} alt='Profile' />
        </div>
        <div className="user-data">
          <h1>Ravi Khetan</h1>

          <p dangerouslySetInnerHTML={{ __html: getTrimmedBio() }} />

          <div className="cta-button-container">
            <button>Ping to Show Interest<i className="hgi hgi-stroke hgi-touch-09"></i> </button>
          </div>

          <div className="social-media-container">
            <Link href='https://www.instagram.com/ravikhtnvns/' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-instagram"></i></Link>
            <Link href='https://www.linkedin.com/in/ravi-khetan-a5127261/' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-linkedin-01"></i></Link>
            <Link href='https://www.facebook.com/ravi.khetan.2025' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-facebook-01"></i></Link>
            <Link href='https://www.youtube.com/@Ravi2147' target='_blank' className="social-icons"><i className="hgi hgi-stroke hgi-youtube"></i></Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
