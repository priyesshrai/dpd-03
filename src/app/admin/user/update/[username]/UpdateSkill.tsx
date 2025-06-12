'use client'
import React from 'react'
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { UpdateFormData, UpdateSkill } from '../../../../../../types';


type Candidate = {
  loading: boolean;
  candidateSkills: UpdateSkill[];
  setCandidateData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateUserSkill({ candidateSkills, loading, setCandidateData, setLoading }: Candidate) {
  return (
    <div>UpdateSkill</div>
  )
}
