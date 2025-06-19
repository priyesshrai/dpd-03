'use client'
import Spinner from '@/components/Spinner/Spinner'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function page() {
  return <ResetPassword />
}

function ResetPassword() {
  const [userData, setUserData] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (!userData) {
      toast.error("Please Enter the Valid Email or Mobile No.")
      return
    }
    const formData = new FormData()
    formData.append("mobile_email", userData);

    toast.promise(
      axios.post("https://inforbit.in/demo/dpd/forgot-password", formData)
        .then((response) => {
          if (response?.data?.status) {
            setUserData("");
            setIsLoading(false);
            return response.data.message;
          }
        })
        .catch((error) => {
          setIsLoading(false);
          const errorMessage = error.response?.data?.message || error.message;
          throw errorMessage;
        }),
      {
        loading: "Please Wait....",
        success: (message) => message || "Reset Link sent Successfully",
        error: (err) => err || "Unable to sent Reset Link."
      }
    );

  }
  return (
    <section className="login-container">
      <div className="login-card">
        <div className="login-wraper">
          <div className="card-top">
            <Image src='/images/user/logo.png' width={300} height={27} alt="Dream Path Profile Builder" />
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
            <button type="button" onClick={handleSubmit} disabled={!userData || isLoading}>
              {isLoading ? <Spinner /> : "Verify"}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
