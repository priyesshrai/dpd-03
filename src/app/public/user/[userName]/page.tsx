import axios from "axios";
import UserProfile from "./UserProfile";


export default async function page() {
    return (
        <UserProfile/>
    )
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
