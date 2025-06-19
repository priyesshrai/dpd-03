'use client'
import Spinner from '@/components/Spinner/Spinner'
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type Password = {
    password: string,
    cPassword: string
}
type Props = {
    nid: string,
    token: string
}

export default function ResetPassword({ token, nid }: Props) {
    const [userData, setUserData] = useState<Password>({
        password: "",
        cPassword: ""
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        if (!userData.password && !userData.cPassword) {
            toast.error("Please Fill all Fields");
            setIsLoading(false)
            return;
        }
        if (userData.password !== userData.cPassword) {
            toast.error("Password and Confirm Password do not match");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("newpassword", userData?.password);
        formData.append("usernid", nid);
        formData.append("updcode", token);

        // formData.forEach((value, key) => {
        //     console.log(key + " => " + value);
        // })

        toast.promise(
            axios.post("https://inforbit.in/demo/dpd/update-password", formData)
                .then((response) => {
                    if (response.data.status) {
                        setUserData({
                            password: "",
                            cPassword: ""
                        })
                        setIsLoading(false);
                        window.location.href = "/login"
                        return response.data.message;
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                    const errorMessage = error.response?.data?.message || error.message;
                    throw new Error(errorMessage);
                }),
            {
                loading: "Please Wait....",
                success: (message) => message || "Password Updated successful!",
                error: () => "Failed to Update Password"
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
                                name="password"
                                placeholder="Enter Password"
                                required
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="card-input">
                            <input
                                type="text"
                                name="cPassword"
                                placeholder="Confirm Password"
                                required
                                value={userData.cPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="button" onClick={handleSubmit}
                            disabled={!userData.cPassword || !userData.password || isLoading}>
                            {isLoading ? <Spinner /> : "Verify"}
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </section>
    )
}
