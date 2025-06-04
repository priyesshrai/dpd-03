'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import axios from 'axios';

export default function CandidateList() {
  const [candidateData, setCandidateData] = useState()
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCandateData() {
      setLoading(true)
      const response = await axios.get("http://inforbit.in/demo/dpd/candidate-profile-list")
      if (response.status === 200) {
        setCandidateData(response.data)
        setLoading(false)
      }
    }
    fetchCandateData()
  }, [])

  return (
    <div className='component-common' style={{ padding: 0 }}>
      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {loading && (
            <div className='edit-loading' style={{ position: "relative", padding: "50px" }} >
              <LargeSpinner />
            </div>
          )}








        </motion.div>
      </AnimatePresence>
    </div>
  )
}
