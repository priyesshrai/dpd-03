import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh", flexDirection: "column", gap: "20px" }}>
            <Image src="/images/svg/not-found.svg" fill alt="Page Not Found" />

            <Link href="/" style={{
              padding:"15px 30px",
              backgroundColor:"#E28E33" ,
              color:"white",
              fontSize:"20px",
              borderRadius:"8px" 
            }}>
                Back to Home
            </Link>
        </div>
    )
}