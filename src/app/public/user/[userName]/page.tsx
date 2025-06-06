import UserProfile from "./UserProfile";


export default async function page({ params }: { params: Promise<{ userName: string }> }) {
    const { userName } = await params;
    
    return (
        <UserProfile userName={userName} />
    )
}

