'use client'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'

interface Props {
  children: React.ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '' }}
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  )
}
