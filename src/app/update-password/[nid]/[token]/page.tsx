import ResetPassword from './ResetPassword'

export default async function Page({ params }: {params: Promise<{ nid: string, token:string }>} ) {
  const { nid, token } = await params
  return <ResetPassword nid={nid} token={token} />
}
