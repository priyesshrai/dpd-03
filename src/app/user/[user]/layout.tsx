import { ReactNode } from "react";
import { Footer, UserHeader } from "./UserProfile";

type Props = {
    children: ReactNode;
    params: { user: string };
};

export default async function UserLayout({ children, params }: Props) {
    const userName = params.user;

    return (
        <>
            <UserHeader userName={userName} />
            {children}
            <Footer/>
        </>
    );
}
