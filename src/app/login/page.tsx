'use client';
import Spinner from '@/components/Spinner/Spinner';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";

type LoginType = 'password' | 'otp';

type UserData = {
    username: string;
    password: string;
    otp: string;
};

export default function LoginPage() {
    const [loginType, setLoginType] = useState<LoginType>('password');
    const [userData, setUserData] = useState<UserData>({
        username: '',
        password: '',
        otp: '',
    });
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        if (!userData.username || !userData.password) {
            alert('Please enter both username and password');
            setIsLoading(false);
            return;
        }

        const data = new FormData();
        data.append("username", userData.username);
        data.append("password", userData.password);

        toast.promise(
            axios.post("https://inforbit.in/demo/dpd/login", data)
                .then((response) => {
                    if (response.data.status) {

                        Cookies.set("data", JSON.stringify(response.data), {
                            expires: 1,
                            path: "/",
                        });

                        setUserData({
                            username: "",
                            password: "",
                            otp: ""
                        });

                        setIsLoading(false);
                        window.location.href = "/admin/dashboard"
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
                success: (message) => message || "Login successful!",
                error: (err) => err || "Login failed!"
            }
        );
    }

    function SendOtp(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        if (!userData.username) {
            alert('Please enter valid username.');
            setIsLoading(false);
            return;
        }
        const data = new FormData();
        data.append("username", userData.username);
        toast.promise(
            axios.post("https://inforbit.in/demo/dpd/generate-otp", data)
                .then((response) => {
                    if (response.data.status) {
                        localStorage.setItem("candidateUserId", response.data.candidate_nid)
                        setIsLoading(false);
                        setIsOtpSent(true);
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
                success: (message) => message || "OTP Sent on Register E-Mail & Mobile No.",
                error: (err) => err || "Failed to send OTP try again after some time...!"
            }
        );

    }

    function validateOTP(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        if (!userData.otp) {
            alert('Please enter a valid OTP');
            setIsLoading(false);
            return;
        }

        const candidate_nid = localStorage.getItem("candidateUserId") || ""
        const data = new FormData();
        data.append("candidate_nid", candidate_nid);
        data.append("otp", userData.otp);

        toast.promise(
            axios.post("https://inforbit.in/demo/dpd/check-otp", data)
                .then((response) => {
                    if (response.data.status) {
                        Cookies.set("data", JSON.stringify(response.data), {
                            expires: 1,
                            path: "/",
                        });

                        setUserData({
                            username: "",
                            password: "",
                            otp: ""
                        });

                        setIsLoading(false);
                        window.location.href = "/user/profile"
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
                success: (message) => message || "Login successful!",
                error: (err) => err || "Login failed!"
            }
        );

    }

    return (
        <section className="login-container">
            {loginType === 'password' ? (
                <LoginWithPassword
                    setLoginType={setLoginType}
                    userData={userData}
                    setUserData={setUserData}
                    handleSubmit={handleSubmit}
                    loading={isLoading}
                />
            ) : (
                <LoginWithOtp
                    setLoginType={setLoginType}
                    userData={userData}
                    setUserData={setUserData}
                    isOtpSent={isOtpSent}
                    sendOtp={SendOtp}
                    loading={isLoading}
                    validateOTP={validateOTP}
                />
            )}
            <Toaster />
        </section>
    );
}

interface LoginProps {
    setLoginType: React.Dispatch<React.SetStateAction<LoginType>>;
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    isOtpSent?: boolean;
    setIsOtpSent?: React.Dispatch<React.SetStateAction<boolean>>;
    // response?: any;
    error?: string;
    loading?: boolean;
    postData?: () => void;
    sendOtp?: (event: React.FormEvent) => void;
    handleSubmit?: (event: React.FormEvent) => void;
    validateOTP?: (event: React.FormEvent) => void
}

function LoginWithPassword({ setLoginType, userData, setUserData, loading, handleSubmit }: LoginProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
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
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                    </div>
                    <div className="card-input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            required
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                        <i
                            className={`hgi hgi-stroke ${showPassword ? 'hgi-view-off-slash' : 'hgi-view'}`}
                            onClick={() => setShowPassword((prev) => !prev)}
                            role="button"
                            aria-label="Toggle password visibility"
                        />
                    </div>
                </div>

                <div className="card-footer">
                    <button type="button" onClick={handleSubmit}
                        disabled={!userData.username || !userData.password || loading}>
                        {loading ? <Spinner /> : "Login"}
                    </button>

                    <div className="card-footer-links">
                        <Link href="/login/reset-password">Forgot Password?</Link>
                        <span className="switch-login-method" onClick={() => setLoginType('otp')}>
                            Login with OTP
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoginWithOtp({ setLoginType, userData, setUserData, isOtpSent, loading, sendOtp, validateOTP }: LoginProps) {
    return (
        <div className="login-card">
            <div className="login-wraper">
                <div className="card-top">
                    <Image src='/images/user/logo.png' width={300} height={27} alt="Dream Path Profile Builder" />
                    {/* <span>OTP Login</span> */}
                </div>

                <div className="card-body">
                    <div className="card-input">
                        <input
                            type="text"
                            name="username"
                            placeholder="Email or Phone No."
                            value={userData.username}
                            disabled={isOtpSent}
                            required
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                    </div>
                    {
                        isOtpSent ? (
                            <>
                                <div className="card-input">
                                    <input
                                        type="text"
                                        name="otp"
                                        placeholder="Enter OTP"
                                        value={userData.otp}
                                        max={6}
                                        required
                                        onChange={(e) => setUserData({ ...userData, otp: e.target.value })}
                                    />
                                </div>
                                <span className='rp'>resend OTP</span>
                            </>
                        ) : ""
                    }
                </div>

                <div className="card-footer">
                    {
                        !isOtpSent ? (
                            <button onClick={(e) => sendOtp && sendOtp(e)}
                                type="button" disabled={!userData.username || loading}>
                                {loading ? <Spinner /> : "Send OTP"}
                            </button>

                        ) : (
                            <button type="button"
                                onClick={(e) => validateOTP && validateOTP(e)}
                                disabled={!isOtpSent || userData.otp.length !== 6 || loading}>
                                {loading ? <Spinner /> : "Login"}
                            </button>
                        )
                    }

                    <div className="card-footer-links">
                        <span className="switch-login-method" onClick={() => setLoginType('password')}>
                            Login with Password
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
