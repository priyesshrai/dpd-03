import React from 'react'
import ResetPassword from './ResetPassword';

interface PageParams {
  params: {
    nid: string;
    token: string;
  };
}

export default function page({ params }: PageParams) {
    const { nid, token } = params;
    
  return (
    <ResetPassword nid={nid} token={token} />
  )
}

