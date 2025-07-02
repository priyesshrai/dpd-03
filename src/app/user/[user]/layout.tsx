import { ReactNode } from "react";
import { Footer, UserHeader } from "./UserProfile";
import axios from "axios";
import UserWrapper from "./UserWrapper";
import { UserProvider } from "@/context/UserContext";

type Props = {
    children: ReactNode;
    params: Promise<{ user: string }>
};

export default async function UserLayout({ children, params }: Props) {
    const { user: userName } = await params;

    return (
        <UserProvider user={userName}>
            <UserHeader userName={userName} />
            <UserWrapper user={userName}>
                {children}
            </UserWrapper>
            <Footer />
        </UserProvider>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;

    try {
        const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${user}`);
        const userData = response.data.data;

        const profileImageUrl = userData.profile_photo.startsWith('http')
            ? userData.profile_photo
            : `https://inforbit.in${userData.profile_photo}`;

        return {
            title: userData.name,
            description: userData.profile_heading,
            icons: {
                icon: profileImageUrl
            }
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            title: 'User not found',
        };
    }
}
