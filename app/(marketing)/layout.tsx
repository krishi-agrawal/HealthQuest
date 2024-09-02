import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import '../globals.css'
import Header from './header'
import { Footer } from './footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
     <div>
        <Header />
        <main>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
          {children}
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  )
}