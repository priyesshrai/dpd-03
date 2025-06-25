'use client'
import React, { useEffect, useState } from 'react'
import { SideBar } from '../UserProfile';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function About({user}:{user : string}) {
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        async function getUser() {
            if (!user) {
                Cookies.remove("data");
                toast.error('Please provide a valid user!');
                router.push('/login');
                setLoading(false)
                return;
            }

            try {
                const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${user}`);
                if (response.data.status === false) {
                    Cookies.remove("data")
                    toast.error(response.data.message ?? 'Profile Not Found of This User....!');
                    router.push('/login');
                    setLoading(false)
                    return;
                }
                setUserData(response?.data?.data)
                setLoading(false)
            } catch (error) {
                Cookies.remove("data");
                console.log(error);
                toast.error('Profile Not Found of This User....!');
                router.push('/login');
                setLoading(false)
                return
            }
        }

        getUser();
    }, [user, router]);

    if (!user) {
        Cookies.remove("data")
        alert("Sorry...! User Not found with user. Please provide a valid user.");
        router.push('/login');
        return;
    }
    return (
        <section className='hero-section'>
            <div className="hero-section-wraper">
                <SideBar userData={userData} loading={loading} userName={user} />
            </div>
        </section>
    )
}
