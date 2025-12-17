
import SignInFromClient from '@/features/auth/components/signin-form-client'
import Image from 'next/image'
import React from 'react'

const SignInPage = () => {
  return (
    <>
      <div className='space-y-6 flex flex-col items-center justify-center'>
        <Image src={"/logo.png"} alt="Login-Image" height={400} width={400}
        className='m-6 object-cover'
        />
        <SignInFromClient />
        </div>
    </>
  )
}

export default SignInPage

