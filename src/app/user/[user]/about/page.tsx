import About from "./about";


export default async function UserAboutPage({ params }: { params: Promise<{ user: string }> }) {
  const { user } = await params;

  return (
  <About user={user}/>    
  )
}
