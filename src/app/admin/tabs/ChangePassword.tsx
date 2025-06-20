'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import LargeSpinner from '@/components/Spinner/LargeSpinner';

type Password = {
  oldPassword: string;
  newPassword: string;
}
export default function ChangePassword() {
  const [loading, setLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<Password>({
    oldPassword: "",
    newPassword: ""
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value
    }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!password.newPassword || !password.oldPassword) {
      toast.error("Please Fill Old and Password both.")
      return;
    }
    if (password.newPassword === password.oldPassword) {
      toast.error("Old password and New Password could not be same.")
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("old_password", password.oldPassword);
    formData.append("new_password", password.newPassword);
    formData.append("user_type", "superadmin");

    formData.forEach((value, key) => (
      console.log(key + " => " + value)
    ))
    setLoading(false)
  }

  return (
    <div className='component-common'>
      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >

          {loading && (
            <div className='edit-loading'>
              <LargeSpinner />
            </div>
          )}
          <div className="details-edit-component" style={{ padding: "30px" }}>
            <form onSubmit={handleSubmit}>
              <div className="details-edit-body" >
                <div className="details-edit-wraper">
                  <div className="edit-input-container">
                    <input
                      type="text"
                      name='oldPassword'
                      placeholder=''
                      onChange={handleChange}
                      value={password.oldPassword}
                      className='inputs'
                      required
                    />
                    <label className='label'>Old Password</label>
                  </div>
                  <div className="edit-input-container">
                    <input
                      type="text"
                      name='newPassword'
                      placeholder=''
                      onChange={handleChange}
                      value={password.newPassword}
                      className='inputs'
                      required
                    />
                    <label className='label'>New Password</label>
                  </div>
                </div>
              </div>

              <div className="details-edit-footer">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
          <Toaster />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
