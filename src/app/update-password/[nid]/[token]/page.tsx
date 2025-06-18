import ResetPassword from './ResetPassword'

interface PageProps {
  params: {
    nid: string
    token: string
  }
}

export default async function Page({ params }: PageProps) {
  const { nid, token } = await params
  return <ResetPassword nid={nid} token={token} />
}
