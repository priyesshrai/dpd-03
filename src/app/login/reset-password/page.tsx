'use client'
import Spinner from '@/components/Spinner/Spinner'
import Image from 'next/image'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function page() {
  const [userData, setUserData] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit() {
    console.log(userData);
  }
  return (
    <section className="login-container">
      <div className="login-card">
        <div className="login-wraper">
          <div className="card-top">
            <Image src='/images/user/logo.png' width={300} height={27} alt="Dream Path Profile Builder" />
            {/* <span>Login</span> */}
          </div>

          <div className="card-body">
            <div className="card-input">
              <input
                type="text"
                name="username"
                placeholder="Email or Phone No."
                required
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
              />
            </div>
          </div>

          <div className="card-footer">
            <button type="button" onClick={handleSubmit}
              disabled={!userData || loading}>
              {loading ? <Spinner /> : "Verify"}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
