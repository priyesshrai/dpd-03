import ResetPassword from './ResetPassword'

interface PageProps {
  params: {
    nid: string
    token: string
  }
}

export default function Page({ params }: PageProps) {
  const { nid, token } = params
  return <ResetPassword nid={nid} token={token} />
}
