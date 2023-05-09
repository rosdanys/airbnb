import { Nunito } from 'next/font/google'

import './globals.css'
import Navbar from '@/app/components/navbar/Navbar'
import ClientOnly from '@/app/components/common/ClientOnly'
import RegisterModal from '@/app/components/modals/RegisterModal'
import ToasterProvider from '@/app/providers/ToasterProvider'
import LoginModal from '@/app/components/modals/LoginModal'
import getCurrentUser from '@/app/actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import { SafeUser } from './types'
import SearchModal from './components/modals/SearchModal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb is Clone',
}
const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
        {children}
        </div>
      </body>
    </html>
  )
}
