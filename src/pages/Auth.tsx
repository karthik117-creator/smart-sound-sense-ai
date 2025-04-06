
import React from 'react'
import Layout from '@/components/layout/Layout'
import AuthForm from '@/components/auth/AuthForm'

const Auth: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Smart Sound Switch</h1>
        <AuthForm />
      </div>
    </Layout>
  )
}

export default Auth
