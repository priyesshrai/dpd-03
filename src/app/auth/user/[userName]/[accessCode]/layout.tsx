import { ReactNode } from "react";
import axios from "axios";
import { UserProvider } from "@/context/UserContext";
import PublicUserWrapper from "./PublicUserWrapper";
import { Footer, Header } from "./UserProfile";

type Props = {
    children: ReactNode;
    params: Promise<{ userName: string, accessCode : string }>
};

export default async function UserLayout({ children, params }: Props) {
    const { userName, accessCode } = await params;
    return (
        <UserProvider user={userName} accessCode={accessCode}>
            <Header userName={userName } accessCode={accessCode} />
            <PublicUserWrapper user={userName}>
                {children}
            </PublicUserWrapper>
            <Footer />
        </UserProvider>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ userName: string }> }) {
    const { userName } = await params;

    try {
        const response = await axios.get(`https://inforbit.in/demo/dpd/profile/${userName}`);
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
